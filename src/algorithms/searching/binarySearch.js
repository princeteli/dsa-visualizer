export function binarySearchSteps(input, target) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];

  // search range ke bahar wale indexes ko "sorted" me daal ke dhundhla dikhayenge
  const outside = (lo, hi) =>
    arr.map((_, k) => k).filter((k) => k < lo || k > hi);

  steps.push({
    array: [...arr],
    comparing: [],
    sorted: [],
    found: null,
    message: `Start: Binary Search, ${target} dhundh rahe hain (array sorted hona chahiye)`,
  });

  let lo = 0;
  let hi = n - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);

    steps.push({
      array: [...arr],
      comparing: [mid],
      sorted: outside(lo, hi),
      found: null,
      message: `Range [${lo}..${hi}], mid = ${mid}, value ${arr[mid]} ko ${target} se compare kar rahe hain`,
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: [],
        found: mid,
        message: `Mil gaya! ${target} index ${mid} pe hai`,
      });
      return steps;
    }

    if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        comparing: [mid],
        sorted: outside(lo, hi),
        found: null,
        message: `${arr[mid]} chhota hai ${target} se, to left half chhod do (lo = ${mid + 1})`,
      });
      lo = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        comparing: [mid],
        sorted: outside(lo, hi),
        found: null,
        message: `${arr[mid]} bada hai ${target} se, to right half chhod do (hi = ${mid - 1})`,
      });
      hi = mid - 1;
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    sorted: [],
    found: null,
    message: `${target} array me nahi mila`,
  });
  return steps;
}