window.onload = () => {
    layCards();
    addEventToCards();
};

// Lay new cards
const layCards = () => {
    for (let key in hero) {
        let gameField = document.querySelector('.game-field');
        for (let i = 0; i < 2; i++ ) {
            gameField.insertAdjacentHTML('afterbegin', `
            <div class="game-field__card" data-avenger="${key}">
                <img class="game-field__card--face" src="${hero[key][2]}">
                <img class="game-field__card--back" src="./assets/images/bg_avengers.jpg">
            </div>`);
        }
    }
};

// --- Game's Logic --- 
let cards = document.getElementsByClassName('game-field__card');
let hasFlippedCard = false; 
let lockOtherCards = false;
let firstCard, secondCard;

function flipCard() {
    if (this === firstCard) return; // prevent the click on same card
    if (lockOtherCards) return; // prevent opening other cards more then two

    this.classList.add('js-is-flipped');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
    // Second click
    secondCard = this;
    // Check for match
    checkForMatch();
}

// Check for match
const checkForMatch = () => {
    if (firstCard.dataset.avenger === secondCard.dataset.avenger) {
        addLogo(); // add hero's logo in header
        disableCards();
        return;
    }
    unflipCards();
};

// Disable two cards if matched
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTwoCards();
};

// Unflip cards
const unflipCards = () => {
    lockOtherCards = true;

    setTimeout(() => {
        firstCard.classList.remove('js-is-flipped');
        secondCard.classList.remove('js-is-flipped');
        resetTwoCards();
    }, 1500);
};

// Reset first and second card 
const resetTwoCards = () => {
    [firstCard, secondCard] = [null, null];
    [hasFlippedCard, lockOtherCards] = [false, false];
};

// Add event listener to cards and shuffle 
const addEventToCards = () => {
    [...cards].forEach(card => {
        card.addEventListener('click', flipCard);
        // Shuffle cards
        const randomCardIndex = Math.floor(Math.random() * cards.length);
        card.style.order = randomCardIndex; 
    });
};

//---Features---//

// Reload page - New Game
const btn = document.querySelector('.header__btn--reset');

btn.addEventListener('click', () => {
    location.reload(true);
});

// Add hero's logo in header if match
const header = document.querySelector('.header__title');
const headerTitle = document.querySelector('.js-header-title');
let herosLogo = document.getElementsByClassName('js-hero-logo');

const addLogo = () => {
    let img = document.createElement('img');
    
    for (let key in hero) {
        if (key === firstCard.dataset.avenger) {
            img.src = hero[key][0];
            img.dataset.avenger = key;
        }
    }
    img.classList.add('js-hero-logo');
    headerTitle.innerHTML = ''; // Remove title
    header.appendChild(img); // Add logo
    
    if (herosLogo.length <= 1) { // Show info once
            headerTitle.innerHTML = 'click the badge'; 
            headerTitle.classList.add('js-click-text');
            header.appendChild(headerTitle);
        }
    if (herosLogo.length > 1) {
        headerTitle.remove();
    }
    
    showBigHero();
    showVictory(); 
};

//-- Overlays --//
let overlay = document.querySelector('.overlay');
let bigHeroPic = document.querySelector('.overlay__hero-big');
let victory = document.querySelector('.overlay__victory');
let victoryTitle = document.querySelector('.js-victory-title');

// Show big picture of hero over game's field
const showBigHero = () => {
    Array.from(herosLogo).forEach(logo => {
        logo.addEventListener('click', () => {
            show(overlay);
            headerTitle.remove(); // Remove info text
            // Show pic
            for (let key in hero) {
                if (key === logo.dataset.avenger) {
                    bigHeroPic.style.backgroundImage = hero[key][1];
                    close();
                }
            }
        });
    });
};

// Show Victory screen
const showVictory = () => {
    if (herosLogo.length === 8) {
        setTimeout(() => {
            show(overlay);
            hide(bigHeroPic);
            show(victory);
            victoryTitle.innerHTML = 'Assembled! Well done!';
            victory.insertAdjacentHTML('afterbegin', `
                <img  class="js-victory-logo" src="./assets/images/Avengers.svg">`);
            close();
        }, 500);
    }
    return;
};

// Close Overlay
const close = () => {
    const hideOverlay = () => {
        if (!event.target.closest('.js-hero-logo')) {
            hide(overlay);
            show(bigHeroPic);
            hide(victory);
            removeClickListener();
        }
    };

    const removeClickListener = () => {
        this.removeEventListener('click', hideOverlay);
    };

    setTimeout(() => {
        this.addEventListener('click', hideOverlay);
    }, 500);
};

function show($el) {
    $el.style.display = 'block';
}

function hide($el) {
    $el.style.display = 'none';
}

// ---Images--- 
let hero = {
    blackpanther: [
        './assets/images/Black_Panther.svg',
        'url(./assets/images/big_blpanther.jpg)',
        './assets/images/blackpanther.webp'
    ],
    blackwidow: [
        './assets/images/Black_Widow.svg',
        'url(./assets/images/big_blwidow.jpg)',
        './assets/images/blackwidow.webp'
    ],
    captainamerica: [
        './assets/images/Captain_America.svg',
        'url(./assets/images/big_cap.jpg)',
        './assets/images/captainamerica.webp'
    ],
    hawkeye: [
        './assets/images/Hawkeye.svg',
        'url(./assets/images/big_hawkeye.jpg)',
        './assets/images/hawkeye.webp'
    ],                                                                                 
    hulk: [
        './assets/images/Hulk.svg',
        'url(./assets/images/big_hulk.jpg)',
        './assets/images/hulk.webp'
    ],
    ironman: [
        './assets/images/Iron_Man.svg',
        'url(./assets/images/big_ironman.jpg)',
        './assets/images/ironman.webp'
    ],
    spiderman: [
        './assets/images/Spider-Man.svg',
        'url(./assets/images/big_spiderman.jpg)',
        './assets/images/spiderman.webp'
    ],
    thor: [
        './assets/images/Thor.svg',
        'url(./assets/images/big_thor.jpg)',
        './assets/images/thor.webp'
    ],
};

