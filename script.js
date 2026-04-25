/* ============================================================
   1. CONTACT BUTTON ALERT
   ============================================================ */
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', function() {
        alert('Thank you for reaching out! I will reply soon.');
    });
}

/* ============================================================
   2. SMOOTH SCROLLING PARA SA NAVBAR
   ============================================================ */
document.querySelectorAll('.nav-links a').forEach(anchor => {
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
   3. DARK/LIGHT MODE TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    const icon = themeToggle?.querySelector('i');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
}

/* ============================================================
   4. PROJECT DATA (Database ng mga Projects)
   - Tandaan: ALL CAPS ang keys para mag-match sa HTML h3 text.
   ============================================================ */
const projectData = {
    "AGELESS CARE": {
        isCaseStudy: true,
        tagline: "Bridging the Digital Gap for San Pedro's Seniors",
        mockupImages: ["ageless-mockup1.jpg", "ageless-mockup2.jpg", "ageless-mockup3.jpg"], 
        problem: "Many senior citizens in San Pedro struggle with complicated mobile interfaces and declining eyesight when seeking healthcare.",
        solution: "A mobile-first application with high-contrast UI, simplified navigation, and a one-tap Emergency SOS system.",
        features: ["One-Tap Emergency SOS", "Local Health Center Directory", "High-Contrast UI Mode", "Simplified Navigation"]
    },
    "KAFFEIVIN COFFEE SHOP": {
        desc: "A management system built with PHP and MySQL to handle daily coffee shop operations.",
        features: ["Admin Dashboard", "Inventory Tracking", "Order Logging", "PHP-MySQL Integration"]
    },
    "PET CARE CENTER": {
        desc: "A responsive website dedicated to pet services and e-commerce presentation.",
        features: ["Service Booking", "Product Gallery", "Responsive Design", "User-friendly Navigation"]
    },
    "SMART TO-DO LIST": {
        desc: "A web app that saves your tasks locally in the browser using JavaScript and LocalStorage.",
        features: ["Local Storage (Auto-save)", "Add/Delete Tasks", "Task Completion Toggle", "Mobile Optimized"]
    },
    "LONGBU: 3D HORROR GAME": {
        desc: "A collaborative 3D horror game project developed with a team. It features atmospheric environments.",
        features: ["3D Environment Design", "C# Scripting", "Unity Engine Development", "Atmospheric Lighting"]
    }, 
    "AG BOXING GYM": {
        desc: "A professional gym management tool specifically designed for AG Boxing Gym. This app uses Google Firebase to manage inventory and equipment stocks in real-time.",
        features: ["Real-time Data Syncing (Firebase)", "Inventory CRUD", "Equipment Stock Management", "Mobile-Responsive Admin Panel"]
    },
    "INTELLIFIT": {
        isCaseStudy: true,
        tagline: "AI-Powered Home Workout Recommendation System for Varsity Student-Athletes",
        mockupImages: ["intellifit1.jpg", "intellifit2.jpg", "intellifit3.jpg", "intellifit4.jpg", "intellifit5.jpg"], 
        problem: "Varsity players struggle to maintain peak physical condition outside of official training without sport-specific guidance tailored to their BMI.",
        solution: "A mobile-responsive system using a stochastic engine to generate sport-specific drills, track discipline, and monitor health through color-coded BMI analysis.",
        features: ["AI-Driven Personalization", "Real-time Discipline Tracking", "Athlete Health Analysis", "Sport-Specific Knowledge Base", "Android-based Development"],
        challenge: "The entire full-stack system was engineered using only an Android device via Termux and Acode, proving mobile-only high-level engineering is possible."
    }
};

/* ============================================================
   5. MODAL LOGIC (Taga-bukas at Taga-fill ng popup)
   ============================================================ */
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-button");

document.querySelectorAll('.btn-small').forEach(button => {
    button.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        const title = projectCard.querySelector('h3').innerText.toUpperCase().trim();

        if (projectData[title]) {
            const data = projectData[title];
            document.getElementById("modalTitle").innerText = title;
            const modalBody = document.querySelector(".modal-body");
            
            if (data.isCaseStudy) {
                // Layout para sa Case Studies (Ageless Care & Intellifit)
                let imagesHTML = "";
                data.mockupImages.forEach(imgSrc => {
                    imagesHTML += `<div class="modal-mockup"><img src="${imgSrc}" class="mockup-img"></div>`;
                });

                modalBody.innerHTML = `
                    <p class="case-tagline"><em>"${data.tagline}"</em></p>
                    <div class="mockup-gallery">${imagesHTML}</div>
                    <div class="case-section">
                        <h4><i class="fas fa-exclamation-circle"></i> The Problem</h4>
                        <p>${data.problem}</p>
                    </div>
                    <div class="case-section">
                        <h4><i class="fas fa-check-circle"></i> Our Solution</h4>
                        <p>${data.solution}</p>
                    </div>
                    ${data.challenge ? `
                    <div class="case-section challenge-box">
                        <h4><i class="fas fa-tools"></i> The Engineering Challenge</h4>
                        <p><strong>${data.challenge}</strong></p>
                    </div>` : ''}
                    <h4>Key Features:</h4>
                    <ul id="modalFeatures"></ul>
                `;
            } else {
                // Default Layout para sa regular projects
                modalBody.innerHTML = `
                    <p id="modalDescription">${data.desc}</p>
                    <h4>Key Features:</h4>
                    <ul id="modalFeatures"></ul>
                `;
            }

            // Populate features list
            const featuresList = document.getElementById("modalFeatures");
            data.features.forEach(feat => {
                let li = document.createElement("li");
                li.innerText = feat;
                featuresList.appendChild(li);
            });

            // Special Buttons Integration
            if (title === "SMART TO-DO LIST") {
                addModalButton(featuresList, "SmartToDo/index.html", '<i class="fas fa-play-circle"></i> Try the App');
            }
            if (title === "LONGBU: 3D HORROR GAME") {
                addModalButton(featuresList, "https://setty-69.itch.io/longboo", '<i class="fas fa-gamepad"></i> Play on Itch.io');
            }
            if (title === "AG BOXING GYM") {
                addModalButton(featuresList, "AG-Boxing-Gym/index.html", '<i class="fas fa-dumbbell"></i> Open Gym App');
            }

            modal.style.display = "block";
        }
    });
});

/* Helper Function para sa Modal Buttons */
function addModalButton(container, link, htmlContent) {
    let btn = document.createElement("a");
    btn.href = link;
    if (link.startsWith('http')) btn.target = "_blank";
    btn.innerHTML = htmlContent;
    btn.className = "btn";
    btn.style.display = "block";
    btn.style.marginTop = "20px";
    btn.style.textAlign = "center";
    btn.style.textDecoration = "none";
    container.appendChild(btn);
}

if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

/* ============================================================
   6. PROJECT FILTER LOGIC
   ============================================================ */
const filterButtons = document.querySelectorAll('.filter-btn');
const allProjectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        allProjectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});