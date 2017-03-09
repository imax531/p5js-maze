function building() {
	
	this.setup = function() {
		drawBounds()
		noStroke()
	}
	
	this.draw = function() {
		if (stack.length > 0) {
			cur = stack[stack.length-1]
			cur.visited = true
			fill(150)
			drawRectAt(cur.pos)
			nxt = step(cur.pos)
			fill(BUILDING_COLOR)
			if (nxt == 0) {
				stack.splice(stack.length-1)
				if (stack.length > 0) {
					drawRectAt(stack[stack.length-1].pos)
				}
			} else {
				removeBorder(cur, nxt)
				drawRectAt(nxt.pos)
				stack.push(nxt)
			}
		} else {
			console.log("done")
			state = new solving()
			state.setup()
		}
	}
	
	function drawBounds() {
		stroke(255)
		for (i = pxlsz-1; i < width; i += pxlsz) {
			line(i, 0, i, height)
			line(0, i, width, i)
		}
	}
		
	function removeBorder(c1, c2) {
		push()
		fill(150)
		v3 = p5.Vector.add(c1.pos, c2.pos)
		v3.div(2)
		drawRectAt(v3)
		v4 = p5.Vector.sub(c1.pos, c2.pos)
		pop()
		
		if (v4.x == 1) {
			c1.walls[3] = false
			c2.walls[1] = false
		} else if (v4.x == -1) {
			c1.walls[1] = false
			c2.walls[3] = false
		} else if (v4.y == 1) {
			c1.walls[0] = false
			c2.walls[2] = false
		} else if (v4.y == -1) {
			c1.walls[2] = false
			c2.walls[0] = false
		}
	}
	
	function getFreeNeighbors(a, b) {
		ans = []
		if (a-1 >= 0    && !maze[a-1][b].visited) ans.push(maze[a-1][b])
		if (a+1 < brdsz && !maze[a+1][b].visited) ans.push(maze[a+1][b])
		if (b-1 >= 0    && !maze[a][b-1].visited) ans.push(maze[a][b-1])
		if (b+1 < brdsz && !maze[a][b+1].visited) ans.push(maze[a][b+1])
		return ans;
	}

	function step(v) {
		neighbors = getFreeNeighbors(v.x, v.y)
		if (neighbors.length == 0)
			return 0
		return neighbors[floor(random()*neighbors.length)]
	}
	
}