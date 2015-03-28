UI.Container = function(){

	UI.Element.call(this);

	var scope = this;


	var dom = document.createElement('div');
	dom.className = 'main-container';

	this.dom = dom;


	return this;

};

UI.Container.prototype = Object.create(UI.Element.prototype);
UI.Container.prototype.constructor = UI.Container;



UI.Container.prototype.appendIcon = function(){


	var col6 = document.createElement('div');
	// col6.className = 'col-sm-4';
	col6.className = 'main-container-element';


	var icon = document.createElement('span');
	icon.className = 'fa fa-square-o fa-4x';

	icon.id = 'container-icon';
    col6.appendChild(icon);


    this.dom.appendChild(col6);





    return this;


};

UI.Container.prototype.getValue = function(){

	return this.dom.value;
};