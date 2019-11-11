
// Reload page - New Game
const btn = document.querySelector('.header__new-game-btn--reset');

btn.addEventListener('click', function() {
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

// Select all cards
const cards = document.querySelectorAll('.game-field__card');

let hasFlippedCard = false; 
let lockOtherCards = false;
let firstCard, secondCard;

function flipCard() {
    if (this === firstCard) return; // prevent the click on same card
    if (lockOtherCards) return; // prevent opening other cards besides two

    this.classList.add('js-is-flipped');

    if (hasFlippedCard == false) {
        hasFlippedCard = true;
        
        firstCard = this;
        return;
    } 

    secondCard = this;
    
    checkForMatch();
}

// Check Match
function checkForMatch() {
    if (firstCard.dataset.avenger === secondCard.dataset.avenger) {
        addLogo();
        disableCards();
        return;
    }
    unflipCards();
}

// Disable Cards if matched
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTwoCards();
}

// Unflip cards
const unflipCards = () => {
    lockOtherCards = true;

    setTimeout(() => {
        firstCard.classList.remove('js-is-flipped');
        secondCard.classList.remove('js-is-flipped');
        resetTwoCards();
    }, 1500);
};

// Add Hero-logo-badge in header
const addLogo = () => {
    headerTitle.remove();
    let img = document.createElement('img');
    
    for (let key in hero) {
        if (key === firstCard.dataset.avenger) {
            img.src = hero[key];
            img.dataset.avenger = key;
        }
    }
    img.classList.add('js-header__hero-logo');
    header.appendChild(img);
    showLogo();
    showVictory();
};

//-- Show Big picture of hero in center
function showLogo() {
    let logos = document.querySelectorAll('.js-header__hero-logo');
    let overlay = document.querySelector('.overlay');
    let popHero = document.querySelector('.overlay__hero-big-pic');

    logos.forEach(logo => {
        logo.addEventListener('click', function () {
            overlay.style.display = 'block';
    
            for (let key in bigHero) {
                
                if (key === logo.dataset.avenger) {
                    popHero.style.backgroundImage = bigHero[key];
                    
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 3000);
                    /* setTimeout(() => {
                        document.addEventListener('click', function() {
                            overlay.style.display = 'none';
                            document.removeEventListener('click', function() {
                                overlay.style.display = 'none'; });
                        });
                    
                    }, 2000); */
                }
            }
        });
    });
}

// Show Victory screen
let log = document.getElementsByClassName('js-header__hero-logo');

function showVictory() {
    let overlay = document.querySelector('.overlay');
    let bigHero = document.querySelector('.overlay__hero-big-pic');
    let victory = document.querySelector('.overlay__victory');

    if (log.length === 8) {

        setTimeout(() => {
            bigHero.style.display = 'none';
            overlay.style.display = 'block';
            victory.style.display = 'block';
        }, 1000);

        setTimeout(() => {
            bigHero.style.display = 'block';
            overlay.style.display = 'none';
            victory.style.display = 'none'; 
        }, 4500);
        
    }
    return;
}

// Reset to null first and second cards
const resetTwoCards = () => {
    [firstCard, secondCard] = [null, null];
    [hasFlippedCard, lockOtherCards] = [false, false];
};

// For each card
cards.forEach(card => {
    // Add event listener to every card
    card.addEventListener('click', flipCard);
    // shuffle cards
    card.style.order = Math.floor(Math.random() * 16);
});


