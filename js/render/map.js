var Map = function(editor) {

	// this.signals = editor.signals;

	this.translateX = 500;
	this.translateY = 0;
	this.scale = 200;

	this.projection = d3.geo.equirectangular();
	this.path = d3.geo.path().projection(this.projection);
	this.translate = this.projection.translate();
	this.translate[0] = 400;
	this.translate[1] = 0;
	this.projection.translate(this.translate);
	this.projection.scale(this.scale);

};

Map.prototype = {

	setProjection: function(newProjection){
		this.projection = newProjection;
	},

	getProjection: function(){
		return this.projection;
	},

	getPath: function(){
		return this.path;
	},

	setProjectionAndPath: function(newProjection){
		this.projection = newProjection;
		this.path = d3.geo.path.projection(this.projection);
	},

	translateMap: function(x,y){

		this.translateX = (x !== undefined) ? x : this.translateX;
		this.translateY = (y !== undefined) ? y : this.translateY;
		this.projection.translate(x,y);
		
	},

	scaleMap: function(amount){
		this.projection.scale(amount);
	},

	dispatch: function(){
		// this.signals.sceneGraphChanged.dispatch();
	}

};


var Country = function (map, country_data, editor){

	var signals = editor.signals;

	this.editor = editor;

	
	/*this.mapPath = map.path;
	console.log(map.path);
	console.log(country_data.features[0]);
	console.log(typeof country_data.features[0]);
	console.log(map.path(country_data.features[0]));*/


	// console.log(this.geoPath(country_data.features[0]));

	console.log(country_data);

	

	if(country_data){


		this.countries_list = [];

		for(var i=0; i < country_data.features.length; i++){
            
            var geoFeature = country_data.features[i];
            var properties = geoFeature.properties;
            var feature = map.path(geoFeature);

            console.log(feature);

            // console.log(country_data.features[i].properties);
            var mesh = transformSVGPathExposed(feature);
            


            // console.log(mesh);

            for(var j=0;j<mesh.length;j++){
                this.countries_list.push({"data": properties, "mesh":mesh[j]});
            }
        }


	}	
	
	else {
		console.error(country_data + ' is not valid');
	}


};

Country.prototype = {

	addObject: function(){
		        

		for(i=0;i<this.countries_list.length;i++){
            var material = new THREE.MeshPhongMaterial({
                color: this.randomSelectedColor(1,6),
                opacity: 0.5

            });


             var shape3d = this.countries_list[i].mesh.extrude({
                amount :1,
                bevelEnabled: false
            });

            var toAdd = new THREE.Mesh(shape3d,material);

            var country_bsp = new ThreeBSP(toAdd);

            toAdd.name = this.countries_list[i].data.name;

            toAdd.translateX(-300);
            toAdd.translateY(20);
            toAdd.translateZ(50);

            toAdd.rotation.x = Math.PI/2;

            toAdd.scale.x = 2.0;
            toAdd.scale.y = 2.0;
            toAdd.scale.z = 2.0;

            this.editor.addObject(toAdd);

		}
	},


	addPlane: function(){

		var planeGeometry = new THREE.BoxGeometry(3000,1500,30);
        var planeMaterial = new THREE.MeshLambertMaterial({color:0xa6bddb});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.rotation.x = -Math.PI/2;
        plane.translateX(500);
        plane.translateY(100);
		plane.name = 'plane';

		this.editor.addObject( plane );
	},

	addLight: function(){

		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
        directionalLight.position.set( 0, 1, 0 );
        this.editor.addObject( directionalLight );

		var pointLight = new THREE.PointLight(0xFFFFFF, 1.0 );
        pointLight.position.x = 0;
        pointLight.position.y = 3000;
        pointLight.position.z = 0;
        this.editor.addObject(pointLight);


        var pointLight2 = new THREE.PointLight(0xFFFFFF, 1.0 );
        pointLight2.position.x = 0;
        pointLight2.position.y = -3000;
        pointLight2.position.z = 0;
        this.editor.addObject(pointLight2);
	},

	randomSelectedColor: function(min, max){
		switch(Math.floor(Math.random() * (max - min)) + min){

            case 1:
                return 0xffffcc;

            case 2:
                return 0xc7e9b4;

            case 3:
                return 0x7fcdbb;

            case 4:
                return 0x41b6c4;

            case 5:
                return 0x2c7fb8;

            case 6:
                return 0x253494;

             default:
                return 0xffffcc;


        }
	}

}