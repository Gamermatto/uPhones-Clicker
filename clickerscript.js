import { powerUpIntervals, upgrades } from "./constants/upgrades.js";
import { defaultSkillValues, defaultUpgradeValues } from "./constants/defaultValues.js";
import { nf } from "./utils/formatter.js";

// Seleziona l'elemento che mostra il costo degli uPhones e converte il suo valore in numero
let uPhones = document.querySelector('.uPhones-cost');
let parseduPhones = parseFloat(uPhones.innerHTML);

// Seleziona gli elementi per il testo che mostrano il guadagno per click (gpc) e per secondo (gps)
let uPpcText = document.getElementById("uPpc-text");
let uPpsText = document.getElementById("uPps-text");

// Seleziona il contenitore per l'immagine degli uPhones
let uPhonesImgContainer = document.querySelector('.uPhones-img-container');

let upgradesNavButton = document.getElementById('upgrades-nav-button');
let skillsNavButton = document.getElementById('skills-nav-button');
let artifactsNavButton = document.getElementById('artifacts-nav-button');

let prestigeButton = document.querySelector(".prestige-button");

let relic = document.getElementById("relic");

// Variabili iniziali per il guadagno per click (gpc) e per secondo (gps)
let uPpc = 1; // Guadagno iniziale per click

let uPps = 0; // Guadagno iniziale per second

// Funzione per incrementare gli uPhones al click
function incrementuPhones(event) {
  const clickingSound = new Audio('/assets/audio/click.wav');
  clickingSound.play(); // Starta il suono clicking

  // Incrementa il valore degli uPhones e lo aggiorna nel DOM
  uPhones.innerHTML = nf(parseduPhones += uPpc);

  const x = event.pageX; // Ottiene la posizione X del click
  const y = event.pageY; // Ottiene la posizione Y del click

  // Crea un elemento div per mostrare l'incremento
  const div = document.createElement('div');
  div.innerHTML = `+${Math.round(uPpc)}`; // Mostra il valore incrementato
  div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none; transform: translate(-50%, -50%)`;
  uPhonesImgContainer.appendChild(div); // Aggiunge il div al body della pagina

  div.classList.add('fade-up'); // Aggiunge la classe per l'animazione

  timeout(div); // Chiama la funzione per rimuovere il div dopo un certo tempo
}

const timeout = (div) => {
  setTimeout(() => {
    div.remove()
  }, 800)
}

// Funzione per rimuovere il div dopo un timeout
function buyUpgrade(upgrade) {
  const mu = upgrades.find((u) => {
    if (u.name === upgrade) return u
  })

  const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
  const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)
  const nextLevelP = document.getElementById(`${mu.name}-next-p`)

  console.log(`Current level: ${mu.level.textContent}`);  // O usa .innerHTML

  if (parseInt(mu.level.innerHTML) >= 50) {
    upgradeButton.disabled = true;  // Disabilita il bottone
    upgradeButton.style.opacity = 0.5;  // Rende il bottone meno visibile
    nextLevelP.innerHTML = "This is the max level.";  // Mostra il messaggio
    return;  // Ferma l'esecuzione della funzione e non permette l'acquisto
  }  

  if (parseduPhones >= mu.parsedCost) {
    const upgradeSound = new Audio('/assets/audio/upgrade.mp3')
    upgradeSound.volume = 0.1
    upgradeSound.play()

    uPhones.innerHTML = nf(parseduPhones -= mu.parsedCost);

    let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))

    if ( index !== -1 ) {
      upgradeDiv.style.cssText = `border-color: white`;
      nextLevelDiv.style.cssText =  `background-color: #5A5959; font-weight: normal`;
      mu.cost.innerHTML = nf(mu.parsedCost *= mu.costMultiplier)

      if ( mu.name === 'clicker' ) {
        uPpc *= mu.powerUps[index].multiplier
        nextLevelP.innerHTML = `+${mu.parsedIncrease} uPhones per click`
      } else {
        uPps -= mu.power
        mu.power *= mu.powerUps[index].multiplier
        uPps += mu.power
        nextLevelP.innerHTML = `+${mu.parsedIncrease} uPhones per second`
      }
    } 

    mu.level.innerHTML++

    index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))

    if ( index !== -1 ) {
      upgradeDiv.style.cssText = `border-color: orange`;
      nextLevelDiv.style.cssText =  `background-color: #CC4500; font-weight: bold`;
      nextLevelP.innerText = mu.powerUps[index].description

      mu.cost.innerHTML = nf(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML))
    } else {
      mu.cost.innerHTML = nf(mu.parsedCost *= mu.costMultiplier)
      mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.uPhonesMultiplier).toFixed(2))

      if ( mu.name === 'clicker') nextLevelP.innerHTML = `+${mu.parsedIncrease} uPhones per click`
      else nextLevelP.innerHTML = `+${mu.parsedIncrease} uPhones per second`
    }

    if ( mu.name === 'clicker' ) uPpc += mu.parsedIncrease
    else {
      uPps -= mu.power
      mu.power += mu.parsedIncrease
      uPps += mu.power
    }
  }
}

