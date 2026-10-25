export function insertionSortSteps(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [{ array: [...arr], comparing: [], sorted: [0], message: "Start: Insertion Sort (index 0 ko sorted maana)" }];

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      sorted: Array.from({ length: i }, (_, k) => k),
      message: `${key} ko sorted part me insert karne ke liye chuna`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k),
        message: `${arr[j]} > ${key}, to ${arr[j]} ko aage shift kiya`,
      });
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;

    steps.push({
      array: [...arr],
      comparing: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      message: `${key} ko index ${j + 1} pe rakh diya`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    sorted: arr.map((_, k) => k),
    message: "Sorted! Poora array sort ho gaya",
  });
  return steps;
}