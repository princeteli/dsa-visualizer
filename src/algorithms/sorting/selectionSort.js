export function selectionSortSteps(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [{ array: [...arr], comparing: [], sorted: [], message: "Start: Selection Sort" }];

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        sorted: Array.from({ length: i }, (_, k) => k),
        message: `Compare kar rahe hain: min (${arr[minIdx]}) aur index ${j} (${arr[j]})`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          sorted: Array.from({ length: i }, (_, k) => k),
          message: `Naya minimum mila: ${arr[minIdx]} at index ${minIdx}`,
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [i, minIdx],
        sorted: Array.from({ length: i }, (_, k) => k),
        message: `Swap kiya: ${arr[i]} aur ${arr[minIdx]}`,
      });
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    sorted: arr.map((_, k) => k),
    message: "Sorted! Poora array sort ho gaya",
  });
  return steps;
}