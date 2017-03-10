function solving() {

	this.path
	this.startTime
	this.prevsq
	this.finished
	this.startCell
	this.destCell
	
	// too low  = low autofil capability
	// too high = takes too long
	this.depth = 7
	
	this.setup = function() {
		do {
			this.startCell = maze[floor(random()*brdsz)][floor(random()*brdsz)]
			this.destCell = maze[floor(random()*brdsz)][floor(random()*brdsz)]
		} while(this.startCell.pos.dist(this.destCell.pos) < sqrt(brdsz))

		this.path = [this.startCell]
		this.startTime = millis()
		this.prevsq = 0
		this.finished = false		
	}
	
	this.draw = function() {
		if (this.finished) return;
		
		if (this.prevsq != 0) {
			fill(150)
			drawRectAt(this.prevsq)
		}
		
		mousePos = createVector(floor(mouseX/pxlsz), floor(mouseY/pxlsz))
		this.addCells(0)
		
		fill(START_COLOR)
		drawRectAt(this.startCell.pos, 0.7)
		fill(END_COLOR)
		drawRectAt(this.destCell.pos, 0.7)
		
		if (this.path[this.path.length-1] == this.destCell) {
			this.finished = true
			push();
			fill(0);
			textAlign(CENTER, CENTER);
			textSize(26);
			textStyle(BOLD);
			t = floor(millis() - this.startTime) / 1000
			text("Well done! It took you\n" + t + " seconds\nto solve the maze!", width/2, height/2);
			pop();
		} else {
			fill(HOVER_COLOR)
			if (!mousePos.equals(this.startCell.pos) && !mousePos.equals(this.destCell.pos)) {
				drawRectAt(mousePos, 0.5)
				this.prevsq = mousePos
			}
		}
	}
	
	this.addCells = function(arr) {
		// reset color
		this.paintPath(150)
		
		// calc new path
		if (!this.backtrack()) {
			arr = this.BFSscan(this.path[this.path.length - 1], [], 0)
			if (arr != 0) this.path = this.pathAppend(arr)
		}
		
		// color new path
		this.paintPath(BUILDING_COLOR, 0.3)
	}
	
	this.pathConRes = 3
	this.paintPath = function(color, size) {
		size = size || 1
		fill(color)
		
		for (i = 0; i < this.path.length; i++) {
			drawRectAt(this.path[i].pos, size)
			if (i+1 < this.path.length) {
				this.pathConStep = p5.Vector.sub(this.path[i+1].pos, this.path[i].pos)
				this.pathConStep.div(this.pathConRes)
				this.connection = this.path[i].pos.copy()
				for (j = 1; j < this.pathConRes; j++) {
					this.connection.add(this.pathConStep)
					drawRectAt(this.connection, size)
				}
			}
		}
	}
	
	// this function is used for two things:
	// 1. In case of path extention: remove duplicate cell
	// 2. In case of path reduction: remove backtracking cells
	this.pathAppend = function(arr) {
		while (this.path.length > 1 && arr.length > 1 &&
			   this.path[this.path.length-2] == arr[1]) {
			arr.splice(0, 1)
			this.path.splice(this.path.length-1)
		}
		arr.splice(0, 1)
		this.destCellIndex = arr.indexOf(this.destCell)
		if (this.destCellIndex>=0)
			arr.splice(this.destCellIndex+1, arr.length-this.destCellIndex-1)
		return this.path.concat(arr)
	}
	
	this.backtrack = function() {
		for (i = 0; i < this.path.length-1; i++)
			if (this.path[i].pos.equals(mousePos)) {
				this.path.splice(max(1, i), this.path.length - i)
				return true
			}
		return false
	}
	
	this.BFSscan = function(current, path, paths) {
		if (path.length >= this.depth || current == 0) return 0
		path = path.concat([current])
		if (current.pos.equals(mousePos)) return path

		paths = [0, 0, 0, 0]
		if (!current.walls[0])
			paths[0] = this.BFSscan(current.getTopNeighbor(), path, 0)
		if (!current.walls[1])
			paths[1] = this.BFSscan(current.getRightNeighbor(), path, 0)
		if (!current.walls[3])
			paths[3] = this.BFSscan(current.getLeftNeighbor(), path, 0)
		if (!current.walls[2])
			paths[2] = this.BFSscan(current.getBottomNeighbor(), path, 0)
		
		this.shortest = 0
		for (i = 0; i < paths.length; i++)
			if (paths[i] != 0 && (this.shortest == 0 || 
								  this.shortest.length > paths[i].length))
				this.shortest = paths[i]
		return this.shortest
	}
}





