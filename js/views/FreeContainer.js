


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
	divContainer.id = THREE.Math.generateUUID();
	divContainer.appendChild(icon.dom);

	return divContainer;

};

FreeContainer.prototype.delete = function(){



};




