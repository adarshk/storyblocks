$(window).load(function() {


	var countries_shapeFile_data;

	/*$.getJSON('countries.json',function(cdata){

		countries_shapeFile_data = cdata;

	});*/

	$.when(
            $.getJSON('/data/countries.json',function(cdata){

                countries_shapeFile_data = cdata;
                window.data = cdata;
            })

        ).then(function(){

        // var map = new Map();
        // console.log(map);
		// var country = new Country(map,countries_shapeFile_data,editor);

		// window.country = country;

		/*country.addPlane();
		country.addLight();
		country.addObject();*/

        });
	
	
	// $('#myModal').modal('show');
	$('#ViewportContainers').hide();

	$('img').click(function(){
    	$('.edge-shadow').removeClass('edge-shadow');
    	$(this).addClass('edge-shadow');
	});

	editor.signals.elementDragnDrop.add(function(elementId){
		if(elementId == 'map-marker'){
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

	interact('#viewport').dropzone({
			ondropactivate: function (event) {
    			console.log(event.relatedTarget.id);
    			editor.signals.elementDragnDrop.dispatch(event.relatedTarget.id);
    			
  			},
			
			ondrop : function (event){
				console.log(event);
			}

		});



});