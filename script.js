// Function to initialize Locomotive Scroll and ScrollTrigger
function initLocoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true
    });

    // Sync ScrollTrigger with Locomotive Scroll
    locoScroll.on("scroll", ScrollTrigger.update);

    // Proxy methods for ScrollTrigger to use with "main" element
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });

    // Refresh ScrollTrigger and LocomotiveScroll on window updates
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
}

// Initialize Locomotive Scroll and ScrollTrigger
initLocoScroll();

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

// Cursor position variables
let viewportCenterX = viewport.offsetWidth / 2;
let viewportCenterY = viewport.offsetHeight / 2;
let cursorX = viewportCenterX;
let cursorY = viewportCenterY;
let maxX = 200;
let maxY = 260;

// Function to update cursor position
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

// Event listeners for cursor movement
viewport.addEventListener("mousemove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
});

viewport.addEventListener("mouseleave", () => {
    cursorX = viewportCenterX;
    cursorY = viewportCenterY;
});

// Start the cursor animation loop
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

// ScrollTrigger animations for page 3
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
});

// ScrollTrigger animations for page 4
let p4Container = document.querySelector(".page4 .wrapper .container");
let p4Projects = gsap.utils.toArray(".page4 .wrapper .container .projects");
gsap.to(p4Projects, {
    x: `-${p4Container.offsetWidth}`,
    scrollTrigger: {
        trigger: ".page4",
        end: `+=3000`,
        pin: true,
        scrub: 1,
        scroller: "main",
    }
});


// Toggle contactPage4 visibility
const contactButtonp4 = document.querySelector(".page4 .contactButton");
const contactPage4 = document.querySelector(".page4 .contact");
const p4Info = document.querySelector(".page4 .info");
let contactPage4Visible = false;

let tl2 = gsap.timeline();

// Animate contactButtonp4 with ScrollTrigger
gsap.to(contactButtonp4, {
    scrollTrigger: {
        trigger: ".page4",
        start: "bottom bottom",
        scrub: true,
        scroller: "main",
    },
    bottom: "10%",
    right: "6%"
});


// Toggle contactPage4 visibility
contactButtonp4.addEventListener("click", () => {
    if (!contactPage4Visible) {
        tl2.to(contactPage4, {
            bottom: "0%",
            duration: 0.8,
        })
            .to(p4Info, {
                bottom: "0%",
                duration: 0.8,
            });

        contactButtonp4.querySelector("h2").innerHTML = "&#10006;";
        contactButtonp4.querySelector("h2").style.color = "#fff";
        contactButtonp4.style.backgroundColor = "#141414";
    } else {
        tl2.to(p4Info, {
            bottom: "-20%",
            duration: 0.25,
        })
            .to(contactPage4, {
                bottom: "-88%",
                duration: 0.3,
            });

        contactButtonp4.querySelector("h2").innerHTML = "Let's talk";
        contactButtonp4.querySelector("h2").style.color = "black";
        contactButtonp4.style.backgroundColor = "#F3EFEF";
    }

    contactPage4Visible = !contactPage4Visible;
});


let icons = document.querySelector(".page4 .right .icons");
let button = document.querySelector(".page4 .right .button");

button.addEventListener("click", function () {
    icons.classList.toggle("show-icons");
});







const projectImgs = [
    {
        id: 1,
        image: [
            "https://mir-s3-cdn-cf.behance.net/projects/808/b24f12131665807.Y3JvcCwxNTAwLDExNzMsMCwxNjM.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4917d7131665807.6199b55ae2149.png"
        ],
    },
    {
        id: 2,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9e24ac163362995.63e4945bc2691.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8acbd9163362995.63e4945bc1852.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/13334c163362995.63e4945bc34c2.jpg"
        ],
    },
    {
        id: 3,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7906f5128692997.615bbd797a3a3.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/765b2c128692997.615bbd797a92d.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/dc8f5a128692997.615bbd797ae3b.jpg"
        ],
    },
    {
        id: 4,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cf68df153061101.63293ae2bc76a.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6f40c2153061101.63293ae2bf1f9.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/98a102153061101.63293ae2bd25e.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/70dd00153061101.632941b3373ca.jpg"
        ],
    },
    {
        id: 5,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/08ace2129851789.6173781c13e84.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/303eb9129851789.6173781c150be.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/844e21129851789.6173781c157bd.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ec5f5a129851789.6173781c1496b.jpg"
        ],
    },
    {
        id: 6,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bd9497125352189.61172fb14d3e0.jpg",
        ],
    },
    {
        id: 7,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/884767125352189.61172fb14db41.jpg",
        ],
    },
    {
        id: 8,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/44cb44125352189.61172fb14cc6f.png",
        ],
    },
    {
        id: 9,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/87d836132408047.61a85a1859708.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b82aae132408047.61a85a185accc.png",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/98f6c7132408047.61a85a185a48f.png"
        ],
    },
    {
        id: 10,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6b3ad8163374883.63e4bcc5dcb24.jpg",
        ],
    },
    {
        id: 11,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ac284a151170639.6307266cd68a0.jpg",
        ],
    },
    {
        id: 12,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7970f0151168409.63071e4143534.jpg",
        ],
    },
    {
        id: 13,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5417fd151167357.63071b1a5d25d.jpg",
        ],
    },
    {
        id: 14,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/899b65125864085.61222647ce0df.png",
        ],
    },
    {
        id: 15,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/40fc7e126509697.612ee59491305.jpg",
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/eb5717126509697.612ee59490dbe.jpg",
        ],
    },
    {
        id: 16,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/06c527125864085.61222647ce54d.jpg",
        ],
    },
    {
        id: 17,
        image: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d4511f125864085.61222647ced57.png",
        ],
    },
];






const popup = document.querySelector(".popup");
const popupImg = document.getElementById("popupImg");
const prevImgButton = document.getElementById("prevImg");
const nextImgButton = document.getElementById("nextImg");
const closeButton = document.getElementById("closeButton");

console.log(closeButton);

let currentImageIndex = 0;
let projectImages; // Define the projectImages variable here

function showPopupImage(imageSrc) {
    popupImg.src = imageSrc;
}

function openPopup() {
    currentImageIndex = 0;
    showPopupImage(projectImages.image[currentImageIndex]);
    popup.style.display = "block";
}

function closePopup() {
    popup.style.display = "none";
}

projects.forEach(project => {
    project.addEventListener("click", () => {
        projectImages = projectImgs.find(item => item.id === parseInt(project.getAttribute("data-project-id")));
        if (projectImages) {
            openPopup();
        }
    });
});

prevImgButton.addEventListener("click", () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showPopupImage(projectImages.image[currentImageIndex]);
    }
});

nextImgButton.addEventListener("click", () => {
    if (currentImageIndex < projectImages.image.length - 1) {
        currentImageIndex++;
        showPopupImage(projectImages.image[currentImageIndex]);
    }
});

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        closePopup();
    }
});



closeButton.addEventListener("click" , () => {
    closePopup();
})