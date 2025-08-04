import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 },
    nIntensity: { value: 0.2 },
    sIntensity: { value: 0.05 },
    sCount: { value: 4096 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform float nIntensity;
    varying vec2 vUv;

    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      float dx = rand(vUv + time);
      vec3 cResult = vec3(dx);
      gl_FragColor = vec4(cResult, nIntensity);
    }
  `,
}

function Grain() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={materialRef} args={[FilmGrainShader]} transparent />
    </mesh>
  )
}

export function FilmGrainOverlay() {
  return (
    <div className="film-grain-overlay">
      <Canvas style={{ pointerEvents: 'none' }}>
        <Grain />
      </Canvas>
    </div>
  )
}
