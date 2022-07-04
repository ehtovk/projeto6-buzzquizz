let titleQuizCreation;
let urlImgQuizCreation;
let numberOfLevels;
let numberOfQuestions;
let basic_info = document.querySelector(".basic-info");
let quest_creation = document.querySelector(".quest-creation");
let quiz_level = document.querySelector(".quiz-level");
let questionsBody = document.querySelector(".quest-creation .questions");
let levelsBody = document.querySelector(".quiz-level .levels");
let final_Page_Quizz = document.querySelector(".quiz-finish");

let questions = [];
let levels = [];
let quiz_Pronto = {};


function createQuizz() {
    creationPage.classList.remove("escondido");
    homePage.classList.add("escondido");
}

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
        (!urlImgQuizCreation.includes("https://") ||
            !isImage(urlImgQuizCreation))
    ) {
        return alert(`Preencha os campos da seguinte forma:
        - Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres 
        - URL da Imagem: deve ter formato de URL 
        - Quantidade de perguntas: no mínimo 3 perguntas 
        - Quantidade de níveis: no mínimo 2 níveis`)
    }
    goToCreateQuestions();
}

function goToCreateQuestions() {
    for (let i = 1; i <= Number(numberOfQuestions); i++) {
        questionsBody.innerHTML += `
    <div id="pergunta${i}" class="question">
        <div>
            <div onclick="openCloseQuestions(this)" class="wrap">
                <h2>Pergunta ${i}</h2>
                <ion-icon class="visible" name="list"></ion-icon>
            </div>
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
            return alert(`Preencha os campos da seguinte forma:
            - Texto da pergunta: no mínimo 20 caracteres 
            - URL da Imagem: deve ter formato de URL 
            - Texto das respostas: não pode estar vazio 
            - É obrigatório a inserção de pelo menos uma resposta correta e uma incorreta!`);
        }
        if (correctAnswer.length === 0 || correctImg.indexOf("https://") < 0) {
            return alert("Preencha a resposta correta!");
        }
        if (
            !wrongAnswer1 &&
            !imgwrongAnswer1 &&
            !isImage(imgwrongAnswer1) &&
            !wrongAnswer2 &&
            !imgwrongAnswer2 &&
            !isImage(imgwrongAnswer2) &&
            !wrongAnswer3 &&
            !imgwrongAnswer3 &&
            !isImage(imgwrongAnswer3)
        ) {
            return alert("Preencha pelo menos um campo de resposta incorreta!");
        }
        // hasAnswer1 = !!wrongAnswer1.length
        if (wrongAnswer1.length > 0) {
            hasAnswer1 = true;
        }
        if (wrongAnswer2.length > 0) {
            hasAnswer2 = true;
        }
        if (wrongAnswer3.length > 0) {
            hasAnswer3 = true;
        }

        questions[i - 1].title = questionTitle;
        questions[i - 1].color = questionColor;
        questions[i - 1].answers.push({
            text: correctAnswer,
            image: correctImg,
            isCorrectAnswer: true
        })

        if (hasAnswer1) {
            questions[i - 1].answers.push({
                text: wrongAnswer1,
                image: imgwrongAnswer1,
                isCorrectAnswer: false
            })
        }
        if (hasAnswer2) {
            questions[i - 1].answers.push({
                text: wrongAnswer2,
                image: imgwrongAnswer2,
                isCorrectAnswer: false
            })
        }
        if (hasAnswer3) {
            questions[i - 1].answers.push({
                text: wrongAnswer3,
                image: imgwrongAnswer3,
                isCorrectAnswer: false
            })
        }
    }
    goToCreateLevels();
}

function goToCreateLevels() {
    for (let i = 1; i <= Number(numberOfLevels); i++) {
        levelsBody.innerHTML +=
            `
        <div id="level${i}" class="level">
            <div onclick="openCloseLevels(this)" class="wrap">
                <h2>Nível ${i}</h2>
                <ion-icon class="visible" name="list"></ion-icon>
            </div>
            <input class="level-title${i}" type="text" placeholder="Título do nível">
            <input class="level-number${i}" type="number" placeholder="% de acerto mínima" required>
            <input class="level-img${i}" type="url" placeholder="URL da imagem do nível">
            <textarea class="level-description${i}" type="text" placeholder="Descrição do nível" rows="6" cols="50"></textarea>
        </div>
        `
    }
    quest_creation.classList.add("escondido");
    quiz_level.classList.remove("escondido");
    createObjectOfLevels(Number(numberOfLevels));
}

function createObjectOfLevels(valor) {
    for (let i = 0; i < valor; i++) {
        levels[i] = {
            title: ``,
            image: ``,
            text: ``,
            minValue: 0
        }
    }
}

let level_Title;
let first_level_Number;
let level_Number;
let level_Img;
let level_Description;
let hasZeroAsValue = false;
let sum_Level = 0;
let send_Quiz = `https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes`;

function validateQuizLevel() {
    hasZeroAsValue = false;
    sum_Level = 0;
    first_level_Number = document.querySelector(`.level-number1`).value;
    for (let i = 1; i <= Number(numberOfLevels); i++) {
        level_Title = document.querySelector(`.level-title${i}`).value;
        //level_Number = document.querySelector(`.level-number${i}`).value;
        level_Img = document.querySelector(`.level-img${i}`).value;
        level_Description = document.querySelector(`.level-description${i}`).value;

        if (level_Title.length < 10 || level_Description.length < 30 || !level_Img.includes("https://") || !isImage(level_Img)) {
            return alert(`Preencha os campos da seguinte forma:
            - Título do nível: mínimo de 10 caracteres 
            - URL da Imagem: deve ter formato de URL 
            - Descrição do nível: mínimo de 30 caracteres`)
        }
        if (Number(first_level_Number) === 0) {
            hasZeroAsValue = true;
        }

        levels[i - 1].title = level_Title;
        levels[i - 1].image = level_Img;
        levels[i - 1].text = level_Description;
    }
    levels[0].minValue = Number(first_level_Number);
    seeMinimumNumberLevel();
}

function seeMinimumNumberLevel() {
    for (let i = 2; i <= Number(numberOfLevels); i++) {
        level_Number = document.querySelector(`.level-number${i}`).value;

        if (Number(level_Number) === 0 && Number(first_level_Number) === 0) {
            return alert("Você já tem uma porcentagem de acerto mínima igual a zero!")
        }
        levels[i - 1].minValue = Number(level_Number);
    }
    theResultNeedsToBeHund();
}

function theResultNeedsToBeHund() {
    for (let i = 0; i < Number(numberOfLevels); i++) {
        sum_Level += levels[i].minValue;
    }
    goToFinalPageQuiz();
    quiz_level.classList.add("escondido");
    final_Page_Quizz.classList.remove("escondido");
}

function goToFinalPageQuiz() {
    numberOfLevels = 0;
    numberOfQuestions = 0;

    let img_Page = document.querySelector(".finished-qz");
    img_Page.innerHTML =
        `
                <img src="${urlImgQuizCreation}" alt="">
                <div class="gradient-back"></div>
                <p>${titleQuizCreation}</p>
    `
    quiz_Pronto =
    {
        title: titleQuizCreation,
        image: urlImgQuizCreation,
        questions,
        levels
    }
    sendQuizzToAPI();
}

let idsSavedArr = null;
let idsSavedString = null;

function sendQuizzToAPI() {
    let sending = axios.post('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes', quiz_Pronto);
    sending.then(seeQuizz);
}

function seeQuizz(yourQuiz) {
    let idYourQuiz = yourQuiz.data.id;
    final_Page_Quizz.innerHTML +=
        `
    <button onclick="tela2(${idYourQuiz})">
        <p>Acessar Quizz</p>
    </button>
    <a onclick="goBackToHomePage()" href="">Voltar pra home</a>
    `
    saveInformationsUserId(idYourQuiz);
}

function saveInformationsUserId(idOfYourQuiz) {
    let info = 0;
    info = idOfYourQuiz;
    idsSavedArr.push(info);
    idsSavedString = JSON.stringify(idsSavedArr);
    localStorage.setItem('savedIds', idsSavedString);
}

function searchIdYourQuiz() {
    let promise = `https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/`;
    for (let b = 0; b < idsSavedArr.length; b++) {
        let flex = idsSavedArr[b];
        promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${flex}`);
        promise.then(renderYourQuizz);
    }
}