// Funzione per salvare o importare i dati del gioco
function save () {
  localStorage.clear();

  upgrades.map((upgrade) => {

    const obj = JSON.stringify({
      parsedLevel: parseFloat(upgrade.level.innerHTML),
      parsedCost: upgrade.parsedCost,
      parsedIncrease: upgrade.parsedIncrease
    })

    localStorage.setItem(upgrade.name, obj);

  })

  localStorage.setItem('uPpc', JSON.stringify(uPpc));
  localStorage.setItem('uPps', JSON.stringify(uPps));
  localStorage.setItem('uPhones', JSON.stringify(parseduPhones));
}

function load () {
  upgrades.map((upgrade) => {
    const savedValues = JSON.parse(localStorage.getItem(upgrade.name));

    upgrade.parsedCost = savedValues.parsedCost;
    upgrade.parsedIncrease = savedValues.parsedIncrease;

    upgrade.level.innerHTML = savedValues.parsedLevel;
    upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
    upgrade.increase.innerHTML = upgrade.parsedIncrease;
  })

  uPpc = JSON.parse(localStorage.getItem('uPpc'));
  uPps = JSON.parse(localStorage.getItem('uPps'));
  parseduPhones = JSON.parse(localStorage.getItem('uPhones'));

  uPhones.innerHTML = Math.round(parseduPhones);
}

function prestige () {
  upgrades.map((upgrade) => {
    const mu = defaultUpgradeValues.find((u) => { if (upgrade.name === u.name) return u })

    upgrade.parsedCost = mu.cost
    upgrade.parsedIncrease = mu.increase

    upgrade.level.innerHTML = 0
    upgrade.cost.innerHTML = mu.cost
    upgrade.increase.innerHTML = mu.increase

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)
    const nextLevelP = document.getElementById(`${mu.name}-next-p`)

    upgradeDiv.style.cssText = `border-color: white`;
    nextLevelDiv.style.cssText =  `background-color: #5A5959; font-weight: normal`;
    nextLevelP.innerHTML = `+${mu.increase} uPhones per click`
  })

  relic.innerHTML = Math.ceil(Math.sqrt(parseduPhones - 999999) / 300)

  uPpc = 1
  uPps = 0
  parseduPhones = 0
  uPhones.innerHTML = parseduPhones
}

// Funzione che aggiorna i valori di uPhones, gpc e gps ogni 100 ms
setInterval(() => {
  parseduPhones += uPps / 10; // Aggiunge il guadagno per secondo
  uPhones.innerHTML = nf(parseduPhones); // Aggiorna il valore degli uPhones
  uPpcText.innerHTML = Math.round(uPpc); // Aggiorna il testo del guadagno per click
  uPpsText.innerHTML = Math.round(uPps); // Aggiorna il testo del guadagno per secondo
  bgm.play(); // Starta il suono bgm

  if (parseduPhones >= 1_000_000) {
    prestigeButton.style.display = "block";
  } else {
    prestigeButton.style.display = "none";
  }
}, 100);

skillsNavButton.addEventListener("click", function() {
  const upgradeContainers = document.querySelectorAll(".upgrade");

  upgradeContainers.forEach((container) => {
    if ( container.classList.contains('type-skill') ) container.style.display = "flex";
    else container.style.display = "none";
  });
});

upgradesNavButton.addEventListener("click", function() {
  const upgradeContainers = document.querySelectorAll(".upgrade");

  upgradeContainers.forEach((container) => {
    if ( container.classList.contains('type-upgrade')) container.style.display = "flex";
    else container.style.display = "none";
  });
}); 

artifactsNavButton.addEventListener("click", function() {
  const upgradeContainers = document.querySelectorAll(".upgrade");

  upgradeContainers.forEach((container) => {
    if ( container.classList.contains('type-artifact')) container.style.display = "flex";
    else container.style.display = "none";
  });
});

window.incrementuPhones = incrementuPhones;
window.buyUpgrade = buyUpgrade;
window.save = save;
window.load = load;
window.prestige = prestige;
