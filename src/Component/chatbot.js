import { useFBX } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";

const HELIX_SPEED = 6;

export function Chatbot(props) {
  const fbx = useFBX("./models/airplane/Happy.fbx"); // Utilisation de useFBX pour charger un fichier FBX

  const helix = useRef();
  const [geometryCircle, setGeometryCircle] = useState(null);
  const [geometryHelix, setGeometryHelix] = useState(null);

  // Utilisation de useEffect pour vérifier quand le modèle est chargé
  useEffect(() => {
    if (fbx) {
        console.log(fbx)
      // Vous devez explorer le modèle FBX pour récupérer les géométries que vous souhaitez
      const circle = fbx.getObjectByName("PUSHILIN_Plane_Circle000");
      const helixGeometry = fbx.getObjectByName("PUSHILIN_Plane_Helix");

      if (circle) {
        setGeometryCircle(circle.geometry);
      }

      if (helixGeometry) {
        setGeometryHelix(helixGeometry.geometry);
      }
    }
  }, [fbx]); // Ne se déclenche que lorsque le modèle est chargé

  useFrame((_state, delta) => {
    if (helix.current) {
      helix.current.rotation.x += delta * HELIX_SPEED; // Animation du modèle
    }
  });

  if (!geometryCircle || !geometryHelix) {
    return null; // Retourne rien tant que les géométries ne sont pas chargées
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={geometryCircle} // Utilisation de la géométrie de l'objet récupéré
        material={fbx.materials.plane} // Utilisation du matériau du modèle FBX
      />
      <mesh
        ref={helix}
        geometry={geometryHelix}
        material={fbx.materials.plane}
        position={[1.09, 0.23, 0]}
      />
    </group>
  );
}

useFBX.preload("./models/airplane/Happy.fbx"); // Préchargement du fichier FBX
