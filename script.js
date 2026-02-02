// Custom text and configuration
const config = {
    questions: [
        {
            text: "Zombie Apocalypse! 🧟‍♂️ What am I doing?",
            options: [
                { text: "Leading the Army", isCorrect: true },
                { text: "Crying in the closet", isCorrect: false },
                { text: "Sacrificing you to save myself", isCorrect: false }
            ]
        },
        {
            text: "What is the ONE food you'd trade me for? 🍣",
            options: [
                { text: "Sushi", isCorrect: true },
                { text: "Chicken Nuggets", isCorrect: false },
                { text: "A single corn chip", isCorrect: false }
            ]
        },
        {
            text: "My annoying habit that you secretly love? 🤪",
            options: [
                { text: "Making Dad Jokes", isCorrect: true },
                { text: "Singing in the shower", isCorrect: false },
                { text: "Stealing the covers", isCorrect: false }
            ]
        },
        {
            text: "Who is the better kisser? 💋",
            options: [
                { text: "You! (Obviously)", isCorrect: true },
                { text: "Me (In my dreams)", isCorrect: false }
            ]
        }
    ],
    finalProposal: {
        text: "Will you be my Valentine? 🌹",
        yesBtn: "Yes I want to be your valentine ❤️",
        noBtn: "No :-("
    }
};

let currentStep = -1; // -1 is start screen, 0-3 are questions, 4 is final
let noClickCount = 0;

// Elements
const mainText = document.getElementById('main-text');
const subText = document.getElementById('sub-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const card = document.getElementById('card');

function nextStep() {
    currentStep++;
    updateUI();
}

function updateUI() {
    // Clear previous options
    optionsContainer.innerHTML = '';
    mainText.classList.remove('fade-in');
    void mainText.offsetWidth; // Trigger reflow to restart animation
    mainText.classList.add('fade-in');

    if (currentStep === 0) {
        // Start showing progress bar
        progressBarContainer.style.display = 'block';
    }

    if (currentStep < config.questions.length) {
        // We are in the questions phase
        const q = config.questions[currentStep];
        mainText.textContent = `Question ${currentStep + 1}`;
        subText.style.display = 'block';
        subText.textContent = q.text;

        // Update progress
        const progress = ((currentStep) / config.questions.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Create options
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn secondary-btn';
            btn.textContent = opt.text;
            btn.onclick = () => handleAnswer(opt.isCorrect);
            optionsContainer.appendChild(btn);
        });

    } else {
        // Final Proposal Phase
        showProposal();
    }
}

function handleAnswer(isCorrect) {
    // You could force correct answers, or just let them pass regardless (it's cuter/easier)
    // Let's just pass them for flow, sweet and simple
    nextStep();
}

function showProposal() {
    progressBar.style.width = '100%';
    mainText.textContent = config.finalProposal.text;
    subText.style.display = 'none'; // Hide subtext for cleaner look

    // Create Yes Button (but don't append yet)
    // We will create it here or just create it when needed. 
    // Let's just create the No button for now.

    // No Button
    const noBtn = document.createElement('button');
    noBtn.id = 'no-btn';
    noBtn.className = 'btn secondary-btn';
    noBtn.textContent = config.finalProposal.noBtn;

    // Add interactions to No button
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click on touch
        moveNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    optionsContainer.appendChild(noBtn);
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    noClickCount++;

    if (noClickCount === 2) {
        mainText.textContent = "You don't want? :(";

        // Check if Yes button exists, if not, add it!
        if (!document.getElementById('yes-btn')) {
            const yesBtn = document.createElement('button');
            yesBtn.id = 'yes-btn';
            yesBtn.className = 'btn primary-btn fade-in'; // Add fade-in animation
            yesBtn.textContent = config.finalProposal.yesBtn;
            yesBtn.style.fontSize = '1.5rem';
            yesBtn.onclick = handleYes;

            // Append to container
            optionsContainer.appendChild(yesBtn);
        }
    }
}

function handleYes() {
    const noBtn = document.getElementById('no-btn');
    if (noBtn) noBtn.remove(); // Remove the temptation

    const yesBtn = document.getElementById('yes-btn');
    yesBtn.textContent = "YAY! I Love You! ❤️";
    yesBtn.onclick = null; // Disable click

    mainText.textContent = "Best Valentine Ever! 🥰";

    // Show the photo
    const img = document.createElement('img');
    img.src = `us.png?t=${new Date().getTime()}`; // Prevent caching
    img.className = 'fade-in';
    img.style.maxWidth = '100%';
    img.style.borderRadius = '15px';
    img.style.marginTop = '20px';
    img.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    optionsContainer.appendChild(img);

    // Confetti explosion
    triggerConfetti();
    setInterval(triggerConfetti, 2000);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
    });
}
