/**
 * @author mrdoob / http://mrdoob.com/
 */

var Sidebar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'sidebar' );

	// container.add( new Sidebar.FileMenu( editor ) );
	// container.add( new Sidebar.Container( editor ) );
	//container.add( new Sidebar.Template( editor ) );
	container.add( new Sidebar.Forms( editor ) );
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
