const questions = [

{
    id: "goal",
    image: "images/goal.jpg",
    question: "What is your primary wellness goal?",
    answers: [
        "Lose Weight",
        "Improve Energy",
        "Build Muscle",
        "Healthy Lifestyle"
    ]
},

{
    id: "age",
    image: "images/HLIFESHOPENGLAND.png",
    question: "How old are you?",
    answers: [
        "18-24",
        "25-34",
        "35-44",
        "45-54",
        "55+"
    ]
},
{
    id: "gender",
    image: "images/gender.png",
    question: "What is your gender?",
    answers: [
        "Male",
        "Female",
        "Prefer not to say"
    ]
},
{
    id: "height",
    image: "images/height.png",
    question: "What is your height?",
    answers: [
        "Under 160 cm",
        "160-169 cm",
        "170-179 cm",
        "180-189 cm",
        "190+ cm"
    ]
},
{
    id: "weight",
    image: "images/weight.png",
    question: "What is your weight?",
    answers: [
        "Under 60 kg",
        "60-69 kg",
        "70-79 kg",
        "80-89 kg",
        "90+ kg"
    ]
},
{
    id: "activity",
    image: "images/activity 2.png",
    question: "How active are you during a typical week?",
    answers: [
        "Sedentary",
        "Lightly active",
        "Moderately active",
        "Very active"
    ]
},
{
    id: "sleep",
    image: "images/sleep.png",
    question: "How many hours do you sleep on average each night?",
    answers: [
        "Less than 5 hours",
        "5-6 hours",
        "7-8 hours",
        "More than 8 hours"
    ]
},
{
    id: "diet",
    image: "images/health.png",
    question: "How would you describe your diet?",
    answers: [
        "Very healthy",
        "Mostly healthy",
        "Sometimes healthy",
        "Needs improvement"
    ]
},
{
    id: "stress",
    image: "images/stress.png",
    question: "How would you rate your daily stress level?",
    answers: [
        "Low",
        "Moderate",
        "High",
        "Very high"
    ]
},
{
    id: "hydration",
    image: "images/hydration.png",
    question: "How much water do you drink each day?",
    answers: [
        "Less than 1 liter",
        "1-2 liters",
        "2-3 liters",
        "More than 3 liters"
    ]
},
{
    id: "sitting",
    image: "images/sitting.png",
    question: "How many hours do you spend sitting each day?",
    answers: [
        "Less than 4 hours",
        "4-6 hours",
        "7-9 hours",
        "More than 9 hours"
    ]
},
{
    id: "smoking",
    image: "images/smoking.png",
    question: "Do you smoke?",
    answers: [
        "Never",
        "Occasionally",
        "Regularly",
        "I quit"
    ]
},
{
    id: "time",
    image: "images/wellness-time.png",
    question: "How much time can you dedicate to your health each day?",
    answers: [
        "Less than 15 minutes",
        "15-30 minutes",
        "30-60 minutes",
        "More than 1 hour"
    ]
},
{
    id: "motivation",
    image: "images/motivation.png",
    question: "What motivates you the most to improve your health?",
    answers: [
        "Feeling more energetic",
        "Looking better",
        "Preventing health problems",
        "Living a longer, healthier life"
    ]
},
{
    id: "weightGoal",
    image: "images/weight-loss-goal.png",
    question: "How much weight would you like to lose?",
    answers: [
        "Less than 5 kg",
        "5-10 kg",
        "10-20 kg",
        "More than 20 kg"
    ]
}
];

let currentQuestion = 0;
let selectedAnswer = null;
let userAnswers = {};

function startQuiz() {

    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    loadQuestion();

}

function loadQuestion(){

    const q = questions[currentQuestion];
const progress = ((currentQuestion + 1) / questions.length) * 100;

    document.querySelector(".progress-fill").style.width = progress + "%";
    document.getElementById("question-image").src = q.image;

    document.querySelector(".question-counter").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.querySelector(".question-title").textContent =
        q.question;

    const container = document.querySelector(".answers");

    container.innerHTML = "";

    selectedAnswer = null;

    q.answers.forEach(answer => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.onclick = () => {

            document
                .querySelectorAll(".answer-btn")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");

            selectedAnswer = answer;

        };

        container.appendChild(button);

    });

}
function nextQuestion() {

    if (selectedAnswer === null) {
    alert("Please select an answer.");
    return;
}

const questionId = questions[currentQuestion].id;

userAnswers[questionId] = selectedAnswer;
console.log(userAnswers);

currentQuestion++;

   if(currentQuestion >= questions.length){

    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("lead-screen").style.display = "block";

    return;
}

    loadQuestion();
}
const contact = document.getElementById("contact");

document.querySelectorAll('input[name="contactMethod"]').forEach(radio => {

    radio.addEventListener("change", function () {

        if (this.value === "email") {
            contact.type = "email";
            contact.placeholder = "Enter your email address";
            contact.value = "";
        } else {
            contact.type = "tel";
            contact.placeholder = "+44 7123 456789";
            contact.value = "";
        }

    });

});
document.getElementById("view-report-btn").addEventListener("click", async function () {

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const contact = document.getElementById("contact").value;
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;

    const quizData = {
        firstName,
        lastName,
        contact,
        contactMethod,
        answers: userAnswers
    };

    try {

        const response = await fetch("https://hlife-backend-production.up.railway.app/api/v1/quiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        });

        const result = await response.json();
        console.log(result);

        if (!result.success) {
            alert("Error saving quiz.");
            return;
        }
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {

            confetti({
                particleCount: 6,
                angle: 60,
                spread: 80,
                origin: { x: 0 }
            });

            confetti({
                particleCount: 6,
                angle: 120,
                spread: 80,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }

        })();

        setTimeout(function () {

            document.getElementById("lead-screen").style.display = "none";
            document.getElementById("success-screen").style.display = "block";

        }, 3000);

    } catch (error) {

        console.error(error);
        alert("Unable to connect to the server.");

    }

});
