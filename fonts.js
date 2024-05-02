// Add your JavaScript code here
const topLeftText = `Happy first anniversary hon<br>
Sana magustuhan mo<br>
'tong Bulaklak para sayo<br>
I love you langga`;

const bottomRightText = `You mean so much to me hon <br>
and I'm always proud of you<br>
Good luck sa lahat langga<br>
Nandito lang ako lagi para sayo`;

const topLeftTextElement = document.querySelector(".top-left-text");
const bottomRightTextElement = document.querySelector(".bottom-right-text");

// Function to simulate typing effect
function typeText(element, text) {
    let index = 0;
    const typingInterval = setInterval(() => {
        if (index <= text.length) {
            element.innerHTML = text.slice(0, index);
            index++;
        } else {
            clearInterval(typingInterval);
            if (element === topLeftTextElement) {
                bottomRightTextElement.style.visibility = 'visible'; // Show bottom text after top text finishes typing
                typeText(bottomRightTextElement, bottomRightText); // Start typing effect for bottom text
            }
        }
    }, 100); // Typing speed (milliseconds per character)
}

// Delay typing effect for top text by 8 seconds
setTimeout(() => {
    typeText(topLeftTextElement, topLeftText);
}, 8000); // 8 seconds delay (8000 milliseconds)

// Hide bottom text initially
bottomRightTextElement.style.visibility = 'hidden';
