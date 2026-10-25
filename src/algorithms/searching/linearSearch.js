export function linearSearchSteps(input, target) {
  const arr = [...input];
  const steps = [
    { array: [...arr], comparing: [], sorted: [], found: null, message: `Start: Linear Search, ${target} dhundh rahe hain` },
  ];

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      comparing: [i],
      sorted: [],
      found: null,
      message: `Index ${i} pe ${arr[i]} hai, ${target} se compare kar rahe hain`,
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: [],
        found: i,
        message: `Mil gaya! ${target} index ${i} pe hai`,
      });
      return steps;
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