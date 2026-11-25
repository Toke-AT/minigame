
var game
var canvas
var jump
var settings = {
    name: '',
    sound: true,
    difficulty: 'middel',
    color: '#ff6347',
    coins: 0,
    owned: ['#ff6347']
}
var biler = []
var kaktusser = []
var baneY
var player
var motorists = []
var deer
var car
var motorists
var dinosaur
var monster
var t




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
var canvas
function setup(){
    //alert("Setup bliver kørt")
    // loadHighScores()
    canvas = createCanvas(400, 400)     
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
function preload(){
     deer = loadImage("./asset/deer 2.png",
        () => console.log("Deer billede indlæst"),
        () => console.log("FEJL: Deer billede kunne ikke indlæses") )
        car = loadImage("./asset/cars.png")
    
    dinosaur = loadImage("./asset/dino.png",)
    monster = loadImage("./asset/Monster_Ultra_Zero_1.png",)

}


function startGame(kind) {
    //readSettings()
    if (settings.name == '') {
        //showToast('Skriv et navn', 1800, 'warning')
        //shiftPage('#indstillinger')
    }
    var t = tuning()
    game = kind
    score = 0
    //gravity = createVector(0, t.g)
    friction = 0.99
    resizeCanvas(windowWidth, windowHeight)

    if (kind == 'dino') {
        console.log("vil gerne skifte til 3")
        gravity = createVector(0, 0.5)
        player = new Dino(120, height - 90, 70, dinosaur, 21, '#535353')
        select("#page3").child(canvas)
        shiftPage("#page3")
        var t = startTimer(20, 0, 'top-right', () => {
            stopCountPoints()
            player = null
            shiftPage("#page6")
        }, null)
    }

    if (kind == 'deer game') {
        select("#page4").child(canvas)
        shiftPage("#page4")
        player = new Deer(width / 2, height - 40,70, deer,'#ff6347')
       
        startCountPoints()
        var t = startTimer(20, 0, 'top-right', () => {
            stopCountPoints()
            shiftPage("#page6")
        }, null)
    
         
        
    }
    //clearInterval(t)

     if (kind == 'midnight game') {
        select("#page5").child(canvas)
        shiftPage("#page5")
        player = new PurpleCar(width / 2, height - 40,70, "./asset/MainCar.png",'#811181')
        startCountPoints()
        var t = startTimer(20, 0, 'top-right', () => {
            stopCountPoints()
            shiftPage("#page6")
        }, null)
    }
}

function draw() {
    //console.log("draw kører");
  //  if (currentPage != '#spil' || !player) return
   // background(back[game])
   clear()
    //console.log("Game:", game);
    //console.log("Player:", player);

    if (game == 'midnight game' && player) {
        runMidnight();    
        player.show(); 
        player.update()
        player.constrain()

        if(keyIsDown(LEFT_ARROW)){
             player.Step(-5, 0.0)
        }
        if(keyIsDown(RIGHT_ARROW)){
             player.Step(5, 0.0)
        }
        if(keyIsDown(UP_ARROW)){
             player.Step(0.0, -5)
        }
        if(keyIsDown(DOWN_ARROW)){
             player.Step(0.0, 5)
        }
        
    
    }

    if (game == 'deer game' && player) {
        runDeer();    
        player.show(); 

        if(keyIsDown(LEFT_ARROW)){
             player.Step(-5, 0.0)
        }
        if(keyIsDown(RIGHT_ARROW)){
             player.Step(5, 0.0)
        }
        if(keyIsDown(UP_ARROW)){
             player.Step(0.0, -5)
        }
        if(keyIsDown(DOWN_ARROW)){
             player.Step(0.0, 5)
        }
        
    
    }

    if (game == 'dino' && player) {
        background(240)        
        runDino();
        player.update()
        player.constrain()
        var onGround=player.position.y>=height-player.diam/2
        if(onGround) player.velocity.y=0
        player.show();
    }
   // if (game == 'skyd') runSkyd()
   // if (game == 'traek') runTraek()
}

function keyPressed() {
    if (currentPage == '#page3' && game == 'dino' && key == ' ') {
        if(player.onGround) player.jump()  
    }
}


function tuning() {
    var table = {
        let: { xSpeed: -2,},
        middel: {  xSpeed: -4,  },
        svær: {  xSpeed: -7,  }
    }
     t = Object.assign({}, table[settings.difficulty] || table.middel)
    //var reach = Math.max(180, (windowHeight - 140) * t.part)
    t.xSpeed = t.xSpeed * Math.max(1, windowWidth / 1100)
    return t
}

function readSettings() {
    var name = txt('#set-name').trim()
    settings.name = name
    settings.sound = select('#set-sound').elt.checked
    settings.difficulty = select('#set-diff').value()
    saveLocal()
}

function saveLocal() {
    localStorage.setItem('spilcentral', JSON.stringify(settings))
}
function fillForm() {
    select('#set-name').value(settings.name)
    select('#set-sound').elt.checked = settings.sound
    select('#set-diff').value(settings.difficulty)
    paintLook()
}

function paintLook() {
    select('#coins-front').html(settings.coins + ' mønter')
    select('#swatch').style('background', settings.color)
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
function runMidnight(){
    //moveSpeed 
    //generate motorists
    //map motorists and define what happens on hit
    laneY = random(0,windowHeight);
   
   if (frameCount % spawnRate == 0) {
    spawnRate = round(random(80,150))
  motorists.push(new Ball(1500, laneY, 80,"./asset/CarLeft.png", '#8b5e3c', -4, 0))
 
}
    motorists.map(motorist =>{
        motorist.update()
        motorist.show()
    
    
        if(player.hit(motorist)){
        console.log("player was hit")
        stopCountPoints
        
        shiftPage("#page6")
        }
    })
}

var spawnRate = 90
function runDeer(){
    //  console.log("runDeer kører");
    baneY = random(0,windowHeight);
   
   if (frameCount % spawnRate == 0) {
    spawnRate = round(random(80,150))
  biler.push(new Ball(1500, baneY, 80, car, '#8b5e3c', t.xSpeed, 0))
 
}
    biler.map(bil =>{
        bil.update()
        bil.show()
    
    
        if(player.hit(bil)){
        console.log("player was hit")
        stopTimer()
        stopCountPoints()
        
        
        shiftPage("#page6")
        }
    })

    

    
}

var dinoSpawnRate = 50
function runDino(){
    console.log("runDino kører");
   
   if (frameCount % dinoSpawnRate == 0) {
    dinoSpawnRate = round(random(135,250))
    kaktusser.push(new Ball(1500, 750, 120, monster, 'grey', t.xSpeed, 0))
 
}
    kaktusser.map(kaktus =>{
        kaktus.update()
        kaktus.show()
    
    
        if(player.hit(kaktus)){
        console.log("player was hit")
        stopCountPoints
        
        shiftPage("#page6")
        }
    })
}

/*function countHit(player,b){
    var player = player.hit(b)
    if(h && !player.wasHit){
        hits++
        
        console.log("player was hit")
        shiftPage("#page6")
    }
    player.wasHit = h
}*/


//function keyPressed() {
  //  if (currentPage == '#spil' && game == 'deer game' && key == ' ') 
   // if (key == ' ' || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW) return false

//}


