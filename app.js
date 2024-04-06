let canvas=document.querySelector("canvas")
let body=document.querySelector("body")
//borad
let ctx=canvas.getContext("2d")
//brush
let bW=1000;
let bH=600;
let cellSize=50;
let direction="right"
let food=foodGen()
function foodGen(){
    return[ Math.round(Math.random()*(bW-cellSize)/cellSize)*cellSize,Math.round(Math.random()*(bH-cellSize)/cellSize)*cellSize]
    
}


// this array contains snake , akisa bana kaha bana 
let snakeCells=[[0,0]]
let score=snakeCells.length
let sc=document.createElement("h1")
sc.innerHTML=`Score ${score}`
body.prepend(sc)
// assuming snake moving at right 

// snake draw 
// snake would be update after 100 ms and then draw 
function update(){
    headX=snakeCells[snakeCells.length-1][0];
    // accesing the x corordinate , last wala index hi toh head hoga nah
    headY=snakeCells[snakeCells.length-1][1];
     
    // if snaake cell length 3 hi toh ahem 3 aage jaken 50 add karna padhega nah
    // let newHeadX=headX+cellSize
    // let newHeadY=headY;
    // now vina khaye toh snake ki length same hi hogi, toh ahme pichla wala nodes remove karna padehnga 
    // snakeCells.push([newHeadX,newHeadY])
    // snakeCells.shift();
    // agar shift nahi karta, toh array ki length inc hoti par bina khana khaye snake padha thori hai 
    let newHeadX=headX;
    let newHeadY=headY;
    if(direction=="right"){
        newHeadX+=cellSize;
    }
    else if(direction=="left"){
        newHeadX-=cellSize;
    }
    else if(direction=="up"){
        newHeadY-=cellSize;
    }
    else{
        newHeadY+=cellSize;
    }
    console.log(newHeadX)
    if(newHeadX==bW  || newHeadY==bH || newHeadX<0 || newHeadY<0){
    clearInterval(1);
    sc.innerHTML=`Game over: Score=${score}`
    return;
    }
        snakeCells.push([newHeadX,newHeadY])

    
    
    if(newHeadX==food[0] && newHeadY==food[1]){
        food=foodGen()
        score++;
        sc.innerHTML=`Score ${score}`
    }else{
        snakeCells.shift();
    }
    
    draw()
    
    


}
function draw(){
    //earse full board
    ctx.clearRect(0,0,bW,bH)
    for(let cell of snakeCells){
        ctx.fillStyle="brown"
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize)
    }
    ctx.fillStyle="green"
    ctx.fillRect(food[0],food[1],cellSize,cellSize)

}

let id=setInterval(function(){
    update()
    // draw()

},200)

document.addEventListener("keydown",(e)=>{
    console.log(e)
    if(e.key=="ArrowUp" && direction!="down"){
        direction="up"
    }
    else if(e.key=="ArrowDown" && direction!="up"){
        direction="down"

    }
    else if(e.key=="ArrowRight"&& direction!="left"){
        direction="right"
    }else if(e.key=="ArrowLeft"&& direction!="right"){
        direction="left"
    }
})
//food genenerate




