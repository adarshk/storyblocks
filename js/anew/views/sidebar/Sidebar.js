/**
 * @author mrdoob / http://mrdoob.com/
 */

var UI = require("../ui.js");
var Forms = require("./Sidebar.Forms.js");

var Sidebar = function ( editor ) {

	console.log(" Inside Sidebar");

	var container = new UI.Panel();
	container.setId( 'sidebar' );

	// container.add( new Sidebar.FileMenu( editor ) );
	// container.add( new Sidebar.Container( editor ) );
	//container.add( new Sidebar.Template( editor ) );


	// {
		//Original
		// container.add( new Sidebar.Forms( editor ) );

		//Changed to
		container.add( new Forms( editor ) );
	//}

	
	// container.add( new Sidebar.States( editor ) );
	
	// container.add( new Sidebar.ContainerThrowAway( editor ) );
	//container.add( new Sidebar.ContainerProperties( editor ) );

	//container.add( new Sidebar.Properties( editor ) );

	// container.add( new Sidebar.Renderer( editor ) );
	// container.add( new Sidebar.Scene( editor ) );
	// container.add( new Sidebar.Object3D( editor ) );
	// container.add( new Sidebar.Geometry( editor ) );
	// container.add( new Sidebar.Material( editor ) );
	// container.add( new Sidebar.Animation( editor ) );
	// container.add( new Sidebar.Script( editor ) );

	return container;

};

module.exports = window.Sidebar = Sidebar;