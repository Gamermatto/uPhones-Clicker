

// Elementi HTML
const bgm = new Audio('../assets/audio/Game1.mp4');
const settingsBtn = document.getElementById("settings-btn");
const settingsMenu = document.getElementById("settings-menu");
const audioToggle = document.getElementById("audio-toggle");
const themeToggle = document.getElementById("theme-toggle");

bgm.volume = 0.2;
// Impostare il loop
bgm.loop = true;
bgm.play()

// Stato dell'audio (disattivato o attivato)
let isAudioEnabled = true;

// Mostra o nasconde il menu di impostazioni
settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.toggle("hidden");

  // Cambia l'icona tra ⚙️ (ingranaggio) e − (meno)
  if (settingsMenu.classList.contains("hidden")) {
    settingsBtn.textContent = "⚙️"; // Mostra l'ingranaggio quando il menu è nascosto
  } else {
    settingsBtn.textContent = "⚙️"; // Mostra il simbolo meno quando il menu è visibile
  }
});

// Toggle per l’audio
audioToggle.addEventListener("change", () => {
  isAudioEnabled = !isAudioEnabled;
  if (isAudioEnabled) {
      bgm.volume = 0.2;
      
    // Logica per riattivare l’audio nel gioco
  } else {
    bgm.volume = 0;   
  }
});

// Toggle per il tema notturno
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeToggle.checked);
  console.log(themeToggle.checked ? "Tema notturno attivato" : "Tema chiaro attivato");
});
