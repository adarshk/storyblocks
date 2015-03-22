


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

	var uiMedias = [];

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
		$('#'+formNames[0] + 'Container').css('background','#72FFE6');

	});

	mapBox.onMouseOut(function() {

		// mapBox.dom.background = '#72FFE6';				
		$('#'+formNames[0] + 'Container').css('background','');

	});

		// interact('.'+'fa-'+formNames[0])
			interact('#'+formNames[0])
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

	/*mapBox.onClick(function() {


		// var map = new Map();

		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
        directionalLight.position.set( 0, 1, 0 );
        editor.addObject( directionalLight );

        var pointLight = new THREE.PointLight(0xFFFFFF, 1.0 );
        pointLight.position.x = 0;
        pointLight.position.y = 3000;
        pointLight.position.z = 0;
        editor.addObject(pointLight);


        var pointLight2 = new THREE.PointLight(0xFFFFFF, 1.0 );
        pointLight2.position.x = 0;
        pointLight2.position.y = -3000;
        pointLight2.position.z = 0;
        editor.addObject(pointLight2);


		var planeGeometry = new THREE.BoxGeometry(1400,700,30);
        var planeMaterial = new THREE.MeshLambertMaterial({color:0xa6bddb});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.rotation.x = -Math.PI/2;
		plane.name = 'plane';

		editor.addObject( plane );

		country.addPlane();
		// country.addLight();
		country.addObject();

		// var country = new Country(map,countries_shapeFile_data,editor);

		// editor.select( plane );		



		// mapBox.dom.background = '#72FFE6';
		//console.log($('#'+formNames[0]).css('backgroundColor'));
		// if($('#'+formNames[0]).css('backgroundColor')){
		// 	$('#'+formNames[0]).css('background','#ffffff');
		// }
		// else{
		// 	console.log($('#'+formNames[0]).css('background'));
		// 	$('#'+formNames[0]).css('background','#72FFE6');
		// }

	});*/




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