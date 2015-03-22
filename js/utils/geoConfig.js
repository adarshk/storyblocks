geoConfig = function(){

	this.mercator = d3.geo.mercator();
	this.path = d3.geo.path.projection(mercator);
	this.mercator.translate(500,0);
	this.mercator.scale(200);

};


var geo = new geoConfig();


function countries(country_data){

	var signals = editor.signals;

	var countries_list = [];

	for(var i=0;i < country_data.features.length; i++){
            
            var geoFeature = country_data.features[i];
            var properties = geoFeature.properties;
            var feature = geo.path(geoFeature);

            var mesh = transformSVGPathExposed(feature);


            // console.log(mesh);

            for(var j=0;j<mesh.length;j++){
                countries_list.push({"data": properties, "mesh":mesh[j]});
            }
        }

                for(i=0;i<countries_list.length;i++){

            var material = new THREE.MeshPhongMaterial({
                color: randomSelectedColor(1,6),
                opacity: 0.5

            });

            // console.log(material.color);

            var shape3d = countries_list[i].mesh.extrude({
                amount :1,
                bevelEnabled: false
            });

            var toAdd = new THREE.Mesh(shape3d,material);

            var country_bsp = new ThreeBSP(toAdd);

            toAdd.name = countries_list[i].data.name;

            toAdd.translateX(-50);
            toAdd.translateY(20);
            toAdd.translateZ(50);

            toAdd.rotation.x = -Math.PI/2;

            toAdd.scale.x = 3.0;
            toAdd.scale.y = 3.0;
            toAdd.scale.z = 3.0;
        }

}