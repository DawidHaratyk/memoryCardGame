let technologyIcons = [
    '<i class="fab fa-react" data-tech="react" data-id="first"></i>',
    '<i class="fab fa-react" data-tech="react" data-id="second"></i>',
    '<i class="fab fa-vuejs" data-tech="vue" data-id="first"></i>',
    '<i class="fab fa-vuejs" data-tech="vue" data-id="second"></i>',
    '<i class="fab fa-html5" data-tech="html" data-id="first"></i>',
    '<i class="fab fa-html5" data-tech="html" data-id="second"></i>',
    '<i class="fab fa-css3-alt" data-tech="css" data-id="first"></i>',
    '<i class="fab fa-css3-alt" data-tech="css" data-id="second"></i>',
    '<i class="fab fa-js-square" data-tech="js" data-id="first"></i>',
    '<i class="fab fa-js-square" data-tech="js" data-id="second"></i>',
    '<i class="fab fa-angular" data-tech="angular" data-id="first"></i>',
    '<i class="fab fa-angular" data-tech="angular" data-id="second"></i>',
    '<i class="fab fa-python" data-tech="python" data-id="first"></i>',
    '<i class="fab fa-python" data-tech="python" data-id="second"></i>',
    '<i class="fab fa-php" data-tech="php" data-id="first"></i>',
    '<i class="fab fa-php" data-tech="php" data-id="second"></i>',
];

// Time counter
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const timeElement = document.querySelector('.time');
let minutes = 0;
let seconds = 0;

