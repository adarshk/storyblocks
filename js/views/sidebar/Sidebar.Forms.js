


Sidebar.Forms = function(editor){

	var signals = editor.signals;

	var childContainer;

	signals.fogColorChanged.dispatch( 'a6bddb' );

	var container = new UI.CollapsiblePanel();

	container.setCollapsed(editor.config.getKey('ui/sidebar/forms/collapsed'));

	container.onCollapsedChange(function(boolean){

		editor.config.setKey('ui/sidebar/forms/collapsed',boolean);

	});


	// var formNames = ['map-marker', 'area-chart', 'text', 'image','video'];
	var formNames = ['Map', 'Chart', 'Text', 'Image','Video', 'Tweet'];

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
				    onmove: function (event) {
				    
				    },
		    		
		  	})




		  interact('#'+formIconId)
			.on('dragstart',dragstart)
			.on('dragmove',dragmove)
			.on('dragend',dragend);

		function dragstart(event){
			


			if(event.target.id == "Text"){

			// console.log("dragstart", event);

			var commentid = event.target.id + '-comment';
            // console.log(commentid);

            childContainer = new FreeContainer(editor,'text-container',event);

            //childContainer = $('<div class="text-container"> </div>');
            $(childContainer).append('<textarea class="form-control" autofocus="" rows="5" id="' + commentid +'"></textarea>');

            $('body').append(childContainer);

            // console.log("childContainer");
            // console.log(childContainer);
            //$(event.target).append(childContainer);
            $('#'+commentid).html('Start typing here ... ');
            $('#'+commentid).wysihtml5({
                  
                    toolbar: {
                    "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": true, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": true, //Button to change color of font  
                    "blockquote": true, //Blockquote  
                    "data-wysihtml5-display-format-name": true,
                	}
                  
              });

        }



        if(event.target.id == "Image"){

			// console.log("dragstart", event);

			var commentid = event.target.id + '-image';
            // console.log(commentid);

            childContainer = new FreeContainer(editor,'image-container',event);

            //childContainer = $('<div class="text-container"> </div>');
            $(childContainer).append('<span class="fa fa-file-image-o fa-5x"></span>');

            $('body').append(childContainer);
            

        }


			
		}

		function dragmove(event){
			/*console.log("moving");
			console.log(event);*/

			
			// if(event.speed < 10){
			$(childContainer).css('left', event.pageX);
			$(childContainer).css('top', event.pageY);
			// }
			

			
		}

		function dragend(event){
			/*console.log("moveend");
			console.log(event);*/
			//editor.signals.addInteractToContainer.dispatch(childContainer.id);

			//editor.signals.addDragnDropToContainer.dispatch(childContainer);

			
			/*console.log("dragend");
			console.log(event);
			console.log(childContainer);*/
			$(childContainer).remove();

		}




		}())
	};



	container.add(new UI.Break());



	return container;



};