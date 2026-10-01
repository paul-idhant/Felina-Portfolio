import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, ContactShadows, useGLTF } from '@react-three/drei'
import { LoaderFallback } from './LoaderFallback'

type LoaderProps = { onFinish: () => void; short?: boolean }

function LaptopModel() {
  const { scene } = useGLTF('/assets/laptop/classic_laptop_1k.gltf')
  const model = useMemo(() => scene.clone(), [scene])
  useFrame(({ clock }) => {
    model.rotation.y = Math.sin(clock.getElapsedTime() * 0.24) * 0.13 - 0.34
    model.rotation.x = -0.07
  })
  return <Center><primitive object={model} scale={3.3} /></Center>
}

function LaptopScene() {
  return <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0.1, 4.25], fov: 25 }} gl={{ antialias: true, powerPreference: 'low-power' }}>
    <color attach="background" args={['#070707']} />
    <ambientLight intensity={0.55} />
    <directionalLight position={[3, 4, 4]} intensity={1.8} color="#e6e5d7" />
    <pointLight position={[-2, 1, 2]} intensity={0.7} color="#aab6a5" />
    <Suspense fallback={null}><LaptopModel /></Suspense>
    <ContactShadows position={[0, -1.4, 0]} opacity={0.45} scale={7} blur={2.2} far={4} />
  </Canvas>
}

export function ClassicLaptopLoader({ onFinish, short = false }: LoaderProps) {
  const [failed, setFailed] = useState(false)
  const [line, setLine] = useState(0)
  const messages = ['FELINA_OS 1.0', 'recovering memories...', 'loading personal archive...', 'welcome, visitor_']
  const duration = short ? 1450 : 4300

  useEffect(() => {
    const step = Math.max(280, Math.round(duration / messages.length))
    const messageTimer = window.setInterval(() => setLine(current => Math.min(current + 1, messages.length - 1)), step)
    const fallback = window.setTimeout(onFinish, duration + 1000)
    const finish = window.setTimeout(onFinish, duration)
    return () => { window.clearInterval(messageTimer); window.clearTimeout(fallback); window.clearTimeout(finish) }
  }, [duration, onFinish])

  return <div className="loader" role="status" aria-label="Opening Felina’s personal archive">
    {!failed ? <div className="loader-canvas"><LaptopScene /></div> : <LoaderFallback onFinish={onFinish} />}
    <div className="crt-screen" aria-hidden="true">
      <div className="crt-scanlines" />
      <p>{messages[line]}</p>
      <span className="crt-cursor" />
    </div>
    <div className="loader-meta"><span>BOOT / 2026</span><span>CC0 CLASSIC LAPTOP</span></div>
    <button className="skip-loader" type="button" onClick={onFinish}>Skip intro</button>
    <img className="loader-preload" src="/assets/laptop/classic-laptop-fallback.png" alt="" onError={() => setFailed(true)} />
  </div>
}
