import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls";
import Model from "./Scene";

function Animation(props) {
  return (
    <Canvas
      camera={{
        fov: 40,
        position: [0, 0.2, 4],
      }}
      shadowMap
    >
      <Controls
        autoRotate
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.5}
        rotateSpeed={1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={4} />
      <pointLight intensity={6} position={[-10, -25, -10]} />
      <spotLight
        castShadow
        intensity={8}
        angle={Math.PI / 8}
        position={[25, 25, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={null}>
        <Model {...props} />
      </Suspense>
    </Canvas>
  );
}

export default Animation;
