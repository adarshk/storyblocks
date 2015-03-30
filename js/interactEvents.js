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


interact('#viewport').dropzone({
			ondropactivate: function (event) {
    			// console.log(event.relatedTarget.id);
    			editor.signals.elementDragnDrop.dispatch(event.relatedTarget.id);
    			
  			},
			
			ondrop : function (event){
				// console.log(event);
			}

		});