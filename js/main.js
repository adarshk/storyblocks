			window.URL = window.URL || window.webkitURL;
			window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

			var editor = new Editor();

						editor.signals.addInteractToContainer.add(function(cntr){
						console.log(cntr);

						interact('#'+cntr.id)
						  .draggable({
						    // enable inertial throwing
						    inertia: true,
						    // keep the element within the area of it's parent
						    restrict: {
						      restriction: "parent",
						      endOnly: true,
						      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
						    },

						    // call this function on every dragmove event
						    onmove: function (event) {
						      var target = event.target,
						          // keep the dragged position in the data-x/data-y attributes
						          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
						          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

						      // translate the element
						      target.style.webkitTransform =
						      target.style.transform =
						        'translate(' + x + 'px, ' + y + 'px)';

						      // update the posiion attributes
						      target.setAttribute('data-x', x);
						      target.setAttribute('data-y', y);
						    },
						    // call this function on every dragend event
						    onend: function (event) {
						      var textEl = event.target.querySelector('p');

						      textEl && (textEl.textContent =
						        'moved a distance of '
						        + (Math.sqrt(event.dx * event.dx +
						                     event.dy * event.dy)|0) + 'px');
						    }
						    
						  }).resizable({
						    edges: { left: true, right: true, bottom: true, top: true }
						  })
						  .on('resizestart', function (event) {

						    }).on('resizemove', function (event) {
						    var target = event.target;

						    // update the element's style
						    target.style.width  = event.rect.width + 'px';
						    target.style.height = event.rect.height + 'px';

						    // translate when resizing from top or left edges
						    offset.x += event.deltaRect.left;
						    offset.y += event.deltaRect.top;

						    target.style.transform = ('translate('
						                              + offset.x + 'px,'
						                              + offset.y + 'px)');

						    // target.textContent = event.rect.width + '×' + event.rect.height;
						  });

			});

			editor.signals.addDragToContainer.add(function(cntr) {
				console.log(cntr);
				interact('#'+cntr.id).dropzone({
			          ondrop: function (event) {
			          	console.log("ondropactivate");
			          	console.log(event);
			            console.log(event.relatedTarget.id);
			              // editor.signals.elementDragnDrop.dispatch(event.relatedTarget.id);
			              
			            }

			    });
			});


			var viewport = new Viewport( editor );
			document.body.appendChild( viewport.dom );

			/*var script = new Script( editor );
			document.body.appendChild( script.dom );

			var player = new Player( editor );
			document.body.appendChild( player.dom );*/

			var sidebar = new Sidebar(editor);
			document.body.appendChild(sidebar.dom);

			var toolbar = new Toolbar(editor);
			document.body.appendChild(toolbar.dom);

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

			document.addEventListener( 'dragover', function ( event ) {

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

			}