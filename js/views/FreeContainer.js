


var FreeContainer = function ( editor, className, mPos,type ) {

	// var container = new UI.Container();

	var icon = new UI.Cross();
	var outnode = new UI.OutNode();
	

	// icon.onClick(function() {
	// 	editor.signals.deleteFreeContainer.dispatch(this.dom.parentNode);

	// });
	// container.dom.appendChild(icon.dom);
	// container.setId( 'freeContainer' );

	// container.setStyle('top: 50%',['top']]);
	// container.setStyle('outline','1px dashed red',['outline']);

	editor.signals.deleteFreeContainer.add(function(containerDelete) {

		delete codeMirrorDict[$(containerDelete).find('.free-container')[0].id];
		
		for(var r in relationships){

			if(containerDelete.id == r){

				delete relationships[r];

			}
		}
		$("#"+containerDelete.id).remove();
	});

	editor.signals.resizeContainer.add(function(containerResize) {

	$("#"+containerResize.id).resize();
	});


	editor.signals.addArrowtoContainer.add(function(theblock, uniqueId,pos ,changedText) {

		

		if(codeMirrorDict[theblock.id][pos]){
			
		}
		else{
			
			
			

			var appendedDiv = $(theblock).append('<span class="fa fa-arrows-h arrowNode" id="'+ uniqueId +'"></span>');

			var leftDist = Object.keys(codeMirrorDict[theblock.id]).length * 20;
		
				$('#'+uniqueId).css({

					'position' : 'fixed',
					'display':'block',
					'height': 'auto',
					'bottom': '90%',
					'top': '0',
					'left': leftDist + 'px',
					'right': '0',
					'float':'right',

					'margin-left':'auto',
					'margin-right':'15px',
					'margin-top':'15px'


				});

		codeMirrorDict[theblock.id][pos] = changedText;

		}
		
		

		
	});

	editor.signals.deleteArrowfromContainer.add(function(theblock) {

		// console.log(theblock);
		
	});

	
	var mainDivContainer = document.createElement('div');

	var divContainer = document.createElement('div');
	// divContainer.appendChild(container.dom);
	divContainer.className = className || "free-container";
	divContainer.id = 'B'+THREE.Math.generateUUID().toString();
	/*divContainer.appendChild(icon.dom);
	divContainer.appendChild(outnode.dom);*/


	mainDivContainer.className = "mainDivContainer";
	mainDivContainer.id = 'A'+divContainer.id;

	/*var square = new UI.Square();
	square.id = divContainer.id + '-square';
	square.onClick(function(event){

		// console.log("square clicked");
		// console.log(event);
		// editor.signals.showSpectrum.dispatch(event.path[1].id);

		
		console.log($(event.target).parents('.main-container'));
		var changeArrow = event.target.className.split(" ");
		
		
		if (changeArrow[1] == "fa-arrow-up") {

			event.target.className = "fa fa-arrow-down main-container-plus";

		}

		else if (changeArrow[1] == "fa-arrow-down") {

			event.target.className = "fa fa-arrow-up main-container-plus";

		}
		
	});*/


	var checkbox = new UI.Checkbox();
	checkbox.id = divContainer.id + '-checkbox';

	var arrow = new UI.Arrow();
	arrow.id = divContainer.id + '-arrow';
	arrow.onClick(function(event){

		// console.log("arrow clicked");
		// console.log(event);
		// editor.signals.showSpectrum.dispatch(event.path[1].id);

		
		// console.log($(event.target).parents('.main-container'));
		var changeArrow = event.target.className.split(" ");
		
		
		if (changeArrow[1] == "fa-arrow-up") {

			event.target.className = "fa fa-arrow-down main-container-plus";

		}

		else if (changeArrow[1] == "fa-arrow-down") {

			event.target.className = "fa fa-arrow-up main-container-plus";

		}
		
	});


	/*var plus = new UI.Plus();
	plus.id = divContainer.id + '-plus';
	plus.onClick(function(event){

		// console.log("plus clicked");
		// console.log(event);
		// editor.signals.showSpectrum.dispatch(event.path[1].id);


		
		
	});*/

	editor.signals.showSpectrum.add(function(showColorId) {
		// console.log(showColorId);
		$('#'+showColorId).spectrum({
		color: "#ffffff",
		showInput:true,
		preferredFormat: "rgb",
		containerClassName: "color-picker"
		});

		$('#'+showColorId).on('move.spectrum', function(e, tinycolor) { 
			// console.log(tinycolor);
			// console.log(tinycolor.toHexString());


			$('.CodeMirror-scroll').css('background-color',tinycolor.toHexString());


			$('#'+showColorId).css('background',tinycolor.toHexString());
			$('#'+showColorId).css('opacity',''+1);
			if (tinycolor.toHexString() !== "#ffffff") {
				$('#'+showColorId).children().css('color','#ffffff');
			}
			else{
				$('#'+showColorId).children().css('color','#000000');	
			}
			
		
		})
			.on('change.spectrum', function(e, tinycolor) { 
			// console.log(tinycolor);
			// console.log(tinycolor.toHexString());
			$('#'+showColorId).css('background',tinycolor.toHexString());
			$('#'+showColorId).css('opacity',''+1);
			if (tinycolor.toHexString() !== "#ffffff") {
				$('#'+showColorId).children().css('color','#ffffff');
			}
			else{
				$('#'+showColorId).children().css('color','#000000');	
			}
			
		
		})

			.on('hide.spectrum', function(e, tinycolor) { 
			console.log(tinycolor);
			// console.log(tinycolor.toHexString());
			$('#'+showColorId).css('background',tinycolor.toHexString());
			$('#'+showColorId).css('opacity',''+1);
			if (tinycolor.toHexString() !== "#ffffff") {
				$('#'+showColorId).children().css('color','#ffffff');
			}
			else{
				$('#'+showColorId).children().css('color','#000000');	
			}
			$('#'+showColorId).spectrum("disable");
			
		
		})
		;
	});


	// divContainer.appendChild(square.dom);
	divContainer.style.height = 'auto';
	divContainer.style.overflow = 'scroll';
	var posx,posy;
	try{
		posx = mPos.pageX;
	}
	catch(e){
		posx = 0;
	}

	try{
		posy = mPos.pageY;
	}
	catch(e){
		posy = 0;
	}
	
	// var posy = mPos.y || 0;
	$(divContainer).css('position','absolute');
	$(divContainer).css('left',"" + 0 + "px");
	$(divContainer).css('top',"" + 30 + "px");
	$(divContainer).css('background','rgba(0,255,255,0)');
	// $(divContainer).css('background-color','#ffffff');
	$(divContainer).css('outline','1px dashed red');
	$(divContainer).css('width','100%');
	$(divContainer).css('height','90%');


	// $(mainDivContainer).css('position','fixed');
	$(mainDivContainer).css('position','relative');
	$(mainDivContainer).css('left',"" + posx + "px");
	$(mainDivContainer).css('top',"" + posy + "px");
	$(mainDivContainer).css('background','rgba(0,255,255,0)');
	// $(mainDivContainer).css('background-color','#333333');
	// $(mainDivContainer).css('outline','1px dashed red');
	$(mainDivContainer).css('width','700px');
	$(mainDivContainer).css('height','200px');
	

	/*divContainer.style.top = "50%";
	divContainer.style.left = "30%";
	divContainer.style.right = "300px";
	divContainer.style.bottom = "10%";*/

	icon.onClick(function() {
		editor.signals.deleteFreeContainer.dispatch(this.dom.parentNode);
	});

    $(mainDivContainer).append(divContainer);
    $(mainDivContainer).append(icon.dom);
    $(mainDivContainer).append(outnode.dom);
    //$(mainDivContainer).append(square.dom);
    $(mainDivContainer).append(arrow.dom);
    $(mainDivContainer).append(checkbox.dom);
    // $(mainDivContainer).append(plus.dom);





    //Template for below
    /*if(type == "Map"){

			dropdown = $(

    	'<div class="dropdown main-container-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Image</a></li>'+
	      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Video</a></li>'+
	      '<li role="presentation" class="divider"></li>'+
	      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Location</a></li>'+
	    '</ul>'+
	  '</div>'

		
	  	);
		}*/


    var dropdown;
    if(type == "Map"){

    dropdown = $(

    	
    	'<div class="dropdown container-dropdowns" id="mapmenu"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                        '<li role="presentation"><a role="menuitem" id="gotolocation" tabindex="-1" href="#">Go to location</a></li>'+
	      				'<li role="presentation"><a role="menuitem" id="addmarker" tabindex="-1" href="#">Add marker</a></li>'+
                    '</ul>'+
                    '</div>'

    	/*'<div class="dropdown main-container-dropdown" id="map-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="map-menu" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a role="menuitem" id="gotolocation" tabindex="-1" href="#">Go to location</a></li>'+
	      '<li role="presentation"><a role="menuitem" id="addmarker" tabindex="-1" href="#">Add marker</a></li>'+
	    '</ul>'+
	  '</div>'*/

    	/*'<div class="dropdown main-container-dropdown" style="">'+
  		'<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
    	'Dropdown'+
    	'<span class="caret"></span>'+
  		'</button>'+
  		'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">'+
  		'Video'+
  		'</ul>'+
		'</div>'*/
		);

		}

		if(type == "Text"){

			dropdown = $(



				'<div class="dropdown container-dropdowns" id="textmenu"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                        '<li role="presentation"><a role="menuitem" id="updatetext" tabindex="-1" href="#">Update</a></li>'+
                    '</ul>'+
                    '</div>'

    	/*'<div class="dropdown main-container-dropdown" id="text-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a role="menuitem" id="updatetext" tabindex="-1" href="#">Update</a></li>'+
	      '<li role="presentation"><a role="menuitem" id="replacetext" tabindex="-1" href="#">Replace</a></li>'+
	    '</ul>'+
	  '</div>'*/

		
	  	);
		}


		if(type == "Image"){

			dropdown = $(


				'<div class="dropdown container-dropdowns" id="imagemenu"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                        '<li role="presentation"><a role="menuitem" id="transition" tabindex="-1" href="#">Transition</a></li>'+
                    '</ul>'+
                    '</div>'

    	/*'<div class="dropdown main-container-dropdown" id="image-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a role="menuitem" id="transition" tabindex="-1" href="#">Transition</a></li>'+
	    '</ul>'+
	  '</div>'*/

		
	  	);
		}

		if(type == "Video"){

			dropdown = $(


				'<div class="dropdown container-dropdowns" id="videomenu"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                        '<li role="presentation"><a role="menuitem" id="playvideo" tabindex="-1" href="#">Play</a></li>'+
	      				'<li role="presentation"><a role="menuitem" id="loopvideo" tabindex="-1" href="#">Loop</a></li>'+
                    '</ul>'+
                    '</div>'

    	/*'<div class="dropdown main-container-dropdown" id="video-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a role="menuitem" id="playvideo" tabindex="-1" href="#">Play</a></li>'+
	      '<li role="presentation"><a role="menuitem" id="loopvideo" tabindex="-1" href="#">Loop</a></li>'+
	    '</ul>'+
	  '</div>'*/

		
	  	);
		}



		if(type == "Tweet"){

			dropdown = $(


			'<div class="dropdown container-dropdowns" id="tweetmenu"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                        '<li role="presentation"><a role="menuitem" id="locationtweet" tabindex="-1" href="#">Location</a></li>'+
				      '<li role="presentation"><a role="menuitem" id="imagetweet" tabindex="-1" href="#">Image</a></li>'+
				      '<li role="presentation"><a role="menuitem" id="texttweet"  tabindex="-1" href="#">TweetText</a></li>'+
				      '<li role="presentation"><a role="menuitem" id="usernametweet" tabindex="-1" href="#">Username</a></li>'+
                    '</ul>'+
                    '</div>'	

    	/*'<div class="dropdown main-container-dropdown" id="tweet-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a role="menuitem" id="locationtweet" tabindex="-1" href="#">Location</a></li>'+
	      '<li role="presentation"><a role="menuitem" id="imagetweet" tabindex="-1" href="#">Image</a></li>'+
	      '<li role="presentation"><a role="menuitem" id="texttweet"  tabindex="-1" href="#">TweetText</a></li>'+
	      '<li role="presentation"><a role="menuitem" id="usernametweet" tabindex="-1" href="#">Username</a></li>'+
	    '</ul>'+
	  '</div>'*/

		
	  	);
		}


		var dropdown2;
		if(type == "Chart"){

			dropdown = $(


				'<div class="dropdown container-dropdowns" id="chartmenu"> <a class="dropdown-toggle firstOne" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                '<li role="presentation"><a role="menuitem" id="countrydata" tabindex="-1" href="#">Country Data</a></li>'+
      			'<li role="presentation"><a role="menuitem" id="locationdropdown" tabindex="-1" href="#">Location</a></li>'+
      			'<li role="presentation"><a role="menuitem" id="povertylevel" tabindex="-1" href="#">Poverty Level</a></li>'+
                    '</ul>'+
                    '</div>'

    	/*'<div class="dropdown main-container-dropdown" id="chart-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	    '</ul>'+
	  '</div>'*/

		
	  	);

			dropdown2 = $(


				'<div class="dropdown container-dropdowns" id="chart2menu"> <a class="dropdown-toggle secondOne" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                       /*'<li role="presentation"><a role="menuitem" id="continuouschart2" tabindex="-1" href="#">Hover</a></li>'+
      					'<li role="presentation"><a role="menuitem" id="singlevaluechart2" tabindex="-1" href="#">Click</a></li>'+*/
                    '</ul>'+
                    '</div>'

    	/*'<div class="dropdown main-container-dropdown" id="chart2-dropdown">'+
    	'<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></button>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a role="menuitem" id="continuouschart2" tabindex="-1" href="#">Continuous</a></li>'+
	      '<li role="presentation"><a role="menuitem" id="singlevaluechart2" tabindex="-1" href="#">Single value</a></li>'+
	    '</ul>'+
	  '</div>'*/

		
	  	);
		}


		if(type == "Empty"){

			dropdown = $(

				
				'<div class="dropdown container-dropdowns" id="emptymenu"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                        '<li role="presentation"><a id="showinputempty" role="menuitem" tabindex="-1" href="#">Show Input</a></li>'+
                    '</ul>'+
                    '</div>'
                   

				

    	/*'<div class="dropdown main-container-dropdown" id="empty-dropdown">'+
    	'<div class="btn-group">'+
    	'<a class="btn btn-default dropdown-toggle empty-selected-value" type="button" id="menu1" data-toggle="dropdown">'+
    	'<span class="caret"></span></a>'+
	    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
	      '<li role="presentation"><a id="showinputempty" role="menuitem" tabindex="-1" href="#">Show Input</a></li>'+
	    '</ul>'+
	    '</div>'+
	  '</div>'*/
	
		
	  	);
		}






		if(type == "Table"){

			dropdown = $(


				'<div class="dropdown container-dropdowns" id="tablemenu"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><b class="caret"></b></a>'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">'+
                       '<li role="presentation"><a role="menuitem" id="stackedbars" tabindex="-1" href="#">Stacked Bars</a></li>'+
      					'<li role="presentation"><a role="menuitem" id="forcegraph" tabindex="-1" href="#">Force Directed graph</a></li>'+
      					'<li role="presentation"><a role="menuitem" id="radiallayout" tabindex="-1" href="#">Radial Layout</a></li>'+
                    '</ul>'+
                    '</div>'

		
	  	);

		
		}


		/*$("#register").on('click',function(e){

			console.log("Clicked");
			e.preventDefault();
		});
		$("#register").click(function(e){
			//do something
			console.log("Clicked");
			e.preventDefault();
			});*/

		/*$('.dropdown').click(function(event){

			console.log('drop');
		});

		$('#accountmenu').click(function(event){

			console.log('drop');
		});

		$('.dropdown-menu').click(function(event){

			console.log('drop');
		});

		$('.dropdown-toggle').click(function(event){

			console.log('drop');
		});

		
		$('.dropdown-menu li a').click(function(event) {
			console.log("Dropdown");
		});


		$('.dropdown-toggle').on('show.bs.dropdown', function () {

			console.log("Dropdown");
		});


		$("a.dropdown-toggle").click(function(ev) {
			console.log("Span dropdown");
			$("a.dropdown-toggle").dropdown("toggle");
              //$("a.dropdown-toggle").dropdown("toggle");
              //return false;
          });*/
		
		/*$('.dropdown-toggle').dropdown();
		// $('#dropDownId :selected').text();
		$('.dropdown-menu li > a').click(function(event){

			console.log("Click",event);
			console.log("Clickw",$('.empty-selected-value').val());
			// console.log("this",$(this).text());

		});*/




    $(mainDivContainer).append(dropdown).promise().done(function(){


    	console.log("appendedDiv");

    	/*$("#register").on('click',function(e){

			console.log("Clicked");
			e.preventDefault();
		});*/

    	/*$('#tweet-dropdown').click(function(event){

			console.log('drop');
		});

		$('dropdown').click(function(event){

			console.log('drop');
		});

		$('#tweet-dropdown ul li a').click(function(event){

			console.log('drop');
		});

    	$('.dropdown').click(function(event){

			console.log('drop');
		});

		$('[data-toggle=dropdown]').dropdown();

		$('#accountmenu').click(function(event){

			console.log('drop');
		});

		$('.dropdown-menu').click(function(event){

			console.log('drop');
		});

		$('.dropdown-toggle').click(function(event){

			console.log('drop');
		});

		
		$('a').click(function(event) {
			console.log("Dropdown");
		});


		$('.dropdown-toggle').on('show.bs.dropdown', function () {

			console.log("Dropdown");
		});


		$("a.dropdown-toggle").click(function(ev) {
			console.log("Span dropdown");
			$("a.dropdown-toggle").dropdown("toggle");
              //$("a.dropdown-toggle").dropdown("toggle");
              //return false;
          });*/

    });
    // $(mainDivContainer).append(dropdown2);
    
    

	return mainDivContainer;

};