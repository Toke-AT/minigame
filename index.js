
var game

var settings = {
    name: '',
    sound: true,
    difficulty: 'middel',
    color: '#ff6347',
    coins: 0,
    owned: ['#ff6347']
}

//P5 setup() bliver kaldt EN gang før siden vises 
//jsbdjabkf
function setup(){
     var canvas = createCanvas(400, 400)

        setTimeout(()=>{
            shiftPage("#page2")
        },5000)

        select("#dinoBtn").mousePressed(()=>startGame('dino'))
   

    
    select("#deerBtn").mousePressed(()=>startGame('deer game'))
        
   
    select("#midnightBtn").mousePressed(()=>startGame('midnight game'))
  
}


function startGame(kind) {
    //readSettings()
    if (settings.name == '') {
        showToast('Skriv et navn', 1800, 'warning')
        //shiftPage('#indstillinger')
        return
    }
     //var t = tuning()
    game = kind
    score = 0
    //gravity = createVector(0, t.g)
    friction = 0.99
    resizeCanvas(windowWidth, windowHeight)

    if (kind == 'dino') {
     shiftPage("#page3")
    }
    if (kind == 'deer game') {
        
    }
    if (kind == 'midnight game') {
       
    }
}

