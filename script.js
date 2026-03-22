const game = document.getElementById("game");

// párok: kifejezés → eredmény
const pairs = [
    ["sin 0°", "0"],
    ["cos 0°", "1"],
    ["cos 180°", "-1"],
    ["sin 30°", "0.5"],
    ["90°", "pí fele"],
    ["270°", "3pí/2"],
    ["360°", "2pí"],
    ["30°", "pí hatoda"]
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
