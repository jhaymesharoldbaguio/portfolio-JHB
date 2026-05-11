// 1. Firebase Config (PASTE YOUR ACTUAL CONFIG HERE)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* =========================================
   NEW: OFFLINE PERSISTENCE ENGINE
   - Pinapagana ang app kahit walang internet.
   - I-se-save ang data sa browser cache.
   ========================================= */
db.enablePersistence()
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one tab at a time.
          console.warn('Persistence failed: Multiple tabs open.');
      } else if (err.code == 'unimplemented') {
          // The current browser doesn't support all of the features required to enable persistence
          console.warn('Persistence is not available in this browser.');
      }
  });

// 2. Countdown Logic (Departure 10:30 AM)
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

// 3. Add Goal with Instant Clear Logic
const addBtn = document.getElementById('addBtn');
const goalInput = document.getElementById('goalInput');

addBtn.addEventListener('click', async () => {
    const objective = goalInput.value.trim();
    const category = document.getElementById('categorySelect').value;

    if (objective) {
        // INSTANT UI FEEDBACK:
        // Burahin agad ang text sa screen para sa mabilis na feel
        goalInput.value = ""; 
        goalInput.focus(); 

        try {
            // I-push sa Cloud (o sa local cache kung offline)
            await db.collection("battle_plan").add({
                text: objective,
                cat: category,
                completed: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("System: Objective Deployed.");
        } catch (error) {
            console.error("Critical Error: ", error);
            // Revert text kung may matinding error
            goalInput.value = objective; 
            alert("System Error: Failed to sync.");
        }
    } else {
        alert("Please enter an objective first, Champ!");
    }
});

// 4. Read and Categorize (Real-time Snapshot)
db.collection("battle_plan").orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
        const goalsList = document.getElementById('goalsList');
        const completedList = document.getElementById('completedList');
        
        goalsList.innerHTML = "";
        completedList.innerHTML = "";

        snapshot.forEach((doc) => {
            const data = doc.data();
            const categoryClass = `cat-${data.cat}`;
            const isDone = data.completed;

            const html = `
                <div class="goal-item ${categoryClass} ${isDone ? 'done' : ''}">
                    <div class="goal-info">
                        <small>// ${data.cat.toUpperCase()}</small>
                        <p>${data.text}</p>
                    </div>
                    <div class="goal-actions">
                        <button onclick="deleteObjective('${doc.id}')" class="btn-trash" title="Delete">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button onclick="toggleGoal('${doc.id}', ${isDone})" class="action-btn">
                            <i class="fas ${isDone ? 'fa-undo' : 'fa-check'}"></i>
                        </button>
                    </div>
                </div>
            `;

            if (isDone) {
                completedList.innerHTML += html;
            } else {
                goalsList.innerHTML += html;
            }
        });
    });

// 5. Toggle Status (Done / Active)
window.toggleGoal = async (id, currentStatus) => {
    await db.collection("battle_plan").doc(id).update({
        completed: !currentStatus
    });
};

// 6. Delete Specific Objective
window.deleteObjective = async (id) => {
    if (confirm("Remove this objective from the system?")) {
        await db.collection("battle_plan").doc(id).delete();
    }
};

// 7. PURGE HISTORY LOGIC
const clearBtn = document.getElementById('clearAllBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', async () => {
        if (confirm("System Alert: Purge all accomplished operations? This cannot be undone.")) {
            try {
                const snapshot = await db.collection("battle_plan").where("completed", "==", true).get();
                if (snapshot.empty) return;

                const batch = db.batch();
                snapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();
                console.log("History Purged.");
            } catch (error) {
                console.error("Error purging history: ", error);
            }
        }
    });
}

startTimer();