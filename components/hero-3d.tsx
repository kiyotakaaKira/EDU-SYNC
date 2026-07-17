"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Octahedron } from "@react-three/drei"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

function FloatingSphere({
  position,
  color,
  emissive,
  speed,
  distort,
  size = 1,
}: {
  position: [number, number, number]
  color: string
  emissive: string
  speed: number
  distort: number
  size?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2.5}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.4}
          attach="material"
          distort={distort}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

function FloatingTorus({
  position,
  color,
  emissive,
  speed,
}: {
  position: [number, number, number]
  color: string
  emissive: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.7
    }
  })

  return (
    <Float speed={speed * 0.8} rotationIntensity={2} floatIntensity={2}>
      <Torus ref={meshRef} args={[1, 0.4, 16, 100]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.95}
        />
      </Torus>
    </Float>
  )
}

function FloatingGem({
  position,
  color,
  emissive,
  speed,
}: {
  position: [number, number, number]
  color: string
  emissive: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <Float speed={speed * 0.5} rotationIntensity={1} floatIntensity={1.5}>
      <Icosahedron ref={meshRef} args={[0.8]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={1}
        />
      </Icosahedron>
    </Float>
  )
}

function FloatingOctahedron({
  position,
  color,
  emissive,
  speed,
}: {
  position: [number, number, number]
  color: string
  emissive: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.6
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.8
    }
  })

  return (
    <Float speed={speed * 0.7} rotationIntensity={1.5} floatIntensity={2}>
      <Octahedron ref={meshRef} args={[0.6]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.95}
        />
      </Octahedron>
    </Float>
  )
}

function ParticleField() {
  const count = 100
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#2563eb" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#2563eb" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4f46e5" />
        <pointLight position={[0, 10, 5]} intensity={1} color="#3b82f6" />
        <spotLight position={[5, 5, 5]} intensity={0.6} color="#6366f1" angle={0.4} />

        <ParticleField />

        {/* Main spheres with neon colors */}
        <FloatingSphere
          position={[-4, 2, -3]}
          color="#2563eb"
          emissive="#1e3a8a"
          speed={1.2}
          distort={0.5}
          size={1.2}
        />
        <FloatingSphere
          position={[4.5, -1.5, -4]}
          color="#4f46e5"
          emissive="#3730a3"
          speed={1}
          distort={0.4}
          size={1}
        />
        <FloatingSphere position={[1, 3, -5]} color="#3b82f6" emissive="#1d4ed8" speed={0.8} distort={0.3} size={0.8} />

        {/* Torus rings */}
        <FloatingTorus position={[-2.5, -2, -2]} color="#6366f1" emissive="#4338ca" speed={0.6} />
        <FloatingTorus position={[3, 2.5, -3]} color="#818cf8" emissive="#4f46e5" speed={0.8} />

        {/* Gem shapes */}
        <FloatingGem position={[-3.5, 0, -1]} color="#4f46e5" emissive="#3730a3" speed={0.7} />
        <FloatingGem position={[2, -2.5, -2]} color="#0ea5e9" emissive="#0284c7" speed={0.9} />

        {/* Octahedrons */}
        <FloatingOctahedron position={[5, 0, -4]} color="#a5b4fc" emissive="#6366f1" speed={0.5} />
        <FloatingOctahedron position={[-1, -3, -3]} color="#c7d2fe" emissive="#818cf8" speed={0.6} />
      </Canvas>
    </div>
  )
}
