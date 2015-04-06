UI.Container = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('div');
	dom.className = 'ui-container';

	// var icon = document.createElement('span');
	// icon.className = "fa fa-times";
	// dom.appendChild(icon);

	this.dom = dom;


	return this;

};

UI.Container.prototype = Object.create(UI.Element.prototype);
UI.Container.prototype.constructor = UI.Container;


UI.Container.prototype.getValue = function(){

	return this.dom.value;
};


UI.Cross = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('span');
	dom.className = "fa fa-times free-container-cross";

	this.dom = dom;


	return this;

};

UI.Cross.prototype = Object.create(UI.Element.prototype);
UI.Cross.prototype.constructor = UI.Cross;


UI.OutNode = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('span');
	dom.className = "fa fa-arrows-h outnode";

	this.dom = dom;


	return this;

};

UI.OutNode.prototype = Object.create(UI.Element.prototype);
UI.OutNode.prototype.constructor = UI.Cross;