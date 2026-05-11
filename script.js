/* ============================================================
   1. DYNAMIC TAB TITLE
   ============================================================ */
let originalTitle = document.title;
window.addEventListener("blur", () => {
    const messages = ["Don't forget me! 👀", "Hire Jhaymes! 🚀", "Wait, come back! ✨"];
    document.title = messages[Math.floor(Math.random() * messages.length)];
});
window.addEventListener("focus", () => { document.title = originalTitle; });

/* ============================================================
   2. PROJECT DATA (Database)
   ============================================================ */
const projectData = {
    "AGELESS CARE 2.0": {
        isCaseStudy: true,
        tagline: "Native Android Engineering for Senior Citizen Welfare",
        mockupImages: ["ageless-mockup1.jpg", "ageless-mockup2.jpg", "ageless-mockup3.jpg","ageless-mockup4.jpg","ageless-mockup5.jpg","ageless-mockup6.jpg"], 
        problem: "Existing healthcare apps are often too complex for senior citizens.",
        solution: "A high-performance native Android application using Java and Firebase.",
        features: ["Native Java", "Firebase Auth", "SOS Integration", "High-Contrast UI"],
        challenge: "Developing natively in Java required strict memory management."
    },
    "INTELLIFIT": {
        isCaseStudy: true,
        tagline: "AI-Powered Home Workout Recommendation System",
        mockupImages: ["intellifit1.jpg", "intellifit2.jpg", "intellifit3.jpg", "intellifit4.jpg", "intellifit5.jpg"], 
        problem: "Varsity players struggle to maintain condition without sport-specific guidance.",
        solution: "A mobile-responsive system using a stochastic recommendation engine.",
        features: ["AI Personalization", "Discipline Tracking", "BMI Analysis", "Flask/Firebase"],
        challenge: "Engineered entirely on Android via Termux."
    },
    "AG BOXING GYM": {
        isCaseStudy: true,
        tagline: "Real-time Inventory Management for Modern Gyms",
        mockupImages: ["agMockup.jpg", "agMockup2.jpg"], // MOCKUPS PRESERVED
        problem: "Manual tracking of gym equipment often leads to lost items.",
        solution: "A cloud-based inventory system using Firebase for real-time updates.",
        features: ["Real-time Sync", "Inventory CRUD", "Equipment Stock Management"],
        challenge: "Integrating Firebase required handling real-time data listeners."
    },
    "LONGBU": {
        isCaseStudy: true,
        tagline: "Immersive 3D Horror Environment in Unity",
        mockupImages: ["longbuMockup.jpg", "longbuMockup2.jpg"], // MOCKUPS PRESERVED
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
        mockupImages: ["https://images.unsplash.com/photo-1510511459019-5dee667ff58b?w=600"], // Palitan mo ng actual screenshots ng Command Center mo
        problem: "Managing OJT hours at Tiger Global while simultaneously finishing a Native Android Capstone can be overwhelming without a structured timeline.",
        solution: "A web-based 'Command Center' with a real-time OJT departure countdown and Firebase-synced daily objectives to ensure 100% discipline.",
        features: ["10:30 AM Departure Timer", "Firebase Real-time Sync", "Multi-device Persistence", "Night Protocol Management"],
        challenge: "Synchronizing data across mobile and desktop environments to maintain a consistent 'Battle Plan' throughout the day."
    }
};

/* ============================================================
   3. MODAL LOGIC (Taga-bukas at Taga-fill)
   ============================================================ */
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-button");

