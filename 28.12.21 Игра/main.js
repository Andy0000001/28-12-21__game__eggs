const heroElement = document.querySelector("#hero");
const gameElement = document.querySelector("#game");

function createPresent(){
    const isRight = Math.random()>0.5;
    const isTop = Math.random()>0.5;

    const present = document.createElement('DIV');
    present.classList.add("present")

    if( isTop && isRight) present.classList.add("present-t-r")
    if( !isTop && isRight) present.classList.add("present-b-r")
    if( isTop && !isRight) present.classList.add("present-t-l")
    if( !isTop && !isRight) present.classList.add("present-b-l")

    gameElement.append(present);

    return{isRight, isTop, element:present}
}

document.addEventListener('keydown', (e) => {
    if(e.key === "ArrowRight"){
        heroElement.classList.remove("hero-reverse")
    }
    if(e.key === "ArrowLeft"){
        heroElement.classList.add("hero-reverse")
    }
})

let lastFrame = null;

function fallDown(difftime){
    const elements = document.querySelectorAll(".present")

    for(let item of elements) {
        item.style.top = (parseInt(item.style.top) + difftime) + "px"
    }
}

function step(timestamp){
    let difftime = 0
    if(!lastFrame){
        lastFrame = timestamp
    }
    else
    {
        difftime = timestamp - lastFrame
        lastFrame = timestamp
    }

    fallDown(difftime)


    if(Math.random() < 0.01) createPresent();
    window.requestAnimationFrame(step);
}


window.requestAnimationFrame(step);