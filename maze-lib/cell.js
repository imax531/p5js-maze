function Cell(v) {
	
	this.visited = false
	this.pos = v
	this.walls = [true, true, true, true]

	this.getTopNeighbor = function() {
		if (this.pos.y-1 >= 0)
			return maze[this.pos.x][this.pos.y-1]
		return 0
	}
	
	this.getRightNeighbor = function() {
		if (this.pos.x+1 < brdsz)
			return maze[this.pos.x+1][this.pos.y]
		return 0
	}
	
	this.getBottomNeighbor = function() {
		if (this.pos.y+1 < brdsz)
			return maze[this.pos.x][this.pos.y+1]
		return 0
	}
	
	this.getLeftNeighbor = function() {
		if (this.pos.x-1 >= 0)
			return maze[this.pos.x-1][this.pos.y]
		return 0
	}
}