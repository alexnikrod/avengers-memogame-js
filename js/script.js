// --- Game's Logic --- 

const cards = document.querySelectorAll('.game-field__card');

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

cards.forEach(card => {
    // Add event listener to every card
    card.addEventListener('click', flipCard);
    // Shuffle cards
    const randomCardIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomCardIndex;
});

// ---Dynamic--- 

let hero = {
    blackpanther: './assets/images/Black_Panther.svg',
    blackwidow: './assets/images/Black_Widow.svg',
    captainamerica: './assets/images/Captain_America.svg',
    hawkeye: './assets/images/Hawkeye.svg',                                                                                 
    hulk: './assets/images/Hulk.svg',
    ironman: './assets/images/Iron_Man.svg',
    spiderman: './assets/images/Spider-Man.svg',
    thor: './assets/images/Thor.svg',
};

let bigHero = {
    blackpanther: 'url(./assets/images/big_blpanther.jpg)',
    blackwidow: 'url(./assets/images/big_blwidow.jpg)',
    captainamerica: 'url(./assets/images/big_cap.jpg)',
    hawkeye: 'url(./assets/images/big_hawkeye.jpg)',
    hulk: 'url(./assets/images/big_hulk.jpg)',
    ironman: 'url(./assets/images/big_ironman.jpg)',
    spiderman: 'url(./assets/images/big_spiderman.jpg)',
    thor: 'url(./assets/images/big_thor.jpg)',
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
            img.src = hero[key];
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
            overlay.style.display = 'block';
            headerTitle.remove(); // Remove info text
            // Show pic
            for (let key in bigHero) {
                if (key === logo.dataset.avenger) {
                    bigHeroPic.style.backgroundImage = bigHero[key];
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
            overlay.style.display = 'block';
            bigHeroPic.style.display = 'none';
            victory.style.display = 'block';
            victoryTitle.innerHTML = 'Assembled! Well done!';
            close();
        }, 700);
    }
    return;
};

// Close Overlay
const close = () => {
    const hideOverlay = () => {
        if (!event.target.closest('.js-hero-logo')) {
            overlay.style.display = 'none';
            bigHeroPic.style.display = 'block';
            victory.style.display = 'none';
            removeClickListener();
        }
    };

    const removeClickListener = () => {
        this.removeEventListener('click', hideOverlay);
    };

    setTimeout(() => {
        this.addEventListener('click', hideOverlay);
    }, 700);
};






