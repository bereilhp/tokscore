function normalize(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function countTokens(tokens) {
  const map = new Map();
  for (const t of tokens) map.set(t, (map.get(t) ?? 0) + 1);
  return map;
}

function round(num) {
  return Math.round(num * 1000) / 1000;
}

function compare(actual, predicted) {
  const actualTokens = normalize(actual);
  const predictedTokens = normalize(predicted);

  if (actualTokens.length === 0 && predictedTokens.length === 0) {
    return { precision: 1, recall: 1, f1: 1 };
  }
  if (actualTokens.length === 0 || predictedTokens.length === 0) {
    return { precision: 0, recall: 0, f1: 0 };
  }

  const actualCounts = countTokens(actualTokens);
  const predictedCounts = countTokens(predictedTokens);

  let tp = 0;
  for (const [token, count] of predictedCounts) {
    tp += Math.min(count, actualCounts.get(token) ?? 0);
  }

  const precision = tp / predictedTokens.length;
  const recall = tp / actualTokens.length;
  const f1 =
    precision + recall === 0
      ? 0
      : (2 * precision * recall) / (precision + recall);

  return { precision: round(precision), recall: round(recall), f1: round(f1) };
}

export default compare;
