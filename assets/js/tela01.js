
const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promessa.then(carregaQuizz); 

function carregaQuizz(p)
{
    if(document.querySelector(".tela1").classList === "tela1");
    {
    const mostra = document.querySelector(".todosQ");
    
    for (let i = 0; i < p.data.length; i++)
    {             
        mostra.innerHTML += `
        <div class="quizzes" onclick="tela2(${p.data[i].id});">
            <img src="${p.data[i].image}"/>
            <div class="tituloQ">${p.data[i].title}</div>
        </div>`;             
    }
    }
}