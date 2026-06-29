/* ============================================================
   1. DYNAMIC TAB TITLE
   ============================================================ */
let originalTitle = document.title;
window.addEventListener("blur", () => {
    const messages = [
        "Don't forget me! 👀", 
        "Hire Jhaymes! 🚀", 
        "Wait, come back! ✨"
    ];
    document.title = messages[Math.floor(Math.random() * messages.length)];
});
window.addEventListener("focus", () => { 
    document.title = originalTitle; 
});

/* ============================================================
   2. HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

/* ============================================================
   3. PROJECT DATA
   ============================================================ */
const projectData = {
    "AGELESS CARE 2.0": {
        isCaseStudy: true,
        tagline: "Native Android Engineering for Senior Citizen Welfare",
        mockupImages: [
            "ageless-mockup1.jpg", 
            "ageless-mockup2.jpg", 
            "ageless-mockup3.jpg",
            "ageless-mockup4.jpg",
            "ageless-mockup5.jpg",
            "ageless-mockup6.jpg"
        ],
        problem: "Existing healthcare apps are often too complex for senior citizens.",
        solution: "A high-performance native Android application using Java and Firebase.",
        features: ["Native Java", "Firebase Auth", "SOS Integration", "High-Contrast UI"],
        challenge: "Developing natively in Java required strict memory management."
    },
    "INTELLIFIT": {
        isCaseStudy: true,
        tagline: "AI-Powered Home Workout Recommendation System",
        mockupImages: [
            "intellifit1.jpg", 
            "intellifit2.jpg", 
            "intellifit3.jpg", 
            "intellifit4.jpg", 
            "intellifit5.jpg"
        ],
        problem: "Varsity players struggle to maintain condition without sport-specific guidance.",
        solution: "A mobile-responsive system using a stochastic recommendation engine.",
        features: ["AI Personalization", "Discipline Tracking", "BMI Analysis", "Flask/Firebase"],
        challenge: "Engineered entirely on Android via Termux."
    },
    "AG BOXING GYM": {
        isCaseStudy: true,
        tagline: "Real-time Inventory Management for Modern Gyms",
        mockupImages: ["agMockup.jpg", "agMockup2.jpg"],
        problem: "Manual tracking of gym equipment often leads to lost items.",
        solution: "A cloud-based inventory system using Firebase for real-time updates.",
        features: ["Real-time Sync", "Inventory CRUD", "Equipment Stock Management"],
        challenge: "Integrating Firebase required handling real-time data listeners."
    },
    "LONGBU": {
        isCaseStudy: true,
        tagline: "Immersive 3D Horror Environment in Unity",
        mockupImages: ["longbuMockup.jpg", "longbuMockup2.jpg"],
        problem: "Creating high-tension atmosphere in a mobile-optimized 3D environment.",
        solution: "Collaborative 3D horror game developed in Unity with optimized lighting.",
        features: ["3D Environment", "C# Scripting", "Unity Engine"],
        challenge: "Balancing high-quality lighting with mobile performance."
    },
    "KAFFEIVIN": {
        desc: "A management system built with PHP and MySQL to handle daily coffee shop operations.",
        features: ["Order Logging", "Inventory Tracking", "Admin Dashboard"]
    },
    "PET CARE": {
        desc: "A responsive website dedicated to pet services and e-commerce presentation.",
        features: ["Responsive Design", "Product Gallery", "Modern UI"]
    },
    "SMART TO-DO": {
        desc: "A web app that saves your tasks locally in the browser using JavaScript and LocalStorage.",
        features: ["Local Storage", "Task Toggle", "Mobile Optimized"]
    },
    "COMMAND CENTER": {
        isCaseStudy: true,
        tagline: "Strategic Productivity Dashboard for OJT & Capstone",
        mockupImages: [
            "https://images.unsplash.com/photo-1510511459019-5dee667ff58b?w=600"
        ],
        problem: "Managing OJT hours at Tiger Global while finishing a Native Android Capstone can be overwhelming without a structured timeline.",
        solution: "A web-based Command Center with real-time OJT departure countdown and Firebase-synced daily objectives.",
        features: [
            "10:30 AM Departure Timer", 
            "Firebase Real-time Sync", 
            "Multi-device Persistence", 
            "Night Protocol Management"
        ],
        challenge: "Synchronizing data across mobile and desktop environments to maintain a consistent Battle Plan."
    }
};

