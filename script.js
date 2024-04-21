const root = document.querySelector(':root');
const loopTime = parseInt(getComputedStyle(root).getPropertyValue("--loop-time"));

const images = ["image0", "image1", "image2", "image3", "image4", "image5"].map( (item) => document.getElementById(item))
const buttons = document.getElementsByClassName("choice");

const descriptions = [
    "How to play | Resources", 
    "Tree diagram", 
    "E(X) calculations", 
    "Theoretical Probability Distribution", 
    "All outcomes and their probabilties", 
    "How probabilities are calculated"
]

var description = document.getElementById("description");

var visibleImage = images[1]
var hiddenImage = images[0]

var imageOn = 0;

function switchToImage(i) {
    // Emable the loop button since now we're manually looking
    buttons[images.length].disabled = false;
    buttons[images.length].classList.remove("loopy");   

    clearInterval(interval);
    interval = null;
    if (i === imageOn) return;

    visibleImage = images[i]
    show(images[i]);
    hiddenImage = images[imageOn] 
    hide(images[imageOn])
    imageOn = i;
    swapText()
}

function swap() {
    imageOn = (imageOn + 1) % images.length
    
    var temp = hiddenImage 
    hiddenImage = images[imageOn];
    visibleImage = temp; 

    swapText();
    show(hiddenImage)
    hide(visibleImage)
}

function show(image) {
    // Disable the button for the image we're showing
    buttons[images.indexOf(image)].disabled = true;   
    
    var leftPadding = (root.scrollWidth - image.offsetWidth) / 2;
    image.style.marginLeft = leftPadding + 'px'; // Overlap old image with new image.
    image.style.opacity = 1
}

function hide(image) {
    // Enable the button for the image we're showing
    buttons[images.indexOf(image)].disabled = false;   

    image.style.marginLeft = (root.scrollWidth + image.offsetWidth / 2) + "px"
    image.style.opacity = 0
}

function swapText() {
    var nextDescription = descriptions[imageOn]
    description.style.opacity = 0
    setTimeout(() => {
        description.style.opacity = 1;   
        description.innerHTML = nextDescription;
    }, 500);
}

function update(item) {
    var leftPadding = (root.scrollWidth - item.width ) / 2;
    item.style.marginLeft = leftPadding + 'px'; // Overlap old image with new image.
}

// Set up every button from 0 to 3 to switch image when pressed
for (let i = 0; i < images.length; i++) 
    buttons[i].onclick = () => switchToImage(i)

// Set up the last button which re-loops
buttons[images.length].onclick = function() {
    // Only start the loop again if the interval has no value (i.e it's null)
    if (interval !== null) return;
    
    // Disable the loop button
    buttons[images.length].disabled = true;   
    buttons[images.length].classList.add("loopy");   

    hide(images[imageOn]) // Hide whatever thing we are on right now
    swap()
    interval = setInterval(swap, loopTime * 1000);
}

// Hide all elements
for (let i = 1; i < images.length; i++) 
    hide(images[i]);

// Start the interval for the loop
var interval = setInterval(swap, loopTime * 1000);

// Initially run swap while loading to fix everything up
setTimeout(() => {
    show(images[0])
    swapText()
}, 100);

// Acts as a loading screen
setTimeout(() => {
    document.body.style.opacity = 1
    document.body.style.backgroundColor = "white";
}, 1000);