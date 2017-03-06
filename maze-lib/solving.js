function solving() {
	
	this.prevsq = 0
	this.draw = function() {		
		if (this.prevsq != 0) {
			fill(150)
			drawRectAt(this.prevsq)
		}
		fill(HOVER_COLOR)
		v = createVector(floor(mouseX/pxlsz), floor(mouseY/pxlsz))
		if (!v.equals(startCell.pos) && !v.equals(destCell.pos)) {
			drawRectAt(v)
			this.prevsq = v
		}
	}
}