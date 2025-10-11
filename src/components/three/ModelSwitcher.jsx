import React, {useRef} from 'react'
import {PresentationControls} from "@react-three/drei";
import MacBookModel16 from "../models/Macbook-16.jsx";
import MacBookModel14 from "../models/Macbook-14.jsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMashes =
    (group, opacity) => {
        if (!group) return;

        group.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                gsap.to(child.material, {opacity, duration: ANIMATION_DURATION})
            }
        })
    }

const moveGroup = (group, x) => {
    if(!group) return;

    gsap.to(group.position, {x, duration: ANIMATION_DURATION})
}

const ModelSwitcher = ({scale, isMobile}) => {
    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;
    const showLargeMacBook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    const smallMacBookRef = useRef();
    const largeMacBookRef = useRef();



    useGSAP(()=>{

        if(showLargeMacBook){

            moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacBookRef.current, 0);

            fadeMashes(smallMacBookRef.current, 0);
            fadeMashes(largeMacBookRef.current, 1);
        } else{
            moveGroup(smallMacBookRef.current, 0);
            moveGroup(largeMacBookRef.current, OFFSET_DISTANCE);

            fadeMashes(smallMacBookRef.current, 1);
            fadeMashes(largeMacBookRef.current, 0);
        }
    },[scale]);

    const controlsConfig = {
        // snap: true,
        speed: 1,
        zoom: 1,
        // polar: [-Math.PI, Math.PI],
        azimuth: [-Infinity, Infinity],
        config: {mass: 1, tension: 0, friction: 26}
    }

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacBookRef}>
                    <MacBookModel16 scale={isMobile ? 0.05 : 0.08}/>
                </group>
            </PresentationControls>

            <PresentationControls {...controlsConfig}>
                <group ref={smallMacBookRef}>
                    <MacBookModel14 scale={isMobile ? 0.03 : 0.06}/>
                </group>
            </PresentationControls>


        </>
    )
}
export default ModelSwitcher
