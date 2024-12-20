
export const defaultUpgradeValues = [
  {name: 'clicker', image: '../assets/ClickUp.png', cost: 10, increase: 1, type: "upgrade"},
  {name: 'pickaxe', image: '../assets/pickaxe.png', cost: 60, increase: 4, type: "upgrade"},
  {name: 'miner', image: '../assets/miner.png', cost: 480, increase: 32, type: "upgrade"},
  {name: 'factory', image: '../assets/factory.png', cost: 42400, increase: 410, type: "upgrade"},
  {name: 'potion', image: '../assets/potion.png', cost: 52800, increase: 5500, type: "upgrade"},
];

export const defaultSkillValues = [
  {
   name: "Stronger Clicks",
   description: "Double your clicking power for 30 seconds",
   image: "./assets/skills/skill1.png",
   cd: 600,
   cost: 12000,
   type: "skill"
  },
  {
   name: "Lucky Day",
   description: "Gain 600 x UPPS worth of uPhones instantly",
   image: "./assets/skills/skill1.png",
   cd: 900,
   cost: 480000,
   type: "skill"
  },
];

export const defaultArtifactValues = [
  {
    name: "Artifact 1",
    description: "Permanetly increase all uPhones gained by x amount",
    image: "",
    type: "artifact"
  },
];