





function dispatchers(editor){



  editor.signals.addInteractToContainer.add(function(cntrId){
            
          interact('#'+cntrId)
            .draggable({
              // enable inertial throwing
              inertia: true,
              manualStart  : false,
              // keep the element within the area of it's parent
              restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 0, right: 1 }
              },

              // call this function on every dragmove event
              onmove: function (event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;


                  var lefts = target.style.left.split('p');
                  lefts = parseInt(lefts[0],'10');
                  // console.log('lefts',lefts);

                  var tops = target.style.top.split('p');
                  tops = parseInt(tops[0],'10');
                  // console.log('tops',tops);

                  target.style.left = (lefts + x) + "px";
                  target.style.top = (tops + y) + "px";


                  jsPlumb.revalidate($(this));
                jsPlumb.repaintEverything();

                jsPlumb.repaintEverything();
              jsPlumb.revalidate(event.target.id);

                // translate the element
                /*target.style.webkitTransform =
                target.style.transform =
                  'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                /*target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);*/

                // jsPlumb.repaint(event.target.children[0].id);

                
                
                // var regexp = /\(([^)]+)\)/;
                // var match = regexp.exec($(event.target)[0].style.transform);
                // var xsplit = match[1].split(',');
                // jsPlumb.repaintEverything();
                // jsPlumb.revalidate(event.target.id,[{left:xsplit[0],top:xsplit[1]}]);
                
                
              },
              // call this function on every dragend event
              onend: function (event) {


                
                // console.log(event.target.children[0].id);
                // jsPlumb.repaint(event.target, {left:x, top:y});
                

                console.log('end',$(event.target)[0]);

                if($(event.target)[0].style.transform !== ''){
                
                var regexp = /\(([^)]+)\)/;
                var match = regexp.exec($(event.target)[0].style.transform);
                var xsplit = match[1].split(',');
                console.log('xsplit',xsplit[0],xsplit[1]);
                
                //thisistheTarget.revalidate(event.target.id,[{left:xsplit[0],top:xsplit[1]}]);
                //thisistheTarget.revalidate(this,[{left:xsplit[0],top:xsplit[1]}]);
                //thisistheTarget.repaintEverything();

                jsPlumb.revalidate($(this));
                jsPlumb.repaintEverything();

                jsPlumb.repaintEverything();
              jsPlumb.revalidate(event.target.id);

                //jsPlumb.repaint($(this));
                //thisistheTarget.repaint(this);

              }

                // console.log('end',event.target,event.target.children[0]);
                // jsPlumb.repaintEverything();
                // jsPlumb.revalidate(event.target.id);
                

                // jsPlumb.repaint(event.target.children[0].id);
                //jsPlumb.repaintEverything();
                
                // var textEl = event.target.querySelector('p');

                // textEl && (textEl.textContent =
                //   'moved a distance of '
                //   + (Math.sqrt(event.dx * event.dx +
                //                event.dy * event.dy)|0) + 'px');
              }
              
            }).resizable({
              edges: { left: true, right: true, bottom: true, top: true }
            })
            .on('resizestart', function (event) {

              jsPlumb.repaintEverything();
              jsPlumb.revalidate(event.target.id);

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

              //jsPlumb.repaint(event.target.children[0].id);

              if ($(event.target).find('.mapboxgl-canvas').length) {
                    map.resize();

                }
              jsPlumb.repaintEverything();
              jsPlumb.revalidate(event.target.id);

              // target.textContent = event.rect.width + '×' + event.rect.height;
            })

              .on('resizeend',function(event){

                jsPlumb.repaintEverything();
                jsPlumb.revalidate(event.target.id);

                if ($(event.target).find('.mapboxgl-canvas').length) {
                    map.resize();

                }
                
              });
            // .on('hold', function (event) {
            //       var interaction = event.interaction;

            //       if (!interaction.interacting()) {
            //         interaction.start({ name: 'drag' },
            //                           event.interactable,
            //                           event.currentTarget);
            //       }
            //   });

            $('#'+cntrId).mouseover(function(event) {
              
              
              if( event.currentTarget.children[3]){
                event.preventDefault();
                // console.log(event.currentTarget.children);
                
                // console.log($('.wysihtml5-sandbox').contents().find('body'));
                // $(this).find('.wysihtml5-sandbox').contents().find('body').focus();
                //$('#'+event.currentTarget.children[3].id).focus();

                // $(event.currentTarget.children[3]).focus();

                //$(event.currentTarget.children[3]).autofocus = false;
                //$(event.currentTarget.children[3]).autofocus = true;
                // console.log(event);
                // console.log(event.currentTarget.children[4]);
              }
              // $('#'+event.target.).focus();
                // $('#'+commentid).wysihtml5.Editor().focus();
                // $('#'+commentid).focus();
                // $('#'+commentid)[0].accessKey = '8';
            });

    });

