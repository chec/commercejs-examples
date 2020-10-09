import React, { Suspense } from "react";
import Controls from "./Controls";
import Model from "./Scene";
import { Canvas } from "react-three-fiber";
import Loader from "./Loader";

function Animation(props) {
  // console.log(props);
  return (
    <>
      <Canvas
        camera={{
          fov: 40,
          position: [0, 0.2, 4],
        }}
        shadowMap
      >
        <Controls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <spotLight
          castShadow
          intensity={1}
          angle={Math.PI / 8}
          position={[25, 25, 15]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Suspense fallback={<Loader />}>
          <Model {...props} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Animation;
