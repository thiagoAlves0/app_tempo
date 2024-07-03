const images = [
    'assets/01.gif',
    'assets/02.gif',
    'assets/03.gif',
    'assets/04.gif',
    'assets/05.gif',
    'assets/06.gif',
    'assets/07.gif',
    'assets/08.gif',
    'assets/09.gif',
];

// Função para selecionar uma imagem aleatória
function alterarImagemDeFundo() {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url(${randomImage})`;
}

// Chama a função imediatamente para definir a primeira imagem
alterarImagemDeFundo();

// Define um intervalo para alterar a imagem de fundo a cada 4 segundos
setInterval(alterarImagemDeFundo, 4000);

//API 
const key = "1d3ef342067aa5f55091592a0cbfe443"

function dados_Box(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".C").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".txt-previsao").innerHTML = dados.weather[0].description
    document.querySelector(".umilde").innerHTML = dados.main.humidity + "%"
    document.querySelector(".previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}


async function buscarCidade(cidade) {

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())

    dados_Box(dados)
}

async function carregarDadosPorLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try {
                const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
                dados_Box(dados);
            } catch (error) {
                console.error('Erro ao buscar dados meteorológicos:', error);
            }
        }, (error) => {
            console.error('Erro ao obter localização:', error);
            // caso a localização não seja obtida:
            buscarCidade('São Paulo');
        });
    } else {
        console.error('Geolocalização não é suportada pelo navegador.');
        // caso a geolocalização não seja encontrada
        buscarCidade('São Paulo'); 
    }
}
document.addEventListener('DOMContentLoaded', carregarDadosPorLocalizacao);



function clic() {
    const cidade = document.querySelector(".input-city").value
    console.log(cidade)

    buscarCidade(cidade)
}