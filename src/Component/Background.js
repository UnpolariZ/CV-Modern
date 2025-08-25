import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";

import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sphere scale={[0, 0, 0]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          color={"#000000"}
          lighting="physical"
          transmission={1}
          side={THREE.BackSide}
        >
          <Gradient
            colorA={"dark"}
            colorB={"white"}
            axes={"y"}
            start={0}
            end={-0.5}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
};