			window.URL = window.URL || window.webkitURL;
			window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

			window.connectedNodes = {};

			var editor = new Editor();


			jsPlumb.bind("ready", function() {

				jsPlumb.setContainer($("#storyBlocks"));

			});

			mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhcnNoayIsImEiOiJZZ0NTRTFNIn0.ODTFzy_g4suBlO0jX641dQ';



			/*$.ajax({
                method: "GET",
                url: "/get-zip",
                contentType: 'application/zip, application/octet-stream'
              })
              .done(function(zipdata){

             	var blob = new Blob([zipdata], {type: "application/zip"});
				saveAs(blob, "testFileSave.zip");
              });*/

			


			var povertyData;
			var countryData;
			var incomeData;
			var totals;
			var allData = {};

			var thisistheData = {};
			d3.tsv("data/Poverty.csv", function(error, data) {

				povertyData = data;
				// console.log(data);

				// console.log(povertyData[0]);
				$.each(povertyData, function(index, val) {


					// console.log(val);

					for(var key in val){

						var splitTokens = val[key].split(",");

						for(var st=0; st<splitTokens.length;st++){

							if(st == 0){
								allData[splitTokens[st]] = [];
								/*allData[splitTokens[st]]["year"] = [];
								allData[splitTokens[st]]["values"] = [];*/
							}

							else{
								if(splitTokens[st] == ""){
									var temp = st+1977;

									allData[splitTokens[0]].push({"year":temp, "value":0});
									/*allData[splitTokens[0]]["year"].push(temp);
									allData[splitTokens[0]]["values"].push(0);*/
								}

								else{
									var temp = st+1977;
									var x = parseInt(splitTokens[st],10);
									allData[splitTokens[0]].push({"year":temp, "value":x});
									/*allData[splitTokens[0]]["year"].push(temp);
									allData[splitTokens[0]]["values"].push(x);*/
								}
								
							}
						}
					}

                
                 
                });

                console.log(allData);

			});

			d3.json("data/Countries.json",function(error,data){

				countryData = data;

				console.log(countryData);


			});



			d3.json("data/countries_mapbox.json",function(error,data){

				incomeData = data.features;

				console.log(incomeData);

				loadingAllData();


			});


			function loadingAllData(){

			for(var c=0;c<countryData.length;c++){

				var first = false;
				var second = false;

				var income_properties;


				for(var b=0;b<incomeData.length;b++){
					if(incomeData[b].properties.name == countryData[c].name.common){
						first = true;
						var incomeGrp = incomeData[b].properties.income_grp.split(".");
						var economyGrp	=	incomeData[b].properties.economy.split(".");
						//income_properties = "As of 2010, " + incomeData[b].properties.name + " is a " + incomeGrp[1] + " country and a "+ economyGrp[1] + " in "+ incomeData[b].properties.continent;
						income_properties = "According to UN Statistics, as of 2010, " + incomeData[b].properties.name + " is a " + incomeGrp[1] + " country and a "+ economyGrp[1];
					}
				}

				for(var a in allData){
					if(a == countryData[c].name.common){
						// second = true;

						if(first){
							thisistheData[a] = {"name":countryData[c].name.common,"capital":countryData[c].capital, "values": allData[a],"lat":countryData[c].latlng[0],"lng":countryData[c].latlng[1],"text":income_properties};
						}
					}
				}

				/*if(first && second){

					
				}*/
			}

		}




			// var viewport = new Viewport( editor );
			// document.body.appendChild( viewport.dom );


			/*var script = new Script( editor );
			document.body.appendChild( script.dom );

			var player = new Player( editor );
			document.body.appendChild( player.dom );*/

			var sidebar = new Sidebar(editor);
			document.body.appendChild(sidebar.dom);
			// $('#'+sidebar.dom.id).css('z-index','1');


			// var fc = new FreeContainer(editor);
			// document.body.appendChild( fc );
			// $('#'+sidebar.dom.id).css('z-index','1');

			/*var toolbar = new Toolbar(editor);
			document.body.appendChild(toolbar.dom);*/

			$('body').append('<form id="grid-checkbox" role="form"><div class="checkbox"><input type="checkbox" id="checkbox1" checked><label for="checkbox1">Grid</label></div></form>');
			$('body').append('<form id="drag-checkbox" role="form"><div class="checkbox"><input type="checkbox" id="checkbox2" checked><label for="checkbox2">Drag</label></div></form>');
			// $('body').append('<form id="sidebar-checkbox" role="form"><div class="checkbox"><input type="checkbox" id="checkbox3" checked><label for="checkbox3">Sidebar</label></div></form>');
			$('body').append('<a href="#" id="save-button" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-cloud-download"></span> Save</a>');
			$('body').append('<a href="#" id="preview-button" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-eye-close"></span> Preview</a>');

			//$('body').append('<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#"></a></div></div></nav>');

			// $("#grid-checkbox").prop("checked");


			$('#save-button').click(function(){

				
			});

			$('#checkbox1').click(function(){

				
            
            if ($('#checkbox1').is(":checked")){

	            $('.free-container').css('outline','1px dashed red');
				$('.main-container-cross').show();
				$('.main-container-square').show();
				$('.main-container-outnode').show();
				$('._jsPlumb_endpoint').show();
				$('._jsPlumb_connector').show();
				$('.wysihtml5-toolbar').show();

				$('.arrowNode').show();

				$('#sidebar').show();

				$('.fa-arrow-down').show();
				$('.fa-arrow-up').show();

				$('.dropdown').show();
				$('.main-container-checkbox-form').show();




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

				$('.fa-arrow-down').hide();
				$('.fa-arrow-up').hide();


				$('.dropdown').hide();
				$('.main-container-checkbox-form').hide();
            }

        });

			$('#checkbox3').click(function(){

						if ($('#checkbox3').is(":checked")){
							$('#sidebar').show();
						}

						else{
							$('#sidebar').hide();
						}
			});


			$('#checkbox2').click(function(){

				
            
            if ($('#checkbox2').is(":checked")){

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

			dispatchers(editor);

			directDispatch(editor);

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
