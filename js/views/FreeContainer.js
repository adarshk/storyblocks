


var FreeContainer = function ( editor, className, mPos ) {

	// var container = new UI.Container();

	var icon = new UI.Cross();
	var outnode = new UI.OutNode();
	

	// icon.onClick(function() {
	// 	editor.signals.deleteFreeContainer.dispatch(this.dom.parentNode);

	// });
	// container.dom.appendChild(icon.dom);
	// container.setId( 'freeContainer' );

	// container.setStyle('top: 50%',['top']]);
	// container.setStyle('outline','1px dashed red',['outline']);

	editor.signals.deleteFreeContainer.add(function(containerDelete) {

		$("#"+containerDelete.id).remove();
	});

	editor.signals.resizeContainer.add(function(containerResize) {

	$("#"+containerResize.id).resize();
	});

	var divContainer = document.createElement('div');
	// divContainer.appendChild(container.dom);
	divContainer.className = className || "free-container";
	divContainer.id = 'A'+THREE.Math.generateUUID().toString();
	divContainer.appendChild(icon.dom);
	divContainer.appendChild(outnode.dom);

	var square = new UI.Square();
	square.id = divContainer.id + '-square';
	square.onClick(function(event){

		// console.log("square clicked");
		// console.log(event);
		editor.signals.showSpectrum.dispatch(event.path[1].id);
	});

	editor.signals.showSpectrum.add(function(showColorId) {
		// console.log(showColorId);
		$('#'+showColorId).spectrum({
		color: "#f00",
		showInput:true,
		});

		$('#'+showColorId).on('change.spectrum', function(e, tinycolor) { 
			console.log(tinycolor);
			// console.log(tinycolor.toHexString());
			$('#'+showColorId).css('background',tinycolor.toHexString());
			$('#'+showColorId).css('opacity',''+1);
			if (tinycolor.toHexString() !== "#ffffff") {
				$('#'+showColorId).children().css('color','#ffffff');
			}
			else{
				$('#'+showColorId).children().css('color','#000000');	
			}
			
		
		});
	});


	divContainer.appendChild(square.dom);
	divContainer.style.height = 'auto';
	divContainer.style.overflow = 'scroll';
	var posx,posy;
	try{
		posx = mPos.pageX;
	}
	catch(e){
		posx = 0;
	}

	try{
		posy = mPos.pageY;
	}
	catch(e){
		posy = 0;
	}
	
	// var posy = mPos.y || 0;
	$(divContainer).css('position','fixed');
	$(divContainer).css('left',"" + posx + "px");
	$(divContainer).css('top',"" + posy + "px");
	$(divContainer).css('background','rgba(0,255,255,0)');
	$(divContainer).css('outline','1px dashed red');
	$(divContainer).css('width','200px');
	$(divContainer).css('height','200px');
	

	/*divContainer.style.top = "50%";
	divContainer.style.left = "30%";
	divContainer.style.right = "300px";
	divContainer.style.bottom = "10%";*/

	icon.onClick(function() {
		editor.signals.deleteFreeContainer.dispatch(this.dom.parentNode);
	});

        

	return divContainer;

};