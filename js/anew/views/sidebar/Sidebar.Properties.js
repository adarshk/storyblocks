var Sidebar = require("./Sidebar.js");


Sidebar.Properties = function(editor) {

	var signals = editor.signals;

	var contents = {

		'Media' : 'Media',
		'Actions':'Actions'
	};

	var container = new UI.CollapsiblePanel();
	container.setCollapsed(editor.config.getKey('ui/sidebar/properties/collapsed'));
	container.onCollapsedChange(function (boolean){

		editor.config.setKey('ui/sidebar/properties/collapsed',boolean);

	});

	container.addStatic(new UI.Text('Properties'));
	container.add(new UI.Break());

	var options = {};

	for(var key in contents){
		options[key] = key;
	}

	var propertyTypeRow = new UI.Panel();
	var propertyType = new UI.Select().setOptions(options).setWidth( '150px' ).setColor( '#444' );

	propertyTypeRow.add(new UI.Text('Media'));
	propertyTypeRow.add(propertyType);

	container.add( propertyTypeRow );

	return container;

};