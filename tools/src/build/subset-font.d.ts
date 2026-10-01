declare module "subset-font" {
  export default function subsetFont(font: Buffer, characters: string, options: { targetFormat: "woff2" }): Promise<Buffer>;
}
