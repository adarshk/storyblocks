


var FreeContainer = function ( editor, className ) {

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

		$("#"+containerDelete.id).remove();
	});

  editor.signals.resizeContainer.add(function(containerResize) {

    $("#"+containerResize.id).resize();
  });

	var divContainer = document.createElement('div');
	// divContainer.appendChild(container.dom);
	divContainer.className = className || "free-container";
	divContainer.id = 'A'+THREE.Math.generateUUID().toString();
	divContainer.appendChild(icon.dom);
  divContainer.appendChild(outnode.dom);
  divContainer.style.height = 'auto';
  divContainer.style.overflow = 'scroll';

  icon.onClick(function() {
    editor.signals.deleteFreeContainer.dispatch(this.dom.parentNode);

  });

        

	return divContainer;

};