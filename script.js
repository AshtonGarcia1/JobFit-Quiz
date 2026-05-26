const questions = [
  {
    text: "What kind of job could you see yourself doing every day?",
    answers: [
      ["Helping people face to face", "health"],
      ["Working with computers", "tech"],
      ["Running a business or making money moves", "business"],
      ["Creating or designing things", "creative"]
    ]
  },
  {
    text: "Which class sounds the least boring?",
    answers: [
      ["Science or health", "health"],
      ["Computer class", "tech"],
      ["Business or economics", "business"],
      ["Art, media, or design", "creative"]
    ]
  },
  {
    text: "What sounds more like you?",
    answers: [
      ["I like staying active", "hands"],
      ["I can focus on a screen for a while", "tech"],
      ["I like talking to people", "business"],
      ["I like coming up with ideas", "creative"]
    ]
  },
  {
    text: "What would matter most in a future job?",
    answers: [
      ["Helping people", "health"],
      ["Making good money", "business"],
      ["Being creative", "creative"],
      ["Doing hands-on work", "hands"]
    ]
  },
  {
    text: "Where would you rather work?",
    answers: [
      ["Clinic, office, or healthcare place", "health"],
      ["Company office or business", "business"],
      ["Job site, shop, or workshop", "hands"],
      ["Studio, salon, or creative space", "creative"]
    ]
  },
  {
    text: "Pick the option that sounds most interesting.",
    answers: [
      ["Fixing or building something", "hands"],
      ["Websites, apps, or cybersecurity", "tech"],
      ["Editing, designing, or creating", "creative"],
      ["Taking care of people", "health"]
    ]
  },
  {
    text: "How do you feel about working with a team?",
    answers: [
      ["I like being around people", "business"],
      ["I can work with people when needed", "health"],
      ["It depends on the project", "tech"],
      ["I like doing my own thing more", "creative"]
    ]
  },
  {
    text: "Which skill sounds most like you?",
    answers: [
      ["Solving problems", "tech"],
      ["Communication", "business"],
      ["Creativity", "creative"],
      ["Patience", "health"]
    ]
  },
  {
    text: "Which result would make you feel proud?",
    answers: [
      ["Helping someone feel better", "health"],
      ["Starting or growing a business", "business"],
      ["Making something people like", "creative"],
      ["Building or repairing something useful", "hands"]
    ]
  },
  {
    text: "Which future sounds the most realistic for you?",
    answers: [
      ["Healthcare or dental work", "health"],
      ["Computers or technology", "tech"],
      ["Business, sales, or real estate", "business"],
      ["Trades, beauty, or hands-on careers", "hands"]
    ]
  }
];

const careerGroups = {
  health: {
    title: "Health Careers",
    reason: "Your answers show that you may fit a job where you help people and stay patient.",
    jobs: ["Dental Hygienist", "Nurse", "Physical Therapist", "Medical Assistant"]
  },
  tech: {
    title: "Technology Careers",
    reason: "Your answers point toward problem solving and working with computers or online tools.",
    jobs: ["Web Designer", "Software Developer", "IT Support", "Cybersecurity Analyst"]
  },
  business: {
    title: "Business Careers",
    reason: "Your answers show interest in people, leadership, money, or building something of your own.",
    jobs: ["Business Owner", "Real Estate Agent", "Marketing Worker", "Accountant"]
  },
  creative: {
    title: "Creative Careers",
    reason: "Your answers show that you may like making things look good or creating original ideas.",
    jobs: ["Graphic Designer", "Video Editor", "Photographer", "Nail Tech"]
  },
  hands: {
    title: "Hands-On Careers",
    reason: "Your answers show that you may like active work instead of sitting at a desk all day.",
    jobs: ["Electrician", "Mechanic", "Welder", "Construction Manager"]
  }
};

let current = 0;
let chosen = null;

const scores = {
  health: 0,
  tech: 0,
  business: 0,
  creative: 0,
  hands: 0
};

const quizArea = document.getElementById("quizArea");
const resultArea = document.getElementById("resultArea");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");
const percent = document.getElementById("percent");

function loadQuestion() {
  const question = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  progressBar.style.width = progress + "%";
  questionNumber.textContent = "Question " + (current + 1) + " of 10";
  percent.textContent = progress + "%";

  quizArea.innerHTML = `
    <div class="question">${question.text}</div>
    ${question.answers.map((answer, index) => `
      <div class="choice" onclick="chooseAnswer(${index}, this)">
        ${answer[0]}
      </div>
    `).join("")}
  `;
}

function chooseAnswer(index, element) {
  document.querySelectorAll(".choice").forEach(choice => {
    choice.classList.remove("active");
  });

  element.classList.add("active");
  chosen = index;
}

nextButton.addEventListener("click", () => {
  if (chosen === null) {
    alert("Pick an answer first.");
    return;
  }

  const category = questions[current].answers[chosen][1];
  scores[category]++;

  current++;
  chosen = null;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizArea.classList.add("hidden");
  nextButton.classList.add("hidden");

  progressBar.style.width = "100%";
  questionNumber.textContent = "Quiz Complete";
  percent.textContent = "100%";

  const ordered = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  resultArea.classList.remove("hidden");
  resultArea.innerHTML = `
    <h2>Your JobFit Matches</h2>
    <p>Based on your answers, these career areas might fit you best:</p>

    ${ordered.slice(0, 3).map(group => `
      <div class="result-card">
        <h3>${careerGroups[group[0]].title}</h3>
        <p>${careerGroups[group[0]].reason}</p>
        <p><strong>Job ideas:</strong> ${careerGroups[group[0]].jobs.join(", ")}</p>
      </div>
    `).join("")}

    <p class="note">This quiz is just a starting point. It gives you ideas to research more.</p>
  `;
}

loadQuestion();
