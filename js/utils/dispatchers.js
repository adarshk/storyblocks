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
                /*var textEl = event.target.querySelector('p');

                textEl && (textEl.textContent =
                  'moved a distance of '
                  + (Math.sqrt(event.dx * event.dx +
                               event.dy * event.dy)|0) + 'px');*/
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
            });/*.on('hold', function (event) {
                  var interaction = event.interaction;

                  if (!interaction.interacting()) {
                    interaction.start({ name: 'drag' },
                                      event.interactable,
                                      event.currentTarget);
                  }
              });*/

            $('#'+cntrId).mouseover(function(event) {
              
              
              if( event.currentTarget.children[3]){
                event.preventDefault();
                console.log(event.currentTarget.children);
                
                console.log($('.wysihtml5-sandbox').contents().find('body'));
                $(this).find('.wysihtml5-sandbox').contents().find('body').focus();
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

      editor.signals.addDragnDropToContainer.add(function(cntr) {
        console.log(cntr);
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
            event.target.style.background = '#72FFE6';
            // event.target.classList.add('drop-activated');
            })
        .on('dragleave', function (event) {
            console.log('drag leave');
            console.log(event);
            event.target.style.background = '';
            //$(event.target.children[0]).append('<p>Start typing here ...</p>');

            if (event.relatedTarget.id == 'Text') {
            var commentid = event.target.id + '-comment';
            console.log(commentid);

            var childContainer = new FreeContainer(editor,'chart-container');
              
            $(childContainer).append('<textarea class="form-control" autofocus="" rows="5" id="' + commentid +'"></textarea>');

            $(event.target).append(childContainer);
            $('#'+commentid).html('Start typing here ... ');
            $('#'+commentid).wysihtml5({
                  
                    "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": true, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": true, //Button to change color of font  
                    "blockquote": true, //Blockquote  
                  
              });
            //$('#'+commentid).wysihtml5();
          }

          if (event.relatedTarget.id == 'Chart') {

            var childContainer = new FreeContainer(editor,'chart-container');
              
            $(event.target).append(childContainer);


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
                  .text(function(d) { return d; });

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

          if (event.relatedTarget.id == 'Image') {

              var childContainer = new FreeContainer(editor,'image-container');

              console.log('Image');
              var imageid = event.target.id + '-Image';
              console.log(imageid);
              var img = '<img src="http://www.eonline.com/eol_images/Entire_Site/201438/rs_560x415-140408154504-1024.baby-elephant-grass.ls.4814.jpg" id="' + imageid +'"></img>';
              
              $(childContainer).append(img);
              // childContainer.appendChild(img);
              $(event.target).append(childContainer);
                
                /*$(event.target).append('<textarea class="form-control" autofocus="" rows="5" id="' + imageid +'"></textarea>');
                $('#'+imageid).wysihtml5({
                  toolbar: {
                    "font-styles": false, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": false, //Italics, bold, etc. Default true
                    "lists": false, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": false, //Button which allows you to edit the generated HTML. Default false
                    "link": false, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": false, //Button to change color of font  
                    "blockquote": false, //Blockquote  
                    }
              });*/


              // editor.signals.resizeContainer.dispatch(cntr);
          }



            /*$('.wysihtml5-sandbox').contents().find('body').on("keydown",function() {
              console.log("Handler for .keypress() called.");
              });*/


            // console.log(event.target.children[0]);
            // event.target.classList.add('drop-activated');
            });
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