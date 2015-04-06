			window.URL = window.URL || window.webkitURL;
			window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

			window.connectedNodes = {};

			var editor = new Editor();


			var viewport = new Viewport( editor );
			document.body.appendChild( viewport.dom );

			

			/*var script = new Script( editor );
			document.body.appendChild( script.dom );

			var player = new Player( editor );
			document.body.appendChild( player.dom );*/

			var sidebar = new Sidebar(editor);
			document.body.appendChild(sidebar.dom);

			// var fc = new FreeContainer(editor);
			// document.body.appendChild( fc );
			// $('#'+sidebar.dom.id).css('z-index','1');

			// var toolbar = new Toolbar(editor);
			// document.body.appendChild(toolbar.dom);

			dispatchers(editor);

			// var freeContainer = new FreeContainer(editor);
			// document.body.appendChild(freeContainer.dom);

			// var vc = new ViewportContainers(editor);
			// document.body.appendChild(vc.dom);





            $.getJSON('/data/countries.json',function(cdata){

                // countries_shapeFile_data = cdata;
                window.data = cdata;
            });


			
			//editor.setTheme( editor.config.getKey( 'theme' ) );
			editor.setTheme( '/css/light.css' );

			/*editor.storage.init( function () {

				editor.storage.get( function ( state ) {

					if ( state !== undefined ) {

						editor.fromJSON( state );

					}

					var selected = editor.config.getKey( 'selected' );

					if ( selected !== undefined ) {

						editor.selectByUuid( selected );

					}

				} );

				//

				var timeout;

				var saveState = function ( scene ) {

					if ( editor.config.getKey( 'autosave' ) === false ) {

						return;

					}

					clearTimeout( timeout );

					timeout = setTimeout( function () {

						editor.signals.savingStarted.dispatch();

						timeout = setTimeout( function () {

							editor.storage.set( editor.toJSON() );

							editor.signals.savingFinished.dispatch();

						}, 100 );

					}, 1000 );

				};

				var signals = editor.signals;

				signals.editorCleared.add( saveState );
				signals.geometryChanged.add( saveState );
				signals.objectAdded.add( saveState );
				signals.objectChanged.add( saveState );
				signals.objectRemoved.add( saveState );
				signals.materialChanged.add( saveState );
				signals.sceneGraphChanged.add( saveState );
				signals.scriptChanged.add( saveState );

				var showDialog = function ( content ) {

					dialog.clear();

					dialog.add( content );
					dialog.showModal();

				};

				signals.showDialog.add( showDialog );

			} );*/

			//

		

















		// Uncomment later
		/*	document.addEventListener( 'dragover', function ( event ) {

				event.preventDefault();
				event.dataTransfer.dropEffect = 'copy';

			}, false );

			document.addEventListener( 'drop', function ( event ) {

				event.preventDefault();
				editor.loader.loadFile( event.dataTransfer.files[ 0 ] );

			}, false );

			document.addEventListener( 'keydown', function ( event ) {

				switch ( event.keyCode ) {

					case 8: // prevent browser back
						event.preventDefault();
						break;

				}

			}, false );

			var onWindowResize = function ( event ) {

				editor.signals.windowResize.dispatch();

			};

			window.addEventListener( 'resize', onWindowResize, false );

			onWindowResize();

			//

			var hash = window.location.hash;

			if ( hash.substr( 1, 4 ) === 'app=' ) {

				if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

					var loader = new THREE.XHRLoader();
					loader.crossOrigin = '';
					loader.load( hash.substr( 5 ), function ( text ) {

						var json = JSON.parse( text );

						editor.clear();
						editor.fromJSON( json );

					} );

				}

			}*/