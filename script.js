
	var undoStack = [];

	var $canvas = $('#my-canvas');
	var canvas = $canvas[0];
	var context = canvas.getContext("2d");

	var $clearBtn = $('#clearBtn');


	var paint = false;

	$canvas.mousedown(function(e){


	  var mouseX = e.pageX - this.offsetLeft;
	  var mouseY = e.pageY - this.offsetTop;
	  paint = true;

		undoStack.push({
			arrX: [mouseX],
			arrY: [mouseY],
      id: socket.id
		});
		draw(undoStack);
	});

	$canvas.mousemove(function(e){
		if(!paint)
			return;

		var move = undoStack[undoStack.length-1];

		var mouseX = e.pageX - this.offsetLeft;
	  var mouseY = e.pageY - this.offsetTop;

		move.arrX.push(mouseX);
		move.arrY.push(mouseY);

		draw(undoStack);
	});

	$canvas.mouseup(function(e){
	  paint = false;
	});

	$canvas.mouseleave(function(e){
	  paint = false;
	});

  function clearStack(stack){
    stack = [];
    draw(stack);
  }

  function draw(stack){
	  context.clearRect(0, 0, canvas.width, canvas.height);

	  context.strokeStyle = "#df4b26";
	  context.lineJoin = "round";
	  context.lineWidth = 5;

		stack.forEach(function(el){
			for(var i=0; i < el.arrX.length; i++) {
		    context.beginPath();
				if(i){
	      	context.moveTo(el.arrX[i-1], el.arrY[i-1]);
	     	}else{
	       	context.moveTo(el.arrX[i]-1, el.arrY[i]);
	     	}
			  context.lineTo(el.arrX[i], el.arrY[i]);
			  context.closePath();
			  context.stroke();
		  }
		})
	}

	// ========================================================


	$clearBtn.on('click', function() {
		clearStack(undoStack);
	});
