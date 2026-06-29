import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NeuralNet() {
  const groupRef = useRef();
  const particleCount = 150;
  const connectionThreshold = 5.5;

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const radius = 18;
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random());
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    // Pre-calculate connections
    const lineVerts = [];
    for (let i = 0; i < particleCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < particleCount && connections < 2; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < connectionThreshold) {
          lineVerts.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
          connections++;
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lineVerts)
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.0015;

      // Subtle mouse-follow parallax
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particle points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#818cf8"
          size={0.4}
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

/* Floating role indicator panels orbiting the center */
function FloatingPanel({ position, rotation, color, label, icon }) {
  const meshRef = useRef();
  const initialPos = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = initialPos.current[1] + Math.sin(t * 0.8 + rotation) * 0.5;
      meshRef.current.rotation.y = Math.sin(t * 0.3 + rotation) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[3.5, 1.2]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const roles = [
    { pos: [-8, 3, -3], rot: 0, color: '#818cf8', label: 'Data Science', icon: '📊' },
    { pos: [8, 2, -2], rot: 1.5, color: '#10b981', label: 'ML Engineering', icon: '⚙️' },
    { pos: [-7, -3, -4], rot: 3, color: '#a855f7', label: 'AI Development', icon: '🤖' },
    { pos: [7, -2, -3], rot: 4.5, color: '#f43f5e', label: 'Deep Learning', icon: '🧠' },
  ];

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 28], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <NeuralNet />
        {roles.map((r, i) => (
          <FloatingPanel key={i} position={r.pos} rotation={r.rot} color={r.color} label={r.label} icon={r.icon} />
        ))}
      </Canvas>
    </div>
  );
}
