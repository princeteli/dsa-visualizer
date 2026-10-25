export function bubbleSortSteps(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [{ array: [...arr], comparing: [], sorted: [], message: "Start: Bubble Sort" }];

  for (let i = 0; i < n - 1; i++) {
    // pichle i elements already apni jagah pe hain (end me)
    const sortedNow = Array.from({ length: i }, (_, k) => n - 1 - k);

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sorted: sortedNow,
        message: `${arr[j]} aur ${arr[j + 1]} compare kar rahe hain`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          sorted: sortedNow,
          message: `${arr[j + 1]} bada tha, swap kiya`,
        });
      }
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