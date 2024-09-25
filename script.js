const allIngredients = ["Tomato", "Lettuce", "Cheese", "Onion", "Bacon", "Pickle", 
    "Patty", "Buns", "Beans", "Tortilla", "Pasta", "Tomato Sauce", "Eggs", 
    "Peanut Butter","Jelly","Bread", "Bagel","Butter", "Pancakes", "Butter", "Syrup", 
    "Waffles","Mayo","Mustard"];
let ingredients = ["Tomato", "Lettuce", "Cheese", "Onion" ]; 

const orders = {
    "BLT": ["Bacon", "Lettuce", "Tomato","Bread"],
    "Cheeseburger": ["Cheese", "Patty", "Buns"],
    "Salad": ["Lettuce", "Onion", "Tomato"],
    "Hamburger": ["Patty", "Buns"],
    "Baconator": ["Patty", "Buns", "Cheese", "Bacon"],
    "Bean and Cheese Burrito": ["Beans", "Cheese", "Tortilla"],
    "Mac and Cheese": ["Pasta", "Cheese"],
    "Spaghetti": ["Pasta", "Tomato Sauce", "Cheese"],
    "Scrambled Eggs": ["Eggs", "Cheese"],
    "Peanut Butter and Jelly":["Peanut Butter","Jelly","Bread"],
    "Bagel with Butter":["Bagel","Butter"],
    "Pancakes with Butter and Syrup":["Pancakes","Butter","Syrup"],
    "Waffles with Butter and Syrup":["Waffles","Butter","Syrup"],
    "Egg Salad Sandwich":["Bread","Eggs","Mayo","Mustard"],
    "Bacon, Egg and Cheese Bagel": ["Bagel", "Bacon", "Eggs", "Cheese"]
};

let flippedCards = [];
let currentOrder = [];
let cardElements = [];
let numOfCards = 4;  // Start with 4 cards
let revealTime = 6000;  // Start with 6 seconds
const initialNumOfCards = 4;
const initialRevealTime = 6000;
const minRevealTime = 2500;  // Minimum reveal time (2 seconds)
let dishesServed = 0; // Number of dishes served in current game
let highScore = localStorage.getItem('highScore') || 0; // Load high score from localStorage

let player;
let isMusicPlaying = true;

const gordonGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2NzanFidmJhdGZjZmJucncxMWZ6aXkycGY0MzhlZno5ZWhyb2ZocCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT9DPJVjlYHwWsZRxm/giphy.gif",
    "https://media.giphy.com/media/l3V0H7bYv5Ml5TOfu/giphy.gif?cid=ecf05e47d9mr8ho7np40hmd21m8rpmv3okwqkfcl2kyphiz8&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/2kMQiSEW6Wkyh3YltH/giphy.gif?cid=790b7611optvsn0nbevccikfbjq8js72u5arvhuxsjzxstlg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/Ek57KMkeSM5MemJyC5/giphy.gif?cid=ecf05e47rftvrnlg7t27tcln3adfqfgwacepu6x9plbctgqy&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/QKUjYdCuDLlo5f75ZO/giphy.gif?cid=ecf05e47mqqsx4r1bqs3wynz16mvyjlyi98n83e4uhwqzvyy&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/xUOwGfotV8fWvYnv5C/giphy.gif?cid=ecf05e4791lvel7c33btsi80s0d1jtm99ddel140jerv5iio&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/3oFzlY0DO131GoCFva/giphy.gif?cid=ecf05e47olvmkyts1behrf5a4gnyu05uv1hzps93trd84hbn&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/sC8lOMglN2dqw/giphy.gif?cid=ecf05e471z1t2a7txb5kr2u3jlc7vnid2yha7oerxuq4fqci&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/Nmh41I1Ef3vOXiaTaZ/giphy.gif?cid=ecf05e471z1t2a7txb5kr2u3jlc7vnid2yha7oerxuq4fqci&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/l0HUfeRgKrWctz5ny/giphy.gif?cid=ecf05e478jhs7z1s14s017vjxy8jp7zwdaj4dib19ed8xnuw&ep=v1_gifs_search&rid=giphy.gif&ct=g"
];

