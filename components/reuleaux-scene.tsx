'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import { Component, useEffect, useMemo, useRef, useState, Suspense, type ReactNode } from 'react'
import * as THREE from 'three'

/** Detects whether the browser can actually create a WebGL context. */
function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** Catches any runtime WebGL errors thrown while rendering the Canvas. */
class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

/**
 * Accurate Reuleaux triangle fallback (shown when WebGL is unavailable).
 * A Reuleaux triangle is a curve of constant width: an equilateral triangle
 * whose sides are replaced by circular arcs, each centred on the opposite
 * vertex with radius equal to the side length. Drawn here with three SVG arcs.
 */
function StaticFallback() {
  // Equilateral triangle centred at (100,100), circumradius 70.
  // Vertices: A top, B bottom-left, C bottom-right. Arc radius = side length.
  const path =
    'M 100 30 ' +
    'A 121.24 121.24 0 0 0 39.4 135 ' +
    'A 121.24 121.24 0 0 0 160.6 135 ' +
    'A 121.24 121.24 0 0 0 100 30 Z'

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="relative aspect-square w-full max-w-sm animate-float">
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_40%_35%,oklch(0.55_0.16_235/0.55)_0%,transparent_70%)] blur-2xl" />
        <svg
          viewBox="0 0 200 200"
          className="relative h-full w-full drop-shadow-[0_20px_50px_oklch(0.5_0.15_235/0.4)]"
          role="img"
          aria-label="Reuleaux triangle, a curve of constant width"
        >
          <defs>
            <linearGradient id="reuleaux-fill" x1="30%" y1="10%" x2="80%" y2="95%">
              <stop offset="0%" stopColor="oklch(0.72 0.15 230)" />
              <stop offset="55%" stopColor="oklch(0.5 0.15 250)" />
              <stop offset="100%" stopColor="oklch(0.3 0.1 262)" />
            </linearGradient>
            <radialGradient id="reuleaux-sheen" cx="38%" cy="30%" r="60%">
              <stop offset="0%" stopColor="oklch(0.95 0.05 230)" stopOpacity="0.7" />
              <stop offset="45%" stopColor="oklch(0.85 0.09 230)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={path} fill="url(#reuleaux-fill)" />
          <path d={path} fill="url(#reuleaux-sheen)" />
          <path
            d={path}
            fill="none"
            stroke="oklch(0.85 0.1 230)"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
        </svg>
      </div>
    </div>
  )
}

/**
 * Builds an accurate Reuleaux Tetrahedron geometry.
 *
 * The solid is the intersection of four equal spheres, each centered on a
 * vertex of a regular tetrahedron with radius equal to the edge length (r = a).
 * The shape is star-shaped from its centroid, so for every direction we take
 * the nearest sphere exit point as the surface radius, then displace a highly
 * subdivided icosphere accordingly.
 */
function useReuleauxGeometry() {
  return useMemo(() => {
    // Regular tetrahedron vertices centered at the origin.
    const verts = [
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 1, -1),
      new THREE.Vector3(-1, -1, 1),
    ]
    // Edge length a = 2*sqrt(2); |v|^2 = 3, so (|v|^2 - a^2) = -5.
    const a2 = 8
    const c = 3 - a2 // = -5

    const geo = new THREE.IcosahedronGeometry(1, 24)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const dir = new THREE.Vector3()

    for (let i = 0; i < pos.count; i++) {
      dir.set(pos.getX(i), pos.getY(i), pos.getZ(i)).normalize()
      let r = Infinity
      for (const v of verts) {
        const b = dir.dot(v)
        // t^2 - 2 b t + c = 0  ->  positive root
        const t = b + Math.sqrt(b * b - c)
        if (t < r) r = t
      }
      pos.setXYZ(i, dir.x * r, dir.y * r, dir.z * r)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    geo.center()
    return geo
  }, [])
}

function ReuleauxMesh() {
  const geometry = useReuleauxGeometry()
  // Extract the sharp silhouette edges once for a crisp outline overlay.
  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry, 18),
    [geometry],
  )
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.35
      group.current.rotation.x += delta * 0.12
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={group} scale={1.15}>
        {/* Solid, vibrant body (opaque so it stays readable on a transparent canvas) */}
        <mesh geometry={geometry} castShadow>
          <meshPhysicalMaterial
            color="#2f8ff0"
            metalness={0.6}
            roughness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.15}
            reflectivity={0.7}
            emissive="#0c2e5c"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Soft glowing wireframe to reveal the curved facets */}
        <mesh geometry={geometry} scale={1.002}>
          <meshBasicMaterial color="#9bdcff" wireframe transparent opacity={0.08} />
        </mesh>
        {/* Crisp edge outline emphasizing the tetrahedral structure */}
        <lineSegments geometry={edges} scale={1.004}>
          <lineBasicMaterial color="#bfe6ff" transparent opacity={0.5} />
        </lineSegments>
      </group>
    </Float>
  )
}

export function ReuleauxScene() {
  const [supported, setSupported] = useState<boolean | null>(null)

  useEffect(() => {
    setSupported(isWebGLAvailable())
  }, [])

  // While detecting (or if unsupported), show the static fallback.
  if (supported !== true) return <StaticFallback />

  return (
    <WebGLErrorBoundary fallback={<StaticFallback />}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        aria-label="Interactive 3D model of a Reuleaux Tetrahedron"
      >
        <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-6, -3, -4]} intensity={1.2} color="#4d8bff" />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#8fd4ff" />
        <ReuleauxMesh />
        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.6}
          rotateSpeed={0.7}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={(Math.PI * 5) / 6}
        />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  )
}
