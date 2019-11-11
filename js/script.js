
// reload page ??
const btn = document.querySelector('.reset');

btn.addEventListener('click', function() {
    location.reload(true);
});

// add logo in header
const header = document.querySelector('.header');
const title = document.querySelector('.title');

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
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; 
let lockOtherCards = false;
let firstCard, secondCard;

// Flip card
/* const flipCard = event => {
//Get the parent element of element that triggered a specific event(click):
    let target = event.target.parentElement;
}; */

function flipCard() {
    if (this === firstCard) return; // prevent the click on same card
    if (lockOtherCards) return; // prevent opening other cards besides two

    this.classList.add('flip');

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
         // разное время?
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
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTwoCards();
    }, 1500);
};



// Add logo-badge in header
const addLogo = () => {
    title.remove();
    let img = document.createElement('img');
    
    for (let key in hero) {
        if (key === firstCard.dataset.avenger) {
            img.src = hero[key];
            img.dataset.avenger = key;
        }
    }
    img.classList.add('logo');
    header.appendChild(img);
    showLogo();
    showVictory();
};



//-- Show Big picture of hero in center


function showLogo() {
    let logos = document.querySelectorAll('.logo');
    let overlay = document.querySelector('.overlay');
    let popHero = document.querySelector('.big-hero');
    console.log(logos);

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
let log = document.getElementsByClassName('logo');

function showVictory() {
    let overlay = document.querySelector('.overlay');
    let bigHero = document.querySelector('.big-hero');
    let victory = document.querySelector('.victory');
    let victoryCard = document.querySelector('.victory-card');

    if (log.length === 8) {

        setTimeout(() => {
            bigHero.style.display = 'none';
            /* overlay.style.backgroundImage = 'url(./assets/images/Avengers.svg)'; */
            /* overlay.style.zIndex = 6; */
            /* overlay.classList.add('fade');  */
            overlay.style.display = 'block';
            victory.style.display = 'block';
            victoryCard.style.display = 'block';
        }, 1000);

        setTimeout(() => {
            bigHero.style.display = 'block';
            overlay.style.display = 'none';
            /* overlay.style.backgroundImage = 'none'; */
            victory.style.display = 'none'; 
            victoryCard.style.display = 'none';
        }, 4500);
        
    }
    return;
}

// Reseting to null first and second cards
const resetTwoCards = () => {
    [firstCard, secondCard] = [null, null];
    [hasFlippedCard, lockOtherCards] = [false, false];
};

// for each card
cards.forEach(card => {
    // Add event listener to every card
    card.addEventListener('click', flipCard);
    // shuffle cards
    card.style.order = Math.floor(Math.random() * 16);
});



