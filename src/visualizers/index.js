import ArrayView2D from "./ArrayView2D";
import ArrayView3D from "./ArrayView3D";
import GraphView2D from "./GraphView2D";
import TreeView2D from "./TreeView2D";

export const visualizers = {
  array: { "2D": ArrayView2D, "3D": ArrayView3D },
  graph: { "2D": GraphView2D },
  tree:  { "2D": TreeView2D },
};