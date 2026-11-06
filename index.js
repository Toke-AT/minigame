
var game

var settings = {
    name: '',
    sound: true,
    difficulty: 'middel',
    color: '#ff6347',
    coins: 0,
    owned: ['#ff6347']
}

// Firestore reference
var scoresRef = db.collection('Mini-scores')

//P5 setup() bliver kaldt EN gang før siden vises 
//jsbdjabkf
function setup(){
    loadHighScores()
    var canvas = createCanvas(400, 400)

    setTimeout(() => {
        shiftPage("#page2")
    }, 1000)

    select("#dinoBtn").mousePressed(() => startGame('dino'))
    select("#deerBtn").mousePressed(() => startGame('deer game'))
    select("#midnightBtn").mousePressed(() => startGame('midnight game'))

}


function startGame(kind) {
    //readSettings()
    if (settings.name == '') {
        showToast('Skriv et navn', 1800, 'warning')
        //shiftPage('#indstillinger')
    }
    //var t = tuning()
    game = kind
    score = 0
    //gravity = createVector(0, t.g)
    friction = 0.99
    resizeCanvas(windowWidth, windowHeight)

    if (kind == 'dino') {
        console.log("vil gerne skifte til 3")
        shiftPage("#page3")
        var t = startTimer(20, 0, 'top-right', () => {
            shiftPage("#page6")
        }, null)
    }

    if (kind == 'deer game') {
        shiftPage("#page4")
        var t = startTimer(20, 0, 'top-right', () => {
            shiftPage("#page6")
        }, null)
    }
    //clearInterval(t)

     if (kind == 'midnight game') {
        shiftPage("#page5")
        var t = startTimer(20, 0, 'top-right', () => {
            shiftPage("#page6")
        }, null)
    }
}


// ============================================
// HIGH SCORE (Firestore)
// ============================================
function loadHighScores() {
    scoresRef.orderBy('seconds', 'asc').limit(10).onSnapshot(snap => {
        select('#score-list').html('')
        snap.forEach(doc => {
            var d = doc.data()
            var li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}

function saveHighScore() {
    var name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('Du trykkede Gem! Navn:', name, '— Tid:', seconds, 'sek')
    console.log('TODO: Åbn firebase.js og indsæt jeres Firebase-config. Derefter virker scoresRef.add() og gemmer data i Firestore.')

    // Udkommenter linjen herunder når firebase.js er sat op:
    // scoresRef.add({ name: name, seconds: seconds }).then(() => {
    //     select('#btn-save').attribute('disabled', true)
    //     select('#btn-save').html('Gemt!')
    // })
    
    
    //select('#btn-save').mousePressed(() => {
    //    saveHighScore()
    //})
}
//function stopGame(){

//}