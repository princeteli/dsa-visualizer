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

export function bfsSteps(graph = sampleGraph, start = 0) {
  const { nodes, edges } = graph;
  const adj = buildAdj(nodes, edges);
  const steps = [];

  const visited = [];       // jinko process kar liya
  const seen = new Set([start]); // jo queue me aa chuke hain (dobara na daalne ke liye)
  const queue = [start];

  const snap = (current, message) =>
    steps.push({ nodes, edges, visited: [...visited], current, queue: [...queue], message });

  snap(null, `Start: BFS, node ${start} se shuru. Queue: [${queue}]`);

  while (queue.length > 0) {
    const node = queue.shift(); // sabse aage wala nikalo
    visited.push(node);
    snap(node, `Node ${node} nikala aur visit kiya. Queue: [${queue}]`);

    for (const nb of adj[node]) {
      if (!seen.has(nb)) {
        seen.add(nb);
        queue.push(nb);
        snap(node, `Node ${node} ka padosi ${nb} naya hai, queue me daala. Queue: [${queue}]`);
      } else {
        snap(node, `Node ${node} ka padosi ${nb} pehle se dekha hua hai, skip`);
      }
    }
  }

  snap(null, "BFS khatam! Saare nodes visit ho gaye");
  return steps;
}