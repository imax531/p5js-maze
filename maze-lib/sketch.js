var pxlsz
var brdsz
var SPEED
var BUILDING_COLOR = 'yellow'
var START_COLOR = 'green'
var END_COLOR = 'red'
var HOVER_COLOR = 'pink'

var startCell;
var destCell;
var state;

function getTBvalue(name) {
	var tbval = document.getElementById(name).value
	if (tbval != "" && !isNaN(tbval))
	   return parseFloat(tbval)
	return -1
}

function getInput() {
	pxlsz = getTBvalue("txtResolution")
	brdsz = getTBvalue("txtSize")
	SPEED = getTBvalue("txtSpeed")
}

function setup() {
	getInput()
	frameRate(SPEED)
	createCanvas(pxlsz * brdsz, pxlsz * brdsz)
	background(51)
	mouseX = mouseY = -1
	newMaze()
	state = new building()
	state.setup()
	startCell = maze[floor(random()*brdsz)][floor(random()*brdsz)]
	destCell = maze[floor(random()*brdsz)][floor(random()*brdsz)]
}

function newMaze() {
	maze = []
	for (i = 0; i < brdsz; i++) {
		maze[i] = []
		for (j = 0; j < brdsz; j++)
			maze[i][j] = new Cell(createVector(i, j))
	}
	stack = [maze[parseInt(random(brdsz))][parseInt(random(brdsz))]]
}

function draw() {
	state.draw()
}

function drawRectAt(v, size) {
	size = size || 1
	if (size > 1) size = 1
	pxlfx = -1
	posfx = 0
	rect(v.x*pxlsz+posfx + (1-size)*pxlsz/2,		// x
		 v.y*pxlsz+posfx + (1-size)*pxlsz/2,		// y
		(pxlsz+pxlfx)*size, (pxlsz+pxlfx)*size)		// size
}

function mouseClicked() {
	//v = createVector(floor(mouseX/pxlsz), floor(mouseY/pxlsz))
	//console.log(maze[v.x][v.y])
}
