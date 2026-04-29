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
   2. MODAL LOGIC & DATA
   ============================================================ */
const projectData = {
    "AGELESS CARE": {
        isCaseStudy: true,
        tagline: "Native Android Engineering for Senior Citizen Welfare",
        mockupImages: ["ageless-mockup1.jpg", "ageless-mockup2.jpg", "ageless-mockup3.jpg"], 
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
        isCaseStudy: true, // ETO ANG KAILANGAN para lumabas ang gallery
        tagline: "Real-time Inventory Management for Modern Gyms",
        mockupImages: ["ageless-mockup1.jpg", "ageless-mockup2.jpg", "ageless-mockup3.jpg"],
        problem: "Manual tracking of gym equipment often leads to lost items and unmonitored stocks.",
        solution: "A cloud-based inventory system using Firebase to provide real-time updates and secure data management.",
        features: ["Real-time Sync", "Inventory CRUD", "Equipment Stock Management"],
        challenge: "Integrating Firebase required handling real-time data listeners to ensure stocks are updated across all devices instantly."
    },
    "LONGBU": {
      isCaseStudy: true,
        desc: "A collaborative 3D horror game project developed in Unity.",
        mockupImages: ["ageless-mockup1.jpg", "ageless-mockup2.jpg", "ageless-mockup3.jpg"],
        features: ["3D Environment", "C# Scripting", "Atmospheric Lighting"]
    },
    "KAFFEIVIN": {
        desc: "Coffee Shop management system built with PHP and MySQL.",
        features: ["Order Logging", "Inventory Tracking", "Admin Dashboard"]
    },
    "PET CARE": {
        desc: "E-commerce responsive UI for pet services and products.",
        features: ["Responsive Design", "Product Gallery", "Modern UI"]
    },
    "SMART TO-DO": {
    
        desc: "Productivity app with local persistence using JavaScript.",
        features: ["Local Storage", "Task Toggle", "Mobile Optimized"]
    }
};

const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-button");

// Taga-bukas ng Modal
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-small')) {
        const projectCard = e.target.closest('.project-card');
        const title = projectCard.querySelector('h3').innerText.toUpperCase().trim();

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
                    <p class="case-tagline"><em>"${data.tagline}"</em></p>
                    <div class="mockup-gallery">${imagesHTML}</div>
                    <div class="case-section"><h4>The Problem</h4><p>${data.problem}</p></div>
                    <div class="case-section"><h4>Our Solution</h4><p>${data.solution}</p></div>
                    <h4>Key Features:</h4><ul id="modalFeatures"></ul>
                `;
            } else {
                modalBody.innerHTML = `
                    <p id="modalDescription">${data.desc}</p>
                    <h4>Key Features:</h4><ul id="modalFeatures"></ul>
                `;
            }

            const featuresList = document.getElementById("modalFeatures");
            data.features.forEach(feat => {
                let li = document.createElement("li");
                li.innerText = feat;
                featuresList.appendChild(li);
            });

            // Special Buttons
            if (title === "SMART TO-DO") addModalButton(featuresList, "SmartToDo/index.html", 'Try the App');
            if (title === "LONGBU") addModalButton(featuresList, "https://setty-69.itch.io/longboo", 'Play on Itch.io');
            if (title === "AG BOXING GYM") addModalButton(featuresList, "AG-Boxing-Gym/index.html", 'Open Gym App');

            modal.style.display = "block";
        }
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
   3. PROJECT FILTER & SMOOTH SCROLL & AOS
   ============================================================ */
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

AOS.init({ duration: 1000, once: true });

/* =========================================
   8. SMART TYPEWRITER EFFECT (WITH AUTO-HIDE CURSOR)
   ========================================= */
const typewriterElement = document.getElementById("typewriter");
const htmlContent = 'ENGINEERING <span class="highlight">SOLUTIONS</span><br>WITH TECHNICAL <span class="highlight">GRIT</span>.';
let charIndex = 0;

function type() {
    if (charIndex < htmlContent.length) {
        // Idagdag ang class na "typing" para lumabas ang cursor
        typewriterElement.classList.add("typing");

        if (htmlContent.charAt(charIndex) === "<") {
            charIndex = htmlContent.indexOf(">", charIndex) + 1;
        } else {
            charIndex++;
        }
        
        typewriterElement.innerHTML = htmlContent.slice(0, charIndex);
        setTimeout(type, 70);
    } else {
        // ETO ANG MAGIC: Mawawala ang cursor pagtapos na ang typing
        typewriterElement.classList.remove("typing");
    }
}

window.addEventListener("load", () => {
    setTimeout(type, 500);
});