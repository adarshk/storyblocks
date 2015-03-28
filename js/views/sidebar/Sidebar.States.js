


Sidebar.States = function(editor){

	var signals = editor.signals;

	var container = new UI.CollapsiblePanel();

	container.setCollapsed(editor.config.getKey('ui/sidebar/states/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/states/collapsed',boolean);

	});


	var stateNames = ['Animations', 'Transitions', 'Click', 'Timeline','ConnectedEvents'];

	container.addStatic(new UI.Text('States'));
	container.add(new UI.Break());



	for (var i = 0; i < stateNames.length; i++) {
		

		(function() {

			var j = i;

			var addState = new UI.States();
			// mapBox.addContainer();
			addState.addIcon(stateNames[j]);
			container.add(addState);

			var stateId = addState.getId();
			var stateIconId = addState.getIconId();

			//uiMedias.push(addState);

			addState.onMouseOver(function() {

			// mapBox.dom.background = '#72FFE6';				
			$('#'+stateId).css('background','#72FFE6');
			$('#'+stateId).attr('title',stateIconId);

			});

			addState.onMouseOut(function() {

			// mapBox.dom.background = '#72FFE6';				
			$('#'+stateId).css('background','');

			});




			// interact('.'+'fa-'+stateNames[0])
			//interact('#'+stateNames[0])
			interact('#'+stateIconId)
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


		}())
	};

	

	container.add(new UI.Break());



	return container;



};