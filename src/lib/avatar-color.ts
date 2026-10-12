const PALETTE = ["#b9925c", "#8c6b3d", "#5a3e2b", "#c9a876", "#a17b45"];

export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + second).toUpperCase();
}

export function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
