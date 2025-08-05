import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const FilmGrainShader = {
  uniforms: {
    time: { value: 0.0 },
    nIntensity: { value: 10.0 },
    grainSize: { value: 7.0 },
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
    uniform float grainSize;
    varying vec2 vUv;

    // A more complex random function to reduce visible patterns
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      // Add time-based offset to the UV coordinates to animate the noise
      uv += random(vec2(time));
      
      // Generate noise value
      float noise = random(uv * grainSize);
      
      // Apply intensity
      gl_FragColor = vec4(vec3(noise), nIntensity);
    }
  `,
}

function Grain({ intensity, grainSize }: { intensity: number; grainSize: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime()
      materialRef.current.uniforms.nIntensity.value = intensity
      materialRef.current.uniforms.grainSize.value = grainSize
    }
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={materialRef} args={[FilmGrainShader]} transparent />
    </mesh>
  )
}

export function FilmGrainOverlay({
  intensity = 0,
  grainSize = 1.5,
}: {
  intensity?: number
  grainSize?: number
}) {
  return (
    <div className="film-grain-overlay">
      <Canvas style={{ pointerEvents: 'none' }}>
        <Grain intensity={intensity} grainSize={grainSize} />
      </Canvas>
    </div>
  )
}
