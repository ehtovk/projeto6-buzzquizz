let titleQuizCreation;
let urlImgQuizCreation;
let numberOfLevels;
let numberOfQuestions;

function validateBasicInfo() {
    titleQuizCreation = document.querySelector(".title-Creation").value;
    urlImgQuizCreation = document.querySelector(".url-Img-Creation").value;
    numberOfLevels = document.querySelector(".number-Level").value;
    numberOfQuestions = document.querySelector(".number-Ask").value;
    if( titleQuizCreation.length < 20 || titleQuizCreation.length > 65 || Number(numberOfLevels) < 2 || Number(numberOfQuestions) < 3 || urlImgQuizCreation.indexOf("https://") < 0) {
        console.log("Não está valido");
    } else {
        console.log("Está valido");
    }
}