/*editor.signals.addInteractToContainer.add(function(cntrId){
            

          // console.log('cntrId',cntrId);

        //   $('#'+cntrId).resizable({
        //     resize : function(event, ui) {
        //         jsPlumb.repaint(ui.helper);
        //     }
        // });

        $('.mainDivContainer').resizable({
          resize : function(event, ui) {
            // jsPlumb.repaint(ui.helper);
            jsPlumb.revalidate(ui.helper);
        },
        handles: "all"
    });


          // interact('#' + cntrId).resizable({
          //     edges: { left: true, right: true, bottom: true, top: true }
          //   })
          //   .on('resizestart', function (event) {
          //     // console.log('resizeStarted');

          //     }).on('resizemove', function (event) {
          //     var target = event.target;

          //     // update the element's style
          //     target.style.width  = event.rect.width + 'px';
          //     target.style.height = event.rect.height + 'px';

          //     // translate when resizing from top or left edges
          //     offset.x += event.deltaRect.left;
          //     offset.y += event.deltaRect.top;

          //     target.style.transform = ('translate('+ offset.x + 'px,'+ offset.y + 'px)');

          //     //jsPlumb.repaint(event.target.children[0].id);
          //     jsPlumb.repaintEverything();
          //     // jsPlumb.revalidate(event.target.id);

          //     // target.textContent = event.rect.width + '×' + event.rect.height;
          //   });

          jsPlumb.draggable(cntrId);
          // jsPlumb.draggable($('#'+cntrId)[0].children[0].id);
          

          
      
    });
*/
      editor.signals.addDragnDropToContainer.add(function(cntr) {
        console.log(cntr);

        window.mainTinyColor = 'rgba(0,0,0,1)';
        interact('#'+cntr.id).dropzone({
                ondrop: function (event) {
                  console.log("ondropactivate");
                  console.log(event);
                  console.log(event.relatedTarget.id);
                  console.log(event.target.id);
                    // editor.signals.elementDragnDrop.dispatch(event.relatedTarget.id);
                    
                  }

          })
        .on('dragenter', function (event) {
            console.log('drag Enter');
            console.log(event);
            // event.target.style.background = '#72FFE6';
            // event.target.classList.add('drop-activated');

            if (event.relatedTarget.id == 'Text') {
            var commentid = event.target.id + '-comment';
            console.log('commentid',commentid);

            // console.log("children", $(event.target).children);



            // var childContainer = new FreeContainer(editor,'text-container',event);
            var childContainer = $('<div class="text-container"> </div>');

             

              

                
                  
                $(childContainer).append('<textarea class="form-control" rows="5" id="' + commentid +'"></textarea>');

                $(event.target).append(childContainer);


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



                myCodeMirror = CodeMirror($(childContainer)[0], {
                      value: 'Start typing here. Insert <> to connect blocks using arrows',
                      mode:  "arrows",
                      viewportMargin: 5,
                    });

                codeMirrorDict[event.target.id] = {};

                myCodeMirror.on('change', function(cm,change) {
                    
                    // console.log($(childContainer)[0]);
                    // console.log(event.target);

                    if (change.text[0] == '<') {
                      
                      rs = randomString();
                      var uniqueId = event.target.id +'-' +rs;


                      codeMirrorDict[event.target.id][change.to.ch] = {};
                      codeMirrorDict[event.target.id][change.to.ch]['text'] =  change.text[0];
                      codeMirrorDict[event.target.id][change.to.ch]['id'] = randomString();
                      codeMirrorDict[event.target.id][change.to.ch]['relationId'] = uniqueId;



                      var appendedDiv = $(event.target).append('<span class="fa fa-arrows-h arrowNode" id="'+ uniqueId +'"></span>');

                        var leftDist = Object.keys(codeMirrorDict[event.target.id]).length * 20;
                      
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


                        


                          /*jsPlumb.addEndpoint("uniqueId", {
                            endpoint:"Dot",
                            anchor:[ "Perimeter", { shape:"Circle" } ]
                          });*/


                      //console.log('rs',rs);
                      
                      // editor.signals.addArrowtoContainer.dispatch(event.target,uniqueId,change.to.ch,change.text[0]);
                    }

                    if (change.removed[0] == '<') {
                      $('#'+codeMirrorDict[event.target.id][change.from.ch]['relationId']).remove();
                      delete codeMirrorDict[event.target.id][change.from.ch];
                      // editor.signals.deleteArrowfromContainer.dispatch(event.target);
                    }

                });


              myCodeMirror.on('update', function(cm) {

                // console.log('updated');
                // console.log('cm',cm);
                // console.log('myCodeMirror',myCodeMirror);
                // var hoverid = event.target.id + '-' +randomString();
                //var noIdArrow = $(event.target).find($('*:not([id]).cm-arrows'));
                var noIdArrow = $(event.target).find('.cm-arrows');


                // var noIdArrow = $('.cm-arrows').children();

                // console.log(noIdArrow);
                //console.log(noIdArrow[noIdArrow.length - 1]);
                var ind = 0;

                for (var g in codeMirrorDict[event.target.id]){

                  noIdArrow[ind].id = codeMirrorDict[event.target.id][g].id;


                  $('#'+codeMirrorDict[event.target.id][g].id).mouseenter(mouseStart(codeMirrorDict[event.target.id][g]));
                  $('#'+codeMirrorDict[event.target.id][g].id).mouseleave(mouseEnd(codeMirrorDict[event.target.id][g]));
                  
                  

                    


                  ind++;

                }

                function mouseStart(s){
                  return function() {$('#'+s['relationId']).css('color','red');};
                }

                function mouseEnd(s){
                  return function() {$('#'+s['relationId']).css('color','');};
                }


                

                });

                



                
                $('#'+commentid).html('Start typing here ... ');


                var myCustomTemplates = {
                    custom1: function(context) {
                      return "<li>" +
                        "<a id="+ commentid + "-color-button " +  "class='btn btn-default' data-wysihtml5-command='' href='" +
                        
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
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="xl" tabindex="-1" href="javascript:;" unselectable="on">Extra Large</a></li>'+
                          '<li><a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="sm" tabindex="-1" href="javascript:;" unselectable="on">Small</a></li>'+
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
                      
                  })
                
                  
                ;
                

                $(event.target).find('iframe').remove();
                
                $(event.target).find('.wysihtml5-toolbar').css('display','');
                $(event.target).find('.form-control').remove();


                $('.wysihtml5-toolbar .btn').click(function(event){
                        
                  if(event.currentTarget.innerText == "Bold"){
                    $(".CodeMirror").css('font-weight',"bold");
                  }

                  if(event.currentTarget.innerText == "Italic"){
                    $(".CodeMirror").css('font-style',"italic");
                  }

                  if(event.currentTarget.innerText == "Underline"){
                    $(".CodeMirror").css('text-decoration',"underline");
                  }
                  
                  

                });

                $('.dropdown-menu li a').click(function(event){

                
                  if($(this)[0].attributes[1].value == 'h1'){
                    $(".CodeMirror").css('font-size',"22pt");
                  }

                  else if($(this)[0].attributes[1].value == 'h2'){
                    $(".CodeMirror").css('font-size',"20pt");
                  }

                  else if($(this)[0].attributes[1].value == 'h3'){
                    $(".CodeMirror").css('font-size',"18pt");
                  }

                  else if($(this)[0].attributes[1].value == 'h4'){
                    $(".CodeMirror").css('font-size',"16pt");
                  }

                  else if($(this)[0].attributes[1].value == 'h5'){
                    $(".CodeMirror").css('font-size',"14pt");
                  }

                  else if($(this)[0].attributes[1].value == 'h6'){
                    $(".CodeMirror").css('font-size',"12pt");
                  }

                  else if($(this)[0].attributes[1].value == 'p'){
                    $(".CodeMirror").css('font-size',"14pt");
                  }

                  else if($(this)[0].attributes[1].value == 'xl'){
                    $(".CodeMirror").css('font-size',"26pt");
                  }

                  else if($(this)[0].attributes[1].value == 'sm'){
                    $(".CodeMirror").css('font-size',"10pt");
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

                    console.log("pencil clicked",event);
                    console.log($(event.currentTarget.parentElement.parentElement.parentElement));

                    console.log($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement);


                    // editor.signals.showSpectrum.dispatch(commentid+ "-color-button");

                    $(event.currentTarget.parentElement.parentElement.parentElement).spectrum({
                        color: "#ffffff",
                        showInput:true,
                        preferredFormat: "rgb",
                        containerClassName: "color-picker"
                        });


                    $(event.currentTarget.parentElement.parentElement.parentElement)

                      .on('move.spectrum', function(e, tinycolor) {
                        // console.log(tinycolor);
                        // console.log(tinycolor.toHexString());
                        mainTinyColor = tinycolor;
                        $($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement).css('color',tinycolor);
                        
                        
                      
                      })
                        .on('change.spectrum', function(e, tinycolor) {


                          mainTinyColor = tinycolor;
                          $($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement).css('color',tinycolor);
                        
                        
                      
                      })

                        .on('hide.spectrum', function(e, tinycolor) {
                        console.log(tinycolor);

                        mainTinyColor = tinycolor;
                        $($(event.currentTarget.parentElement.parentElement.parentElement)[0].children[2].contentDocument.activeElement).css('color',tinycolor);

                        $(event.currentTarget.parentElement.parentElement.parentElement).spectrum('disable');
                        // console.log(tinycolor.toHexString());
                        /*$('#'+showColorId).css('background',tinycolor.toHexString());
                        $('#'+showColorId).css('opacity',''+1);
                        if (tinycolor.toHexString() !== "#ffffff") {
                          $('#'+showColorId).children().css('color','#ffffff');
                        }
                        else{
                          $('#'+showColorId).children().css('color','#000000');
                        }
                        $('#'+showColorId).spectrum("disable");*/
                        
                      
                      })
                      ;

                  });

  

            
            
            //thisistheTarget = jsPlumb.makeTarget($(event.target)[0].parentElement.id, {
              thisistheTarget = jsPlumb.makeTarget(event.target.id, {
                            anchor:"Continuous",
                            endpoint:["Dot", { width:40, height:20 }]
                          });


            //$('#'+commentid).wysihtml5();

            
          }

          if (event.relatedTarget.id == 'Image') {

              // var imageContainer = new FreeContainer(editor,'image-container');
              var imagedivid = event.target.id + '-image-div';
              var imageContainer = $('<div class="image-container"> </div>');

              // $(imageContainer).append("<p>Upload Image here</p>");
              // $(imageContainer).append();



              $(event.target).append('<p>Click or drop image to upload</p>');
              // var imageDropzone = $('#'+event.target.id).dropzone({ url: "/file-upload" });

              var myDropzone = new Dropzone('#'+event.target.id, { url: "/file-upload"});

              // var eventTargetID = event.target.id;


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
                $(event.target).append(imageContainer);

                //$(event.target).append('<p> Success</p>');
                //$(event.target).append('<img src=data:image/jpeg;base64,' + data + '></img>');
                
              });

              });

          }

          if (event.relatedTarget.id == 'Chart') {

            var chartContainer = $('<div class="chart-container"> </div>');

            // var chartContainer = new FreeContainer(editor,'chart-container');

            $(event.target).append('<p>Drag and drop or click to upload json file</p>');



            var chartDropzone = new Dropzone('#'+event.target.id, { url: "/file-upload"});

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
                chartContainer.append('<table class="table" id=' + event.target.id + "-" +chartRandom +'>  <thead> <tr> <th class="val-edit">Location</th><th class="val-edit">Latitude</th><th class="val-edit">Longitude</th> </tr></thead> <tbody class="tablebody"></tbody></table>');

                $(event.target).append(chartContainer);

                $.each(data.data, function(index, val) {

                $("#"+event.target.id + "-" + chartRandom).append('<tr><td class="val-edit">'+ val.name.common + '</td><td class="val-edit">'+ val.latlng[0]+ '</td><td class="val-edit">' + val.latlng[1] +'</td></tr>');
                 
                });


                $.fn.editable.defaults.mode = 'inline';

                $(".val-edit").editable();

                jsPlumb.makeSource(event.target.id, {
                  anchor:["Continuous", { faces:[ "left" ] } ],
                  endpoint:["Dot", { width:5, height:5 }],
                maxConnections:1
              });





                // $(event.target).append(imageContainer);

                //$(event.target).append('<p> Success</p>');
                //$(event.target).append('<img src=data:image/jpeg;base64,' + data + '></img>');
                
              });

              });




              
            /*$(event.target).append(childContainer);


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
                  // $(event.target).css('','');

              /*.chart div {
              font: 10px sans-serif;
              background-color: steelblue;
              text-align: right;
              padding: 3px;
              margin: 1px;
              color: white;
              }*/


              
          }


          if (event.relatedTarget.id == 'Map') {

            // var mapContainer = $('<div class="map-container" id="mapbox-map"> </div>');

            map = new mapboxgl.Map({
              container: event.target.id, // container id
              style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json', //stylesheet location
              center: [40.7294245, -73.993707], // starting position
              zoom: 15 // starting zoom
            });


            //jsPlumb.makeTarget($(event.target)[0].parentElement.id, {
              jsPlumb.makeTarget(event.target.id, {
                            anchor:"Continuous",
                            endpoint:["Dot", { width:5, height:5 }]
            });


          }

            })
        .on('dragleave', function (event) {
            
            });
      });


}