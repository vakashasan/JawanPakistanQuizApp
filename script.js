const firebaseConfig = {
    apiKey: "AIzaSyDl_xAQ-rjbwdq2DOq6sdzuP2V96ReGzuw",
    authDomain: "quiz-app-firebase-ff50a.firebaseapp.com",
    databaseURL: "https://quiz-app-firebase-ff50a-default-rtdb.firebaseio.com",
    projectId: "quiz-app-firebase-ff50a",
    storageBucket: "quiz-app-firebase-ff50a.appspot.com",
    messagingSenderId: "837564816791",
    appId: "1:837564816791:web:88593396e8252bbf4c38d2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Database reference
var database = app.database().ref('/').child('questionsArray')

var nextbtn = document.getElementById('nextbtn')
var active = document.getElementsByClassName("active")
var answerstatus = document.getElementById("answerstatus")
var activeanswer = document.querySelectorAll("optionElement")
var x = 0;
var score = 0;
var useranswer;
var correctanswer = 0;
var minutes;
var seconds;

const startingminutes = 1;
let time = startingminutes * 60;

const countdownEl = document.getElementById('timer');

myInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    if (minutes == 0 && seconds == 0) {
        clearInterval(myInterval);
        result()
    } else {
        minutes = Math.floor(time / 60);
        seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds

        countdownEl.innerHTML = `${minutes}: ${seconds}`;
        time--;
    }
}


// Retreiving data from firebase
database.once('value', (snapshot) => {
    snapshot.forEach((childsnapshot) => {
        childData = childsnapshot.val()

        //myCall funtion to call data outside loop
        fbData(childData)

    })
}),
    (errorObject) => {
        console.log(errorObject)
    }

function fbData(childData) {

    function showQuestion(e) {
        var question = document.getElementById('question')
        question.innerHTML = childData.question[e]
        showOption(e)
        question.innerHTML = `Q. ${e + 1} ${childData.question[e]}`
    }

    function showOption(e) {
        var optionElement = document.getElementsByClassName('optionElement')
        for (var i = 0; i < optionElement.length; i++) {
            optionElement[i].innerHTML = childData.option[e][i]
        }
    }

    nextbtn.addEventListener('click', () => {

        if (x < childData.question.length - 1) {
            x++
            showQuestion(x)
            showOption(x)
            removeActiveClass()


        } else {
            result()

        }

    })
    showQuestion(0)

   

}

function removeActiveClass(e) {
    var active = document.getElementsByClassName("active")
    for (var i = 0; i < active.length; i++) {
        active[i].classList.remove("active")
    }
}


function activeclass(e) {
    removeActiveClass()
    e.classList.add('active')
    active = document.getElementsByClassName("active")
    useranswer = active[0].innerText;

    // Scoring
    if (useranswer == childData.answer[x]) {
        correctanswer++
        score = correctanswer * 10;
    }

}

function result() {
    var questionpanel = document.getElementById('questionpanel')
    questionpanel.classList.add('hidden')
    var scoretext = document.getElementById('scoretext')
    scoretext.innerHTML = `Your Test Score is ${score}.`
    answerstatus.innerHTML = `Corrected Answer : ${correctanswer}`
    var resultmodal = document.getElementById('modal')
    resultmodal.classList.remove('hidden')
   


}
