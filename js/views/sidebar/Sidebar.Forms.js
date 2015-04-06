


Sidebar.Forms = function(editor){

	var signals = editor.signals;

	signals.fogColorChanged.dispatch( 'a6bddb' );

	var container = new UI.CollapsiblePanel();

	container.setCollapsed(editor.config.getKey('ui/sidebar/forms/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/forms/collapsed',boolean);

	});


	// var formNames = ['map-marker', 'area-chart', 'text', 'image','video'];
	var formNames = ['Map', 'Chart', 'Text', 'Image','Video'];

	container.addStatic(new UI.Text('Forms'));
	container.add(new UI.Break());

		editor.signals.elementDragnDrop.add(function(elementId){
		if(elementId == 'Map'){
			var map = new Map();
			var country = new Country(map,data,editor);
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
			country.addObject();

		}

	});


	

	

	for (var i = 0; i < formNames.length; i++) {
		

		(function() {

			var j = i;

			var addForm = new UI.Media();
			addForm.addIcon(formNames[j]);
			container.add(addForm);

			var formId = addForm.getId();
			var formIconId = addForm.getIconId();

			addForm.onMouseOver(function() {

			$('#'+formId).css('background','#72FFE6');
			$('#'+formId).attr('title', formIconId);

			});

			addForm.onMouseOut(function() {

			$('#'+formId).css('background','');

			});




			// interact('.'+'fa-'+formNames[0])
			//interact('#'+formNames[0])
			interact('#'+formIconId)

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