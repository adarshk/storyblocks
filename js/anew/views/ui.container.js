var UI = require("./ui.js");

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
	dom.className = "fa fa-times main-container-cross";

	this.dom = dom;


	return this;

};

UI.Cross.prototype = Object.create(UI.Element.prototype);
UI.Cross.prototype.constructor = UI.Cross;


UI.OutNode = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('span');
	dom.className = "fa fa-arrows main-container-outnode";

	this.dom = dom;


	return this;

};

UI.OutNode.prototype = Object.create(UI.Element.prototype);
UI.OutNode.prototype.constructor = UI.OutNode;


UI.Square = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('span');
	dom.className = "fa fa-square-o main-container-square";

	this.dom = dom;


	return this;

};

UI.Square.prototype = Object.create(UI.Element.prototype);
UI.Square.prototype.constructor = UI.Square;

UI.Arrow = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('span');
	dom.className = "fa fa-arrow-down main-container-arrow";

	this.dom = dom;


	return this;

};

UI.Arrow.prototype = Object.create(UI.Element.prototype);
UI.Arrow.prototype.constructor = UI.Arrow;



UI.Plus = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('span');
	dom.className = "fa fa-plus main-container-plus";

	this.dom = dom;


	return this;

};

UI.Plus.prototype = Object.create(UI.Element.prototype);
UI.Plus.prototype.constructor = UI.Plus;





UI.Checkbox = function(){

	UI.Element.call(this);

	var scope = this;

	var newDom = $('<form role="form" class="main-container-checkbox-form"><div class="checkbox main-container-checkbox-div"><input type="checkbox" id="connect" checked><label for="checkbox1"></label></div></form>');

	// $('body').append('<form id="grid-checkbox" role="form"><div class="checkbox"><input type="checkbox" id="checkbox1" checked><label for="checkbox1">Grid</label></div></form>');
	
	/*var dom = document.createElement('span');
	dom.className = "fa fa-Checkbox main-container-Checkbox";*/

	this.dom = newDom;


	return this;

};

UI.Checkbox.prototype = Object.create(UI.Element.prototype);
UI.Checkbox.prototype.constructor = UI.Checkbox;

module.exports = UI;