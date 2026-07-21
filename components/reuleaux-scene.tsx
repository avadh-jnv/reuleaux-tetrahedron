'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import { useMemo, useRef, Suspense } from 'react'
import * as THREE from 'three'

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
        {/* Solid glassy body */}
        <mesh geometry={geometry} castShadow>
          <meshPhysicalMaterial
            color="#3aa6ff"
            metalness={0.35}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.35}
            thickness={1.5}
            ior={1.35}
            reflectivity={0.6}
            emissive="#0a2a55"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* Glowing wireframe overlay */}
        <mesh geometry={geometry} scale={1.001}>
          <meshBasicMaterial
            color="#8fd4ff"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </group>
    </Float>
  )
}

export function ReuleauxScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
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
  )
}
