var offset = {x:0,y:0};

interact('#viewport')
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
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

    target.textContent = event.rect.width + '×' + event.rect.height;
  });


//interact('#viewport').dropzone({
  interact('body').dropzone({
			ondropactivate: function (event) {

    			console.log(event.relatedTarget.id);
    			
    			
  			},
			
			ondrop : function (event){
        console.log('logged');
				console.log(event);
        console.log(event.relatedTarget.id);
        console.log(event.interaction.curCoords);
        console.log(event.interaction.curCoords.page.x);
        //editor.signals.elementDragnDrop.dispatch(event.relatedTarget.id);
			}

		})
    .on('dragenter', function (event) {
      // console.log("drag entered");
      // console.log(event);
    })
    .on('dropmove', function (event) {
      // console.log("drop move");
      // console.log(event);
    })
    .on('drop', function (event) {
      // console.log("drop outer");
      // console.log(event);
    })
    ;