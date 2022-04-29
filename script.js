const logger = document.querySelector(".logger")
const body = document.body
const boom = document.getElementById("boom")
const selector = document.querySelector(".selector")
const sequenses = ['Hit the israel...'
    , '...'
    , 'devils in israel will soon be destroyed...'
    , '...'
    , 'Thanks ALLAH'
    , 'thank devil killers...'
    , 'thank who all support...'
    , '...'
]
boom.setAttribute("width", "" + boom.clientWidth)
boom.setAttribute("height", "" + boom.clientHeight)

const ctx = boom.getContext("2d")
const boomW = boom.clientWidth
const boomH = boom.clientHeight
let minimum = Math.min(boomW, boomH)
let step = 3
let r = Math.min(10,minimum/30)
let dist = Math.min(minimum / 3, 160)

ctx.fillStyle = "cyan"
ctx.strokeStyle = "cyan"

let mouseX,mouseY

document.addEventListener("touchmove",(ev)=>{
    mouseX = ev.touches[0].pageX
    mouseY = ev.touches[0].pageY
})
document.addEventListener("mousemove",(ev)=>{
    mouseX = ev.x
    mouseY = ev.y
})

function Hit_israel() {

}


function setLog(text) {
    logText = ""
    let chars = text.split("")
    selector.style.animationPlayState = "paused"
    selector.style.borderLeft = "1px solid cyan"
    let logInter = setInterval(() => {
        logText += chars.shift()
        logger.innerText = logText
        if (chars.length == 0) {
            selector.style.animationPlayState = "running"
            selector.style.borderLeft = "none"

            clearInterval(logInter)
        }
    }, 300)
}


//an array of dots
//[[x,y,angle,collision]]
let dots
createRandomDots(30)


function startStarsAnimation(count) {
    for (let i = 0; i < count; i++) {
        let x = parseInt(Math.random() * boomW)
        let y = parseInt(Math.random() * boomH)
        drawCircle(x, y)
    }
}


function createRandomDots(count) {
    dots = []
    for (let i = 0; i < count; i++) {
        let x = parseInt(Math.random() * boomW)
        let y = parseInt(Math.random() * boomH)
        let rad = Math.random() * Math.PI * 2 - Math.PI
        dots.push([x, y, rad, false])
    }
}

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y,r, 0, Math.PI * 2, 0)
    ctx.closePath()
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

function render(step, dist) {
    dots = dots.map(dot => {
        let stepOne = step
        for (let otherDot of dots) {
            
            x1 = dot[0]
            y1 = dot[1]
            x2 = otherDot[0]
            y2 = otherDot[1]
            if (Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= dist)
                drawLine(x1, y1, x2, y2)            
        }
        if (Math.sqrt((mouseX - x1) ** 2 + (mouseY - y1) ** 2) <= dist/2)
            stepOne/=3
        drawCircle(dot[0], dot[1])
        let dX = stepOne * Math.cos(dot[2]), dY = stepOne * Math.sin(dot[2])
        dot[0] += dX
        dot[1] += dY

        if (!dot[3]) {
            if (dot[0] < 0 || dot[0] > boomW) {
                dot[2] = (dot[2] < 0 ? -1 : 1) * Math.PI - dot[2]
                dot[0] = (dot[0] >= 0) * boomW
            }
            if (dot[1] < 0 || dot[1] > boomH) {
                dot[2] = - dot[2]
                dot[1] = (dot[1] >= 0) * boomH
            }
        } else dot[3] = false
        return dot
    })
}

let inter
function start() {
    inter = setInterval(() => {
        clear()
        render(step, dist)
    }, 50)
}
function end() {
    clearInterval(inter)
}

start()

function clear() {
    ctx.clearRect(0, 0, boomW, boomH)
}