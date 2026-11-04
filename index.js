

//P5 setup() bliver kaldt EN gang før siden vises 
//jsbdjabkf
function setup(){
     var canvas = createCanvas(400, 400)

        setTimeout(()=>{
            shiftPage("#page2")
        },5000)
    select("#dinoBtn").mousePressed(()=>{
        shiftPage("#page3")
    })
    select("#deerBtn").mousePressed(()=>{
        shiftPage("#page4")
    })
    select("#midnightBtn").mousePressed(()=>{
        shiftPage("#page5")
    })
}

