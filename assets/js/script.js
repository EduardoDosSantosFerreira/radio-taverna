let player; // Variável para armazenar o player do YouTube
let playlist = []; // Array para armazenar a lista de vídeos
let currentIndex = 0; // Índice do vídeo atual na playlist
let isPlaying = false; // Flag para verificar se um vídeo está sendo reproduzido

// Carregar API do YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '450', // Altura do player
        width: '100%', // Largura do player
        events: {
            'onStateChange': onPlayerStateChange // Evento para monitorar mudanças no estado do player
        }
    });
}

// Função chamada quando o estado do player muda
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) { // Verifica se o vídeo terminou
        playNextVideo(); // Toca o próximo vídeo da playlist
    }
}

// Função para adicionar um vídeo à playlist
function addVideo() {
    const url = document.getElementById('video-url').value; // Obtém a URL do vídeo do input
    const videoId = getYouTubeVideoId(url); // Extrai o ID do vídeo da URL
    if (videoId) { // Verifica se o ID do vídeo é válido
        playlist.push(url); // Adiciona a URL do vídeo à playlist
        addToPlaylist(url); // Adiciona o vídeo à interface da playlist
        document.getElementById('video-url').value = ''; // Limpa o input
        if (!isPlaying) { // Verifica se nenhum vídeo está sendo reproduzido
            playVideo(url); // Toca o vídeo adicionado
            isPlaying = true; // Define a flag como verdadeira
        }
    } else {
        alert('URL inválida. Por favor, insira um link válido do YouTube.'); // Alerta para URL inválida
    }
}

// Função para extrair o ID do vídeo do YouTube a partir da URL
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/; // Expressão regular para capturar o ID do vídeo
    const match = url.match(regExp); // Aplica a expressão regular na URL
    return (match && match[2].length == 11) ? match[2] : null; // Retorna o ID do vídeo se for válido
}

// Função para adicionar o vídeo à interface da playlist
function addToPlaylist(url) {
    const playlistDiv = document.getElementById('playlist'); // Obtém o elemento da playlist
    const div = document.createElement('div'); // Cria um novo div para o item da playlist
    div.className = 'playlist-item d-flex justify-content-between align-items-center p-2 mb-2 bg-white'; // Define a classe do div
    div.innerHTML = `
        <span>${url}</span> <!-- Exibe a URL do vídeo -->
        <div>
            <button class="btn btn-sm btn-outline-primary" onclick="playVideo('${url}')">Tocar</button> <!-- Botão para tocar o vídeo -->
            <button class="btn btn-sm btn-outline-danger" onclick="removeVideo(this)">Remover</button> <!-- Botão para remover o vídeo -->
        </div>
    `;
    playlistDiv.appendChild(div); // Adiciona o div à playlist
}

// Função para tocar um vídeo
function playVideo(url) {
    const videoId = getYouTubeVideoId(url); // Obtém o ID do vídeo a partir da URL
    if (videoId) { // Verifica se o ID do vídeo é válido
        player.loadVideoById(videoId, 0, "hd1080"); // Carrega e toca o vídeo no player
        currentIndex = playlist.indexOf(url); // Atualiza o índice do vídeo atual
    }
}

// Função para tocar o próximo vídeo da playlist
function playNextVideo() {
    if (currentIndex + 1 < playlist.length) { // Verifica se há mais vídeos na playlist
        currentIndex++; // Incrementa o índice do vídeo atual
        playVideo(playlist[currentIndex]); // Toca o próximo vídeo
    } else {
        isPlaying = false; // Se não houver mais vídeos, a reprodução para
    }
}

// Função para remover um vídeo da playlist
function removeVideo(button) {
    const playlistItem = button.parentElement.parentElement; // Obtém o elemento do item da playlist
    const videoUrl = playlistItem.querySelector('span').innerText; // Obtém a URL do vídeo
    playlist = playlist.filter(url => url !== videoUrl); // Remove o vídeo da playlist
    playlistItem.remove(); // Remove o elemento da interface
}

let musicCounter = 1; // Contador para numerar as músicas

// Função para adicionar o vídeo à interface da playlist com numeração
function addToPlaylist(url) {
    const playlistDiv = document.getElementById('playlist'); // Obtém o elemento da playlist
    const div = document.createElement('div'); // Cria um novo div para o item da playlist
    div.className = 'playlist-item d-flex justify-content-between align-items-center p-2 mb-2 bg-white'; // Define a classe do div
    const musicLabel = `musica${musicCounter.toString().padStart(2, '0')}`; // Cria um rótulo numerado para a música
    musicCounter++; // Incrementa o contador de músicas
    div.innerHTML = `
        <span>${musicLabel}</span> <!-- Exibe o rótulo numerado da música -->
        <div>
            <button class="btn btn-sm btn-outline-primary" onclick="playVideo('${url}')">Tocar</button> <!-- Botão para tocar o vídeo -->
            <button class="btn btn-sm btn-outline-danger" onclick="removeVideo(this)">Remover</button> <!-- Botão para remover o vídeo -->
        </div>
    `;
    playlistDiv.appendChild(div); // Adiciona o div à playlist
}