/* ============================================================
   4. MODAL LOGIC
   ============================================================ */
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-button");

document.addEventListener('click', function(e) {
    const clickedBtn = e.target.closest('.btn-small');
    if (!clickedBtn) return;

    const projectCard = clickedBtn.closest('.project-card');
    if (!projectCard) return;

    let title = projectCard.querySelector('.project-name').innerText.toUpperCase().trim();

    if (projectData[title]) {
        const data = projectData[title];
        document.getElementById("modalTitle").innerText = title;
        const modalBody = document.querySelector(".modal-body");

        if (data.isCaseStudy) {
            let imagesHTML = "";
            data.mockupImages.forEach(imgSrc => {
                imagesHTML += `
                    <div class="modal-mockup">
                        <img src="${imgSrc}" class="mockup-img" alt="${title}">
                    </div>`;
            });

            modalBody.innerHTML = `
                <p class="case-tagline">"${data.tagline}"</p>
                <div class="mockup-gallery">${imagesHTML}</div>
                <div class="case-section">
                    <h4>The Problem</h4>
                    <p>${data.problem}</p>
                </div>
                <div class="case-section">
                    <h4>The Solution</h4>
                    <p>${data.solution}</p>
                </div>
                ${data.challenge ? `
                <div class="case-section">
                    <h4>Engineering Challenge</h4>
                    <p>${data.challenge}</p>
                </div>` : ''}
                <h4 style="font-family:'Bebas Neue',sans-serif; 
                    letter-spacing:2px; font-size:1.2rem; 
                    margin-top:10px;">
                    Key Features
                </h4>
                <ul id="modalFeatures"></ul>
            `;
        } else {
            modalBody.innerHTML = `
                <p style="color:var(--text-secondary); 
                    margin-bottom:20px; line-height:1.8;">
                    ${data.desc}
                </p>
                <h4 style="font-family:'Bebas Neue',sans-serif; 
                    letter-spacing:2px; font-size:1.2rem;">
                    Key Features
                </h4>
                <ul id="modalFeatures"></ul>
            `;
        }

        const featuresList = document.getElementById("modalFeatures");
        data.features.forEach(feat => {
            let li = document.createElement("li");
            li.innerText = feat;
            featuresList.appendChild(li);
        });

        // Special Action Buttons
        if (title === "SMART TO-DO") {
            addModalButton(featuresList, "SmartToDo/index.html", 'Try the App');
        }
        if (title === "LONGBU") {
            addModalButton(featuresList, "https://setty-69.itch.io/longboo", 'Play on Itch.io');
        }
        if (title === "AG BOXING GYM") {
            addModalButton(featuresList, "AG-Boxing-Gym/index.html", 'Open Gym App');
        }
        if (title === "COMMAND CENTER") {
            addModalButton(featuresList, "JHB-Command-Center/index.html", 'Execute Dashboard');
        }

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
});

function addModalButton(container, link, text) {
    let btn = document.createElement("a");
    btn.href = link;
    if (link.startsWith('http')) btn.target = "_blank";
    btn.innerText = text;
    btn.className = "btn";
    btn.style.cssText = `
        display: block;
        margin-top: 20px;
        text-align: center;
        text-decoration: none;
    `;
    container.appendChild(btn);
}

// Close Modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

if (closeBtn) closeBtn.onclick = closeModal;
window.onclick = (e) => { if (e.target == modal) closeModal(); };
document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') closeModal(); 
});

/* ============================================================
   5. FILTER SYSTEM
   ============================================================ */
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        document.querySelectorAll('.project-card').forEach(card => {
            const category = card.getAttribute('data-category');
            const show = filterValue === 'all' || category === filterValue;

            if (show) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* ============================================================
   6. SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ============================================================
   7. AOS INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 1000, 
            once: true,
            offset: 100
        });
    }
});