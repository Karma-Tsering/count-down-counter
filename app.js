

// getting the input time from user
let setTimer = document.querySelector(".gear-icon");
let closeIcon = document.querySelector(".close");
let timerDataForm = document.querySelector(".timer-data-form");
let startBtn = document.querySelector("#submit");
let totalMilliSec = 0;
let dayInput = 1;
let hourInput = 1;
let minInput = 1;
let secInput = 1;

startBtn.addEventListener("click", (e) => {
    dayInput = document.forms["myForm"]["dayInput"].value;
    hourInput = document.forms["myForm"]["hourInput"].value;
    minInput = document.forms["myForm"]["minInput"].value;
    secInput = document.forms["myForm"]["secInput"].value;

    if (dayInput == "" && hourInput == "" && minInput == "" && secInput == "") {
        timerDataForm.classList.add("fade"); // exit form is all field are null
        setTimer.style.visibility = "visible";
    }
      
    
    if (dayInput == "" || hourInput == "" || minInput == "" || secInput == "") 
        return false;  // if above condition holds true; then to stop from submitting
    
    
    dayInput *= 1000 * 60 * 60 * 24;  //converting days into miliseconds
    hourInput *= 1000 * 60 * 60;
    minInput *= 1000 * 60;
    secInput *= 1000;

    totalMilliSec = dayInput + hourInput + minInput + secInput;  // adding all time into milisecond

    timerDataForm.reset();
    timerDataForm.classList.add("fade");
    setTimer.style.visibility = "visible";
    setTimeout(() => {
        flipAllCards()
    }, 1000)
    setTimeout(() => {
        unFlipAllCards()
    }, 2000)

    
});


setTimer.onclick = () => {
    timerDataForm.classList.remove("fade");
    setTimer.style.visibility = "hidden";
}
closeIcon.onclick = () => {
    timerDataForm.classList.add("fade");
    setTimer.style.visibility = "visible";
}
window.onclick = (e) => {
    let formClickIgnore = timerDataForm.contains(e.target);
    let gearIconIgnore = setTimer.contains(e.target);
    if (gearIconIgnore) {
        return false; // if click on gearicon, stop the click event
    }
    if (!formClickIgnore) {  // if clicked on other than form; run the if apart
        timerDataForm.classList.add("fade");
        setTimer.style.visibility = "visible";
    }
}

// update time
let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

function updateTime() {
    if (totalMilliSec <= 0) {
        unFlipAllCards();
        return false;
    }
    totalMilliSec -= 1000;
    // Time calculations for days, hours, minutes and seconds
     days = Math.floor(totalMilliSec / (1000 * 60 * 60 * 24));
     hours = Math.floor((totalMilliSec % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     minutes = Math.floor((totalMilliSec % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((totalMilliSec % (1000 * 60)) / 1000);

}


// to flip the card 
function flip(cardTypeClass) {
    let upper = document.querySelectorAll(cardTypeClass+ " .upper");
    let lower = document.querySelectorAll(cardTypeClass+ " .lower");
    for (index in upper) {
        upper[index].style.animation = "top-to-bottom linear 1s infinite ";
        lower[index].style.animation = "bottom-to-top linear 1s infinite ";
    }
}

//flip all card on very beginning
function flipAllCards() {
    let upper = document.querySelectorAll(" .upper");
    let lower = document.querySelectorAll(" .lower");
    for (index in upper) {
        upper[index].style.animation = "top-to-bottom linear 1s normal ";
        lower[index].style.animation = "bottom-to-top linear 1s normal ";
    }
}
// to remove the animation 
function unFlipAllCards() {
    let upper = document.querySelectorAll(" .upper");
    let lower = document.querySelectorAll(" .lower");
    for (index in upper) {
        upper[index].style.animation = "";
        lower[index].style.animation = "";
    }
}

let dayTime = document.querySelectorAll(".day-time span");
let hourTime = document.querySelectorAll(".hour-time span");
let minTime = document.querySelectorAll(".min-time span");
let secTime = document.querySelectorAll(".sec-time span");

function change() {
    updateTime();
    // setTimeout to change content after animation started.
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            dayTime[i].innerHTML = days;
            hourTime[i].innerHTML = hours;
            minTime[i].innerHTML = minutes;
            secTime[i].innerHTML = seconds;
        }
    }, 400);
     flip(".sec-time");
    // setTimeout(unflip(".sec-time"),1000)
}
setInterval(change, 1000);
