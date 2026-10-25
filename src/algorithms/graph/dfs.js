import { sampleGraph } from "./sampleGraph";

function buildAdj(nodes, edges) {
  const adj = {};
  nodes.forEach((n) => (adj[n.id] = []));
  edges.forEach(([a, b]) => {
    adj[a].push(b);
    adj[b].push(a); // undirected graph
  });
  Object.keys(adj).forEach((k) => adj[k].sort((x, y) => x - y));
  return adj;
}

export function dfsSteps(graph = sampleGraph, start = 0) {
  const { nodes, edges } = graph;
  const adj = buildAdj(nodes, edges);
  const steps = [];

  const visited = [];
  const seen = new Set();
  const stack = [start];

  const snap = (current, message) =>
    steps.push({ nodes, edges, visited: [...visited], current, stack: [...stack], message });

  snap(null, `Start: DFS, node ${start} se shuru. Stack: [${stack}]`);

  while (stack.length > 0) {
    const node = stack.pop();

    if (seen.has(node)) {
      continue;
    }

    seen.add(node);
    visited.push(node);
    snap(node, `Node ${node} visit kiya. Stack: [${stack}]`);

    // push neighbors in reverse order so smaller node ids are processed first
    const neighbors = [...adj[node]].reverse();
    for (const nb of neighbors) {
      if (!seen.has(nb)) {
        stack.push(nb);
        snap(node, `Node ${node} ka padosi ${nb} stack me daala. Stack: [${stack}]`);
      } else {
        snap(node, `Node ${node} ka padosi ${nb} pehle se dekha hua hai, skip`);
      }
    }
  }

  snap(null, "DFS khatam! Saare nodes visit ho gaye");
  return steps;
}