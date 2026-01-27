import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect } from "react";

gsap.registerPlugin(useGSAP, TextPlugin);
const Welcome = () => {
    const boxRef = useRef(null); // Ref for the div element
    const textRef = useRef(null); // Ref for the text
    const mainRef = useRef(null)
    useEffect(()=>{
        sessionStorage.setItem("UserActive",true)
    })
    useGSAP(() => {
        let tl = gsap.timeline({ paused: true })
        tl.set(boxRef.current, {
            y: -600
        })
        tl.to(boxRef.current, {
            y: 0,
            ease: "bounce.out",
            duration: 1.5,
            onComplete: function () {
                // After bounce, fit the box to the viewport
                var scaleFactor = Math.min(window.innerWidth, window.innerHeight)
                gsap.to(boxRef.current, {
                    ease: "power2.out", // Smooth easing for scaling
                    duration: 2, // Duration to position the box after bounce
                    scale: scaleFactor,
                    transformOrigin: "50% 50%", // Ensure centering
                });
            },
        })
        tl.to(textRef.current, {
            delay: 0.3,
            duration: 2.5, // Duration for typing
            text: "Welcome to Expense Tracker", // The text to type out
            ease: "power1.out", // Optional easing
        });
        tl.to(mainRef.current, {
            display:"none",
            duration: 0.8,
            onComplete: () =>{mainRef.current.remove()},
        });

        if ("requestIdleCallback" in window) {
            requestIdleCallback(() => tl.play());
        } else {
            setTimeout(() => tl.play(), 100); // fallback
        }
        // return () => observer.disconnect(); // cleanup

    }, {})
    return (
        <main ref={mainRef} className="fixed inset-0 z-50 bg-gray-100  h-screen w-screen flex items-center justify-center overflow-hidden ">
            <div ref={boxRef} className="absolute  h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl ">

            </div>
            <h1 ref={textRef} className="text-4xl font-serif relative font-semibold text-center text-white">
                {/* Text will be animated here */}
            </h1>
        </main>
    )
}

export default Welcome