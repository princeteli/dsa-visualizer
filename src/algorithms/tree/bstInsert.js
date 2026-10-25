// tree ka deep copy, taaki har step ka apna alag tree rahe
function cloneTree(node) {
  if (!node) return null;
  return {
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  };
}

export function bstInsertSteps(input) {
  const steps = [];
  let root = null;

  const snap = (highlight, message) =>
    steps.push({ tree: cloneTree(root), highlight, message });

  steps.push({ tree: null, highlight: null, message: "Start: BST Insert, tree abhi khali hai" });

  for (const val of input) {
    // pehla element seedha root banta hai
    if (root === null) {
      root = { value: val, left: null, right: null };
      snap(val, `${val} pehla element hai, to ye root ban gaya`);
      continue;
    }

    let cur = root;
    let placed = false;

    while (!placed) {
      snap(cur.value, `${val} ko ${cur.value} se compare kar rahe hain`);

      if (val === cur.value) {
        snap(cur.value, `${val} pehle se tree me hai, duplicate skip kiya`);
        placed = true; // loop band karne ke liye
      } else if (val < cur.value) {
        if (cur.left === null) {
          cur.left = { value: val, left: null, right: null };
          snap(val, `${val} < ${cur.value}, left khali tha, yahan insert kiya`);
          placed = true;
        } else {
          snap(cur.value, `${val} < ${cur.value}, to left me jaao`);
          cur = cur.left;
        }
      } else {
        if (cur.right === null) {
          cur.right = { value: val, left: null, right: null };
          snap(val, `${val} > ${cur.value}, right khali tha, yahan insert kiya`);
          placed = true;
        } else {
          snap(cur.value, `${val} > ${cur.value}, to right me jaao`);
          cur = cur.right;
        }
      }
    }
  }

  snap(null, "Done! Saare numbers BST me insert ho gaye");
  return steps;
}