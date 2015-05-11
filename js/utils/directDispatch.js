var codeMirrorDict = {};
var rs = '';
var thisistheTarget;
var map;

var myCodeMirror = [];

var relationships = {};

relationships["connections"] = {};
var once = true;

var jsonData;
var tweetData;

var tweetContainer;

var thisisMainImageContainer;

var thisisCounter =0;


var bold_selected = false;


var thisistheChartDivId;

var controlCenterFirstTime = true;
var connectionsComplete = false;




/*for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  console.log( localStorage.getItem( localStorage.key( i ) ) );
}*/







jsPlumb.bind("connection", function(info) {
           console.log('info',info);


           /*var sourcechild = $(info.source).children()[0];
           var targetchild = $(info.target).children()[0];*/


           thisisCounter++;


           if(info.sourceId in relationships["connections"]){

           relationships["connections"][info.sourceId].push(info.target);
           // console.log(relationships);
           // editor.signals.actionRelationships.dispatch(info.source,info.target);

          }

          else{

           relationships.connections[info.sourceId] = [];
           relationships.connections[info.sourceId].push(info.target);
           // console.log(relationships);
           // editor.signals.actionRelationships.dispatch(info.source,info.target);

          }

          if(thisisCounter == 3){
            connectionsComplete = true;
            // editor.signals.actionRelationships.dispatch(info.source,info.target);
          }


});


jsPlumb.bind("connectionDetached", function(info,originalEvent) {
           
           delete relationships.connections[info.sourceId];


});




