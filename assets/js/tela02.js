
function tela2(i)
{
    alert(i);
    document.querySelector(".tela1").classList.add("escondido");
    document.querySelector(".tela2").classList.remove("escondido");
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/"+i
      );
      promessa.then(jogaQuizz); 
}

function jogaQuizz(prome)
{
    const d = prome.data;
    let html = ``;
    const mostra = document.querySelector(".tela2");


    html += `<div class="imgT">
                <img src="${d.image}">
                <h1>${d.title}</h1>
            </div>`; 

    for (let i = 0; i < d.questions.length; i++)
    {             
        html += `
        <div class="caixaQ">
            <div style="background: ${d.questions[i].color}"  class="topquiz">  
            <p>${d.questions[i].title}</p>
            </div>
            <div class="todosR"> `;
        
        for(let j = 0; j < d.questions[i].answers.length; j++)
        {
            html += `
            <div class="resposta">
                <img src="${d.questions[i].answers[j].image}">
                <p>${d.questions[i].answers[j].text}</p>
            </div> `;
        }
        html += `
            </div>
        </div> `;      
    }

    mostra.innerHTML = html;
}