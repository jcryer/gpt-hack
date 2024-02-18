import { gsap } from 'gsap';


const animateTitle = () => {
    const chars = document.querySelectorAll(".text");
  
    // Set initial colors
    const colors = ["#8e44ad", "#3498db", "#9b59b6", "#2980b9", "#8e44ad", "#3498db"];
    chars.forEach((char, index) => {
      gsap.set(char, { color: colors[index % colors.length] });
    });
  
    // Create a single timeline for the drop effect
    const dropTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
  
    chars.forEach((char, index) => {
      dropTimeline.fromTo(char, 
        { opacity: 0, y: -20 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "elastic.out(1, 0.3)", 
          delay: index * 0.1
        }, 0) // Start all animations at the same initial time
        .to(char, {
          opacity: 0,
          y: -20,
          duration: 1,
          ease: "power2.in",
          delay: index * 0.1 + 2
        }, 0); // Add the drop effect to the same timeline
    });
  
    // Looping color change animation with new colors
    gsap.to(chars, {
      color: "#9b59b6", // Light Purple
      duration: 2,
      ease: "sine.inOut",
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true
      }
    });
  };
  
  
export default animateTitle;
