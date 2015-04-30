


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

		delete codeMirrorDict[$(containerDelete).find('.free-container')[0].id];
		
		for(var r in relationships){

			if(containerDelete.id == r){

				delete relationships[r];

			}
		}
		$("#"+containerDelete.id).remove();
	});

	editor.signals.resizeContainer.add(function(containerResize) {

	$("#"+containerResize.id).resize();
	});


	editor.signals.addArrowtoContainer.add(function(theblock, uniqueId,pos ,changedText) {

		

		if(codeMirrorDict[theblock.id][pos]){
			
		}
		else{
			
			
			

			var appendedDiv = $(theblock).append('<span class="fa fa-arrows-h arrowNode" id="'+ uniqueId +'"></span>');

			var leftDist = Object.keys(codeMirrorDict[theblock.id]).length * 20;
		
				$('#'+uniqueId).css({

					'position' : 'fixed',
					'display':'block',
					'height': 'auto',
					'bottom': '90%',
					'top': '0',
					'left': leftDist + 'px',
					'right': '0',
					'float':'right',

					'margin-left':'auto',
					'margin-right':'15px',
					'margin-top':'15px'


				});

		codeMirrorDict[theblock.id][pos] = changedText;

		}
		
		

		
	});

	editor.signals.deleteArrowfromContainer.add(function(theblock) {

		// console.log(theblock);
		
	});

	
	var mainDivContainer = document.createElement('div');

	var divContainer = document.createElement('div');
	// divContainer.appendChild(container.dom);
	divContainer.className = className || "free-container";
	divContainer.id = 'B'+THREE.Math.generateUUID().toString();
	/*divContainer.appendChild(icon.dom);
	divContainer.appendChild(outnode.dom);*/


	mainDivContainer.className = "mainDivContainer";
	mainDivContainer.id = 'A'+divContainer.id;

	var square = new UI.Square();
	square.id = divContainer.id + '-square';
	square.onClick(function(event){

		// console.log("square clicked");
		// console.log(event);
		// editor.signals.showSpectrum.dispatch(event.path[1].id);

		console.log(event);
		// event.target.className = "fa fa-arrow-up main-container-square";
		
	});

	editor.signals.showSpectrum.add(function(showColorId) {
		// console.log(showColorId);
		$('#'+showColorId).spectrum({
		color: "#ffffff",
		showInput:true,
		preferredFormat: "rgb",
		containerClassName: "color-picker"
		});

		$('#'+showColorId).on('move.spectrum', function(e, tinycolor) { 
			// console.log(tinycolor);
			// console.log(tinycolor.toHexString());


			$('.CodeMirror-scroll').css('background-color',tinycolor.toHexString());


			$('#'+showColorId).css('background',tinycolor.toHexString());
			$('#'+showColorId).css('opacity',''+1);
			if (tinycolor.toHexString() !== "#ffffff") {
				$('#'+showColorId).children().css('color','#ffffff');
			}
			else{
				$('#'+showColorId).children().css('color','#000000');	
			}
			
		
		})
			.on('change.spectrum', function(e, tinycolor) { 
			// console.log(tinycolor);
			// console.log(tinycolor.toHexString());
			$('#'+showColorId).css('background',tinycolor.toHexString());
			$('#'+showColorId).css('opacity',''+1);
			if (tinycolor.toHexString() !== "#ffffff") {
				$('#'+showColorId).children().css('color','#ffffff');
			}
			else{
				$('#'+showColorId).children().css('color','#000000');	
			}
			
		
		})

			.on('hide.spectrum', function(e, tinycolor) { 
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
			$('#'+showColorId).spectrum("disable");
			
		
		})
		;
	});


	// divContainer.appendChild(square.dom);
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
	$(divContainer).css('position','absolute');
	$(divContainer).css('left',"" + 0 + "px");
	$(divContainer).css('top',"" + 30 + "px");
	$(divContainer).css('background','rgba(0,255,255,0)');
	$(divContainer).css('outline','1px dashed red');
	$(divContainer).css('width','100%');
	$(divContainer).css('height','90%');



	$(mainDivContainer).css('position','fixed');
	$(mainDivContainer).css('left',"" + posx + "px");
	$(mainDivContainer).css('top',"" + posy + "px");
	$(mainDivContainer).css('background','rgba(0,255,255,0)');
	// $(mainDivContainer).css('outline','1px dashed red');
	$(mainDivContainer).css('width','200px');
	$(mainDivContainer).css('height','200px');
	

	/*divContainer.style.top = "50%";
	divContainer.style.left = "30%";
	divContainer.style.right = "300px";
	divContainer.style.bottom = "10%";*/

	icon.onClick(function() {
		editor.signals.deleteFreeContainer.dispatch(this.dom.parentNode);
	});

    $(mainDivContainer).append(divContainer);
    $(mainDivContainer).append(icon.dom);
    $(mainDivContainer).append(outnode.dom);
    $(mainDivContainer).append(square.dom);
    
    

	return mainDivContainer;

};