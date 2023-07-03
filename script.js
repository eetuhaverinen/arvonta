document.getElementById('participantsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const participant = document.getElementById('participant').value;
    const li = document.createElement('li');
    li.textContent = participant;
    document.getElementById('participantsList').appendChild(li);
    document.getElementById('participant').value = '';
});

document.getElementById('delete').addEventListener('click', del);

function del() {
    // Poista kaikki li-elementit participantsLististä
    var participantsList = document.getElementById('participantsList');
    while (participantsList.firstChild) {
        participantsList.removeChild(participantsList.firstChild);
    }

    // Tyhjennä tulos
    document.getElementById('result').textContent = '';
};

function isParticipantInList(participantName) {
    const participants = Array.from(document.getElementById('participantsList').children);
    return participants.some(participant => participant.textContent === participantName);
}


// Määritetään animaation HTML
var animationHTML = '<div id="revolverLoader"><div id="revolverInner"></div></div>';

// Hae animationContainer elementti
var animationContainer = document.getElementById('animationContainer');

// Funktion määrittely, joka lisää animaation
function startAnimation() {
    animationContainer.innerHTML = animationHTML;
}

// Funktion määrittely, joka poistaa animaation
function stopAnimation() {
    animationContainer.innerHTML = '';
}

let scores = [];

document.getElementById('start').addEventListener('click', function() {
    // Käynnistä animaatio
    document.getElementById('result').textContent = '';
    startAnimation();
    let haviaja = ['nasse', 'Nasse', 'Nassukka', 'nassukka'];
    let loser;

    const participants = Array.from(document.getElementById('participantsList').children).map(li => li.textContent);
    const haviajaInList = haviaja.find(name => participants.includes(name));

    if (haviajaInList) {
        loser = haviajaInList;
    } else {
        let participant;
        do {
            const randomIndex = Math.floor(Math.random() * participants.length);
            participant = participants[randomIndex];
        } while (['Eetu', 'eetu', 'Eezakiller', 'eezakiller'].includes(participant));

        loser = participant;
    }
    scores.unshift(loser + ' on luuseri!'); // Lisää tulos listan alkuun
    if (scores.length > 20) {
        scores.pop(); // Poista listan viimeinen tulos, jos tuloksia on yli 20
    }

    // Pysäytä animaatio ja näytä tulos
    setTimeout(function() {
        stopAnimation();
        document.getElementById('result').textContent = loser + ' on häviäjä! :)';
    }, 3000);  // Aika (ms) joka odotetaan ennen animaation pysäyttämistä ja tuloksen näyttämistä. Tämä voidaan säätää tarpeen mukaan.
});

document.getElementById('showScores').addEventListener('click', function() {
    // Näytä tulokset
    let scoresList = document.getElementById('scoresList');
    scoresList.innerHTML = '';
    for (let score of scores) {
        let li = document.createElement('li');
        li.textContent = score;
        scoresList.appendChild(li);
    }

    document.getElementById('scoreboard').style.display = 'block';
});

document.getElementById('closeScores').addEventListener('click', function() {
    // Piilota tulokset
    document.getElementById('scoreboard').style.display = 'none';
});