const timeCounter = () => {
    seconds++;

    if (seconds === 60) {
        seconds = 00;
        minutes++;
    }

    if (minutes < 10) {
        minutes = parseInt(minutes, 10);
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds;
}


// Moves Counter
const movesElement = document.querySelector('.moves-counter');
let movesCounter = 0;
let moves = 0;

const addMove = () => {
    movesCounter++;
    movesElement.innerHTML = movesCounter;
}


// Star Counter
const stars = document.querySelectorAll('.star');
const emptyStars = document.querySelectorAll('.empty-star');
let starIndex = 2;
// From nodeList to Array
let starArray = Array.from(stars);

const removeStar = () => {
    if (starIndex < 0) {
        starIndex = 0;
    }
    starArray[starIndex].style.opacity = '0';
    starIndex -= 1;
}

const addStar = () => {
    starIndex += 1;
    if (starIndex > 2) {
        starIndex = 2;
    }
    starArray[starIndex].style.opacity = '1';
}

// Stop game
const restartBtn = document.querySelector('.restart-btn');
const resultContainer = document.querySelector('.result-container');
let cardsArray = [];

const restartGame = () => {
    // Restart
    clearInterval(currentTime);

    if (gameStartBtn.innerHTML === 'in game') {
        currentTime = setInterval(timeCounter, 1000);
    }


    document.body.classList.remove('end-game-bgc');
    resultContainer.style.zIndex = '-1';
    resultContainer.innerHTML = '';

    minutesElement.innerHTML = '00';
    secondsElement.innerHTML = '00';
    minutes = 0;
    seconds = 0;
    movesCounter = 0;
    moves = 0;
    movesElement.innerHTML = movesCounter;
    starIndex = 2;
    backCardsCounter = 0;
    cardsArray = [];

    const removingBackCards = document.querySelectorAll('.back-card');
    const cards = document.querySelectorAll('.front-card');

    removingBackCards.forEach(card => {
        card.classList.remove('move-back');
        card.style.display = 'block';
    });
    cards.forEach(card => {
        card.classList.remove('move-front');
    })

    starArray.forEach(star => {
        star.style.opacity = '1';
    })

    if (technologyIcons.length === 0) {
        technologyIcons = [
            '<i class="fab fa-react" data-tech="react" data-id="first"></i>',
            '<i class="fab fa-react" data-tech="react" data-id="second"></i>',
            '<i class="fab fa-vuejs" data-tech="vue" data-id="first"></i>',
            '<i class="fab fa-vuejs" data-tech="vue" data-id="second"></i>',
            '<i class="fab fa-html5" data-tech="html" data-id="first"></i>',
            '<i class="fab fa-html5" data-tech="html" data-id="second"></i>',
            '<i class="fab fa-css3-alt" data-tech="css" data-id="first"></i>',
            '<i class="fab fa-css3-alt" data-tech="css" data-id="second"></i>',
            '<i class="fab fa-js-square" data-tech="js" data-id="first"></i>',
            '<i class="fab fa-js-square" data-tech="js" data-id="second"></i>',
            '<i class="fab fa-angular" data-tech="angular" data-id="first"></i>',
            '<i class="fab fa-angular" data-tech="angular" data-id="second"></i>',
            '<i class="fab fa-python" data-tech="python" data-id="first"></i>',
            '<i class="fab fa-python" data-tech="python" data-id="second"></i>',
            '<i class="fab fa-php" data-tech="php" data-id="first"></i>',
            '<i class="fab fa-php" data-tech="php" data-id="second"></i>',
        ];
        // jak przywrócić stan tablicy krótszym zapisem?
    }

    const backCards = document.querySelectorAll('.back-card');
    setTimeout(function() { randomPositionOfIcons(backCards) }, 1000);
}

// restartBtn.addEventListener('click', restartGame);


// Game logic
const checkTechnology = (cardsArray) => {
    const firstCardDataTech = cardsArray[0].previousElementSibling.querySelector('i').dataset.tech;
    const secondCardDataTech = cardsArray[1].previousElementSibling.querySelector('i').dataset.tech;

    const firstCardDataId = cardsArray[0].previousElementSibling.querySelector('i').dataset.id;
    const secondCardDataId = cardsArray[1].previousElementSibling.querySelector('i').dataset.id;

    const firstCardElement = cardsArray[0].previousElementSibling;
    const secondCardElement = cardsArray[1].previousElementSibling;

    if (firstCardDataTech === secondCardDataTech && !(firstCardDataId === secondCardDataId)) {
        addStar();
        setTimeout(() => {
            firstCardElement.style.display = 'none';
            secondCardElement.style.display = 'none';
            // gdy zrestartujemy grę to pokażą się na chwile pozycje ikon z aktualnej gry
        }, 1000);
    } else {     
        removeStar();
        setTimeout(() => {
            firstCardElement.classList.remove('move-back');
            secondCardElement.classList.remove('move-back');
            cardsArray[0].classList.remove('move-front');
            cardsArray[1].classList.remove('move-front');
        }, 1000);
    }
}

// Random position of cards
const randomPositionOfIcons = (backCards) => {
    backCards.forEach(card => {
        const randomNumber = Math.floor(Math.random() * technologyIcons.length);

        card.innerHTML = technologyIcons[randomNumber];
        technologyIcons.splice(randomNumber, 1);
    })
}


// Start game
const gameStartBtn = document.querySelector('.play-btn');
let currentTime;
let backCardsCounter = 0;

const startGame = () => {
    restartBtn.addEventListener('click', restartGame);
    
    gameStartBtn.removeEventListener('click', startGame);
    gameStartBtn.innerHTML = 'in game';

    // Time counter
    currentTime = setInterval(timeCounter, 1000);

    // Add card animation
    const cards = document.querySelectorAll('.front-card');

    // Checking moves
    const checkMoves = (e) => {
        const activeCard = e.target;
        activeCard.classList.add('move-front');
        activeCard.previousElementSibling.classList.add('move-back');

        cardsArray.push(activeCard);

        moves++;

        if (moves === 2) {
            moves = 0;
            addMove();

            cards.forEach(card => {
                card.removeEventListener('click', checkMoves);
            })

            checkTechnology(cardsArray);
            
            const firstCardTech = cardsArray[0].previousElementSibling.querySelector('i').dataset.tech;
            const secondCardTech = cardsArray[1].previousElementSibling.querySelector('i').dataset.tech;

            const firstCardId = cardsArray[0].previousElementSibling.querySelector('i').dataset.id;
            const secondCardId = cardsArray[1].previousElementSibling.querySelector('i').dataset.id;

                if (firstCardTech === secondCardTech && !(firstCardId === secondCardId)) {
                    backCardsCounter += 2;
                }
                if (backCardsCounter === 16) {
                    setTimeout(() => {
                        document.body.classList.add('end-game-bgc');
                        resultContainer.innerHTML = `<h1 class="result-headline">You are a Winner!</h1>
                        <p class="result-text">You won in ${minutes}minutes, ${seconds}seconds , using ${movesCounter}moves, for ${starIndex + 1}stars</p>
                        <button class="again-btn">Play another game!</button>`;
                        resultContainer.style.zIndex = '6';

                        const playAgainBtn = document.querySelector('.again-btn');
                        playAgainBtn.addEventListener('click', restartGame);
                    }, 1000)
                }

            cardsArray = [];

            setTimeout(() => {
                cards.forEach(card => {
                    card.addEventListener('click', checkMoves);
                });
            }, 1000)
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', checkMoves);
    })

    // Selecting a random icon for each card
    const backCards = document.querySelectorAll('.back-card');

    randomPositionOfIcons(backCards);
}

gameStartBtn.addEventListener('click', startGame);