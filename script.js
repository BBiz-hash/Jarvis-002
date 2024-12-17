const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");

let score = 0;
let currentQuestion = {};

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let correctAnswer;

    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
    }

    return {
        question: `What is ${num1} ${operator} ${num2}?`,
        correctAnswer,
        options: generateOptions(correctAnswer),
    };
}

function generateOptions(correct) {
    const options = new Set();
    options.add(correct);

    while (options.size < 4) {
        options.add(Math.floor(Math.random() * 20) + 1);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
}

function displayQuestion() {
    currentQuestion = generateQuestion();

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;
        div.onclick = () => checkAnswer(option, div);
        optionsElement.appendChild(div);
    });
}

function checkAnswer(selected, element) {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach((opt) => (opt.onclick = null));

    if (selected === currentQuestion.correctAnswer) {
        element.classList.add("correct");
        score++;
    } else {
        element.classList.add("wrong");
        allOptions.forEach((opt) => {
            if (parseInt(opt.textContent) === currentQuestion.correctAnswer) {
                opt.classList.add("correct");
            }
        });
    }

    scoreElement.textContent = `Score: ${score}`;
}

function nextQuestion() {
    displayQuestion();
}

displayQuestion();
