/**
 * CSK PROJECT - CENTRAL LOGIC ENGINE
 * Handles: Countdown, Scroll-Triggered Stats, Player Comparison, & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NEXT MATCH COUNTDOWN TIMER ---
    function updateCountdown() {
        const targetDate = new Date("March 22, 2026 20:00:00").getTime();
        const now = new Date().getTime();
        const gap = targetDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        if (document.getElementById('days')) {
            document.getElementById('days').innerText = Math.max(0, Math.floor(gap / day)).toString().padStart(2, '0');
            document.getElementById('hours').innerText = Math.max(0, Math.floor((gap % day) / hour)).toString().padStart(2, '0');
            document.getElementById('mins').innerText = Math.max(0, Math.floor((gap % hour) / minute)).toString().padStart(2, '0');
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // --- 2. SMART ANIMATED COUNTERS (Intersection Observer) ---
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        counter.innerText = '0';
        const target = +counter.getAttribute('data-target');
        const increment = target / 50;

        const update = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}`;
                setTimeout(update, 30);
            } else {
                counter.innerText = target;
            }
        };
        update();
    };

    // Only start animation when the user scrolls to the stats section
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    counters.forEach(c => observer.observe(c));

    // --- 3. PLAYER COMPARISON DATA & LOGIC ---
    const playerData = {
        msd: {
            name: "MS Dhoni",
            role: "Legend / Wicketkeeper",
            avatar: "🦁",
            runs: 5082,
            sr: 135.9,
            sixes: 239
        },
        rutu: {
            name: "Ruturaj Gaikwad",
            role: "Captain / Opener",
            avatar: "⚡",
            runs: 2107,
            sr: 145.2,
            sixes: 85
        },
        jadeja: {
            name: "Ravindra Jadeja",
            role: "All Rounder",
            avatar: "🗡️",
            runs: 2776,
            sr: 128.6,
            sixes: 102
        }
    };

    // Expose to window so HTML onchange can see it
    window.comparePlayers = () => {
        const p1Key = document.getElementById('p1-select').value;
        const p2Key = document.getElementById('p2-select').value;

        const p1 = playerData[p1Key];
        const p2 = playerData[p2Key];

        // Update P1 UI
        document.getElementById('p1-name').innerText = p1.name;
        document.getElementById('p1-role').innerText = p1.role;
        document.getElementById('p1-avatar').innerText = p1.avatar;
        document.getElementById('p1-stat-runs').innerText = p1.runs;
        document.getElementById('p1-stat-sr').innerText = p1.sr;
        document.getElementById('p1-stat-six').innerText = p1.sixes;

        // Update P2 UI
        document.getElementById('p2-name').innerText = p2.name;
        document.getElementById('p2-role').innerText = p2.role;
        document.getElementById('p2-avatar').innerText = p2.avatar;
        document.getElementById('p2-stat-runs').innerText = p2.runs;
        document.getElementById('p2-stat-sr').innerText = p2.sr;
        document.getElementById('p2-stat-six').innerText = p2.sixes;
    };

    // Initialize comparison if the selects exist on the current page
    if (document.getElementById('p1-select')) {
        window.comparePlayers();
    }

    // --- 4. DARK MODE TOGGLE ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const body = document.getElementById('body');
            body.classList.toggle('dark-mode');
            const icon = themeBtn.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }
});

// --- 5. GLOBAL INTERACTIVE FUNCTIONS ---
function addComment() {
    const input = document.getElementById('commentInput');
    const display = document.getElementById('commentDisplay');
    
    if (input && display && input.value.trim() !== "") {
        const newMsg = document.createElement('div');
        newMsg.className = "bg-blue-800/50 p-3 rounded-lg animate-fade-in border-l-4 border-yellow-400 mb-2 text-white text-sm";
        newMsg.innerHTML = `<strong>Fan:</strong> ${input.value}`;
        display.prepend(newMsg);
        input.value = "";
    }
}

function vote(player) {
    const playerName = player === 'MSD' ? "MS Dhoni" : "Ruturaj Gaikwad";
    alert(`Whistle Podu! 🦁 Your vote for ${playerName} has been recorded!`);
}

// --- SQUAD PAGE INTERACTIVITY ---
const squadCards = document.querySelectorAll('.player-card');
squadCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = "rgba(250, 204, 21, 0.5)";
    });
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = "rgba(255, 255, 255, 0.1)";
    });
});