import { defaultUpgradeValues } from "./defaultValues.js";

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container');
    const template = document.getElementById('upgrade-template').textContent;
  
    defaultUpgradeValues.forEach((obj) => {
      let html = template;
  
      Object.keys(obj).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, obj[key]);
      });
  
      upgradesContainer.innerHTML += html
    });
  }
  
  createUpgrades()

// Array per gestire gli aggiornamenti disponibili nel gioco
export const upgrades = [
    {
      name: 'clicker',
      cost: document.querySelector(".clicker-cost"),
      parsedCost: parseFloat(document.querySelector(".clicker-cost").innerHTML),
      increase: document.querySelector(".clicker-increase"),
      parsedIncrease: parseFloat(document.querySelector(".clicker-increase").innerHTML),
      level: document.querySelector(".clicker-level"),
      powerUps: [
        {
          name: "2x clicker",
          description: "double your clicking power",
          multiplier: 2,
        },
        {
          name: "3x clicker",
          description: "triple your clicking power",
          multiplier: 3,
        },
        {
          name: "2x clicker",
          description: "double your clicking power",
          multiplier: 2,
        },
      ],
      uPhonesMultiplier: 1.025, // Moltiplicatore per uPhones per questo upgrade
      costMultiplier: 1.12, // Moltiplicatore per il costo per questo upgrade
    },
    {
      name: 'pickaxe',
      cost: document.querySelector(".pickaxe-cost"),
      parsedCost: parseFloat(document.querySelector(".pickaxe-cost").innerHTML),
      increase: document.querySelector(".pickaxe-increase"),
      parsedIncrease: parseFloat(document.querySelector(".pickaxe-increase").innerHTML),
      level: document.querySelector(".pickaxe-level"),
      powerUps: [
        {
          name: "2x pickaxe",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
        {
          name: "3x pickaxe",
          description: "triple your pickaxe efficiency",
          multiplier: 3,
        },
        {
          name: "2x pickaxe",
          description: "double your pickaxe efficiency",
          multiplier: 2,
        },
      ],
      power: 0,
      uPhonesMultiplier: 1.04,
      costMultiplier: 1.115,
    },
    {
      name: 'miner',
      cost: document.querySelector(".miner-cost"),
      parsedCost: parseFloat(document.querySelector(".miner-cost").innerHTML),
      increase: document.querySelector(".miner-increase"),
      parsedIncrease: parseFloat(document.querySelector(".miner-increase").innerHTML),
      level: document.querySelector(".miner-level"),
      powerUps: [
        {
          name: "2x miner",
          description: "double your miner efficiency",
          multiplier: 2,
        },
        {
          name: "3x miner",
          description: "triple your miner efficiency",
          multiplier: 3,
        },
        {
          name: "2x miner",
          description: "double your miner efficiency",
          multiplier: 2,
        },
      ],
      power: 0,
      uPhonesMultiplier: 1.035,
      costMultiplier: 1.11,
    },
    {
      name: 'factory',
      cost: document.querySelector(".factory-cost"),
      parsedCost: parseFloat(document.querySelector(".factory-cost").innerHTML),
      increase: document.querySelector(".factory-increase"),
      parsedIncrease: parseFloat(document.querySelector(".factory-increase").innerHTML),
      level: document.querySelector(".factory-level"),
      powerUps: [
        {
          name: "2x factory",
          description: "double your factory efficiency",
          multiplier: 2,
        },
        {
          name: "3x factory",
          description: "triple your factory efficiency",
          multiplier: 3,
        },
        {
          name: "2x factory",
          description: "double your factory efficiency",
          multiplier: 2,
        },
      ],
      power: 0,
      uPhonesMultiplier: 1.04,
      costMultiplier: 1.10,
    },
    {
      name: 'potion',
      cost: document.querySelector(".potion-cost"),
      parsedCost: parseFloat(document.querySelector(".potion-cost").innerHTML),
      increase: document.querySelector(".potion-increase"),
      parsedIncrease: parseFloat(document.querySelector(".potion-increase").innerHTML),
      level: document.querySelector(".potion-level"),
      powerUps: [
        {
          name: "2x potion",
          description: "double your potion efficiency",
          multiplier: 2,
        },
        {
          name: "3x potion",
          description: "triple your potion efficiency",
          multiplier: 3,
        },
        {
          name: "2x potion",
          description: "double your potion efficiency",
          multiplier: 2,
        },
      ],
      power: 0,
      uPhonesMultiplier: 1.045,
      costMultiplier: 1.096,
    },
  ];

export const powerUpIntervals = [10, 20, 30, 50, 70, 100, 150, 200, 250, 300];