const gordonGifElement = document.getElementById("gordon-gif"); // Element to display the gif

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'Uc0RmO6oVkE',
        events: {
            'onReady': onPlayerReady,
        },
        playerVars: {
            'loop': 1,
            'playlist': 'Uc0RmO6oVkE',
            'autoplay': 1,
        }
    });
}

function onPlayerReady(event) {
    if (isMusicPlaying) {
        event.target.playVideo(); // Start music automatically
    } else {
        event.target.pauseVideo();
    }
}

const musicToggle = document.getElementById('music-toggle');
musicToggle.addEventListener('change', function() {
    if (musicToggle.checked) {
        isMusicPlaying = true;
        player.playVideo(); // Play music when toggled on
    } else {
        isMusicPlaying = false;
        player.pauseVideo(); // Pause music when toggled off
    }
});

const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");
const settingsButton = document.getElementById("settings-button");
const gameContainer = document.getElementById("game-container");
const gameBoard = document.getElementById("game-board");
const orderElement = document.getElementById("order-item");
const resultElement = document.getElementById("result");
const gameOverScreen = document.getElementById("game-over-screen");
const restartButton = document.getElementById("restart-button");
const settingsMenu = document.getElementById("settings-menu");
const backButton = document.getElementById("back-button");
const themeSelect = document.getElementById("theme-select");
const speechBubble = document.querySelector(".speech-bubble");
const highScoreElement = document.getElementById("high-score"); // High score element
const dishesCounter = document.getElementById("dishes-counter"); // Dishes served counter
const howToPlayButton = document.getElementById('how-to-play-button');
const howToPlayMenu = document.getElementById('how-to-play-menu');
const closeHowToPlayButton = document.getElementById('close-how-to-play-button');

// Display initial high score from localStorage
highScoreElement.textContent = `Most Dishes: ${highScore}`;

themeSelect.addEventListener("change", function() {
    document.body.className = themeSelect.value + "-mode";
});

settingsButton.addEventListener("click", function() {
    startMenu.style.display = 'none';
    settingsMenu.style.display = 'flex';
});

backButton.addEventListener("click", function() {
    settingsMenu.style.display = 'none';
    startMenu.style.display = 'flex';
});

startButton.addEventListener("click", function() {
    startMenu.style.display = 'none';
    gameContainer.style.display = 'flex';
    dishesServed = 0; // Reset the dishes served counter at the start of a new game
    updateDishesCounter();
    startGame();
});

restartButton.addEventListener("click", function() {
    gameOverScreen.style.display = 'none';
    resetDifficulty();  // Reset the difficulty when restarting the game
    startMenu.style.display = 'flex';
});

function startGame() {
    flippedCards = [];
    resultElement.textContent = '';
    generateOrder();  // Generate the order before shuffling ingredients
    shuffleIngredients();  // Shuffle after the order is generated
    createCards();
    speechBubble.style.visibility = 'visible';  // Ensure speech bubble is visible
    showCards();
    startLoadingBar(revealTime); // Start the loading bar with revealTime duration
    setTimeout(hideCards, revealTime);  // Hide cards after revealTime expires
}

function shuffleIngredients() {
    generateOrder();
    let requiredIngredients = [...currentOrder];
    let randomIngredients = [...requiredIngredients];
    while (randomIngredients.length < numOfCards) {
        let rand = allIngredients[Math.floor(Math.random() * allIngredients.length)];
        if (!randomIngredients.includes(rand)) {
            randomIngredients.push(rand);
        }
    }
    randomIngredients = randomIngredients.sort(() => 0.5 - Math.random());
    ingredients = randomIngredients;
}

function createCards() {
    gameBoard.innerHTML = '';
    cardElements = [];
    ingredients.forEach(ingredient => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.textContent = ingredient;
        card.addEventListener("click", () => selectCard(card, ingredient));
        gameBoard.appendChild(card);
        cardElements.push(card);
    });
}

function showCards() {
    cardElements.forEach(card => {
        card.classList.add("flipped");
        card.classList.add("disabled"); // Disable interaction while showing cards
    });
}

