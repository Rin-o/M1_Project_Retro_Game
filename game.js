const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20

//create block
class Block {
    constructor(xAxis, yAxis){
        this.botomLeft = [xAxis,yAxis]
        this.botomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
   new Block(10, 270),
   new Block(120, 270),
   new Block(230, 270),
   new Block(340, 270),
   new Block(450, 270),
]

//blocks function
function addBlocks() {
  for (let i = 0; i<blocks.length;i++){
  const block = document.createElement('div')
  block.classList.add('block')
  block.style.left = blocks[i].bottomLeft[0] + 'px'
  block.style.bottom = blocks[i].bottomLeft[1] + 'px'
  grid.appendChild(block)
  console.log(blocks[1].bottomLeft)
  }
}

addBlocks()

//add user
