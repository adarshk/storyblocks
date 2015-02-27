


Sidebar.Forms = function(editor){

	var signals = editor.signals;

	signals.fogColorChanged.dispatch( 'a6bddb' );

	var container = new UI.CollapsiblePanel();

	container.setCollapsed(editor.config.getKey('ui/sidebar/forms/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/forms/collapsed',boolean);

	});


	var formNames = ['map-marker', 'area-chart', 'text', 'image','video'];

	container.addStatic(new UI.Text('Forms'));
	container.add(new UI.Break());

	// var forms = new UI.Form();
	// forms.addContainer();
	// forms.addRow();



	/*for(var i=0;i<formNames.length;i++){

		var addBox = new UI.Media();
		addBox.appendText(formNames[i]);
		container.add(addBox);

	}*/

	var mapBox = new UI.Media();
	// mapBox.addContainer();
	mapBox.appendText(formNames[0]);
	// mapBox.appendText('area-chart');
		/*mapBox.addContainer().addRow();
		mapBox.appendText('map-marker');
		mapBox.addRow();
		mapBox.appendText('area-chart');*/
		container.add(mapBox);

	mapBox.onMouseOver(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[0]).css('background','#72FFE6');

	});

	mapBox.onMouseOut(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[0]).css('background','');

	});

	mapBox.onClick(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[0]).css('background','#72FFE6');

	});




	var chartBox = new UI.Media();
	// chartBox.addContainer();
		chartBox.appendText('area-chart');
		container.add(chartBox);



	chartBox.onMouseOver(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[1]).css('background','#72FFE6');

	});

	chartBox.onMouseOut(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[1]).css('background','');

	});

	chartBox.onClick(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[1]).css('background','#72FFE6');

	});

	var textBox = new UI.Media();
		textBox.appendText('text');
		container.add(textBox);


	textBox.onMouseOver(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[2]).css('background','#72FFE6');

	});

	textBox.onMouseOut(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[2]).css('background','');

	});

	textBox.onClick(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[2]).css('background','#72FFE6');

	});



	var imageBox = new UI.Media();
		imageBox.appendText('image');
		container.add(imageBox);


	imageBox.onMouseOver(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[3]).css('background','#72FFE6');

	});

	imageBox.onMouseOut(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[3]).css('background','');

	});

	imageBox.onClick(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[3]).css('background','#72FFE6');

	});

	var videoBox = new UI.Media();
		videoBox.appendText('video');
		container.add(videoBox);


	videoBox.onMouseOver(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[4]).css('background','#72FFE6');

	});

	videoBox.onMouseOut(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[4]).css('background','');

	});

	videoBox.onClick(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[4]).css('background','#72FFE6');

	});


	container.add(new UI.Break());



	return container;



};