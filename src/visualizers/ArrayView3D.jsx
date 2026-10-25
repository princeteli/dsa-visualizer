import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function Bar({ x, height, color, label }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.75, height, 0.75]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <Text position={[0, height + 0.4, 0]} fontSize={0.35} color="#ffffff" font={undefined}>
        {label}
      </Text>
    </group>
  );
}

export default function ArrayView3D({ step }) {
  if (!step || !step.array) return null;

  const { array, comparing = [], sorted = [], found = null } = step;
  const max = Math.max(...array.map((n) => Math.abs(n)), 1);

  const getColor = (idx) => {
    if (found === idx) return "#34d399";
    if (comparing.includes(idx)) return "#facc15";
    if (sorted.includes(idx)) return "#2dd4bf";
    return "#6366f1";
  };

  return (
    <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-slate-950/60">
      {/* 3D Interaction Tip */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 pointer-events-none flex items-center gap-1.5 shadow">
        <span>🖱️ Drag to rotate • Scroll to zoom</span>
      </div>

      <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <pointLight position={[-10, -5, -10]} intensity={0.5} />
        
        {/* Floor Grid/Plane */}
        <gridHelper args={[20, 20, "#334155", "#1e293b"]} position={[0, 0, 0]} />

        {array.map((val, idx) => (
          <Bar
            key={idx}
            x={(idx - (array.length - 1) / 2) * 1.25}
            height={(Math.abs(val) / max) * 4.5 + 0.2}
            color={getColor(idx)}
            label={String(val)}
          />
        ))}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}