export function darkenHexColor(hex: string, percentage: number): string {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error("Invalid hex color format");
  }
  if (percentage < 0 || percentage > 1) {
    throw new Error("Percentage must be between 0 and 1");
  }
  const normalizedHex = hex.startsWith("#") ? hex.slice(1) : hex;
  const r = parseInt(normalizedHex.slice(0, 2), 16);
  const g = parseInt(normalizedHex.slice(2, 4), 16);
  const b = parseInt(normalizedHex.slice(4, 6), 16);
  const darken = (channel: number) => Math.floor(channel * (1 - percentage));
  const newR = darken(r);
  const newG = darken(g);
  const newB = darken(b);
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export function lightenHexColor(hex: string, percentage: number): string {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error("Invalid hex color format");
  }
  if (percentage < 0 || percentage > 1) {
    throw new Error("Percentage must be between 0 and 1");
  }
  const normalizedHex = hex.startsWith("#") ? hex.slice(1) : hex;
  const r = parseInt(normalizedHex.slice(0, 2), 16);
  const g = parseInt(normalizedHex.slice(2, 4), 16);
  const b = parseInt(normalizedHex.slice(4, 6), 16);
  const lighten = (channel: number) =>
    Math.floor(channel + (255 - channel) * percentage);
  const newR = lighten(r);
  const newG = lighten(g);
  const newB = lighten(b);
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export type ContentColorScale = "green" | "teal" | "blue" | "red";

export function getContentColorScale(free: boolean, owned: boolean, wish: boolean): ContentColorScale {
  if (free) return "green";
  if (owned) return "teal";
  if (wish) return "blue";
  return "red";
}
