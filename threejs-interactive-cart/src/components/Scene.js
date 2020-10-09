import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from "drei";

export default function Model(props) {
  const group = useRef();

  const { nodes, materials } = useLoader(
    GLTFLoader,
    `../${props.uniqueId}/scene.gltf`,
    draco("/draco-gltf/")
  );

  useFrame(() => (group.current.rotation.y += 0.003));

  // we take the return value from the gltfjsx generated file, and put into this switch function
  function switchItem(item) {
    switch (item) {
      case "prod_RqEv5xOVPoZz4j":
        return (
          <group
            ref={group}
            dispose={null}
            castShadow
            receiveShadow
            position={[0, -0.5, 0]}
          >
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                material={materials.Blue_Vans_Shoe}
                material-color={props.color}
                geometry={nodes.mesh_0.geometry}
                scale={[0.3, 0.3, 0.3]}
              />
            </group>
          </group>
        );

      case "prod_8XxzoBMgZwPQAZ":
        return (
          <group ref={group} dispose={null} castShadow receiveShadow>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <mesh
                  material={materials.lambert1}
                  material-color={props.color}
                  geometry={nodes.UV_d_lambert1_0.geometry}
                  scale={[0.8, 0.8, 0.8]}
                />
              </group>
            </group>
          </group>
        );

      default:
        return;
    }
  }
  return <>{switchItem(props.uniqueId)}</>;
}
