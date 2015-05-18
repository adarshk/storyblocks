
Sidebar.ContainerThrowAway = function(editor){

	var signals = editor.signals;

	var container = new UI.CollapsiblePanel();

	var freeContainer;

	container.setCollapsed(editor.config.getKey('ui/sidebar/containers/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/properties/collapsed',boolean);

	});



	container.addStatic(new UI.Text('Containter Throwaway'));
	container.add(new UI.Break());


	var mainContainer = new UI.Panel();
	mainContainer.setClass("main-throwaway-container");

	var col6 = document.createElement('div');

	
	var icon = document.createElement('span');
	icon.className = 'fa fa-square-o fa-4x';
	
	icon.id = 'container-icon';
    col6.appendChild(icon);


    mainContainer.dom.appendChild(col6);

	// mainContainer.appendIcon();
	container.add(mainContainer);

	mainContainer.onMouseOver(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('.main-throwaway-container').css('background','#72FFE6');

	});

	mainContainer.onMouseOut(function() {


		// mapBox.dom.background = '#72FFE6';				
		$('.main-throwaway-container').css('background','');

	});


		// interact('.'+'fa-'+formNames[0])
		interact('#container-icon')

	  		.draggable({
	    		inertia: true,
	    		
			    onmove: function (event) {
			    	// console.log("onmove event");
			    	// console.log(event);
			    /*var target = event.target;

			    	x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	      			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	      		target.style.webkitTransform =
	  			target.style.transform =
	    			'translate(' + x + 'px, ' + y + 'px)';

			      // update the posiion attributes
			      target.setAttribute('data-x', x);
			      target.setAttribute('data-y', y);*/
			    },

			    onend: function(event){
			    	console.log("onEnd");
			    	console.log(event);
			    }

	    		
	  	})

		interact('#container-icon')
			.on('dragstart',dragstart)
			.on('dragmove',dragmove)
			.on('dragend',dragend);

		function dragstart(event){
			/*console.log("start");
			console.log(event);*/
			freeContainer = new FreeContainer(editor,'throwaway-container',event);
			$('#storyBlocks').append(freeContainer);
		}

		function dragmove(event){
			/*console.log("moving");
			console.log(event);*/

			
			// if(event.speed < 10){
			$(freeContainer).css('left', event.pageX);
			$(freeContainer).css('top', event.pageY);
			// }
			

			
		}

		function dragend(event){
			/*console.log("moveend");
			console.log(event);*/
			editor.signals.addInteractToContainer.dispatch(freeContainer.id);

			// console.log('Childdd',$(freeContainer).find('.free-container')[0]);
			

			// editor.signals.addDragnDropToContainer.dispatch($(freeContainer).find('.free-container')[0]);

		}





	/*editor.signals.elementDragnDrop.add(function(elementId, mousePos){
		if(elementId == 'container-icon'){

			function addFreeContainer(callback,mPos){

				var freeContainer = new FreeContainer(editor,'free-container',mPos);

				$('body').append(freeContainer);

				callback(freeContainer);
			}

			function sendSignal(freeContainer) {
				editor.signals.addInteractToContainer.dispatch(freeContainer.id);

				editor.signals.addDragnDropToContainer.dispatch(freeContainer);
			}

			addFreeContainer(sendSignal,mousePos);


		}
	});*/



	container.add(new UI.Break());



	return container;



};