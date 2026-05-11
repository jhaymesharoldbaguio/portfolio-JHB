// 1. Firebase Config (PASTE YOUR ACTUAL CONFIG HERE)
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

// 2. Countdown Logic (10:30 AM Departure)
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

// 3. Add Goal with "completed" status
const addBtn = document.getElementById('addBtn');
const goalInput = document.getElementById('goalInput');

addBtn.addEventListener('click', async () => {
    const objective = goalInput.value.trim();
    const category = document.getElementById('categorySelect').value;
    if (objective) {
        await db.collection("battle_plan").add({
            text: objective,
            cat: category,
            completed: false, // New field for archiving
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        goalInput.value = "";
    }
});

// 4. Read and Categorize (Active vs Accomplished)
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
                        <!-- TRASH BUTTON (Para sa aksidente) -->
                        <button onclick="deleteObjective('${doc.id}')" class="btn-trash" title="Delete">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        
                        <!-- CHECK/UNDO BUTTON -->
                        <button onclick="toggleGoal('${doc.id}', ${isDone})" class="action-btn" title="${isDone ? 'Undo' : 'Complete'}">
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

// 5. Toggle Status: Marks as Done or Reverts to Active
window.toggleGoal = async (id, currentStatus) => {
    await db.collection("battle_plan").doc(id).update({
        completed: !currentStatus
    });
};

window.deleteObjective = async (id) => {
    if (confirm("Remove this objective from the system?")) {
        try {
            await db.collection("battle_plan").doc(id).delete();
            console.log("Entry purged.");
        } catch (error) {
            console.error("Error purging entry: ", error);
        }
    }
};

startTimer();