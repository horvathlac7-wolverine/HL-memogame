const game = document.getElementById("game");

// párok: kifejezés → eredmény
const pairs = [
    ["3 × 4", "12"],
    ["5 + 7", "12"],
    ["9 - 3", "6"],
    ["8 ÷ 2", "4"]
];

// kártyák listája
let cards = [];

// párok szétbontása
pairs.forEach(pair => {
    cards.push({ value: pair[0], pair: pair[1] });
    cards.push({ value: pair[1], pair: pair[1] });
});

// keverés
cards.sort(() => 0.5 - Math.random());

let first = null;
let second = null;

cards.forEach(data => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.pair = data.pair;
    card.textContent = "";

    card.addEventListener("click", () => {
        if (card.classList.contains("flipped") || second) return;

        card.textContent = data.value;
        card.classList.add("flipped");

        if (!first) {
            first = card;
        } else {
            second = card;

            // párosítás ellenőrzés
            if (first.dataset.pair === second.dataset.pair) {
                first = null;
                second = null;
            } else {
                setTimeout(() => {
                    first.textContent = "";
                    second.textContent = "";
                    first.classList.remove("flipped");
                    second.classList.remove("flipped");
                    first = null;
                    second = null;
                }, 1000);
            }
        }
    });

    game.appendChild(card);
});
