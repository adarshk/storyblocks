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
			console.log(event.relatedTarget.id);
			editor.signals.elementDragnDrop.dispatch(event.relatedTarget.id);

			},

			ondrop : function (event){
				console.log(event);
			}

		});









interact('#freeContainer')
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
  })
  .on('resizemove', function (event) {
    var target = event.target;
    target.textContent = '';

    });










  interact('#freeContainer')
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
  });