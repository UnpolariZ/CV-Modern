import { useFBX } from "@react-three/drei"; // Utilisation de useFBX pour charger un modèle FBX 
import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { AnimationMixer } from "three"; // Importation de AnimationMixer pour l'animation

export function Cloud({ opacity, ...props }) {
  const fbxHappy = useFBX("./models/cloud/Happy.fbx"); // Chargement du modèle Happy
  const fbxTalking = useFBX("./models/cloud/Talking.fbx"); // Chargement du modèle Waving

  const mixerRef = useRef();
  const [currentAnimation, setCurrentAnimation] = useState(fbxHappy); // Animation initiale

  useEffect(() => {
    if (currentAnimation) {
      console.log(currentAnimation); // Afficher la structure complète du modèle FBX pour explorer

      // Gérer l'animation si présente
      if (currentAnimation.animations && currentAnimation.animations.length > 0) {
        mixerRef.current = new AnimationMixer(currentAnimation);
        const action = mixerRef.current.clipAction(currentAnimation.animations[0]);
        currentAnimation.rotateY(-0.1)
        fbxTalking.rotateY(0.785)
        action.play();
      }
    }
  }, [currentAnimation]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta); // Mettre à jour l'animation à chaque frame
    }
  });

  // Si le modèle FBX est chargé, on le rend
  if (!currentAnimation) {
    return null; // Retourne rien si le modèle n'est pas encore chargé
  }

  const handleClick = () => {
    // Logique au clic
    console.log("Model clicked! Switching animation...");

    // Lors du clic, bascule entre les animations
    setCurrentAnimation(fbxTalking);
  };

  return (
    <group {...props} dispose={null}>
      {/* Affiche tout le modèle FBX */}
      <primitive object={currentAnimation} onClick={handleClick} />
    </group>
  );
}

useFBX.preload("./models/cloud/Happy.fbx");
useFBX.preload("./models/cloud/Talking.fbx");
