


Sidebar.States = function(editor){

	var signals = editor.signals;

	var container = new UI.CollapsiblePanel();

	container.setCollapsed(editor.config.getKey('ui/sidebar/states/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/states/collapsed',boolean);

	});


	var stateNames = ['animations', 'transitions', 'userClick', 'timeline','connectedEvents'];

	container.addStatic(new UI.Text('States'));
	container.add(new UI.Break());

	// var states = new UI.Form();
	// states.addContainer();
	// states.addRow();



	/*for(var i=0;i<formNames.length;i++){

		var addBox = new UI.States();
		addBox.appendText(formNames[i]);
		container.add(addBox);

	}*/

	var animations = new UI.States();
	// mapBox.addContainer();
	animations.appendText('animations');
	// mapBox.appendText('area-chart');
		/*mapBox.addContainer().addRow();
		mapBox.appendText('map-marker');
		mapBox.addRow();
		mapBox.appendText('area-chart');*/
		container.add(animations);

	animations.onMouseOver(function() {

		// animations.dom.background = '#72FFE6';				
		$('#'+stateNames[0]).css('background','#72FFE6');

	});

	animations.onMouseOut(function() {

		// animations.dom.background = '#72FFE6';				
		$('#'+stateNames[0]).css('background','');

	});

	animations.onClick(function() {

		// animations.dom.background = '#72FFE6';				
		$('#'+stateNames[0]).css('background','#72FFE6');

	});


	var transitions = new UI.States();
	// transitions.addContainer();
		transitions.appendText('transitions');
		container.add(transitions);


	transitions.onMouseOver(function() {

		// transitions.dom.background = '#72FFE6';				
		$('#'+stateNames[1]).css('background','#72FFE6');

	});

	transitions.onMouseOut(function() {

		// transitions.dom.background = '#72FFE6';				
		$('#'+stateNames[1]).css('background','');

	});

	transitions.onClick(function() {

		// transitions.dom.background = '#72FFE6';				
		$('#'+stateNames[1]).css('background','#72FFE6');

	});

	var userClick = new UI.States();
		userClick.appendText('userClick');
		container.add(userClick);


	userClick.onMouseOver(function() {

		// userClick.dom.background = '#72FFE6';				
		$('#'+stateNames[2]).css('background','#72FFE6');

	});

	userClick.onMouseOut(function() {

		// userClick.dom.background = '#72FFE6';				
		$('#'+stateNames[2]).css('background','');

	});

	userClick.onClick(function() {

		// userClick.dom.background = '#72FFE6';				
		$('#'+stateNames[2]).css('background','#72FFE6');

	});

	var timeline = new UI.States();
		timeline.appendText('timeline');
		container.add(timeline);


	timeline.onMouseOver(function() {

		// timeline.dom.background = '#72FFE6';				
		$('#'+stateNames[3]).css('background','#72FFE6');

	});

	timeline.onMouseOut(function() {

		// timeline.dom.background = '#72FFE6';				
		$('#'+stateNames[3]).css('background','');

	});

	timeline.onClick(function() {

		// timeline.dom.background = '#72FFE6';				
		$('#'+stateNames[3]).css('background','#72FFE6');

	});

	var connectedEvents = new UI.States();
		connectedEvents.appendText('connectedEvents');
		container.add(connectedEvents);

	connectedEvents.onMouseOver(function() {

		// connectedEvents.dom.background = '#72FFE6';				
		$('#'+stateNames[4]).css('background','#72FFE6');

	});

	connectedEvents.onMouseOut(function() {

		// connectedEvents.dom.background = '#72FFE6';				
		$('#'+stateNames[4]).css('background','');

	});

	connectedEvents.onClick(function() {

		// connectedEvents.dom.background = '#72FFE6';				
		$('#'+stateNames[4]).css('background','#72FFE6');

	});

	container.add(new UI.Break());



	return container;



};