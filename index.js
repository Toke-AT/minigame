
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
var scoresRef = db.collection('MiniScores')
var seconds = 20
//when death mecanics get made this must be changed so it is equal to the players time alive.

var points = 0
var pointInterval = null

function startCountPoints() {
    points = 0
    pointInterval = setInterval(() => {
        points+=10
    }, 1000)
}
//adds 10 to the points score every second (max score in all games currently 200 if you survive the full 20 seconds)

function stopCountPoints() {
    clearInterval(pointInterval)
}
//stops counting points

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

    select('#btn-save').mousePressed(() => {
        saveHighScore()
    })
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
        startCountPoints()
        var t = startTimer(20, 0, 'top-right', () => {
            stopCountPoints()
            shiftPage("#page6")
        }, null)
    }

    if (kind == 'deer game') {
        shiftPage("#page4")
        startCountPoints()
        var t = startTimer(20, 0, 'top-right', () => {
            stopCountPoints()
            shiftPage("#page6")
        }, null)
    }
    //clearInterval(t)

     if (kind == 'midnight game') {
        shiftPage("#page5")
        startCountPoints()
        var t = startTimer(20, 0, 'top-right', () => {
            stopCountPoints()
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
            li.child(createElement('span', d.points))
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
     scoresRef.add({ name: name, seconds: seconds, points: points, timestamp: firebase.firestore.FieldValue.serverTimestamp()}).then(() => {
         select('#btn-save').attribute('disabled', true)
         select('#btn-save').html('Gemt!')
    })
}
function resetGames(){
    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')

    shiftPage("#page2")
}
//class Firebase {
//  constructor(MiniScores) {
//    this.ref = db.collection('MiniScores')
//  }
//
//  save(name, points) {
//    this.ref.add({
//      name: name,
//      points: points,
//      timestamp: firebase.firestore.FieldValue.serverTimestamp()
//    })
//  }
//
//  listen(onUpdate, limit, sort, dir='desc') {
//    var q = this.ref.orderBy(sort, dir)
//    if(limit) q = q.limit(limit)
//    return q.onSnapshot(snap => {
//      var list = []
//      snap.forEach(doc => {
//        var d = doc.data()
//        d.id = doc.id
//        list.push(d)
//      })
//      onUpdate(list)
//    })
//  }
//
//  remove(id) {
//    this.ref.doc(id).delete()
//  }
//
//  clear() {
//    this.ref.get().then(snap => {
//      snap.forEach(doc => doc.ref.delete())
//    })
//  }
//}

//function stopGame(){

//}