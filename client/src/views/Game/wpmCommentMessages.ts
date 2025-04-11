// this is a typewriting game, so we need to give the user feedback on their wpm (words per minute) score

const badWpmMessage = [
    "Du må øve mer! 😔",
    "Ikke gi opp! 💪",
    "Du kan bli bedre! 🌱",
    "Du kan gjøre det bedre! 🌟",
    "Ikke vær så hard mot deg selv! ❤️",
    "Du er på rett vei! 🛤️",
    "Du er på vei til å bli en mester! 🏅",
    "Bare fortsett å øve! 📚",
    "Husk, øvelse gjør mester! 🏆",
];

const averageWpmMessage = [
    "Du er på rett spor! 👍",
    "Du gjør det bra! 🌈",
    "Du er på vei til å bli en mester! 🏅",
]

const goodWpmMessage = [
    "Du er så flink 😎",
    "Wow, du er rask! 🚀",
    "Du er en skrive-mester! 🏆",
    "Du er en typing ninja! 🥷",
    "Du er en skrive-kriger! ⚔️",
    "Du er en skrive-guru! 🧘‍♂️",
    "Du er en skrive-legende! 🦸‍♂️",
    "Du er en skrive-superhelt! 🦸‍♀️",
    "Du er en skrive-robot! 🤖",
    "Du er en skrive-ekspert! 👨‍🏫",
    "Du er en skrive-mester! 👩‍🏫",
];

export const getRandomWpmMessage = (wpm: number, highscore: number) => {
    if (wpm < highscore * 0.5) {
        const randomIndex = Math.floor(Math.random() * badWpmMessage.length);
        return badWpmMessage[randomIndex];
    } else if (wpm > highscore) {
        const randomIndex = Math.floor(Math.random() * goodWpmMessage.length);
        return goodWpmMessage[randomIndex];
    } else {
        const randomIndex = Math.floor(Math.random() * averageWpmMessage.length);
        return averageWpmMessage[randomIndex];
    }

};
