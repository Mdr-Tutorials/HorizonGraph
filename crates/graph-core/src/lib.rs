//! HGC2 adjacency decoding and candidate scoring shared by native tests and WASM.
//! The caller verifies the pinned dataset manifest before decoding graph bytes.

use serde::Deserialize;
use wasm_bindgen::prelude::*;

const MAGIC: u32 = 0x3243_4748;
const FORMAT: u32 = 2;
const HEADER_WORDS: usize = 8;

#[derive(Debug)]
struct Sections {
    offsets: usize,
    peers: usize,
    relations: usize,
    contexts: usize,
}

#[derive(Debug)]
pub struct CsrGraph {
    words: Vec<u32>,
    node_count: u32,
    edge_count: u32,
    relation_count: u32,
    outgoing: Sections,
    incoming: Sections,
}

impl CsrGraph {
    /// Reject malformed input before allocating the decoded word buffer.
    pub fn decode(bytes: &[u8]) -> Result<Self, String> {
        if bytes.len() < HEADER_WORDS * 4 || !bytes.len().is_multiple_of(4) {
            return Err("HGC2: input must contain a 32-byte header and aligned u32 words".into());
        }
        let word = |i: usize| {
            u32::from_le_bytes(bytes[i * 4..i * 4 + 4].try_into().expect("header checked"))
        };
        if word(0) != MAGIC || word(1) != FORMAT {
            return Err("HGC2: unsupported magic or format".into());
        }
        if word(5) != 32 || word(7) != 0 {
            return Err("HGC2: invalid header size or reserved word".into());
        }
        let node_count = word(2);
        let edge_count = word(3);
        let relation_count = word(4);
        // Calculate in u64 so malicious u32 counts cannot overflow wasm32 usize.
        let expected = 8_u64 + 2 * (u64::from(node_count) + 1) + 6 * u64::from(edge_count);
        if expected != u64::from(word(6)) || expected != (bytes.len() / 4) as u64 {
            return Err("HGC2: section sizes do not match totalWordCount or input length".into());
        }
        let n = node_count as usize;
        let e = edge_count as usize;
        let outgoing = Sections {
            offsets: HEADER_WORDS,
            peers: HEADER_WORDS + n + 1,
            relations: HEADER_WORDS + n + 1 + e,
            contexts: HEADER_WORDS + n + 1 + 2 * e,
        };
        let in_start = HEADER_WORDS + n + 1 + 3 * e;
        let incoming = Sections {
            offsets: in_start,
            peers: in_start + n + 1,
            relations: in_start + n + 1 + e,
            contexts: in_start + n + 1 + 2 * e,
        };
        let words = bytes
            .chunks_exact(4)
            .map(|chunk| u32::from_le_bytes(chunk.try_into().expect("word alignment checked")))
            .collect();
        let graph = Self {
            words,
            node_count,
            edge_count,
            relation_count,
            outgoing,
            incoming,
        };
        graph.validate_section(&graph.outgoing)?;
        graph.validate_section(&graph.incoming)?;
        Ok(graph)
    }

    fn validate_section(&self, section: &Sections) -> Result<(), String> {
        let n = self.node_count as usize;
        let e = self.edge_count as usize;
        let offsets = &self.words[section.offsets..section.offsets + n + 1];
        if offsets[0] != 0 || offsets[n] != self.edge_count {
            return Err("HGC2: offsets must begin at zero and end at edgeCount".into());
        }
        if offsets.windows(2).any(|pair| pair[0] > pair[1]) {
            return Err("HGC2: offsets must be monotone".into());
        }
        if self.words[section.peers..section.peers + e]
            .iter()
            .any(|peer| *peer >= self.node_count)
        {
            return Err("HGC2: node index out of range".into());
        }
        if self.words[section.relations..section.relations + e]
            .iter()
            .any(|relation| *relation >= self.relation_count)
        {
            return Err("HGC2: relation index out of range".into());
        }
        Ok(())
    }

    /// Flattened triples [other node, relation, context] in build-time CSR order.
    pub fn neighbors(&self, node: u32, direction: u32) -> Result<Vec<u32>, String> {
        if node >= self.node_count {
            return Err("HGC2: requested node index out of range".into());
        }
        let section = match direction {
            0 => &self.outgoing,
            1 => &self.incoming,
            _ => return Err("HGC2: direction must be 0 (outgoing) or 1 (incoming)".into()),
        };
        let start = self.words[section.offsets + node as usize] as usize;
        let end = self.words[section.offsets + node as usize + 1] as usize;
        let mut result = Vec::with_capacity((end - start) * 3);
        for edge in start..end {
            result.extend_from_slice(&[
                self.words[section.peers + edge],
                self.words[section.relations + edge],
                self.words[section.contexts + edge],
            ]);
        }
        Ok(result)
    }
}

