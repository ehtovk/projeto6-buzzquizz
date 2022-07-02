
let d = new Object();
let q = new Array();
let coloca = new Array();
let cor = new Array();
let caixaq;
let imgt;
let acertou = 0;
let sai = false;

function tela2(i) {
    document.querySelector(".tela1").classList.add("escondido");
    document.querySelector(".tela2").classList.remove("escondido");
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/" + i
    );
    promessa.then(jogaQuizz);
}

function jogaQuizz(prome) {
    window.scrollTo(0, 0);
    d = prome.data;
    let html = ``;
    const mostra = document.querySelector(".tela2");

    for (let i = 0; i < d.questions.length; i++) {
        q[i] = false;
    }

    html += `<div class="imgT">
                <img src="${d.image}">
                <div class="gradient-back"></div>
                <h1>${d.title}</h1>
            </div>`;

    for (let i = 0; i < d.questions.length; i++) {
        html += `
        <div class="caixaQ">
            <div style="background: ${d.questions[i].color}"  class="topquiz">  
            <p>${d.questions[i].title}</p>
            </div>
            <div class="todosR"> `;

        d.questions[i].answers.sort(comparador);

        for (let j = 0; j < d.questions[i].answers.length; j++) {
            html += `
            <div onclick="acerta(${i}, ${j});" class="resposta">
                <img src="${d.questions[i].answers[j].image}">
                <div class="preto">${d.questions[i].answers[j].text}</div>
            </div> `;
        }
        html += `
            </div>
        </div> `;
    }

    mostra.innerHTML = html;

    coloca = document.querySelectorAll(".resposta");
    cor = document.querySelectorAll(".preto");
    caixaq = document.querySelectorAll(".caixaQ");
    imgt = document.querySelector(".imgT");
}

function acerta(questao, resposta) {
    let x = 0;

    for (let i = 0; i < questao; i++) {
        x += d.questions[i].answers.length;
    }

    if (q[questao] === false) {
        q[questao] = true;
        if (d.questions[questao].answers[resposta].isCorrectAnswer === true) {
            acertou++;
            for (let i = 0; i < d.questions[questao].answers.length; i++) {
                if (d.questions[questao].answers[i] === d.questions[questao].answers[resposta]) {
                    cor[x].classList.add("verde");

                }
                else {
                    cor[x].classList.add("vermelho");
                    coloca[x].classList.add("opc");
                }
                x++;
            }
        }
        else {
            for (let i = 0; i < d.questions[questao].answers.length; i++) {
                if (d.questions[questao].answers[i] === d.questions[questao].answers[resposta]) {
                    cor[x].classList.add("vermelho");

                }
                else {
                    if (d.questions[questao].answers[i].isCorrectAnswer === true) {
                        cor[x].classList.add("verde");
                        coloca[x].classList.add("opc");
                    }
                    else {
                        cor[x].classList.add("vermelho");
                        coloca[x].classList.add("opc");
                    }
                }
                x++;
            }
        }

        setTimeout(function () {

            let tamanho = imgt.scrollHeight;
            for (let i = 0; i < caixaq.length; i++) {
                if (q[i] === false) {
                    break;
                }
                else {
                    tamanho += caixaq[i].scrollHeight;

                }

            }
            if (sai === false)
                window.scrollTo(0, tamanho);
        }, 2000);

        let clic = 0;
        for (let i = 0; i < q.length; i++) {
            if (q[i] === true)
                clic++;
        }

        if (clic === q.length) {
            sai = true;
            setTimeout(function () {
                ganhou();
                window.scrollTo(0, 10000);
            }, 2000);
        }

    }
}

function ganhou() {
    let nota = Math.round((acertou / q.length) * 100);
    const mostra = document.querySelector(".tela2");
    let html = ``;
    let maior = 0;

    for (let i = 0; i < d.levels.length; i++) {
       if (nota >= d.levels[i].minValue) 
        {
            if (d.levels[i].minValue >= maior) 
            {
                maior = d.levels[i].minValue;
                html = `
                <div class="caixaQ">
                    <div style="background: #EC362D"  class="topquiz">  
                    <p>${nota}% de acerto: ${d.levels[i].title}</p>
                    </div>
                    <div class="todosF">
                        <div class="resposta">
                        <img src="${d.levels[i].image}">
                        </div>
                        <div class="resposta">
                        <div class="preto">${d.levels[i].text}</div>
                        </div>
                    </div>
                </div> `;
            }
        }
    }

    html +=`<button class="botao2" onclick="renincia()">Reiniciar Quizz</button>
            <button class="botao3" onclick="voltarHome()">Voltar pra Home</button>
                `;

    mostra.innerHTML += html;

}

function renincia()
{
    acertou = 0;
    sai = false;
    for (let i = 0; i < q.length; i++)
    {
        q.pop;
    }
    for(let i = 0; i < coloca.length; i++)
    {
        coloca.pop;
    }
    for(let i = 0; i < caixaq.length; i++)
    {
        caixaq.pop;
    }
    for (let i = 0; i < cor.length; i++)
    {
        cor.pop;
    }
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/" + d.id
    );
    promessa.then(jogaQuizz);
}

function voltarHome()
{
    acertou = 0;
    sai = false;
    for(let i = 0; i < q.length; i++)
    {
        q.pop;
    }
    for(let i = 0; i < coloca.length; i++)
    {
        coloca.pop;
    }
    for(let i = 0; i < caixaq.length; i++)
    {
        caixaq.pop;
    }
    for (let i = 0; i < cor.length; i++)
    {
        cor.pop;
    }
    document.querySelector(".tela2").classList.add("escondido");
    document.querySelector(".tela1").classList.remove("escondido");
}

function comparador() {
    return Math.random() - 0.5;
}
