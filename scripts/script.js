window.addEventListener("DOMContentLoaded", () => {
    const playlists = document.querySelector(".playlists");
    function resetPlaylist() {
        const listaPlaylist = document.querySelectorAll(".playlist");        
        listaPlaylist.forEach((card) => {
                card.style.trasform = 'scale(100%)';
                card.style.opacity = '1';
                card.style.transition = 'all 0.6s ease';
        })
    }
    function teste(cardIgnorado) {
        const listaPlaylist = document.querySelectorAll(".playlist");
        listaPlaylist.forEach((card) => {
            if (cardIgnorado.className == "playlist" && card != cardIgnorado) {
                card.style.transition = 'all 0.6s ease'
                card.style.opacity = '0.5';
            }
            else if (cardIgnorado.className != "playlist" && card != cardIgnorado.closest("div")){
                card.style.transition = 'all 0.6s ease'
                card.style.opacity = '0.5';
            }
        })
    }
    playlists.addEventListener("mouseover", (evento) => {
        const elemento = evento.target;

        if (elemento.className == "playlist" || elemento.className == "titulo" || elemento.className == "imgCard" || elemento.className == "descricao") {
            teste(elemento);
        }
    })
    playlists.addEventListener("mouseout", (evento) => {
        resetPlaylist();
    })
})

// redirecionamento
const primeiro = document.getElementById('primeira');
primeiro.addEventListener('click',()=>{
    window.open('acervoPrimeira.html', '_blank')  ;
})
const segundo = document.getElementById('segunda');
segundo.addEventListener('click',()=>{
    window.open('acervoSegunda.html','_blank');
})
const terceiro = document.getElementById('terceira');
terceiro.addEventListener('click',()=>{
    window.open('acervoTerceira.html','_blank');
});