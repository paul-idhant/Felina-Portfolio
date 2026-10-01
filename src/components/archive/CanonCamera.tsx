/*
 * Adapted from Tom Past's camera-3D-showroom:
 * https://github.com/TomPast/camera-3D-showroom
 * Camera model: Canon AT-1 Retro Camera by AleixoAlonso, CC-BY-4.0.
 * Source: https://sketchfab.com/3d-models/canon-at-1-retro-camera-9de66868d0f240e985da00c9480bfc82
 */
/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, PresentationControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { Memory } from '../../data/memories'

interface ModelProps {
  current: Memory
  showBack: boolean
}

function MemoryScreen({ current }: { current: Memory }) {
  const texture = useTexture(current.src)
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
  }, [texture])

  // Coordinates are in the original model's local units. The surrounding group
  // uses the showcase source's scale/rotation, putting this panel on the rear of the actual Canon body.
  return <group position={[0, 0.044, -0.037]} rotation={[0, Math.PI, 0]}>
    <mesh position={[0, 0, -0.0006]}>
      <planeGeometry args={[0.108, 0.07]} />
      <meshStandardMaterial color="#0a0a0a" roughness={0.42} metalness={0.58} />
    </mesh>
    <mesh position={[0, 0, -0.0012]}>
      <planeGeometry args={[0.097, 0.059]} />
      <meshBasicMaterial map={texture} toneMapped={false} side={THREE.FrontSide} />
    </mesh>
  </group>
}

function CanonModel({ current, showBack }: ModelProps) {
  const { scene } = useGLTF('/assets/camera/canon-at1.glb')
  const model = useMemo(() => scene.clone(true), [scene])
  const pivot = useRef<THREE.Group>(null)

  useEffect(() => {
    model.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }, [model])

  useFrame((_, delta) => {
    if (!pivot.current) return
    const target = showBack ? Math.PI : 0
    pivot.current.rotation.y = THREE.MathUtils.damp(pivot.current.rotation.y, target, 5.5, delta)
  })

  return <group rotation={[-Math.PI / 2, 0, 0]} scale={25}>
    <group ref={pivot}>
      <primitive object={model} dispose={null} />
      <MemoryScreen current={current} />
    </group>
  </group>
}

interface Props {
  current: Memory
  showBack: boolean
  isMobile: boolean
}

export function CanonCamera({ current, showBack, isMobile }: Props) {
  return <Canvas
    shadows
    dpr={[1, isMobile ? 1.15 : 1.5]}
    camera={{ fov: isMobile ? 31 : 25, position: [0, 0, isMobile ? 17 : 15] }}
    gl={{ antialias: true, powerPreference: 'high-performance' }}
  >
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.4} castShadow shadow-mapSize={isMobile ? 1024 : 2048} />
    <directionalLight position={[-0.3, 0, 10]} intensity={0.32} />
    <Suspense fallback={null}>
      <PresentationControls global snap damping={0.18} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <CanonModel current={current} showBack={showBack} />
      </PresentationControls>
      <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={10} blur={3} far={4} />
      <Environment preset="city" />
    </Suspense>
  </Canvas>
}

useGLTF.preload('/assets/camera/canon-at1.glb')
