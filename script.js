const questions = [
{
question: "What type of work sounds most interesting?",
options: [
["Helping people", "medical"],
["Working with technology", "technology"],
["Leading or managing", "business"],
["Creating art or content", "creative"]
]
},
{
question: "What school subject do you enjoy most?",
options: [
["Science", "medical"],
["Computer classes", "technology"],
["Business or economics", "business"],
["Art or design", "creative"]
]
},
{
question: "Do you prefer working indoors or outdoors?",
options: [
["Indoors", "technology"],
["Outdoors", "trades"],
["Both", "business"],
["Depends on the job", "medical"]
]
},
{
question: "What matters most in a future job?",
options: [
["Helping others", "medical"],
["High salary", "business"],
["Creativity", "creative"],
["Hands-on work", "trades"]
]
},
{
question: "What kind of environment do you like?",
options: [
["Hospitals or clinics", "medical"],
["Offices or companies", "business"],
["Workshops or job sites", "trades"],
["Studios or creative spaces", "creative"]
]
},
{
question: "Which activity sounds best?",
options: [
["Fixing or building things", "trades"],
["Coding or gaming", "technology"],
["Designing content", "creative"],
["Taking care of people", "medical"]
]
},
{
question: "Do you like teamwork?",
options: [
["Yes, a lot", "business"],
["Sometimes", "medical"],
["Only on projects", "technology"],
["I prefer independence", "creative"]
]
},
{
question: "Which skill describes you best?",
options: [
["Problem solving", "technology"],
["Communication", "business"],
["Creativity", "creative"],
["Patience", "medical"]
]
},
{
question: "What sounds most rewarding?",
options: [
["Saving lives", "medical"],
["Building successful businesses", "business"],
["Making cool designs", "creative"],
["Building or repairing things", "trades"]
]
},
{
question: "What future sounds most exciting?",
options: [
["Working in healthcare", "medical"],
["Working with computers", "technology"],
["Owning a business", "business"],
["Working with your hands", "trades"]
]
}
];

const careers = {
medical: ["Dental Hygienist", "Nurse", "Physical Therapist", "Medical Assistant"],
technology: ["Software Developer", "Cybersecurity Analyst", "IT Support Specialist", "Web Designer"],
business: ["Marketing Manager", "Real Estate Agent", "Business Owner", "Accountant"],
creative: ["Graphic Designer", "Photographer", "Video Editor", "Animator"],
trades: ["Electrician", "Mechanic", "Welder", "Construction Manager"]
};

let currentQuestion = 0;
let selected = null;

const scores = {
medical: 0,
technology: 0,
business: 0,
creative: 0,
trades: 0
};

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const results = document.getElementById("results");
const progressBar = document.getElementById("progressBar");

function showQuestion() {
  const q = questions[currentQuestion];

  progressBar.style.width = `${((currentQuestion) / questions.length) * 100}%`;

  quiz.innerHTML = `
    <div class="progress-text">Question ${currentQuestion + 1}/10</div>
    <div class="question">${q.question}</div>
    ${q.options.map((option, index) =>
      `<div class="option" onclick="selectOption(${index}, this)">
        ${option[0]}
      </div>`
    ).join("")}
  `;
}

window.selectOption = function(index, element) {
  document.querySelectorAll(".option").forEach(opt => {
    opt.classList.remove("selected");
  });

  element.classList.add("selected");
  selected = index;
}

nextBtn.addEventListener("click", () => {
  if (selected === null) {
    alert("Please choose an answer.");
    return;
  }

  const category = questions[currentQuestion].options[selected][1];
  scores[category]++;

  currentQuestion++;
  selected = null;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quiz.classList.add("hidden");
  nextBtn.classList.add("hidden");

  progressBar.style.width = "100%";

  const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);

  results.classList.remove("hidden");

  results.innerHTML = `
    <h2>Your Career Matches</h2>

    ${sorted.slice(0,3).map(item => `
      <div class="result-card">
        <h3>${capitalize(item[0])} Careers</h3>
        <p>${careers[item[0]].join(", ")}</p>
      </div>
    `).join("")}
  `;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

showQuestion();
