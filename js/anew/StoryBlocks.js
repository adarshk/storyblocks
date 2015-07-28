	require("./core.js");
	var Editor = require("./utils/Editor.js");
	var Sidebar = require("./views/sidebar/Sidebar.js");
	// var DP = require("./utils/dispatchers.js");
	// var DDP = require("./utils/directDispatch.js");

	var StoryBlocks = require("./SBObject.js");
	require("./utils/dispatchers.js");
	require("./utils/directDispatch.js");
	var constants = require("./constants.js");
	

	$(document).ready(function() {

		for (var k in constants) {
			// StoryBlocks.prototype[k] = constants[k];
			window[k] = constants[k];
		}


		window.thisistheData =  StoryBlocks.load();
		constants.relationships["connections"] = {};

		StoryBlocks.setup();

		console.log("looo");
	});
	
	StoryBlocks.setup = function(){
		window.URL = window.URL || window.webkitURL;
		window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

		window.connectedNodes = {};

		var editor = new Editor();

			
		jsPlumb.bind("ready", function() {

			jsPlumb.setContainer($("#storyBlocks"));

			});

			mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhcnNoayIsImEiOiJZZ0NTRTFNIn0.ODTFzy_g4suBlO0jX641dQ';




			var sidebar = new Sidebar(editor);
			document.body.appendChild(sidebar.dom);
			

			$('body').append('<form id="grid-checkbox" role="form"><div class="checkbox"><input type="checkbox" id="checkbox1" checked><label for="checkbox1">Grid</label></div></form>');
			$('body').append('<form id="drag-checkbox" role="form"><div class="checkbox"><input type="checkbox" id="checkbox2" checked><label for="checkbox2">Drag</label></div></form>');
			// $('body').append('<form id="sidebar-checkbox" role="form"><div class="checkbox"><input type="checkbox" id="checkbox3" checked><label for="checkbox3">Sidebar</label></div></form>');
			$('body').append('<a href="#" id="save-button" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-cloud-download"></span> Save</a>');
			$('body').append('<a href="#" id="preview-button" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-eye-close"></span> Preview</a>');

			

			/*$('#save-button').click(function(){

				$.ajax({
                method: "GET",
                url: "/get-zip",
                contentType: 'application/zip, application/octet-stream'
              })
              .done(function(zipdata){

             	var blob = new Blob([zipdata], {type: "application/zip"});
				saveAs(blob, "Story.zip");
              });
				
			});*/

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

			StoryBlocks.Dispatchers(editor);
			// DP.Dispatchers(editor);
			// console.log(jsPlumb);
			// console.log(DDP);
			StoryBlocks.directDispatch(editor);
			console.log(StoryBlocks);
			// DDP.directDispatch(editor);
			// directDispatch(editor);



            $.getJSON('/data/countries.json',function(cdata){

                // countries_shapeFile_data = cdata;
                window.data = cdata;
            });


			
			//editor.setTheme( editor.config.getKey( 'theme' ) );
			editor.setTheme( '/css/light.css' );
	};


	StoryBlocks.load = function(){

			var povertyData;
			var countryData;
			var incomeData;
			var totals;
			var allData = {};

			var thisistheData = {};
			//window.thisistheData = thisistheData;

			console.log("StoryBlocks start");
			console.log(d3);
			console.log($);
			console.log(THREE);
			console.log(Dropzone);
			console.log(interact);
			console.log(signals);
			console.log("Hi");



			d3.tsv("data/Poverty.csv", function(error, data) {

				povertyData = data;
				//window.povertyData = povertyData;
				// console.log(data);

				// console.log(povertyData[0]);
				$.each(povertyData, function(index, val) {


					// console.log(val);

					for(var key in val){

						var splitTokens = val[key].split(",");

						for(var st=0; st<splitTokens.length;st++){

							if(st === 0){
								allData[splitTokens[st]] = [];
								// allData[splitTokens[st]]["year"] = [];
								// allData[splitTokens[st]]["values"] = [];
							}

							else{
								if(splitTokens[st] === ""){
									var temp = st+1977;

									allData[splitTokens[0]].push({"year":temp, "value":0});
									// allData[splitTokens[0]]["year"].push(temp);
									// allData[splitTokens[0]]["values"].push(0);
								}

								else{
									var temp = st+1977;
									var x = parseInt(splitTokens[st],10);
									allData[splitTokens[0]].push({"year":temp, "value":x});
									// allData[splitTokens[0]]["year"].push(temp);
									// allData[splitTokens[0]]["values"].push(x);
								}
								
							}
						}
					}

                
                 
                });

                console.log("allData - " + allData);
                //window.allData = allData;

                _cntData();

			});

		function _cntData(){

			d3.json("data/countries.json",function(error,data){

				countryData = data;

				console.log('countryData',countryData);

				//window.countryData = countryData;

				_cntData2();

				});
			
		}

		function _cntData2(){

			d3.json("data/countries_mapbox.json",function(error,data){

				incomeData = data.features;

				console.log("incomeData - ",incomeData);
				//window.incomeData = incomeData;

				loadingAllData();


				});
		}


			



			


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

				
			}

			console.log("thisistheData - ", thisistheData);

		}

		return thisistheData;

	};

module.exports = StoryBlocks;