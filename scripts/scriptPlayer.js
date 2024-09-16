const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const trackName = document.getElementById('track-name');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');

const playlists = {
    playlist1: [

        { src: 'assets/audios/Villa-Lobos-Valsa-mística.mp3', name: 'Valsa Mística - Villa Lobos ', cover: 'assets/images/fotosPlayer/valsaMistica.jpg' },
        { src: 'assets/audios/Villa-Lobos-Bailado-infernal.mp3', name: 'Bailado Infernal - Villa Lobos', cover: 'assets/images/fotosPlayer/bailado.jpg' },
        { src: 'assets/audios/Pequena.mp3', name: 'Pequena Suite: l. Romancette - Villa Lobos', cover: 'assets/images/fotosPlayer/pequena.jpg' },
        { src: 'assets/audios/Villa-Lobos-Rodante.mp3', name: 'Rodante - Villa Lobos', cover: 'assets/images/fotosPlayer/rodante.jpg' },
        { src: 'assets/audios/Villa-Lobos-Afiandeira.mp3', name: 'A fiandeira - Villa Lobos', cover: 'assets/images/fotosPlayer/afia.jpg' },
        { src: 'assets/audios/Villa-Lobos-OTrenzinhoCaipira.mp3', name: 'O Trenzinho Caipira - Villa Lobos', cover: 'assets/images/fotosPlayer/trem.jpg' },
        { src: 'assets/audios/BachianasBrasileiras.mp3', name: 'Bachianas Brasileiras No. 5 - Villa Lobos', cover: 'assets/images/fotosPlayer/brasileiras.webp' },
    ],
    playlist2: [
        { src: 'assets/audios/ChegadeSaudade.mp3', name: 'Chega de Saudade - João Gilberto', cover: 'assets/images/fotosPlayer/saudade.jpeg' },
        { src: 'assets/audios/AsRosasNãoFalam.mp3', name: 'As Rosas Não Falam - Cartola', cover: 'assets/images/fotosPlayer/cartola.jpeg' },
        { src: 'assets/audios/ComqueRoupa.mp3', name: 'Com que Roupa - Noel Rosa', cover: 'assets/images/fotosPlayer/noelRosa.jpeg' },
    ],
    playlist3: [
        { src: 'assets/audios/GarotaDeIpanema.mp3', name: 'Garota de Ipanema - Tom Jobim', cover: 'assets/images/fotosPlayer/garotaIpanema.jpeg' },
        { src: 'assets/audios/Construção.mp3', name: 'Construção - Chico Buarque', cover: 'assets/images/fotosPlayer/construcao.jpg' },
        { src: 'assets/audios/Tropicalia.mp3', name: 'Tropicalia - Caetano Veloso', cover: 'assets/images/fotosPlayer/caetano.jpeg' },
        { src: 'assets/audios/AlegriaAlegria.mp3', name: 'Alegria, Alegria - Caetano Veloso', cover: 'assets/images/fotosPlayer/caetanoDois.jpeg' },
        { src: 'assets/audios/ÁguasdeMarço.mp3', name: 'Águas de Março - Tom Jobim e Elis Regina', cover: 'assets/images/fotosPlayer/aguas.jpeg' },
    ],
};

let currentTrack = 0;
let currentPlaylist = [];

function loadTrack(trackIndex) {
    const track = currentPlaylist[trackIndex];
    audio.src = track.src;
    trackName.textContent = track.name;
    cover.src = track.cover;
    audio.addEventListener('loadedmetadata', () => {
        progress.max = audio.duration;
        durationElem.textContent = formatTime(audio.duration);
    });
}

function playTrack() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = 'PAUSE';
    } else {
        audio.pause();
        playButton.textContent = 'PLAY';
    }
}

function playNextTrack() {
    currentTrack = (currentTrack + 1) % currentPlaylist.length;
    loadTrack(currentTrack);
    audio.play();
    playButton.textContent = 'PAUSE';
}

function playPrevTrack() {
    currentTrack = (currentTrack - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadTrack(currentTrack);
    audio.play();
    playButton.textContent = 'PAUSE';
}

function updateProgress() {
    progress.value = audio.currentTime;
    currentTimeElem.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function loadPlayer() {

    document.getElementById('player-container').classList.remove('hidden');

    document.getElementById('playlist-container').classList.add('hidden');

    loadTrack(currentTrack);
}

document.getElementById('load-player').addEventListener('click', () => {
    const playlistSelector = document.getElementById('playlist-selector');
    const selectedPlaylist = playlistSelector.value;
    if (selectedPlaylist && playlists[selectedPlaylist]) {
        currentPlaylist = playlists[selectedPlaylist];
        currentTrack = 0; // Reseta para a primeira faixa da playlist
        loadPlayer();
    } else {
        alert('Selecione uma playlist válida.');
    }
});

playButton.addEventListener('click', playTrack);
nextButton.addEventListener('click', playNextTrack);
prevButton.addEventListener('click', playPrevTrack);
progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
});

audio.addEventListener('timeupdate', updateProgress);

const voltar = document.getElementById('voltar');
voltar.addEventListener('click', () => {
    document.getElementById('player-container').classList.add('hidden');

    document.getElementById('playlist-container').classList.remove('hidden');
})