document.addEventListener('click', function(e) {
    const clickedBtn = e.target.closest('.btn-small');
    if (!clickedBtn) return;

    const projectCard = clickedBtn.closest('.project-card');
    
    let title = projectCard.querySelector('h3').innerText.toUpperCase().trim();
    title = title.replace('ONGOING', '').trim(); 

    if (projectData[title]) {
        const data = projectData[title];
        document.getElementById("modalTitle").innerText = title;
        const modalBody = document.querySelector(".modal-body");
        
        if (data.isCaseStudy) {
            let imagesHTML = "";
            data.mockupImages.forEach(imgSrc => {
                imagesHTML += `<div class="modal-mockup"><img src="${imgSrc}" class="mockup-img"></div>`;
            });
            modalBody.innerHTML = `
                <p class="case-tagline" style="color:var(--primary); font-weight:bold; text-align:center; margin-bottom:20px;"><em>"${data.tagline}"</em></p>
                <div class="mockup-gallery">${imagesHTML}</div>
                <div class="case-section" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; border-left:4px solid var(--primary); margin-bottom:20px;">
                    <h4 style="color:var(--primary); margin-bottom:10px;">The Problem</h4>
                    <p style="color:var(--text-secondary); font-size:0.9rem;">${data.problem}</p>
                </div>
                <div class="case-section" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; border-left:4px solid var(--primary); margin-bottom:20px;">
                    <h4 style="color:var(--primary); margin-bottom:10px;">Our Solution</h4>
                    <p style="color:var(--text-secondary); font-size:0.9rem;">${data.solution}</p>
                </div>
                ${data.challenge ? `<div class="case-section" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; border-left:4px solid var(--primary); margin-bottom:20px;"><h4 style="color:var(--primary); margin-bottom:10px;">Engineering Challenge</h4><p style="color:var(--text-secondary); font-size:0.9rem;">${data.challenge}</p></div>` : ''}
                <h4>Key Features:</h4><ul id="modalFeatures" style="padding-left:20px; margin-top:10px; color:var(--text-secondary);"></ul>
            `;
        } else {
            modalBody.innerHTML = `
                <p id="modalDescription" style="margin-bottom:20px; color:var(--text-secondary);">${data.desc}</p>
                <h4>Key Features:</h4><ul id="modalFeatures" style="padding-left:20px; margin-top:10px; color:var(--text-secondary);"></ul>
            `;
        }

        const featuresList = document.getElementById("modalFeatures");
        data.features.forEach(feat => {
            let li = document.createElement("li");
            li.innerText = feat;
            li.style.marginBottom = "8px";
            featuresList.appendChild(li);
        });

        // Special Actions para sa specific apps
        if (title === "SMART TO-DO") addModalButton(featuresList, "SmartToDo/index.html", 'Try the App');
        if (title === "LONGBU") addModalButton(featuresList, "https://setty-69.itch.io/longboo", 'Play on Itch.io');
        if (title === "AG BOXING GYM") addModalButton(featuresList, "AG-Boxing-Gym/index.html", 'Open Gym App');
if (title === "COMMAND CENTER") {
    addModalButton(featuresList, "JHB-Command-Center/index.html", 'Execute Dashboard');
}
        modal.style.display = "block";
    }
});

function addModalButton(container, link, text) {
    let btn = document.createElement("a");
    btn.href = link;
    if (link.startsWith('http')) btn.target = "_blank";
    btn.innerText = text;
    btn.className = "btn";
    btn.style.display = "block";
    btn.style.marginTop = "20px";
    btn.style.textAlign = "center";
    btn.style.textDecoration = "none";
    container.appendChild(btn);
}

if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

/* ============================================================
   4. TYPEWRITER EFFECT
   ============================================================ */
const typewriterElement = document.getElementById("typewriter");
const htmlContent = 'ENGINEERING <span class="highlight">SOLUTIONS</span><br>WITH TECHNICAL <span class="highlight">GRIT</span>.';
let charIndex = 0;

function type() {
    if (typewriterElement && charIndex < htmlContent.length) {
        typewriterElement.classList.add("typing");
        if (htmlContent.charAt(charIndex) === "<") {
            charIndex = htmlContent.indexOf(">", charIndex) + 1;
        } else {
            charIndex++;
        }
        typewriterElement.innerHTML = htmlContent.slice(0, charIndex);
        setTimeout(type, 70);
    } else {
        typewriterElement.classList.remove("typing");
    }
}

/* ============================================================
   5. FILTER & SMOOTH SCROLL INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 500);
    if(typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
});

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) ? 'flex' : 'none';
        });
    });
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});