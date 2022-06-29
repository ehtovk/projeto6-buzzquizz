
const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promessa.then(carregaQuizz); 

function carregaQuizz(p)
{
    
    const mostra = document.querySelector(".todosQ");

    
    for (let i = 0; i < p.data.length; i++)
    {             
        mostra.innerHTML += `
        <div class="quizzes" onclick="tela2(${i});">
            <img src="${p.data[i].image}"/>
            <div class="tituloQ">${p.data[i].title}</div>
        </div>`;             
    }
}