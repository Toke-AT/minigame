
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
        },1000)

        select("#dinoBtn").mousePressed(()=>startGame('dino'))
   

    
    select("#deerBtn").mousePressed(()=>startGame('deer game'))
        
   
    select("#midnightBtn").mousePressed(()=>startGame('midnight game'))
  
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
    }
    
    if (kind == 'deer game') {
        shiftPage("#page4")
    }
    if (kind == 'midnight game') {
       shiftPage("#page5")
    }
}

