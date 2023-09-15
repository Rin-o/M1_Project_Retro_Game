const grid = document.querySelector('.grid')
const blockWidth = 80
const blockHeight = 100

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
   new Block(10, 270),
   new Block(10, 270),
   new Block(10, 270),
   new Block(10, 270),
]
//console.log(blocks[0])

//blocks function
function addBlocks() {
  for (let i = 0; i<blocks.length;i++){
  const block = document.createElement('div')
  block.classList.add('block')
  block.style.left = blocks[i].bottomLeft[0] + 'px'
  block.style.bottom = blocks[i].bottomLeft[1] + 'px'
  grid.appendChild(block)

  }
}

addBlocks()