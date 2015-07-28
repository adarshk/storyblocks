
var Sidebar = require("./Sidebar.js");

Sidebar.ContainerProperties = function(editor){

	var signals = editor.signals;

	var container = new UI.CollapsiblePanel();

	container.setCollapsed(editor.config.getKey('ui/sidebar/containerproperties/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/containerproperties/collapsed',boolean);

	});



	container.addStatic(new UI.Text('Window Properties'));
	container.add(new UI.Break());


	var mainContainer = new UI.Panel();
	mainContainer.setClass("sidebar-container-properties");

	var col6 = document.createElement('div');

	
	var icon = document.createElement('span');
	icon.className = 'fa fa-square-o fa-4x';
	
	icon.id = 'properties-icon';
    col6.appendChild(icon);


    mainContainer.dom.appendChild(col6);

	// mainContainer.appendIcon();
	container.add(mainContainer);

	mainContainer.onMouseOver(function() {

		$('.sidebar-container-properties').css('background','#72FFE6');

	});

	mainContainer.onMouseOut(function() {

		$('.sidebar-container-properties').css('background','');

	});

	
	mainContainer.onClick(function(){

	$("#properties-icon").spectrum({
		color: "#f00"
	});

	});

		// interact('.'+'fa-'+formNames[0])
			interact('#properties-icon')

		  		.draggable({
		    		inertia: true,
		    		restrict: {
				      restriction: 'parent',
				      endOnly: true,
				      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
				    },
				    onmove: function (event) {
				    var target = event.target;

				    	x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	          			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	          		target.style.webkitTransform =
	      			target.style.transform =
	        			'translate(' + x + 'px, ' + y + 'px)';

				      // update the posiion attributes
				      target.setAttribute('data-x', x);
				      target.setAttribute('data-y', y);
				    },

		    		
		  	})





	editor.signals.elementDragnDrop.add(function(elementId){
		if(elementId == 'properties-icon'){

			function addFreeContainer(callback){

				console.log('Properties Clicked');

				/*var freeContainer = new FreeContainer(editor,'free-container');

				$('body').append(freeContainer);

				callback(freeContainer);*/
			}

			function sendSignal(freeContainer) {
				// editor.signals.addInteractToContainer.dispatch(freeContainer.id);

				// editor.signals.addDragnDropToContainer.dispatch(freeContainer);
			}

			addFreeContainer(sendSignal);


		}
	});



	container.add(new UI.Break());



	return container;



};