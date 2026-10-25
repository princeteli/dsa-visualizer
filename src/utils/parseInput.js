export function parseArray(text) {
  const parts = text
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  if (parts.length === 0) {
    return { ok: false, error: "Input khali hai, numbers dalein" };
  }

  const nums = parts.map(Number);

  if (nums.some((n) => Number.isNaN(n))) {
    return { ok: false, error: "Sirf numbers likho, comma se alag karke (jaise: 5, 3, 8, 1)" };
  }

  if (nums.length > 20) {
    return { ok: false, error: "Zyada se zyada 20 numbers rakho" };
  }

  return { ok: true, value: nums };
}
