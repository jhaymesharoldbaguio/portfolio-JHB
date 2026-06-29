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
   4. MODAL LOGIC — PREMIUM SIDE BY SIDE
   ============================================================ */
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-button");

// Update HTML structure ng modal
const modalElement = document.getElementById("projectModal");
modalElement.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <div class="modal-left" id="modalLeft"></div>
        <div class="modal-right" id="modalRight"></div>
    </div>
`;

document.addEventListener('click', function(e) {
    const clickedBtn = e.target.closest('.btn-small');
    if (!clickedBtn) return;

    const projectCard = clickedBtn.closest('.project-card');
    if (!projectCard) return;

    const title = projectCard
        .querySelector('.project-name')
        .innerText.toUpperCase().trim();

    const projectTag = projectCard
        .querySelector('.project-tag')
        .innerText;

    if (!projectData[title]) return;

    const data = projectData[title];
    const modalLeft = document.getElementById("modalLeft");
    const modalRight = document.getElementById("modalRight");

    /* ---- LEFT SIDE: IMAGES ---- */
    if (data.mockupImages && data.mockupImages.length > 0) {
        let thumbsHTML = data.mockupImages.map((src, i) => `
            <div class="modal-thumb ${i === 0 ? 'active' : ''}" 
                 data-index="${i}">
                <img src="${src}" alt="Mockup ${i + 1}">
            </div>
        `).join('');

        modalLeft.innerHTML = `
            <img 
                src="${data.mockupImages[0]}" 
                class="modal-main-image" 
                id="modalMainImg"
                alt="${title}"
            >
            ${data.mockupImages.length > 1 ? `
            <div class="modal-thumbnails">
                ${thumbsHTML}
            </div>` : ''}
        `;

        // Thumbnail click logic
        modalLeft.querySelectorAll('.modal-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const idx = parseInt(thumb.getAttribute('data-index'));
                document.getElementById('modalMainImg').src = data.mockupImages[idx];
                modalLeft.querySelectorAll('.modal-thumb')
                    .forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });

    } else {
        modalLeft.innerHTML = `
            <div class="modal-no-image">
                <span>NO<br>PREVIEW<br>AVAILABLE</span>
            </div>
        `;
    }

    /* ---- RIGHT SIDE: DETAILS ---- */
    if (data.isCaseStudy) {
        // Case study layout
        let challengeHTML = data.challenge ? `
            <div class="modal-case-item">
                <h4>Engineering Challenge</h4>
                <p>${data.challenge}</p>
            </div>
        ` : '';

        let actionBtn = '';
        if (title === "SMART TO-DO") {
            actionBtn = `<a href="SmartToDo/index.html" class="modal-action-btn">Try the App →</a>`;
        } else if (title === "LONGBU") {
            actionBtn = `<a href="https://setty-69.itch.io/longboo" target="_blank" class="modal-action-btn">Play on Itch.io →</a>`;
        } else if (title === "AG BOXING GYM") {
            actionBtn = `<a href="AG-Boxing-Gym/index.html" class="modal-action-btn">Open Gym App →</a>`;
        } else if (title === "COMMAND CENTER") {
            actionBtn = `<a href="JHB-Command-Center/index.html" class="modal-action-btn">Execute Dashboard →</a>`;
        }

        let featuresHTML = data.features.map(f => 
            `<li>${f}</li>`
        ).join('');

        modalRight.innerHTML = `
            <div class="modal-header">
                <span class="modal-tag">${projectTag}</span>
                <h2 class="modal-title">${title}</h2>
                <p class="modal-tagline">${data.tagline}</p>
            </div>

            <div class="modal-case-block">
                <div class="modal-case-item">
                    <h4>The Problem</h4>
                    <p>${data.problem}</p>
                </div>
                <div class="modal-case-item">
                    <h4>The Solution</h4>
                    <p>${data.solution}</p>
                </div>
                ${challengeHTML}
            </div>

            <div>
                <p class="modal-features-title">Key Features</p>
                <ul class="modal-features-list">
                    ${featuresHTML}
                </ul>
            </div>

            ${actionBtn}
        `;

    } else {
        // Simple layout
        let featuresHTML = data.features.map(f => 
            `<li>${f}</li>`
        ).join('');

        modalRight.innerHTML = `
            <div class="modal-header">
                <span class="modal-tag">${projectTag}</span>
                <h2 class="modal-title">${title}</h2>
            </div>

            <p class="modal-simple-desc">${data.desc}</p>

            <div>
                <p class="modal-features-title">Key Features</p>
                <ul class="modal-features-list">
                    ${featuresHTML}
                </ul>
            </div>
        `;
    }

    // Re-attach close button
    document.querySelector('.close-button').onclick = closeModal;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = "hidden";
});

/* ---- CLOSE MODAL ---- */
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = "";
}

window.onclick = (e) => { 
    if (e.target === modal) closeModal(); 
};

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