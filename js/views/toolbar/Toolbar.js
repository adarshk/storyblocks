/**
 * @author mrdoob / http://mrdoob.com/
 */

var Toolbar = function ( editor ) {

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setId( 'toolbar' );

	var buttons = new UI.Panel();
	container.add( buttons );

	// translate / rotate / scale

	/*var translate = new UI.Button( 'translate' ).onClick( function () {

		signals.transformModeChanged.dispatch( 'translate' );

	} );
	buttons.add( translate );

	var rotate = new UI.Button( 'rotate' ).onClick( function () {

		signals.transformModeChanged.dispatch( 'rotate' );

	} );
	buttons.add( rotate );

	var scale = new UI.Button( 'scale' ).onClick( function () {

		signals.transformModeChanged.dispatch( 'scale' );

	} );
	buttons.add( scale );

	// grid

	var grid = new UI.Number( 25 ).onChange( update );
	grid.dom.style.width = '42px';
	buttons.add( new UI.Text( 'Grid: ' ) );
	buttons.add( grid );

	var snap = new UI.Checkbox( false ).onChange( update );
	buttons.add( snap );
	buttons.add( new UI.Text( 'snap' ) );

	var local = new UI.Checkbox( false ).onChange( update );
	buttons.add( local );
	buttons.add( new UI.Text( 'local' ) );

	var showGrid = new UI.Checkbox().onChange( update ).setValue( false );
	buttons.add( showGrid );
	buttons.add( new UI.Text( 'show' ) );*/





	var showRedLines = new UI.Checkbox().onChange( enableDisable ).setValue( true );
	buttons.add( showRedLines );
	buttons.add( new UI.Text( 'Grid' ) );
	var cl = new UI.Color();
	// buttons.add(  cl.setHexValue("eeeeee"));


	var showDrag = new UI.Checkbox().onChange( enableDisableDrag ).setValue( true );
	buttons.add( showDrag );
	buttons.add( new UI.Text( 'Dragging' ) );


	
	function enableDisableDrag(){
		signals.enableDisableDragging.dispatch(showDrag.getValue() );
	}

	function enableDisable(){
		signals.redLines.dispatch( showRedLines.getValue() );
		
	}

	


	signals.enableDisableDragging.add(function(drag){

		if(drag){

			for(var rl in relationships){

			interact('#'+rl)
				.draggable({

					enabled: true
					});
			}
		}

		else{
			
			for(var rl2 in relationships){

			interact('#'+rl2)
				.draggable({

					enabled: false
					});
			}
		}


	});


	signals.redLines.add(function(red){

		if(red){
			$('.free-container').css('outline','1px dashed red');
			$('.main-container-cross').show();
			$('.main-container-square').show();
			$('.main-container-outnode').show();
			$('._jsPlumb_endpoint').show();
			$('._jsPlumb_connector').show();
			$('.wysihtml5-toolbar').show();

			$('.arrowNode').show();

			$('#sidebar').show();


			/*for(var rk in relationships["connections"]){

				jsPlumb.hide($("#"+rk));

			}*/

		}
		else{
			$('.free-container').css('outline','');

			$('.main-container-cross').hide();
			$('.main-container-square').hide();
			$('.main-container-outnode').hide();

			$('._jsPlumb_endpoint').hide();
			$('._jsPlumb_connector').hide();
			$('.wysihtml5-toolbar').hide();
			$('.arrowNode').hide();
			$('#sidebar').hide();


			/*for(var rk2 in relationships["connections"]){

				jsPlumb.show($("#"+rk2));

			}*/
		}

	});

	enableDisable();
	// enableDisbleDragging();

	/*function update() {

		signals.snapChanged.dispatch( snap.getValue() === true ? grid.getValue() : null );
		signals.spaceChanged.dispatch( local.getValue() === true ? "local" : "world" );
		signals.showGridChanged.dispatch( showGrid.getValue() );

	}

	update();*/

	return container;

}
