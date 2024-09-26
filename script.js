let player;
let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// Carregar API do YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '450',
        width: '100%',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

function addVideo() {
    const url = document.getElementById('video-url').value;
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
        playlist.push(url);
        addToPlaylist(url);
        document.getElementById('video-url').value = '';
        if (!isPlaying) {
            playVideo(url);
            isPlaying = true;
        }
    } else {
        alert('URL inválida. Por favor, insira um link válido do YouTube.');
    }
}

function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
}

function addToPlaylist(url) {
    const playlistDiv = document.getElementById('playlist');
    const div = document.createElement('div');
    div.className = 'playlist-item d-flex justify-content-between align-items-center p-2 mb-2 bg-white';
    div.innerHTML = `
        <span>${url}</span>
        <div>
            <button class="btn btn-sm btn-outline-primary" onclick="playVideo('${url}')">Tocar</button>
            <button class="btn btn-sm btn-outline-danger" onclick="removeVideo(this)">Remover</button>
        </div>
    `;
    playlistDiv.appendChild(div);
}

function playVideo(url) {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
        player.loadVideoById(videoId, 0, "hd1080");
        currentIndex = playlist.indexOf(url);
    }
}

function playNextVideo() {
    if (currentIndex + 1 < playlist.length) {
        currentIndex++;
        playVideo(playlist[currentIndex]);
    } else {
        isPlaying = false; // Se não houver mais vídeos, a reprodução para
    }
}

function removeVideo(button) {
    const playlistItem = button.parentElement.parentElement;
    const videoUrl = playlistItem.querySelector('span').innerText;
    playlist = playlist.filter(url => url !== videoUrl);
    playlistItem.remove();
}

let musicCounter = 1;

function addToPlaylist(url) {
    const playlistDiv = document.getElementById('playlist');
    const div = document.createElement('div');
    div.className = 'playlist-item d-flex justify-content-between align-items-center p-2 mb-2 bg-white';
    const musicLabel = `musica${musicCounter.toString().padStart(2, '0')}`;
    musicCounter++;
    div.innerHTML = `
        <span>${musicLabel}</span>
        <div>
            <button class="btn btn-sm btn-outline-primary" onclick="playVideo('${url}')">Tocar</button>
            <button class="btn btn-sm btn-outline-danger" onclick="removeVideo(this)">Remover</button>
        </div>
    `;
    playlistDiv.appendChild(div);
}
