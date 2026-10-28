

//P5 setup() bliver kaldt EN gang før siden vises 
//jsbdjabkf
function setup(){
     var canvas = createCanvas(400, 400)

        setTimeout(()=>{
            shiftPage("#page2")
        },8000)
}

