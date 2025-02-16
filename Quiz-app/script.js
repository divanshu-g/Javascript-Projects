const question = [
    {
        Question: "What is the main advantage of using Next.js over traditional React applications?",
        Answers: [
            {text: "It removes the need for JavaScript",correct:false},
            {text: "It provides server-side rendering and static site generation",correct:true},
            {text: "It replaces HTML with a new markup language",correct:false},
            {text: "It is only used for backend development",correct:false}
        ]
    },
    {
        Question: "In Next.js, which function is used to fetch data at build time?",
        Answers: [
            {text: "getServerSideProps",correct:false},
            {text: "getStaticProps",correct:true},
            {text: "useEffect",correct:false},
            {text: "fetchData",correct:false}
        ]
    },
    {
        Question: "What is the purpose of Tailwind CSS in web development?",
        Answers: [
            {text: "It is a backend framework for Node.js",correct:false},
            {text: " It provides a set of pre-designed UI components",correct:false},
            {text: "It allows developers to write utility-first, responsive CSS styles",correct:true},
            {text: "It is used only for animations",correct:false}
        ]
    },
    {
        Question: "Which command is used to create a new Next.js app with the default template?",
        Answers: [
            {text: "npm create next-app@latest",correct:false},
            {text: "npx create-next-app@latest",correct:true},
            {text: "next init app",correct:false},
            {text: "node create-next-app",correct:false}
        ]
    },
    {
        Question: "How do you add global styles in a Next.js project using Tailwind CSS?",
        Answers: [
            {text: "mport styles in index.js",correct:false},
            {text: "Use inline styles in every component",correct:false},
            {text: "Define styles in globals.css and import it in _app.js",correct:true},
            {text: "Create a styles.ts file and import it in each page",correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let CurrentQuestionIndex = 0;
let Score = 0;

function startQuiz(){
    CurrentQuestionIndex = 0;
    Score = 0;
    questionElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let CurrQuestion = question[CurrentQuestionIndex];
    let QuestionNo = CurrentQuestionIndex + 1;
    questionElement.innerHTML = QuestionNo + ". " + CurrQuestion.Question;

    CurrQuestion.Answers.forEach((answer) =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", CorrectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function CorrectAnswer(e){
    const SelectedBtn = e.target;
    const isCorrect = SelectedBtn.dataset.correct === "true";
    if(isCorrect){
        SelectedBtn.classList.add("correct");
        Score++;
    }
    else{
        SelectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${Score} out of ${question.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function nextQues(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(CurrentQuestionIndex < question.length){
        nextQues();
    }
    else{
        startQuiz();
    }
})
startQuiz();