#[wasm_bindgen]
pub struct GraphIndex {
    graph: CsrGraph,
}

#[wasm_bindgen]
impl GraphIndex {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: &[u8]) -> Result<GraphIndex, JsValue> {
        CsrGraph::decode(bytes)
            .map(|graph| Self { graph })
            .map_err(|error| JsValue::from_str(&error))
    }

    pub fn neighbors(&self, node: f64, direction: f64) -> Result<Vec<u32>, JsValue> {
        let node = checked_u32(node).map_err(|error| JsValue::from_str(&error))?;
        let direction = checked_u32(direction).map_err(|error| JsValue::from_str(&error))?;
        self.graph
            .neighbors(node, direction)
            .map_err(|error| JsValue::from_str(&error))
    }

    #[wasm_bindgen(getter)]
    pub fn node_count(&self) -> u32 {
        self.graph.node_count
    }

    #[wasm_bindgen(getter)]
    pub fn edge_count(&self) -> u32 {
        self.graph.edge_count
    }

    #[wasm_bindgen(getter)]
    pub fn relation_count(&self) -> u32 {
        self.graph.relation_count
    }
}

// wasm-bindgen normally truncates/coerces u32 arguments. Validate the original
// JavaScript number so negative, fractional and overflowing indexes cannot wrap.
fn checked_u32(value: f64) -> Result<u32, String> {
    if !value.is_finite() || value < 0.0 || value > f64::from(u32::MAX) || value.fract() != 0.0 {
        return Err("HGC2: index and direction must be unsigned 32-bit integers".into());
    }
    Ok(value as u32)
}

#[derive(Debug, Deserialize)]
pub struct Candidate {
    pub idx: u32,
    pub id: String,
    pub name: String,
    pub abbr: String,
    pub aliases: Vec<String>,
    pub importance: u32,
}

/// Match fields and query arrive normalized by JavaScript's toLowerCase.
/// Keeping normalization outside Rust preserves the existing Unicode behavior.
pub fn score_rows(query: &str, rows: &[Candidate]) -> Result<Vec<u32>, String> {
    if rows.iter().any(|row| row.importance > 5) {
        return Err("search: importance must be an integer from 0 to 5".into());
    }
    if query.is_empty() {
        return Ok(Vec::new());
    }
    let mut scores = Vec::new();
    for row in rows {
        let mut score = 0_u32;
        if row.name.starts_with(query) {
            score += 30;
        } else if row.name.contains(query) {
            score += 15;
        }
        if row.abbr == query {
            score += 25;
        } else if row.abbr.starts_with(query) {
            score += 18;
        }
        if row.aliases.iter().any(|alias| alias.contains(query)) {
            score += 8;
        }
        if row.id.contains(query) {
            score += 6;
        }
        if row.name == query
            || row.abbr == query
            || row.id == query
            || row.aliases.iter().any(|alias| alias == query)
        {
            score += 100;
        }
        if score > 0 {
            scores.extend_from_slice(&[row.idx, score + row.importance * 2]);
        }
    }
    Ok(scores)
}

pub fn score_json(query: &str, rows_json: &str) -> Result<Vec<u32>, String> {
    let rows: Vec<Candidate> = serde_json::from_str(rows_json)
        .map_err(|error| format!("search: invalid candidate JSON: {error}"))?;
    score_rows(query, &rows)
}