function hideCards() {
    cardElements.forEach(card => {
        card.classList.remove("flipped");
        card.classList.remove("disabled"); // Re-enable interaction after hiding cards
        card.textContent = "???";
    });
    speechBubble.style.visibility = 'visible';
}

function generateOrder() {
    let orderKeys = Object.keys(orders);
    let randomOrder = orderKeys[Math.floor(Math.random() * orderKeys.length)];
    currentOrder = orders[randomOrder];
    orderElement.textContent = randomOrder;
}

function selectCard(card, ingredient) {
    if (flippedCards.length < currentOrder.length && !card.classList.contains("selected")) {
        flippedCards.push(ingredient);
        card.classList.add("selected");
        card.textContent = ingredient;

        if (!currentOrder.includes(ingredient)) {
            card.classList.add("shake");  // Add the shake animation class

            // Wait for the animation to complete, then remove the shake class
            setTimeout(() => {
                card.classList.remove("shake"); 
                gameOver();  // Trigger game over after the shake animation
            }, 1000);  // Wait for the 1-second animation to complete (matches shake duration)
        }
    }
    if (flippedCards.length === currentOrder.length) checkOrder();
}

function checkOrder() {
    if (arraysEqual(flippedCards, currentOrder)) {
        resultElement.textContent = "Correct!";
        dishesServed++; // Increment dishes served
        updateDishesCounter(); // Update the counter
        setTimeout(() => {
            increaseDifficulty();  // Increase difficulty after a correct round
            startGame();
        }, 1000);
    } else {
        gameOver();
    }
}

function increaseDifficulty() {
    numOfCards = Math.min(numOfCards + 1, allIngredients.length);
    revealTime = Math.max(revealTime - 500, minRevealTime);
}

function gameOver() {
    // Update high score if the current game beats the previous high score
    if (dishesServed > highScore) {
        highScore = dishesServed;
        highScoreElement.textContent = `Most Dishes: ${highScore}`;
        localStorage.setItem('highScore', highScore); // Save the new high score to localStorage
    }

    // Select and display a random Gordon Ramsay gif
    const randomGif = gordonGifs[Math.floor(Math.random() * gordonGifs.length)];
    gordonGifElement.src = randomGif;  // Set the gif source every time the game ends

    // Hide the game container and start menu
    gameContainer.style.display = 'none';
    startMenu.style.display = 'none'; // Hide the Start Menu during game over

    // Show the Game Over screen
    gameOverScreen.style.display = 'flex';
}

function resetDifficulty() {
    numOfCards = initialNumOfCards;
    revealTime = initialRevealTime;
}

function updateDishesCounter() {
    dishesCounter.textContent = `Dishes Served: ${dishesServed}`;
}

function arraysEqual(a, b) {
    return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
}

// Function to start the loading bar
function startLoadingBar(duration) {
    const loadingBar = document.getElementById("loading-bar");
    loadingBar.style.transition = "none";  // Disable transitions initially to reset the bar instantly
    loadingBar.style.width = "100%";  // Reset the loading bar to full width instantly
    
    // Force a reflow so the browser registers the reset width before starting the animation
    loadingBar.offsetWidth; 
    
    // Now, enable the transition and animate the bar over the 'duration' of reveal time
    loadingBar.style.transition = `width ${duration}ms linear`;
    loadingBar.style.width = "0%";  // Shrink the loading bar to 0 over the revealTime
}

restartButton.addEventListener("click", function() {
    gameOverScreen.style.display = 'none'; // Hide the Game Over screen
    gordonGifElement.src = ""; // Clear the gif source when restarting
    resetDifficulty();  // Reset the difficulty when restarting the game
    startMenu.style.display = 'flex';  // Go back to the Start Menu
});

// Show the How To Play menu when the "How To Play" button is clicked
howToPlayButton.addEventListener('click', function() {
    startMenu.style.display = 'none';  // Hide the start menu
    howToPlayMenu.style.display = 'flex';  // Show the How To Play menu
});

// Close the How To Play menu and go back to the start menu
closeHowToPlayButton.addEventListener('click', function() {
    howToPlayMenu.style.display = 'none';  // Hide the How To Play menu
    startMenu.style.display = 'flex';  // Show the start menu
});
