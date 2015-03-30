


var FreeContainer = function ( editor ) {

	var container = new UI.Container();

	var icon = new UI.Cross();

	icon.onClick(function() {
		editor.signals.deleteFreeContainer.dispatch(this.dom.parentNode);

	});
	// container.dom.appendChild(icon.dom);
	// container.setId( 'freeContainer' );

	// container.setStyle('top: 50%',['top']]);
	// container.setStyle('outline','1px dashed red',['outline']);

	editor.signals.deleteFreeContainer.add(function(containerDelete) {

		$("#"+containerDelete.id).remove();
	});

	var divContainer = document.createElement('div');
	divContainer.appendChild(container.dom);
	divContainer.className = "free-container";
	divContainer.id = 'A'+THREE.Math.generateUUID().toString();
	divContainer.appendChild(icon.dom);

        editor.signals.addInteractToContainer.add(function(cntrId){
            
          interact('#'+cntrId)
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
            });

    });

      editor.signals.addDragToContainer.add(function(cntr) {
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
            $(event.target.children[0]).append('<p>Start typing here ...</p>');
            // console.log(event.target.children[0]);
            // event.target.classList.add('drop-activated');
            });
      });

	return divContainer;

};