#[wasm_bindgen]
pub fn score_candidates(query: &str, rows_json: &str) -> Result<Vec<u32>, JsValue> {
    score_json(query, rows_json).map_err(|error| JsValue::from_str(&error))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[rustfmt::skip]
    fn fixture() -> Vec<u8> {
        // 0 --relation 0/no context--> 1; 2 --relation 1/context 7--> 1.
        let words = [
            MAGIC, FORMAT, 3, 2, 2, 32, 28, 0, // Header.
            0, 1, 1, 2, // Out offsets.
            1, 1, // Out targets.
            0, 1, // Out relations.
            u32::MAX, 7, // Out contexts.
            0, 0, 2, 2, // In offsets.
            0, 2, // In sources.
            0, 1, // In relations.
            u32::MAX, 7, // In contexts.
        ];
        words.iter().flat_map(|word| word.to_le_bytes()).collect()
    }

    fn with_word(mut bytes: Vec<u8>, index: usize, value: u32) -> Vec<u8> {
        bytes[index * 4..index * 4 + 4].copy_from_slice(&value.to_le_bytes());
        bytes
    }

    #[test]
    fn decodes_outgoing_and_incoming_with_empty_rows() {
        let graph = CsrGraph::decode(&fixture()).unwrap();
        assert_eq!(graph.neighbors(0, 0).unwrap(), [1, 0, u32::MAX]);
        assert_eq!(graph.neighbors(1, 1).unwrap(), [0, 0, u32::MAX, 2, 1, 7]);
        assert!(graph.neighbors(1, 0).unwrap().is_empty());
        assert!(graph.neighbors(0, 1).unwrap().is_empty());
        assert!(graph.neighbors(3, 0).is_err());
        assert!(graph.neighbors(0, 2).is_err());
    }

    #[test]
    fn accepts_a_graph_without_nodes_or_edges() {
        let words: [u32; 10] = [MAGIC, FORMAT, 0, 0, 0, 32, 10, 0, 0, 0];
        let bytes: Vec<u8> = words.iter().flat_map(|word| word.to_le_bytes()).collect();
        assert_eq!(CsrGraph::decode(&bytes).unwrap().node_count, 0);
    }

    #[test]
    fn rejects_headers_sizes_and_overflowing_counts() {
        assert!(CsrGraph::decode(&fixture()[..31]).is_err());
        assert!(CsrGraph::decode(&fixture()[..111]).is_err());
        for (index, value) in [
            (0, 0),
            (1, 1),
            (2, u32::MAX),
            (3, u32::MAX),
            (5, 28),
            (6, 27),
            (7, 1),
        ] {
            assert!(CsrGraph::decode(&with_word(fixture(), index, value)).is_err());
        }
        let mut trailing = fixture();
        trailing.extend_from_slice(&0_u32.to_le_bytes());
        assert!(CsrGraph::decode(&trailing).is_err());
    }

    #[test]
    fn rejects_invalid_javascript_numbers_before_u32_conversion() {
        for value in [-1.0, 0.5, 4_294_967_296.0, f64::NAN, f64::INFINITY] {
            assert!(checked_u32(value).is_err());
        }
        assert_eq!(checked_u32(0.0).unwrap(), 0);
        assert_eq!(checked_u32(4_294_967_295.0).unwrap(), u32::MAX);
    }

    #[test]
    fn rejects_offsets_and_node_relation_indexes_in_both_directions() {
        for (index, value) in [
            (8, 1),  // Out start.
            (9, 2),  // Out nonmonotone.
            (11, 1), // Out end.
            (12, 3), // Out node range.
            (14, 2), // Out relation range.
            (18, 1), // In start.
            (19, 3), // In nonmonotone.
            (21, 1), // In end.
            (22, 3), // In node range.
            (24, 2), // In relation range.
        ] {
            assert!(CsrGraph::decode(&with_word(fixture(), index, value)).is_err());
        }
    }

    #[test]
    fn preserves_exact_prefix_substring_and_chinese_alias_weights() {
        let rows = r#"[
            {"idx":0,"id":"oc","name":"oc","abbr":"oc","aliases":["开放计算"],"importance":3},
            {"idx":1,"id":"ocaml","name":"ocaml","abbr":"","aliases":[],"importance":5},
            {"idx":2,"id":"other","name":"other","abbr":"","aliases":["开放计算"],"importance":2}
        ]"#;
        assert_eq!(score_json("oc", rows).unwrap(), [0, 167, 1, 46]);
        assert_eq!(score_json("cam", rows).unwrap(), [1, 31]);
        assert_eq!(score_json("开放", rows).unwrap(), [0, 14, 2, 12]);
        assert_eq!(score_json("开放计算", rows).unwrap(), [0, 114, 2, 112]);
        assert!(score_json("no-match", rows).unwrap().is_empty());
        assert!(score_json("", rows).unwrap().is_empty());
    }

    #[test]
    fn rejects_invalid_candidate_numbers_without_panicking() {
        for (idx, importance) in [
            ("0", "6"),
            ("0", "4294967295"),
            ("0", "-1"),
            ("0", "1.5"),
            ("0", "\"3\""),
            ("4294967296", "3"),
            ("-1", "3"),
            ("1.5", "3"),
        ] {
            let json = format!(
                r#"[{{"idx":{idx},"id":"x","name":"x","abbr":"","aliases":[],"importance":{importance}}}]"#
            );
            assert!(score_json("x", &json).is_err());
        }
        assert!(score_json("x", "{}").is_err());
        assert!(score_json("x", "not-json").is_err());
    }
}
