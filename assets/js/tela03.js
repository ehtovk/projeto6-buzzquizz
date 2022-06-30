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
    if (
        titleQuizCreation.length < 20 ||
        titleQuizCreation.length > 65 ||
        Number(numberOfLevels) < 2 ||
        Number(numberOfQuestions) < 3 ||
        (urlImgQuizCreation.indexOf("https://") < 0 &&
            isImage(urlImgQuizCreation) === false)
    ) {
        alert("Não está valido");
    } else {
        console.log("Está valido");
        goToCreateQuestions();
    }
}

function goToCreateQuestions() {
    for (let i = 1; i <= Number(numberOfQuestions); i++) {
        questionsBody.innerHTML += `
        <div id="pergunta${i}" class="question">
        <div>
        <h2 onclick="openCloseQuestions(this)">Pergunta ${i}</h2>
            <input class="pergunta-txt${i}" type="text" placeholder="Texto da pergunta">
            <input class="cor-pergunta${i}" type="color" placeholder="Cor de fundo da pergunta">
        </div>
        <div>
            <h3>Resposta correta</h3>
            <input class="correta${i}" type="text" placeholder="Resposta correta">
            <input class="img-correta${i}" type="url" placeholder="URL da imagem">
        </div>
        <div>
            <h3>Respostas incorretas</h3>
            <input class="incorreta1${i}" type="text" placeholder="Resposta incorreta 1">
            <input class="img-incorreta1${i}" type="url" placeholder="URL da imagem 1">
            <input class="incorreta2${i}" type="text" placeholder="Resposta incorreta 2">
            <input class="img-incorreta2${i}" type="url" placeholder="URL da imagem 2">
            <input class="incorreta3${i}" type="text" placeholder="Resposta incorreta 3">
            <input class="img-incorreta3${i}" type="url" placeholder="URL da imagem 3">
        </div>
    </div>
        `;
    }
    quest_creation.classList.remove("escondido");
    basic_info.classList.add("escondido");
    createObjectOfQuestion(Number(numberOfQuestions));
}

function createObjectOfQuestion(valor) {
    for (let i = 0; i < valor; i++) {
        questions[i] = {
            title: ``,
            color: "",
            answers: [],
        };
    }
}

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


function validateQuestionCreation() {
    let stop = false;

    for (let i = 1; i <= Number(numberOfQuestions); i++) {
        let hasAnswer1 = false;
        let hasAnswer2 = false;
        let hasAnswer3 = false;
        questionTitle = document.querySelector(`.pergunta-txt${i}`).value;
        questionColor = document.querySelector(`.cor-pergunta${i}`).value;
        correctAnswer = document.querySelector(`.correta${i}`).value;
        correctImg = document.querySelector(`.img-correta${i}`).value;
        wrongAnswer1 = document.querySelector(`.incorreta1${i}`).value;
        wrongAnswer2 = document.querySelector(`.incorreta2${i}`).value;
        wrongAnswer3 = document.querySelector(`.incorreta3${i}`).value;
        imgwrongAnswer1 = document.querySelector(`.img-incorreta1${i}`).value;
        imgwrongAnswer2 = document.querySelector(`.img-incorreta2${i}`).value;
        imgwrongAnswer3 = document.querySelector(`.img-incorreta3${i}`).value;

        if (
            questionTitle.length < 20 ||
            questionColor.length < 7 ||
            questionColor.indexOf("#") < 0
        ) {
            return alert("Preencha os campos!");
        }
        if (correctAnswer.length === 0 || correctImg.indexOf("https://") < 0) {
            return alert("Preencha a resposta correta!");
        }
        if (
            !wrongAnswer1 &&
            !imgwrongAnswer1 &&
            isImage(imgwrongAnswer1) === false &&
            !wrongAnswer2 &&
            !imgwrongAnswer2 &&
            isImage(imgwrongAnswer2) === false &&
            !wrongAnswer3 &&
            !imgwrongAnswer3 &&
            isImage(imgwrongAnswer3) === false
        ) {
            return alert("Preencha pelo menos um campo de resposta incorreta!");
        }
        if (wrongAnswer1.length > 0) {
            hasAnswer1 = true;
        }
        if (wrongAnswer2.length > 0) {
            hasAnswer2 = true;
        }
        if (wrongAnswer3.length > 0) {
            hasAnswer3 = true;
        }
        console.log(`Respostas incorretas da pergunta ${i}`);
        console.log(hasAnswer1);
        console.log(hasAnswer2);
        console.log(hasAnswer3);

        questions[i - 1].title = questionTitle;
        questions[i - 1].color = questionColor;
        questions[i - 1].answers.push({
            text: correctAnswer,
            image: correctImg,
            isCorrectAnswer: true
        })

        if (hasAnswer1 === true) {
            questions[i - 1].answers.push({
                text: wrongAnswer1,
                image: imgwrongAnswer1,
                isCorrectAnswer: false
            })
        }
        if (hasAnswer2 === true) {
            questions[i - 1].answers.push({
                text: wrongAnswer2,
                image: imgwrongAnswer2,
                isCorrectAnswer: false
            })
        }
        if (hasAnswer3 === true) {
            questions[i - 1].answers.push({
                text: wrongAnswer3,
                image: imgwrongAnswer3,
                isCorrectAnswer: false
            })
        }
    }
}

function openCloseQuestions(elemento) {
    let perguntaSelecionada = document.querySelector(
        ".tela3 .quest-creation .question>div>h2"
    );
    elemento.parentNode.parentNode.classList.toggle("show");
}

function isImage(stringUrl) {
    if ((stringUrl.indexOf(".jpeg") !== -1) || (stringUrl.indexOf(".jpg") !== -1) || (stringUrl.indexOf(".png") !== -1) || (stringUrl.indexOf(".gif") !== -1) || (stringUrl.indexOf(".tiff") !== -1) || (stringUrl.indexOf(".bmp") !== -1)) {
        return true;
    } else {
        return false;
    }
}