function goToSearch() {
    searchIdYourQuiz();
}

function renderYourQuizz(answerW) {
    let screenYour = document.querySelector(".wrap-quiz");

    screenYour.innerHTML +=
        `
    <div class="yourQuizz" id="${answerW.data.id}">
        <img onclick="tela2(${answerW.data.id})" src="${answerW.data.image}" alt="">
        <div onclick="tela2(${answerW.data.id})" class="gradient-back"></div>
        <p onclick="tela2(${answerW.data.id})">${answerW.data.title}</p>
        <div class="delete-quiz" onclick="deleteQuizz(${answerW.data.id})" ><ion-icon name="trash-outline"></ion-icon></div>
    </div>
    `
}

function deleteQuizz(ids) {
    console.log("Função em andamento! Ainda não está funcionando.")
    // for (let i = 0; i < idsSavedArr.length; i++) {
    //     if (idsSavedArr[i] === ids) {
    //         idsSavedArr.splice(idsSavedArr.indexOf[i], 1);
    //         return verifySavedIds();
    //     }
    // }
}

function openCloseQuestions(elemento) {
    elemento.parentNode.parentNode.classList.toggle("show");
    elemento.querySelector("ion-icon").classList.toggle("visible");
}

function openCloseLevels(elemento) {
    elemento.parentNode.classList.toggle("show");
    elemento.querySelector("ion-icon").classList.toggle("visible");
}

let homePage = document.querySelector(".tela1");
let creationPage = document.querySelector(".tela3");

function goBackToHomePage() {
    homePage.classList.remove("escondido");
    creationPage.classList.add("escondido");
}

function isImage(stringUrl) {
    return stringUrl.includes(".jpeg") || stringUrl.includes(".jpg") || stringUrl.includes(".png") || stringUrl.includes(".gif") || stringUrl.includes(".tiff") || stringUrl.includes(".bmp")

}
