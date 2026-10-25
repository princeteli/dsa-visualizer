import { bubbleSortSteps } from "./sorting/bubbleSort";
import { selectionSortSteps } from "./sorting/selectionSort";
import { insertionSortSteps } from "./sorting/insertionSort";

import { binarySearchSteps } from "./searching/binarySearch";
import { linearSearchSteps } from "./searching/linearSearch";

import { bfsSteps } from "./graph/bfs";
import { dfsSteps } from "./graph/dfs";

import { bstInsertSteps } from "./tree/bstInsert";

export const algorithms = {
  // sorting
  bubbleSort:    { name: "Bubble Sort",    type: "array", input: "array", run: bubbleSortSteps },
  selectionSort: { name: "Selection Sort", type: "array", input: "array", run: selectionSortSteps },
  insertionSort: { name: "Insertion Sort", type: "array", input: "array", run: insertionSortSteps },

  // searching
  linearSearch: { name: "Linear Search", type: "array", input: "array", needsTarget: true, run: linearSearchSteps },
  binarySearch: { name: "Binary Search", type: "array", input: "array", needsTarget: true, sortFirst: true, run: binarySearchSteps },

  // graph
  bfs: { name: "BFS", type: "graph", input: "none", run: bfsSteps },
  dfs: { name: "DFS", type: "graph", input: "none", run: dfsSteps },

  // tree
  bstInsert: { name: "BST Insert", type: "tree", input: "array", run: bstInsertSteps },
};

// dropdown ke liye list: [["bubbleSort", {...}], ...]
export const algorithmList = Object.entries(algorithms);