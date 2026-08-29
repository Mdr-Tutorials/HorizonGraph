const L = (h) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (f, b) => ((Math.max(L(f), L(b)) + 0.05) / (Math.min(L(f), L(b)) + 0.05)).toFixed(2);
const light = "#fcfcfb";
const dark = "#0c0e12";
const pairs = [
  ["light #6a52c7", "#6a52c7", light],
  ["light #5b46ad", "#5b46ad", light],
  ["light #4e3d99", "#4e3d99", light],
  ["dark  #a491f2", "#a491f2", dark],
  ["dark  #9085e9", "#9085e9", dark],
  ["dark  #b3a5f5", "#b3a5f5", dark],
];
for (const [n, f, b] of pairs) console.log(n, ratio(f, b));