function randomString(){

return '' + (function co(lor){   return (lor +=
  [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');

}


function fly(f) {
    
if(isNaN(jsonData.data[f].latlng[0]) || jsonData.data[f].latlng[0] === undefined || jsonData.data[f].latlng[0] === null){


    
}

else{


  var tempValue = myCodeMirror[1].getValue();
  var tempItems = tempValue.split('<');

  var tempString = "";

  console.log(tempItems);

  for(var i=0;i<tempItems.length;i++){

      if(i==0){

        tempString += "Capital - ";  
        tempString += jsonData.data[f].capital;  

        tempString += " ";
      }

      if(i==1){
        // tempString += "Capital - ";  
        tempString += jsonData.data[f].currency;  
      }

      if(i==2){
        tempString += jsonData.data[f].languages.nld;  
      }
      
  }


  myCodeMirror[1].getDoc().setValue(tempString);

  map.flyTo([
        jsonData.data[f].latlng[0],
        jsonData.data[f].latlng[1]
        
    ]);
}
}



function controlCenter(country_name){

  var country = thisistheData[country_name];
  //check first time - dont remove, otherwise remove previous chart and append new one


  if(controlCenterFirstTime){
  
    controlCenterFirstTime = false;

  }

  else{
    $('#'+thisistheChartDivId).find('svg').remove();
  }


  setText(country.text);
  setMap(country.lat,country.lng);
  drawGraph(country.values,country.name);


}


function setText(thetext){

  
  myCodeMirror[1].getDoc().setValue(thetext);
}


function setMap(lat,lng){

  map.flyTo([
        lat,lng
    ]);

}


function drawGraph(ba,cname){

    var margin = {top: 80, right: 80, bottom: 80, left: 80},
                  width = 960 - margin.left - margin.right,
                  height = 500 - margin.top - margin.bottom;

              var parse = d3.time.format("%b %Y").parse;

              // Scales and axes. Note the inverted domain for the y-scale: bigger is up!
              var x = d3.scale.linear().range([0, width]),
                  y = d3.scale.linear().range([height, 0]),
                  xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true).tickFormat(d3.format("d")),
                  yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

              // An area generator, for the light fill.
              var area = d3.svg.area()
                  .interpolate("monotone")
                  .x(function(d) { return x(d.year); })
                  .y0(height)
                  .y1(function(d) { return y(d.value); });

              // A line generator, for the dark stroke.
              var line = d3.svg.line()
                  .interpolate("monotone")
                  .x(function(d) { return x(d.year); })
                  .y(function(d) { return y(d.value); });

              // d3.csv("readme.csv", type, function(error, data) {

                // Filter to one symbol; the S&P 500.
                /*var values = data.filter(function(d) {
                  return d.symbol == "S&P 500";
                });*/

                // Compute the minimum and maximum date, and the maximum price.
                x.domain([ba[0].year, ba[ba.length - 1].year]);
                y.domain([0, d3.max(ba, function(d) { return d.value; })]).nice();

                // Add an SVG element with the desired dimensions and margin.
                var svg = d3.select("#"+thisistheChartDivId).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .on("click", click);

                // Add the clip path.
                svg.append("clipPath")
                    .attr("id", "clip")
                  .append("rect")
                    .attr("width", width)
                    .attr("height", height);

                // Add the area path.
                svg.append("path")
                    .attr("class", "area")
                    .attr("clip-path", "url(#clip)")
                    .attr("d", area(ba));

                    svg.append("text")
                      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
                      .style("text-anchor", "middle")
                      .text(cname);

                // Add the x-axis.
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the y-axis.
                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + width + ",0)")
                    .call(yAxis);

                // Add the line path.
                svg.append("path")
                    .attr("class", "line")
                    .attr("clip-path", "url(#clip)")
                    .attr("d", line(ba));

                // Add a small label for the symbol name.
                /*svg.append("text")
                    .attr("x", width - 6)
                    .attr("y", height - 6)
                    .style("text-anchor", "end")
                    .text(values[0].symbol);*/

                // On click, update the x-axis.
                function click() {
                  var n = ba.length - 1,
                      i = Math.floor(Math.random() * n / 2),
                      j = i + Math.floor(Math.random() * n / 2) + 1;
                  x.domain([ba[i].year, ba[j].year]);
                  var t = svg.transition().duration(750);
                  t.select(".x.axis").call(xAxis);
                  t.select(".area").attr("d", area(ba));
                  t.select(".line").attr("d", line(ba));
                }

}



function mapFly(lat,lng,imgsrc, username){

  /*map.flyTo([
        jsonData.data[f].latlng[0],
        jsonData.data[f].latlng[1]
        
    ]);*/


  map.flyTo([
        lat,lng
    ]);



// map.on('style.load', function() {
  /*map.addSource(username, {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [lng,lat]
        },
        "properties": {
          "title": username,
          "marker-symbol": "circle-stroked"
        }
       
        
      }]
    }
    });*/
  // });

  /*var tt = new mapboxgl.Popup({
    closeOnClick: false
  })
  .setLatLng([lat,lng])
  .setHTML('<img style="width:10%; height:10%"src=' +  imgsrc + '></img>')
  .addTo(map);*/

}


function paraText(username,tweettext){

  var tempString = username + " : " + tweettext;
  myCodeMirror[1].getDoc().setValue(tempString);
}


var a,b;

function updateImage(imgsrc,num){



                
    // imageContainer.append('<img src=' +  imgsrc + '></img>');
    //$(thisisMainImageContainer).append(imageContainer);

  /*if(num > 0){

    var n = num - 1;
    // a = $(thisisMainImageContainer).find("img");
    // console.log($(thisisMainImageContainer).find("img"));
    a = $(thisisMainImageContainer).find("img");
    // a = a[n];
  // $(thisisMainImageContainer).find("img").remove("img");
}


  b = $('<img />')
          .attr('src', '/img/nepalEarthquake/' + num + '.jpg')
          .attr('id',  num + '-appended')
          .appendTo(thisisMainImageContainer);

console.log(a,b[0]);
  ramjet.transform(a,b[0]);*/


if(num > 0){

  /*var n = num - 1;
  a = $(thisisMainImageContainer).find("img");
    a = a[n];*/
  $(thisisMainImageContainer).find("img").remove("img");
}

// console.log(num);

b =  $('<img />')
          .attr('src', '/img/nepalEarthquake/' + num + '.jpg')
          .attr('id',  num + '-appended')
          .appendTo(thisisMainImageContainer);

if(a !== undefined){
// ramjet.transform(a,b[0]);
}

  // $(thisisMainImageContainer).append('<img src=' +  imgsrc + '></img>');



  // var imgd = $('<img src="' + );

}



  function directDispatch(editor){


 /*     for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  console.log( localStorage.getItem( localStorage.key( i ) ) );
}*/

        editor.signals.actionRelationships.add(function(source,target){

          var sourcechild = $(source).children()[0];
          var targetchild = $(target).children()[0];

            

          var jd = 0;

            var st = setInterval(function(){

                var dj;

                if(jd < 21){
                  
                  if (jd == 0) {

                      $( "p" ).remove( ":contains('Click')" );
                      $( "div" ).remove( ".dz-preview" );
                      dj = jd;

                  }

                  console.log(localStorage.key( jd ));
                if(localStorage.key( dj ) != "threejs-editor"){

                var stringToSplit = localStorage.getItem( localStorage.key( jd ));


                var splitArray = stringToSplit.split(",");


                var assembleText;
                if(splitArray.length > 5){
                  for(var i=3;i<splitArray.length - 1;i++){
                    assembleText += splitArray[i];
                  }

                mapFly(splitArray[1],splitArray[2],splitArray[splitArray.length - 1],splitArray[0]);
                paraText(splitArray[0],assembleText);
                updateImage(splitArray[splitArray.length - 1],jd);

                }


                else{
                  mapFly(splitArray[1],splitArray[2],splitArray[splitArray.length - 1],splitArray[0]);
                paraText(splitArray[0],splitArray[3]);
                updateImage(splitArray[splitArray.length - 1],jd);
                }

                jd++;
                // dj  = jd++;

                // console.log(splitArray);

                /*mapFly(splitArray[1],splitArray[2]);
                paraText(splitArray[0]);
                updateImage(spl);*/

              }
            }

              else{
                clearInterval(st);
              }

            },5000);

            // once = false;

          });
            


            /*if(once){

            var jd = 0;

            setInterval(function(){

                fly(jd++);

            },4000);

            once = false;

          }*/




    // console.log(myCodeMirror.getValue());

    // editor.getDoc().setValue('var msg = "Hi";');

    // for(var jd in jsonData.data){

    // }

    // fly();


    // for(var r in relationships.connections){


      // console.log(r);

/*      if($('#'+ r).has('.chart-container')){

          for(var c=0;c<r.length;c++){
            if ($(r[c].id.has('.mapboxgl-canvas'))) {

              var next = 0;
              console.log("yes");
              // setInterval(function(){

              //   fly();

              // },2000);

            }
          }

      }*/

      
    // }


  // });


      editor.signals.textBoxAppend.add(function(elem,event){


      if(event.target.id == "Text"){

        var commentid = elem.id + '-comment';

        var childContainer = $('<div class="text-container"> </div>');

        $(childContainer).append('<textarea class="form-control" rows="5" id="' + commentid +'"></textarea>');

        $(elem).append(childContainer);




        CodeMirror.defineMode("arrows", function() {
                    return {
                      startState: function() {return {inString: false};},
                      token: function(stream, state) {
                        // If a string starts here
                        if (!state.inString && stream.peek() == '<') {
                          stream.next();            // Skip quote
                          state.inString = true;    // Update state
                        }

                        if (state.inString) {
                          if (stream.skipTo('>')) { // Quote found on this line
                            stream.next();          // Skip quote
                            state.inString = false; // Clear flag
                          } else {
                             stream.skipToEnd();    // Rest of line is string
                          }
                          return "arrows";          // Token style
                        } else {
                          stream.skipTo('<') || stream.skipToEnd();
                          return null;              // Unstyled token
                        }
                      }
                    };
                  });


                var minLines = 2;
                var startingValue = '';
                for (var i = 0; i < minLines; i++) {
                    startingValue += '\n';
                }

                //value: 'Start typing here. Insert <> to connect blocks using arrows',
                myCodeMirror[myCodeMirror.length] = CodeMirror($(childContainer)[0], {
                      value: 'Start typing here ...',
                      mode:  "arrows",
                      viewportMargin: 5,
                      autoClearEmptyLines: true,
                    });

                codeMirrorDict[elem.id] = {};



                myCodeMirror[myCodeMirror.length-1].on('change', function(cm,change) {
                    
                    // console.log($(childContainer)[0]);
                    // console.log(elem);

                    if (change.text[0] == '<') {
                      
                      rs = randomString();
                      var uniqueId = elem.id +'-' +rs;


                      codeMirrorDict[elem.id][change.to.ch] = {};
                      codeMirrorDict[elem.id][change.to.ch]['text'] =  change.text[0];
                      codeMirrorDict[elem.id][change.to.ch]['id'] = randomString();
                      codeMirrorDict[elem.id][change.to.ch]['relationId'] = uniqueId;



                      var appendedDiv = $(elem).append('<span class="fa fa-arrows-h arrowNode" id="'+ uniqueId +'"></span>');

                        var leftDist = Object.keys(codeMirrorDict[elem.id]).length * 20;
                      
                          $('#'+uniqueId).css({

                            'position' : 'fixed',
                            'display':'block',
                            'height': 'auto',
                            'bottom': '90%',
                            'top': '0',
                            'left': leftDist + 'px',

                            'margin-left':'auto',
                            'margin-right':'15px',
                            'margin-top':'15px'


                          });



                $('#'+uniqueId).mouseenter(mouseStart(uniqueId));
                $('#'+uniqueId).mouseleave(mouseEnd(uniqueId));

                function mouseStart(s){
                  return function() {
                    $('#'+s).css('color','red');
                  };
                }

                function mouseEnd(s){
                  return function() {$('#'+s).css('color','');};
                }

                    }

                    if (change.removed[0] == '<') {
                      $('#'+codeMirrorDict[elem.id][change.from.ch]['relationId']).remove();
                      delete codeMirrorDict[elem.id][change.from.ch];
                      // editor.signals.deleteArrowfromContainer.dispatch(elem.target);
                    }

                });


                myCodeMirror[myCodeMirror.length-1].on('update', function(cm) {

                // console.log('updated');
                // console.log('cm',cm);
                // console.log('myCodeMirror',myCodeMirror);
                // var hoverid = elem.id + '-' +randomString();
                //var noIdArrow = $(elem).find($('*:not([id]).cm-arrows'));
                var noIdArrow = $(elem).find('.cm-arrows');


                // var noIdArrow = $('.cm-arrows').children();

                // console.log(noIdArrow);
                //console.log(noIdArrow[noIdArrow.length - 1]);
                var ind = 0;

                for (var g in codeMirrorDict[elem.id]){

                  noIdArrow[ind].id = codeMirrorDict[elem.id][g].id;


                  $('#'+codeMirrorDict[elem.id][g].id).mouseenter(mouseStart(codeMirrorDict[elem.id][g]));
                  $('#'+codeMirrorDict[elem.id][g].id).mouseleave(mouseEnd(codeMirrorDict[elem.id][g]));
                  
                  

                    


                  ind++;

                }

                function mouseStart(s){
                  return function() {$('#'+s['relationId']).css('color','red');};
                }

                function mouseEnd(s){
                  return function() {$('#'+s['relationId']).css('color','');};
                }


                

                });


                // $('#'+commentid).html('Start typing here ... ');


                var myCustomTemplates = {
                    custom1: function(context) {
                      return "<li>" +
                        "<a id="+ commentid + "-color-button " +  "class='btn btn-default' data-wysihtml5-command=''" +
                        
                        "' data-wysihtml5-command-value='&hellip;'>" +
                        "<span class='fa fa-minus-square-o'></span></a>" +
                        "</li>";
                    },

                    custom2: function(context) {
                      return "<li>" +
                        "<a id="+ commentid + "-background-color-cnbutton " +  "class='btn btn-default' data-wysihtml5-command='' href='" +
                        
                        "' data-wysihtml5-command-value='&hellip;'>" +
                        "<span class='fa fa-minus-square'></span></a>" +
                        "</li>";
                    },

                    customFontStyles: function(context) {
                      return '<li class="dropdown">' +
                        '<a class="btn btn-default dropdown-toggle " data-toggle="dropdown" aria-expanded="false">' +
                          
                            '<span class="fa fa-font"></span>'+
                          
                          '<span class="current-font">Heading 1</span>'+
                          '<b class="caret"></b>'+
                        '</a>'+
                        '<ul class="dropdown-menu">'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="p" tabindex="-1" href="javascript:;" unselectable="on">Normal text</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1" tabindex="-1" href="javascript:;" unselectable="on" class="wysihtml5-command-active">Heading 1</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2" tabindex="-1" href="javascript:;" unselectable="on" class="">Heading 2</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3" tabindex="-1" href="javascript:;" unselectable="on">Heading 3</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h4" tabindex="-1" href="javascript:;" unselectable="on">Heading 4</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h5" tabindex="-1" href="javascript:;" unselectable="on">Heading 5</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h6" tabindex="-1" href="javascript:;" unselectable="on">Heading 6</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="sm" tabindex="-1" href="javascript:;" unselectable="on">Small</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="xsm" tabindex="-1" href="javascript:;" unselectable="on">Smaller</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="xxsm" tabindex="-1" href="javascript:;" unselectable="on">Smallest</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="xl" tabindex="-1" href="javascript:;" unselectable="on">Extra Large</a></li>'+
                        '</ul>'+
                      '</li>';
                    }


                  };


                  var texteditor = $('#'+commentid).wysihtml5({
                      
                  toolbar: {
                    customFontStyles: true,
                    "font-styles": false, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": false, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": false,
                    custom1: true,
                    custom2: true,
                    
                    "blockquote": true, //Blockquote  
                    
                    fa:true,
                  },
                  customTemplates: myCustomTemplates
                      
                  });


                        $(elem).find('iframe').remove();
                      
                      $(elem).find('.wysihtml5-toolbar').css('display','');
                      $(elem).find('.form-control').remove();


                      $('.wysihtml5-toolbar .btn').click(function(event){
                              
                        if(event.currentTarget.innerText == "Bold"){
                          $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-weight',"bold");
                          bold_selected = true;
                          // $(".CodeMirror").css('font-weight',"bold");
                        }

                        if(event.currentTarget.innerText == "Italic"){
                          $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-style',"italic");
                          // $(".CodeMirror").css('font-style',"italic");
                        }

                        if(event.currentTarget.innerText == "Underline"){
                          $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('text-decoration',"underline");
                          // $(".CodeMirror").css('text-decoration',"underline");
                        }
                        
                        

                      });


                                $('.dropdown-menu li a').click(function(event){


                                  // console.log("dropdown",event);
                                  // console.log("dropdown2",$(this)[0].parentElement.parentElement.parentElement);
                                  // console.log("dropdown3",$(this).parent('.free-container'));
                                  // console.log("dropdown4",$(event.currentTarget).parents('.free-container'));
                                  // console.log("this",$(this));
                          
                                    if($(this)[0].attributes[1].value == 'h1'){

                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','26pt');
                                      //$(".CodeMirror").css('font-size',"26pt");
                                      //$(this)[0].parent('.free-container').find('.CodeMirror').css('font-size','26pt');
                                    }

                                    else if($(this)[0].attributes[1].value == 'h2'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','24pt');
                                      // $(".CodeMirror").css('font-size',"24pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'h3'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','22pt');
                                      // $(".CodeMirror").css('font-size',"22pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'h4'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','20pt');
                                      // $(".CodeMirror").css('font-size',"20pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'h5'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','18pt');
                                      // $(".CodeMirror").css('font-size',"18pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'h6'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','16pt');
                                      // $(".CodeMirror").css('font-size',"16pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'p'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','14pt');
                                      // $(".CodeMirror").css('font-size',"14pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'xl'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','30pt');
                                      // $(".CodeMirror").css('font-size',"30pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'sm'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','12pt');
                                      // $(".CodeMirror").css('font-size',"12pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'xsm'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','10pt');
                                      // $(".CodeMirror").css('font-size',"10pt");
                                    }

                                    else if($(this)[0].attributes[1].value == 'xxsm'){
                                      $(event.currentTarget).parents('.free-container').find('.CodeMirror').css('font-size','8pt');
                                      // $(".CodeMirror").css('font-size',"8pt");
                                    }

                                    console.log($(this)[0].attributes[1].value);


                                });



                                $('.wysihtml5-sandbox').contents().find('body').on("focus",function(event) {
                                  console.log("Handler for .focus() called.");
                                  console.log(event);
                                  console.log(mainTinyColor);
                                  console.log($('.wysihtml5-sandbox').contents()[0].activeElement);
                                  $('.wysihtml5-sandbox').contents()[0].activeElement.style.color = mainTinyColor;
                              });
                            

                            $('.wysihtml5-sandbox').contents().find('body').on("focus:composer",function(event) {
                                  console.log("Handler for .focus:composer() called.");
                                  console.log(event);
                                  console.log(mainTinyColor);
                                  console.log($('.wysihtml5-sandbox').contents().find('body'));
                                  $(event.currentTarget).css('color',mainTinyColor);
                              });

                            $('.wysihtml5-sandbox').contents().find('body').on("focus:textarea",function(event) {
                                  console.log("Handler for .focus:textarea() called.");
                                  console.log(event);
                                  console.log(mainTinyColor);
                                  console.log($('.wysihtml5-sandbox').contents().find('body'));
                                  $(event.currentTarget).css('color',mainTinyColor);
                              });






                                $('#'+commentid+ "-color-button").click(function(event){

                                  $(event.currentTarget.parentElement.parentElement).spectrum("enable");

                                    console.log("pencil clicked",event);
                                    // console.log($(event.currentTarget.parentElement.parentElement.parentElement));

                                    // console.log($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement);


                                    // editor.signals.showSpectrum.dispatch(commentid+ "-color-button");

                                    $(event.currentTarget.parentElement.parentElement.parentElement).spectrum({
                                        color: "#ffffff",
                                        showInput:true,
                                        preferredFormat: "rgb",
                                        containerClassName: "color-picker"
                                        });


                                    $(event.currentTarget.parentElement.parentElement.parentElement)

                                      .on('move.spectrum', function(e, tinycolor) {

                                        $(event.currentTarget.parentElement.parentElement.parentElement).find(".CodeMirror-scroll").css("background-color",tinycolor.toHexString());

                                        $(event.currentTarget.parentElement.parentElement.parentElement).css("background-color",tinycolor.toHexString());
                                        // $('.CodeMirror-scroll').css('background-color',tinycolor.toHexString());
                                        // console.log(tinycolor);
                                        // console.log(tinycolor.toHexString());
                                        

                                        // mainTinyColor = tinycolor;
                                        // $($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement).css('color',tinycolor);
                                        
                                        
                                      
                                      })
                                        .on('change.spectrum', function(e, tinycolor) {

                                          $(event.currentTarget.parentElement.parentElement.parentElement).find(".CodeMirror-scroll").css("background-color",tinycolor.toHexString());


                                          // mainTinyColor = tinycolor;
                                          // $($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement).css('color',tinycolor);
                                        
                                        
                                      
                                      })

                                        .on('hide.spectrum', function(e, tinycolor) {
                                        // console.log(tinycolor);


                                        $(event.currentTarget.parentElement.parentElement.parentElement).find(".CodeMirror-scroll").css("background-color",tinycolor.toHexString());

                                        $(event.currentTarget.parentElement.parentElement).spectrum("disable");

                                        //enable this below
                                        // mainTinyColor = tinycolor;
                                        // $($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement).css('color',tinycolor);

                                        // $(event.currentTarget.parentElement.parentElement.parentElement).spectrum('disable');
                                        



                                        // console.log(tinycolor.toHexString());
                                        // $('#'+showColorId).css('background',tinycolor.toHexString());
                                        // $('#'+showColorId).css('opacity',''+1);
                                        // if (tinycolor.toHexString() !== "#ffffff") {
                                        //   $('#'+showColorId).children().css('color','#ffffff');
                                        // }
                                        // else{
                                        //   $('#'+showColorId).children().css('color','#000000');
                                        // }
                                        // $('#'+showColorId).spectrum("disable");
                                        
                                      
                                      })
                                      ;

                                  });



                                $('#'+commentid+ "-background-color-cnbutton").click(function(event){

                                  $(event.currentTarget.parentElement.parentElement).spectrum("enable");

                                    console.log("pencil clicked",event);
                                    // console.log($(event.currentTarget.parentElement.parentElement.parentElement));

                                    // console.log($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement);


                                    // editor.signals.showSpectrum.dispatch(commentid+ "-color-button");

                                    $(event.currentTarget.parentElement.parentElement).spectrum({
                                        color: "#ffffff",
                                        showInput:true,
                                        preferredFormat: "rgb",
                                        containerClassName: "color-picker"
                                        });


                                    $(event.currentTarget.parentElement.parentElement.parentElement)

                                      .on('move.spectrum', function(e, tinycolor) {

                                        $(event.currentTarget.parentElement.parentElement.parentElement).find(".CodeMirror-scroll").css("color",tinycolor.toHexString());
                
                                        
                                        
                                      
                                      })
                                        .on('change.spectrum', function(e, tinycolor) {

                                          $(event.currentTarget.parentElement.parentElement.parentElement).find(".CodeMirror-scroll").css("color",tinycolor.toHexString());

                                      
                                      })

                                        .on('hide.spectrum', function(e, tinycolor) {
                                        // console.log(tinycolor);


                                        $(event.currentTarget.parentElement.parentElement.parentElement).find(".CodeMirror-scroll").css("color",tinycolor.toHexString());
                                        $(event.currentTarget.parentElement.parentElement).spectrum("disable");
                                        
                                      
                                      })
                                      ;

                                  });



                      thisistheTarget = jsPlumb.makeTarget(elem.id, {
                            anchor:"Continuous",
                            endpoint:["Dot", { width:40, height:20 }]
                          });

            }





            if (event.target.id == 'Image') {


              thisisMainImageContainer = elem;

              // var imageContainer = new FreeContainer(editor,'image-container');
              var imagedivid = elem.id + '-image-div';
              var imageContainer = $('<div class="image-container"> </div>');

              // $(imageContainer).append("<p>Upload Image here</p>");
              // $(imageContainer).append();



              $(elem).append('<p>Click or drop image to upload</p>');
              // var imageDropzone = $('#'+elem.id).dropzone({ url: "/file-upload" });

              var myDropzone = new Dropzone('#'+elem.id, { url: "/file-upload"});

              // var eventTargetID = elem.id;


              myDropzone.on('success',function(){

                  $.ajax({
                method: "GET",
                url: "/last-photo",
                contentType: 'image/jpeg'
              })
              .done(function(data){

                console.log("success");
                $( "p" ).remove( ":contains('Click')" );
                $( "div" ).remove( ".dz-preview" );
                
                imageContainer.append('<img src=' +  data + '></img>');
                $(elem).append(imageContainer);

                //$(elem).append('<p> Success</p>');
                //$(elem).append('<img src=data:image/jpeg;base64,' + data + '></img>');
                
              });

              });


                        jsPlumb.makeTarget(elem.id, {
                            anchor:"Continuous",
                            endpoint:["Dot", { width:40, height:20 }]
                          });

          }




          if (event.target.id == 'Chart') {

            var chartContainer = $('<div class="chart-container"> </div>');

            // var chartContainer = new FreeContainer(editor,'chart-container');

            $(elem).append('<p>Drag and drop or click to upload json file</p>');



            var chartDropzone = new Dropzone('#'+elem.id, { url: "/file-upload"});

              chartDropzone.on('success',function(){

                  $.ajax({
                method: "GET",
                url: "/last-file",
              })
              .done(function(data){

                console.log("success",data);

                jsonData = data;

                $( "p" ).remove();
                $( "p" ).remove( ":contains('Click')" );
                $( "div" ).remove( ".dz-preview" );
                var chartRandom = randomString();
                chartContainer.append('<table class="table" id=' + elem.id + "-" +chartRandom +'>  <thead> <tr> <th class="val-edit">Country</th><th class="val-edit">Capital</th><th class="val-edit">Latitude</th><th class="val-edit">Longitude</th> <th class="val-edit">Poverty Level</th></tr></thead> <tbody class="tablebody"></tbody></table>');

                $(elem).append(chartContainer);

                console.log(data.data);

                /*$.each(data.data, function(index, val) {

                $("#"+elem.id + "-" + chartRandom).append('<tr><td class="val-edit">'+ val.name.common + '</td><td class="val-edit">'+ val.latlng[0]+ '</td><td class="val-edit">' + val.latlng[1] +'</td></tr>');
                 
                });*/


                $.each(thisistheData, function(index, val) {

                $("#"+elem.id + "-" + chartRandom).append('<tr><td class="val-edit">'+ val.name + '</td><td class="val-edit">'+ val.capital+'</td><td class="val-edit">'+ val.lat+ '</td><td class="val-edit">' + val.lng +'</td><td class="val-edit">' + val.values[0].year + "-2010" + '</td></tr>');


                });


                $('table tbody tr').hover(function() {
                    $(this).addClass('highlight');
                    // var hoverSplit = $(this)[0].innerText.split(/[ ,]+/);
                    // console.log(hoverSplit[0].split(" "));
                    // console.log($(this)[0].firstElementChild.innerText);

                    if(connectionsComplete){
                      controlCenter($(this)[0].firstElementChild.innerText);
                    }
                 }, function() {
                    $(this).removeClass('highlight');
                 });


                $.fn.editable.defaults.mode = 'inline';

                $(".val-edit").editable();

                // console.log("charttest",event);

                /*jsPlumb.makeSource(elem.id, {
                  anchor:["Continuous", { faces:[ "left" ] } ],
                  endpoint:["Dot", { width:5, height:5 }],
                maxConnections:1
              });*/

                /*jsPlumb.makeSource(elem.id, {
                  anchor:[0.7,0,0,1,50,0],
                  overlays:[ "Arrow"],
                  endpoint:["Dot", { width:5, height:5 }],
                  maxConnections:1
              });*/

                jsPlumb.makeSource(elem.id, {
                  anchor:["Continuous", { faces:[ "left","right","top","bottom" ] } ],
                  endpoint:["Dot", { width:5, height:5 }],
                maxConnections:1
              });





                // $(elem).append(imageContainer);

                //$(elem).append('<p> Success</p>');
                //$(elem).append('<img src=data:image/jpeg;base64,' + data + '></img>');
                
              });

              });




              
            /*$(elem).append(childContainer);


              var data = [4, 8, 15, 16, 23, 42];

              var x = d3.scale.linear()
                  .domain([0, d3.max(data)])
                  .range([0, 420]);
              
              
                var dReturn = d3.select('#'+childContainer.id)
                .selectAll(".chart-container")
                  .data(data)
                .enter().append("div")
                  .style("width", function(d) { return x(d) + "px"; })
                  .style('font', 'font: 10px sans-serif')
                  .style('background-color', 'steelblue')
                  .style('text-align', 'right')
                  .style('padding', '3px')
                  .style('margin', '1px')
                  .style('color', 'white')
                  .text(function(d) { return d; });*/

                  /*console.log('dReturn',dReturn);
                  var styleProps = $( dReturn[0]).css([
                         "background-color"
                      ]);

                  $.each( styleProps, function( prop, value ) {
                      html.push( prop + ": teal" );
                    });*/
                  
                  // $( dReturn ).css('background-color','teal');
                  /*var styleProps = $( dReturn ).css([
                        "font", "height", "color", "background-color"
                      ]);
                    
                    $.each( styleProps, function( prop, value ) {
                      html.push( prop + ": " + value );
                    });*/
                  // $(elem).css('','');

              /*.chart div {
              font: 10px sans-serif;
              background-color: steelblue;
              text-align: right;
              padding: 3px;
              margin: 1px;
              color: white;
              }*/


              
          }


          if (event.target.id == 'Map') {

            // var mapContainer = $('<div class="map-container" id="mapbox-map"> </div>');

            map = new mapboxgl.Map({
              container: elem.id, // container id
              style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json', //stylesheet location
              center: [40.727630, -73.991352], // starting position
              zoom: 15 // starting zoom
            });



            /*jsPlumb.makeSource(elem.id, {
                  anchor:["Continuous", { faces:[ "left" ] } ],
                  endpoint:["Dot", { width:5, height:5 }],
                maxConnections:1
              });*/

            //jsPlumb.makeTarget($(elem)[0].parentElement.id, {
              /*jsPlumb.makeTarget(elem.id, {
                            anchor:"Continuous",
                            endpoint:["Dot", { width:5, height:5 }]
            });*/

            console.log($(elem).parents('.main-container').find('.free-container').context.id);
            jsPlumb.makeTarget($(elem).parents('.main-container').find('.free-container').context.id, {
                            anchor:[0.7,0,0,1],
                            endpoint:["Dot", { width:5, height:5 }]
            });


          }


          if (event.target.id == 'Tweet') {

/*            var tweetContainer = $('<div class="form-group twitter">'+
                '<label for="twittersearch"></label>'+
                '<input type="text" class="form-control" id="exampleInputEmail1" placeholder="Search for tweets with # or for a user with @">'+
                '<button type="submit" class="btn btn-default pull-right" style="position:relative">Search</button>'+
                  '</div>'
                  
                  

                  );*/

            tweetContainer = $(
              '<div class="form-group" style="margin-top:50px">'+
              '<div class="col-sm-10"'+
               ' <label for="twitter"></label>'+
                '<input type="text" id="twittersearch" autofocus class="form-control col-md-4" placeholder="Search for tweets with # or for a user with @">'+
              '</div>'+
              '<button type="button" id="twittersubmit"class="btn btn-default">Search</button>'+
              '</div>'
              
            );

            $(elem).append(tweetContainer);

            $('#'+'twittersubmit').on('click',function(event){


              $('#'+elem.id).find('.form-group').remove();


              var tweetRandom = randomString();



              var tweetformContainer = $('<table class="table" id=' + elem.id + "-" +tweetRandom +'>  <thead> <tr> <th class="val-edit">Username</th><th class="val-edit">Latitude</th><th class="val-edit">Longitude</th><th class="val-edit">TweetText</th><th class="val-edit">Image</th> </tr></thead> <tbody class="tablebody"></tbody></table>');

                $(elem).append(tweetformContainer);



                for ( var i = 0, len = 30; i < len; ++i ) {
                      var stringArray = localStorage.getItem( localStorage.key( i ) );
                      var splitArray = stringArray.split(",");

                      // console.log(splitArray);

                    

                      var assembleText = "";
                      if(splitArray.length > 5){
                        for(var j=3;j<splitArray.length - 1;j++){
                          assembleText += splitArray[j];

                      }

                      console.log(assembleText);

                      $("#"+elem.id + "-" + tweetRandom).append('<tr><td class="val-edit">'+ splitArray[0] + '</td><td class="val-edit">'+ splitArray[1]+ '</td><td class="val-edit">'+ splitArray[2] + '</td><td class="val-edit">' + assembleText +'</td><td class="val-edit">' + splitArray[splitArray.length-1] + '</td></tr>');

                    }


                    else{

                      $("#"+elem.id + "-" + tweetRandom).append('<tr><td class="val-edit">'+ splitArray[0] + '</td><td class="val-edit">'+ splitArray[1]+ '</td><td class="val-edit">'+ splitArray[2] + '</td><td class="val-edit">' + splitArray[3] +'</td><td class="val-edit">' + splitArray[splitArray.length-1] + '</td></tr>');

                    }


                      

              }

              /*$('table tbody tr').hover(function() {
                    $(this).addClass('highlight');
                    // var hoverSplit = $(this)[0].innerText.split(/[ ,]+/);
                    // console.log(hoverSplit[0].split(" "));
                    // console.log($(this)[0].firstElementChild.innerText);

                    if(connectionsComplete){
                      controlCenter($(this)[0].firstElementChild.innerText);
                    }
                 }, function() {
                    $(this).removeClass('highlight');
                 });*/

              /*jsPlumb.makeSource(elem.id, {
                  anchor:[0.7,0,0,1,50,0],
                  overlays:[ "Arrow"],
                  endpoint:["Dot", { width:5, height:5 }],
                  maxConnections:1
              });*/

            jsPlumb.makeSource(elem.id, {
                  anchor:["Continuous", { faces:[ "left","right","top","bottom" ] } ],
                  endpoint:["Dot", { width:5, height:5 }],
                maxConnections:1
              });



            });

            $('#'+elem.id).on('click',function(event){

              
              $(this).find('input:text:visible:first').focus();
              // $('#twittersearch').focus();

            });

        }
              


              

              /*function preload(arrayOfImages) {
                $(arrayOfImages).each(function(){
                    $('<img/>')[0].src = this;
                    console.log($('<img/>')[0].src);
                    
                });
            }

            preload(["img/screen.png"]);*/

              // var searchData = {data: $( "#twittersearch").val()};

              // var posting = $.get( "/twittersearch", searchData,success );
              // console.log(posting);

              // $.post( "/twittersearch", {"data":"hi"});

              /*function success(data){
                tweetData = data;
                console.log(data);

                $('#'+elem.id).find('.form-group').remove();

                var tweetRandom = randomString();

                var tweetformContainer = $('<table class="table" id=' + elem.id + "-" +tweetRandom +'>  <thead> <tr> <th class="val-edit">Username</th><th class="val-edit">Latitude</th><th class="val-edit">Longitude</th><th class="val-edit">TweetText</th><th class="val-edit">Image</th> </tr></thead> <tbody class="tablebody"></tbody></table>');
                // tweetContainer.append('<table class="table" id=' + elem.id + "-" +tweetRandom +'>  <thead> <tr> <th class="val-edit">Username</th><th class="val-edit">Latitude</th><th class="val-edit">Longitude</th> </tr></thead> <tbody class="tablebody"></tbody></table>');

                $(elem).append(tweetformContainer);

              //   $.each(data.data.statuses, function(index, val) {

              //     $("#"+elem.id + "-" + tweetRandom).append('<tr><td class="val-edit">'+ val.user.screen_name + '</td><td class="val-edit">'+ val.id+ '</td><td class="val-edit">' + val.text +'</td><td class="val-edit">' + val.id + '</td></tr>');

              // });


              $.each(data, function(index, val) {

                  var address = "https://maps.googleapis.com/maps/api/geocode/json?address="+val.location+"&key=AIzaSyDMLvEKnAZMZ9JlY6jJRgbdIsJE5YSamxY";

                  // 
                    
                  window.setTimeout(function(){


                    $.ajax({
                    method: "GET",
                    url: address,
                    dataType: 'json',
                    contentType: 'text/plain',
                     xhrFields: {
                      withCredentials: false
                    },
                  })
                  .done(function(data){
                    console.log("data",data);
                    // var jsonObject = JSON.parse(data);

                    if(data.results.length > 0){
                    val.location = data.results[0].geometry.location;

                    var allv = [val.username,val.location.lat,val.location.lng,val.tweettext,val.img];
                    // allv.push({"username":val.username},{"lat":val.location.lat},{"lng":val.location.lng},{"tweettext":val.tweettext},{"img":val.img});
                    // allv.push(val.location.lat);
                    // allv.push(val.location.lng);
                    // allv.push(val.tweettext);
                    // allv.push(val.img);


                    localStorage[val.username] = allv;
                    // localStorage[val.username].push(allv);
                    
                    $("#"+elem.id + "-" + tweetRandom).append('<tr><td class="val-edit">'+ val.username + '</td><td class="val-edit">'+ val.location.lat+ '</td><td class="val-edit">'+ val.location.lng + '</td><td class="val-edit">' + val.tweettext +'</td><td class="val-edit">' + val.img + '</td></tr>');
                    }
                    
                  });

                  },index* 10);

                    

              });


                  jsonData = localStorage;


                jsPlumb.makeSource(elem.id, {
                  anchor:[0.7,0,0,1,50,0],
                  overlays:[ "Arrow"],
                  endpoint:["Dot", { width:5, height:5 }],
                  maxConnections:1
              });

            }*/


            

              
              

            // });



            
          // }




          if (event.target.id == 'Video') {

            var videoContainer = $(

              '<div class="form-group" id="videoform" style="margin-top:50px">'+
              '<div class="col-sm-10"'+
               ' <label for="video"></label>'+
                '<input type="text" id="videolink" autofocus class="form-control col-md-4" placeholder="Paste a video link here">'+
              '</div>'+
              '<button type="button" id="videoembed"class="btn btn-default">Embed</button>'+
              '</div>'

              );


            $(elem).append(videoContainer);


            $('#'+elem.id).on('click',function(event){

              
              $(this).find('input:text:visible:first').focus();

            });

            $('#videoembed').on('click',function(event){

              var srcLink = $('#'+elem.id).find('#videolink').val();

              console.log(srcLink);

              $('#'+elem.id).find('#videoform').remove();

              $(elem).append('<div class="embed-responsive embed-responsive-16by9">'+
                '<iframe class="embed-responsive-item" src="'+
                srcLink+
                '"></iframe>'+
              '</div>');

            });

          }



          if (event.target.id == 'Table') {


            // var ba = allData["Costa Rica"];

            thisistheChartDivId = elem.id;

            jsPlumb.makeTarget(elem.id, {
                            anchor:"Continuous",
                            endpoint:["Dot", { width:40, height:20 }]
                          });

              
              // });

              

            /*var margin = {top: 40, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

                var formatPercent = d3.format(".0%");



                  var x = d3.scale.ordinal()
                      .rangeRoundBands([0, width], .1);

                  var y = d3.scale.linear()
                      .range([height, 0]);

                  var xAxis = d3.svg.axis()
                      .scale(x)
                      .orient("bottom");

                  var yAxis = d3.svg.axis()
                      .scale(y)
                      .orient("left")
                      .tickFormat(formatPercent);


                      var svg = d3.select("#"+elem.id).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                  var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-10, 0])
                      .html(function(d) {
                        return "<strong>Value:</strong> <span style='color:red'>" + d.value + "</span>";
                      })

                      svg.call(tip);


                  x.domain(allData["Bangladesh"].map(
                    function(d) { 
                      console.log(d);
                      return d.year; 
                    })

                  );
                      y.domain([0, d3.max(allData["Bangladesh"], function(d) { return d.value; })]);

                      svg.append("g")
                          .attr("class", "x axis")
                          .attr("transform", "translate(0," + height + ")")
                          .call(xAxis);

                      svg.append("g")
                          .attr("class", "y axis")
                          .call(yAxis)
                        .append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 6)
                          .attr("dy", ".71em")
                          .style("text-anchor", "end")
                          .text("Value");

                      svg.selectAll(".bar")
                          .data(allData["Bangladesh"])
                        .enter().append("rect")
                          .attr("class", "bar")
                          .attr("x", function(d) { return x(d.year); })
                          .attr("width", x.rangeBand())
                          .attr("y", function(d) { return y(d.value); })
                          .attr("height", function(d) { return height - y(d.value); })
                          .on('mouseover', tip.show)
                          .on('mouseout', tip.hide);
          }*/

          
        }

      });


    editor.signals.updateRelationship.add(function(parentNode,childNode) {
        
        if (parentNode in connectedNodes){
          connectedNodes[parentNode].push(childNode);
        }
        else{
          connectedNodes[parentNode] = [];
          connectedNodes[parentNode].push(childNode);
        }

    });



}