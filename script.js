function loco() {

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();


}
loco();

// Select elements
const viewport = document.querySelector(".viewport");
const boxText = document.querySelector(".boxText h1");
const h3Text = document.querySelector(".boxText .h3Text");
const content = document.querySelector(".content");
const projects = document.querySelectorAll(".projects");
const flyingBox = document.querySelectorAll(".flyingBox");
const projectsImg = document.querySelectorAll(".projects img");

// Create a GSAP timeline
const tl1 = gsap.timeline();

// Animation for boxText and h3Text
tl1.to([boxText, h3Text], {
    y: "0%",
    duration: 1.5,
    stagger: 0.3,
    ease: "power2.inOut",
}, "first");

// Animation for viewport opacity
tl1.to(viewport, {
    opacity: 1,
    duration: 2.5,
    ease: "power2.inOut",
});




let viewportCenterX = viewport.offsetWidth / 2;
let viewportCenterY = viewport.offsetHeight / 2;

let cursorX = viewportCenterX;
let cursorY = viewportCenterY;

let maxX = 200;
let maxY = 260;

function updateCursor() {

    let positionX = viewportCenterX - cursorX;
    let positionY = viewportCenterY - cursorY;

    positionX = Math.min(Math.max(positionX, -maxX), maxX);
    positionY = Math.min(Math.max(positionY, -maxY), maxY);

    gsap.to(viewport, {
        x: positionX,
        y: positionY,
        duration: 1.5,
        ease: "power2.InOut",
    });

    requestAnimationFrame(updateCursor);
}

viewport.addEventListener("mousemove", (event) => {
    // Update the cursor position based on the mouse movement
    cursorX = event.clientX;
    cursorY = event.clientY;
});

viewport.addEventListener("mouseleave", () => {
    // Reset cursor position to the center when leaving the viewport
    cursorX = viewportCenterX;
    cursorY = viewportCenterY;
});

// Start the animation loop
updateCursor();




// Use ScrollTrigger to animate the .content element
gsap.to(content, {
    x: `-${content.offsetWidth}`,
    scrollTrigger: {
        trigger: ".page2",
        start: "top top",
        end: `+${content.offsetWidth}`,
        scroller: "main",
        scrub: 1.5,
        pin: true,
    }
});


// Iterate through each "projects" element and add animations
projects.forEach((project, index) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(flyingBox[index], { duration: 0.5, bottom: "11%", ease: "power2.out" });
    tl.to(flyingBox[index], { duration: 0.5, bottom: "10%", ease: "power2.in" });
    tl.to(flyingBox[index], { duration: 0.8, bottom: "11%", ease: "power2.in" });
    tl.to(flyingBox[index], { duration: 0.8, bottom: "10%", ease: "power2.in" });

    project.addEventListener("mouseover", () => {
        tl.play();
    });

    project.addEventListener("mouseleave", () => {
        tl.reverse();
    });
});



let p3Container = document.querySelector(".page3 .wrapper .container");
let p3Projects = gsap.utils.toArray(".page3 .wrapper .container .projects");


gsap.to(p3Projects, {
    x: `-${p3Container.offsetWidth}`,
    scrollTrigger: {
        trigger: ".page3",
        end: `+=3000`,
        pin: true,
        scrub: 1,
        scroller: "main",
    }
})




const contactButton = document.querySelector(".page3 .contactButton");
const contactPage = document.querySelector(".page3 .contact");
let contactPageVisible = false;

// Animate contactButton with ScrollTrigger
gsap.to(contactButton, {
    scrollTrigger: {
        trigger: ".page3",
        start: "bottom bottom",
        scrub: true,
        scroller: "main",
    },
    bottom: "10%",
    right: "6%"
});

// Toggle contactPage visibility
contactButton.addEventListener("click", () => {
    if (!contactPageVisible) {
        gsap.to(contactPage, {
            bottom: "0%",
            duration: 0.8,
        });

        contactButton.querySelector("h2").innerHTML = "&#10006;";
        contactButton.querySelector("h2").style.color = "#fff";
        contactButton.style.backgroundColor = "#141414";
    } else {
        gsap.to(contactPage, {
            bottom: "-88%",
            duration: 0.3,
        });

        contactButton.querySelector("h2").innerHTML = "Let's talk";
        contactButton.querySelector("h2").style.color = "black";
        contactButton.style.backgroundColor = "#F3EFEF";
    }

    contactPageVisible = !contactPageVisible;
});





let icons = document.querySelector(".right .icons");

let button = document.querySelector(".right .button");

button.addEventListener("click", function () {
    icons.classList.toggle("show-icons");
});