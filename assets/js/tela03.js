let titleQuizCreation;
let urlImgQuizCreation;
let numberOfLevels;
let numberOfQuestions;
let basic_info = document.querySelector(".basic-info");
let quest_creation = document.querySelector(".quest-creation");
let questionsBody = document.querySelector(".quest-creation .questions");

let questions = [];

function validateBasicInfo() {
    titleQuizCreation = document.querySelector(".title-Creation").value;
    urlImgQuizCreation = document.querySelector(".url-Img-Creation").value;
    numberOfLevels = document.querySelector(".number-Level").value;
    numberOfQuestions = document.querySelector(".number-Ask").value;
    if( titleQuizCreation.length < 20 || titleQuizCreation.length > 65 || Number(numberOfLevels) < 2 || Number(numberOfQuestions) < 3 || urlImgQuizCreation.indexOf("https://") < 0) {
        console.log("Não está valido");
    } else {
        console.log("Está valido");
        goToCreateQuestions();
    }
}

function goToCreateQuestions() {
    for( let i = 1; i <= Number(numberOfQuestions); i++) {
        questionsBody.innerHTML += 
        `
        <div id="pergunta${i}" class="question">
        <div>
        <h2 onclick="openCloseQuestions(this)">Pergunta ${i}</h2>
            <input class="pergunta-txt" type="text" placeholder="Texto da pergunta">
            <input class="cor-pergunta" type="text" placeholder="Cor de fundo da pergunta">
        </div>
        <div>
            <h3>Resposta correta</h3>
            <input class="correta${i}" type="text" placeholder="Resposta correta">
            <input class="img-correta${i}" type="url" placeholder="URL da imagem">
        </div>
        <div>
            <h3>Respostas incorretas</h3>
            <input class="1incorreta${i}" type="text" placeholder="Resposta incorreta 1">
            <input class="1img-incorreta${i}" type="url" placeholder="URL da imagem 1">
            <input class="2incorreta${i}" type="text" placeholder="Resposta incorreta 2">
            <input class="2img-incorreta${i}" type="url" placeholder="URL da imagem 2">
            <input class="3incorreta${i}" type="text" placeholder="Resposta incorreta 3">
            <input class="3img-incorreta${i}" type="url" placeholder="URL da imagem 3">
        </div>
    </div>
        `
    }
    quest_creation.classList.remove("escondido");
    basic_info.classList.add("escondido");
    createObjectOfQuestion(Number(numberOfQuestions));
}

function createObjectOfQuestion(valor) {
    for( let i = 0; i < valor; i++) {
        questions[i] = {
            title: ``,
            color: "",
            answers: []
        };
    }
}

function validateQuestionCreation() {
    let questionTitle;
    let questionColor;
    let correctAnswer;
    let correctImg;
    let wrongAnswer1;
    let imgwrongAnswer1;
    let wrongAnswer2;
    let imgwrongAnswer2;
    let wrongAnswer3;
    let imgwrongAnswer3;
}


function openCloseQuestions(elemento) {
    let perguntaSelecionada = document.querySelector(".tela3 .quest-creation .question>div>h2");
    elemento.parentNode.parentNode.classList.toggle("show");
}
