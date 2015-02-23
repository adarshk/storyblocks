


Sidebar.Forms = function(editor){

	var signals = editor.signals;

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
	mapBox.appendText('map-marker');
	// mapBox.appendText('area-chart');
		/*mapBox.addContainer().addRow();
		mapBox.appendText('map-marker');
		mapBox.addRow();
		mapBox.appendText('area-chart');*/
		container.add(mapBox);

	mapBox.onChange(function() {


	});


	var chartBox = new UI.Media();
	// chartBox.addContainer();
		chartBox.appendText('area-chart');
		container.add(chartBox);

	var textBox = new UI.Media();
		textBox.appendText('text');
		container.add(textBox);

	var imageBox = new UI.Media();
		imageBox.appendText('image');
		container.add(imageBox);

	var videoBox = new UI.Media();
		videoBox.appendText('video');
		container.add(videoBox);


	container.add(new UI.Break());



	return container;



};