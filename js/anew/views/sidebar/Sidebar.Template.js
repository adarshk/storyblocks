
Sidebar.Template = function(editor){

	var signals = editor.signals;

	var container = new UI.CollapsiblePanel();

	var freeContainer;

	container.setCollapsed(editor.config.getKey('ui/sidebar/containers/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/properties/collapsed',boolean);

	});



	container.addStatic(new UI.Text('Template'));
	container.add(new UI.Break());


	var mainContainer = new UI.Panel();
	mainContainer.setClass("sidebar-container");

	var col6 = document.createElement('div');

	
	var icon = document.createElement('span');
	icon.className = 'fa fa-plus-square-o fa-4x';
	
	icon.id = 'container-icon';
    col6.appendChild(icon);


    mainContainer.dom.appendChild(col6);

	// mainContainer.appendIcon();
	container.add(mainContainer);

	mainContainer.onMouseOver(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('.sidebar-container').css('background','#72FFE6');

	});

	mainContainer.onMouseOut(function() {


		// mapBox.dom.background = '#72FFE6';				
		$('.sidebar-container').css('background','');

	});


	container.add(new UI.Break());



	return container;



};