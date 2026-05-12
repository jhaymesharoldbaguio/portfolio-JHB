// 1. Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// OFFLINE PERSISTENCE
db.enablePersistence().catch((err) => {
    console.warn("Persistence error:", err.code);
});

// 2. Countdown Logic (Daily 10:30 AM Departure)
function startTimer() {
    setInterval(() => {
        const now = new Date();
        const target = new Date();
        target.setHours(10, 30, 0);
        if (now > target) target.setDate(target.getDate() + 1);
        const diff = target - now;
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        document.getElementById('countdown').innerText = 
            `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

// 3. OJT Progress Core Logic
function updateOJTProgress(renderedHours) {
    const totalHours = 500;
    const percentage = (renderedHours / totalHours) * 100;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-percent').innerText = `${Math.round(percentage)}%`;
    document.getElementById('hour-count').innerText = `${renderedHours} / ${totalHours} HOURS RENDERED`;
}

// Sync with Firebase Stats
async function syncProgress() {
    const doc = await db.collection("ojt_stats").doc("current_progress").get();
    if (doc.exists) {
        updateOJTProgress(doc.data().hours);
    } else {
        await db.collection("ojt_stats").doc("current_progress").set({ hours: 0 });
        updateOJTProgress(0);
    }
}

// 4. Add Objective Logic
const addBtn = document.getElementById('addBtn');
const goalInput = document.getElementById('goalInput');

addBtn.addEventListener('click', async () => {
    const objective = goalInput.value.trim();
    const category = document.getElementById('categorySelect').value;

    if (objective) {
        goalInput.value = ""; // Instant clear
        goalInput.focus(); 
        try {
            await db.collection("battle_plan").add({
                text: objective,
                cat: category,
                completed: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            goalInput.value = objective; // Revert on error
            alert("Sync Failed!");
        }
    }
});

// 5. Real-time Rendering (Active & Completed)
db.collection("battle_plan").orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
        // 1. Linisin lahat ng buckets bago mag-render
        const buckets = {
            morning: document.getElementById('tasks-morning'),
            capstone: document.getElementById('tasks-capstone'),
            ojt: document.getElementById('tasks-ojt'),
            fitness: document.getElementById('tasks-fitness'),
            home: document.getElementById('tasks-home')
        };
        
        // Clear each bucket
        Object.values(buckets).forEach(b => b.innerHTML = "");
        document.getElementById('completedList').innerHTML = "";

        snapshot.forEach((doc) => {
            const data = doc.data();
            const isDone = data.completed;
            
            const html = `
                <div class="goal-item ${isDone ? 'done' : ''}">
                    <div class="goal-info">
                        <p>${data.text}</p>
                    </div>
                    <div class="goal-actions">
                        <button onclick="deleteObjective('${doc.id}')" class="btn-trash-mini"><i class="fas fa-trash-alt"></i></button>
                        <button onclick="toggleGoal('${doc.id}', ${isDone})" class="action-btn-mini">
                            <i class="fas ${isDone ? 'fa-undo' : 'fa-check'}"></i>
                        </button>
                    </div>
                </div>
            `;

            if (isDone) {
                document.getElementById('completedList').innerHTML += html;
            } else {
                // ETO ANG MAGIC: I-shoot sa tamang bucket base sa data.cat
                if (buckets[data.cat]) {
                    buckets[data.cat].innerHTML += html;
                }
            }
        });
    });

// 6. Global Functions (Delete/Toggle)
window.toggleGoal = (id, status) => db.collection("battle_plan").doc(id).update({ completed: !status });
window.deleteObjective = (id) => { if(confirm("Purge Objective?")) db.collection("battle_plan").doc(id).delete(); };

// 7. Clock Out / Add Hours
const clockOutBtn = document.getElementById('clockOutBtn');
clockOutBtn.addEventListener('click', async () => {
    const now = new Date();
    const startDate = new Date("2026-05-27");
    if (now < startDate) return alert("System Locked: OJT starts on May 27.");

    if (confirm("Log 8 hours for today's mission?")) {
        const docRef = db.collection("ojt_stats").doc("current_progress");
        const doc = await docRef.get();
        const newHours = (doc.data().hours || 0) + 8;
        await docRef.update({ hours: newHours });
        updateOJTProgress(newHours);
    }
});

// 8. Purge All Completed
const clearBtn = document.getElementById('clearAllBtn');
clearBtn.addEventListener('click', async () => {
    if (confirm("Purge Accomplished History?")) {
        const snapshot = await db.collection("battle_plan").where("completed", "==", true).get();
        const batch = db.batch();
        snapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
    }
});

// INITIALIZE SYSTEM
startTimer();
syncProgress();