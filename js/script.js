
// Reload page - New Game
const btn = document.querySelector('.header__btn--reset');

btn.addEventListener('click', () => {
    location.reload(true);
});

// Add Hero-logo in header
const header = document.querySelector('.header__title');
const headerTitle = document.querySelector('.header__title__h1');

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

//-----Features----//
// Add hero's logo in header if match
let h1 = document.createElement('h1');
let herosLogo = document.getElementsByClassName('js-hero-logo');

const addLogo = () => {
    headerTitle.remove();
    let img = document.createElement('img');
    
    for (let key in hero) {
        if (key === firstCard.dataset.avenger) {
            img.src = hero[key];
            img.dataset.avenger = key;
        }
    }
    img.classList.add('js-hero-logo');
    header.appendChild(img);
    
    if (herosLogo.length <= 1) {
            h1.innerHTML = 'click the badge';
            h1.classList.add('js-header__title--sign');
            header.appendChild(h1);
        }
    if (herosLogo.length > 1) {
        h1.remove();
    }
    
    showLogo();
    showVictory();
};
//-- Overlays --//
let overlay = document.querySelector('.overlay');
let bigHeroPic = document.querySelector('.overlay__hero-big');
let victory = document.querySelector('.overlay__victory');
let victoryTitle = document.querySelector('.js-victory-title');

//-- Show big picture of hero in center
function showLogo() {
    let logos = document.querySelectorAll('.js-hero-logo');
    
    let popHero = document.querySelector('.overlay__hero-big');
    
    logos.forEach(logo => {
        logo.addEventListener('click', function () {
            overlay.style.display = 'block';
            
            h1.remove();
            for (let key in bigHero) {
                
                if (key === logo.dataset.avenger) {
                    popHero.style.backgroundImage = bigHero[key];
                    close();
                }
            }
        });
    });
}

// Show Victory screen
function showVictory() {
    if (herosLogo.length === 8) {
        
        setTimeout(() => {
            victoryTitle.innerHTML = 'Assembled! Well done!';
            bigHeroPic.style.display = 'none';
            overlay.style.display = 'block';
            victory.style.display = 'block';
            close();
        }, 700);
    }
    return;
}

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






