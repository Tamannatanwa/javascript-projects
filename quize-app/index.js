const questions = [
    {
        question:"Which is largest animal in the world?",
        answers:[
            {
                text:"Shark",correct:false
            },
            {
                text:"Blue Whale",correct:true
            },
            {
                text:"Elephant",correct:false
            },
            {
                text:"Giraffe",correct:false
            }
        ]
    },
    {
        question:"Which is the largest country in the world?",
        answers:[
            {
                text:"USA",correct:false
            },
            {
                text:"Russia",correct:true
            },
            {
                text:"China",correct:false
            },
            {
                text:"India",correct:false
            }
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            {
                text:"Sahara",correct:true
            },
            {
                text:"Thar",correct:false
            },
            {
                text:"Arabian",correct:false
            },
            {
                text:"Gobi",correct:false
            }
        ]
    },
    {
        question:"Which is the largest river in the world?",
        answers:[
            {
                text:"Nile",correct:false
            },
            {
                text:"Amazon",correct:true
            },
            {
                text:"Ganga",correct:false
            },
            {
                text:"Yamuna",correct:false
            }
        ]
    },
    {
        question:"Which is the largest planet in the solar system?",
        answers:[
            {
                text:"Earth",correct:false
            },
            {
                text:"Jupiter",correct:true
            },
            {
                text:"Mars",correct:false
            },
            {
                text:"Venus",correct:false
            }
        ]
    }
]


const questionElement = document.getElementById("question");

const answerButtonsElement = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;

let score = 0 ;

const startQuiz = ()=>{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next"
    showQuestion();
}

const showQuestion = ()=>{
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

const resetState = ()=>{
    nextButton.style.display = "none";
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

const selectAnswer = (e)=>{
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display = "block";
}

const showScore = ()=>{
    resetState()
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length} questions !`
    nextButton.innerHTML="Restart";
    nextButton.style.display = "block";
}


const handleNextButton = ()=>{
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
       showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex<questions.length){
        handleNextButton()
    }
    else{
        startQuiz();
    }
}
);

startQuiz()