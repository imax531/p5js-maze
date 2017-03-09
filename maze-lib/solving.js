function solving() {

	this.path
	this.startTime
	this.prevsq
	this.finished

	// too low  = low autofil capability
	// too high = takes too long
	
	this.setup = function() {
		this.path = [startCell]
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
		fill(HOVER_COLOR)
		if (!mousePos.equals(startCell.pos) && !mousePos.equals(destCell.pos)) {
			drawRectAt(mousePos, 0.5)
			this.prevsq = mousePos
		}
		
		if (this.path[this.path.length-1] == destCell) {
			this.finished = true
			push();
			fill(0);
			textAlign(CENTER, CENTER);
			textSize(26);
			textStyle(BOLD);
			t = floor(millis() - this.startTime) / 1000
			text("Well done! It took you\n" + t + " seconds\nto solve the maze!", width/2, height/2);
			pop();
		}
	}
	
	this.addCells = function(arr) {
		// reset color
		fill(150)
		for (i = 0; i < this.path.length; i++)
			if (this.path[i] != startCell && this.path[i] != destCell)
				drawRectAt(this.path[i].pos)
		
		// calc new path
		if (!this.backtrack()) {
			arr = this.BFSscan(this.path[this.path.length - 1], [], 0)
			if (arr != 0) this.path = this.pathAppend(arr)
		}
		
		// color new path
		fill(BUILDING_COLOR)
		for (i = 0; i < this.path.length; i++)
			if (this.path[i] != startCell && this.path[i] != destCell)
				drawRectAt(this.path[i].pos, 0.5)
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
		return this.path.concat(arr)
	}
	
	this.backtrack = function() {
		for (i = 0; i < this.path.length; i++)
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





