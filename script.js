/*<!--In the name of kindly generous ALLAH-->
<!--Thanks ALLAH-->
*/

const logger = document.querySelector(".logger")
const body = document.body
const boom = document.getElementById("boom")
const israelBoom = document.getElementsByClassName("israel")[0]
const selector = document.querySelector(".selector")
const sequences = ['Hit the israel...'
    , '...'
    , 'devils in israel will soon be destroyed...'
    , '...'
    , 'Thanks ALLAH'
    , 'thank devil killers...'
    , 'thank who all support...'
    , '...'
]

let destroyed_israel = false

// boom.style.width = body.clientWidth + "px"
// boom.style.height = body.clientHeight + "px"
boom.style.width = "100vw"
boom.style.height = "100vh"
boom.setAttribute("width", "" + boom.clientWidth)
boom.setAttribute("height", "" + boom.clientHeight)

israelBoom.setAttribute("width",israelBoom.clientWidth)
israelBoom.setAttribute("height",israelBoom.clientHeight)
const ctx = boom.getContext("2d")

const israelCtx = israelBoom.getContext("2d")
israelCtx.fillStyle = "black"
israelCtx.strokeStyle = "black"


const boomW = boom.clientWidth
const boomH = boom.clientHeight
const minimum = Math.min(boomW, boomH)
const step = 1
const r = Math.min(10, minimum / 30)
const dist = Math.min(minimum / 3, 200)
const mouseDist = dist
const countOfDots = 30
ctx.fillStyle = "red"
ctx.strokeStyle = "red"

let mouseX, mouseY

document.addEventListener("touchmove", (ev) => {
    mouseX = ev.touches[0].pageX
    mouseY = ev.touches[0].pageY
})
document.addEventListener("mousemove", (ev) => {
    mouseX = ev.x
    mouseY = ev.y
})


function Break_israel(bx,by){
    for (let branch = 0; branch < 10; branch++) {
        let x = bx
        let y = by
        let r = 20
        for (let i = 0; i < 3; i++) {
            let randRad = Math.random() * Math.PI * 2
            let x2 = x + Math.cos(randRad) * r
            let y2 = y + Math.sin(randRad) * r
            drawLine_israel(x, y, x2, y2)
            x = x2
            y = y2
        }
    }
}
function drawLine_israel(x1,y1,x2,y2){
    israelCtx.beginPath()
    israelCtx.moveTo(x1,y1)
    israelCtx.lineTo(x2,y2)
    israelCtx.stroke()
}
israelBoom.addEventListener("click", (ev) => {
    Break_israel(ev.x - israelBoom.getBoundingClientRect().x,ev.y - israelBoom.getBoundingClientRect().y)
})

let hitted = 0
let hitStep = 1
function Hit_israel() {
    switch (hitStep) {
        case 1:
            if (hitted >= 30) {
                nextSequence();
                hitStep++
            }
            break
        case 2:
            if (hitted >= 50) {
                nextSequence();
                hitStep++
            }
            break
        case 3:
            if (hitted >= 80) {
                nextSequence();
                hitStep++
            }
            break
        case 4:
            if (hitted >= 110) {
                cascadeSequences();
                document.querySelector(".israel").remove();
                destroyed_israel = true
                ctx.fillStyle="cyan"
                ctx.strokeStyle="cyan"
                hitStep++
            }
            break
    }

    hitted++
}
nextSequence()
function nextSequence() {
    if (sequences.length == 0) return
    clearLog(() => setLog(sequences.shift()))
}

function cascadeSequences() {
    if (sequences.length == 0) return
    clearLog(() => setLog(sequences.shift(), cascadeSequences))
}

function setLog(text, filledCallback = null) {
    let logText = ""
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
            if (filledCallback)
                filledCallback()
        }
    }, 300)
}
function clearLog(clearedCallback) {
    let logText = logger.innerText
    let clearLogInter = setInterval(() => {
        logText = logText.slice(0, -1)
        logger.innerText = logText
        if (logText == "") {
            clearInterval(clearLogInter)
            clearedCallback()
        }

    }, 100)
}


//an array of dots
//[[x,y,angle,collision]]
let dots
createRandomDots(countOfDots)


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
    ctx.arc(x, y, r, 0, Math.PI * 2, 0)
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
    let lastI = 0
    dots = dots.map(dot => {
        let stepOne = step
        let x1 = dot[0]
        let y1 = dot[1]
        for (let i = lastI + 1; i < dots.length; i++) {
            let otherDot = dots[i]
            let x2 = otherDot[0]
            let y2 = otherDot[1]
            if (Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= dist)
                drawLine(x1, y1, x2, y2)
        }
        if (Math.sqrt((mouseX - x1) ** 2 + (mouseY - y1) ** 2) <= mouseDist) {
            stepOne *= 5
        } else if (stepOne != step) {
            stepOne -= Math.round(Math.max(0, (stepOne - step) / 4))
        }
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
        lastI++
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