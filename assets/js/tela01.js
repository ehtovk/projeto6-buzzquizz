const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes"
);
promessa.then(carregaQuizz);

verifySavedIds();
function carregaQuizz(p) {
    if (document.querySelector(".tela1").classList === "tela1");
    {
        const mostra = document.querySelector(".todosQ");
        let j = 0;
        for (let i = 0; i < p.data.length; i++) {

            if (p.data[i].id !== idsSavedArr[j]) {
                mostra.innerHTML += `
                <div class="quizzes" onclick="tela2(${p.data[i].id});">
                <img src="${p.data[i].image}"/>
                <div class="gradient-back"></div>
                <p class="tituloQ">${p.data[i].title}</p>
                </div>`;
            }
            else {
                if (j < idsSavedArr.length)
                    j++;
            }
        }
    }
}

function verifySavedIds() {
    idsSavedString = localStorage.getItem('savedIds');
    if (idsSavedString === null) {
        idsSavedString = '[]';
    }
    idsSavedArr = JSON.parse(idsSavedString);

    if (idsSavedArr.length > 0) {
        document.querySelector(".seusQuizV").classList.add("escondido");
        document.querySelector(".quizCriado").classList.remove("escondido");
    }
    goToSearch();
}

