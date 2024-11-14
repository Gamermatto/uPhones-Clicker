// Definizione e configurazione dell'audio
const IM = new Audio('/assets/audio/InitialMusic.mp4');
IM.volume = 0.2;

window.onload = function() {
    const tips = [
        "If you use autoclick, you will be banned.",
        "If you are on mobile rotate your screen!.",
        "Respect others in the community.",
        "Make sure to save your progress often.",
        "Contact support if you encounter issues.",
        "Keep your account information secure."
    ];
    
    const tipText = document.getElementById('tip-text');
    const progressBar = document.querySelector('.progress');
    let index = 0;

    // Imposta il tempo di riempimento della barra a 20 secondi (20000 millisecondi)
    const fillTime = 20000;
    progressBar.style.transition = `width ${fillTime / 1000}s linear`;
    progressBar.style.width = '100%';
    IM.play();

    // Salva la posizione corrente ogni volta che cambia
    IM.ontimeupdate = function() {
    localStorage.setItem("musicTime", IM.currentTime);
    };

    // Inizializza la prima frase e cambia ogni 3 secondi
    tipText.textContent = tips[index];
    index++;

    const interval = setInterval(() => {
        tipText.textContent = tips[index];
        index++;

        // Se raggiunge l'ultima frase, ferma l'intervallo
        if (index === tips.length) {
            clearInterval(interval);
        }
    }, 3000);

    // Imposta il reindirizzamento a 21 secondi
    setTimeout(() => {
        window.location.href = './menu.html'; // cambia con il nome del file della pagina di destinazione
    }, fillTime + 1000); // 20000 + 1000 = 21000 (21 secondi)
};
