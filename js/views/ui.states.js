UI.States = function(){

	UI.Element.call(this);

	var scope = this;

	var dom = document.createElement('div');
	dom.className = 'states-container';

	this.dom = dom;

/*	
	var dom = document.createElement('div');
	//dom.className = 'container-fluid media';
	dom.className = 'container';

	var row = document.createElement('div');
	row.className = 'row';
	dom.appendChild(row);

	this.row = row;
	this.dom = dom;*/

	return this;

};

UI.States.prototype = Object.create(UI.Element.prototype);
UI.States.prototype.constructor = UI.States;

UI.States.prototype.addContainer = function(){

	var dom = document.createElement('div');
	//dom.className = 'container-fluid media';
	dom.className = 'container';
	this.dom = dom;

	return this;
};


UI.States.prototype.addRow = function(){

	var row = document.createElement('div');
	row.className = 'row';
	this.dom.appendChild(row);

	this.row = row;

	return this;

};

UI.States.prototype.add = function () {

	// this.dom.appendChild( argument.dom );


	return this;

};


UI.States.prototype.setOptions = function(options){



};

UI.States.prototype.addIcon = function(stateName){

	// var stateName = String(stateName);

	this.dom.id = stateName + '-container';

	var col6 = document.createElement('div');
	// col6.className = 'col-md-4';

	var col4 = document.createElement('div');
	col4.className = 'col-md-4';

	// var para = document.createElement( 'p' );



	//<i class="fa fa-play-circle-o"></i> animation
	// <i class="fa fa-user"></i> User
	// <i class="fa fa-th-list"></i> transitions
	//<i class="fa fa-sort-amount-desc"></i> timeline

	// <i class="fa fa-connectdevelop"></i> connectedEvents


	var icon = document.createElement('span');

	if (stateName === 'Animations'){
		icon.className = 'fa fa-play-circle-o fa-4x';
	}
	else if (stateName === 'Transitions'){
		icon.className = 'fa fa-th-list fa-4x';
	}

	else if (stateName === 'Click'){
		icon.className = 'fa fa-user fa-4x';
	}
	else if (stateName === 'Timeline'){
		icon.className = 'fa fa-sort-amount-desc fa-4x';
	}

	else if (stateName === 'ConnectedEvents'){
		icon.className = 'fa fa-connectdevelop fa-4x';
	}

	else {
		icon.className = 'fa fa-play-circle-o fa-4x';
	}

	icon.id = stateName;
	var name = document.createElement('p');
	name.className = 'text-capitalize stateName';

	name.textContent = stateName;

    col6.appendChild(icon);
    //col6.appendChild(name);
    // col6.appendChild(name);

    // this.row.appendChild(col);
    // this.dom.appendChild(col);
    
    this.dom.appendChild(col6);
    // this.row.appendChild(col6);
    // this.row.appendChild(col4);

    // this.dom.appendChild(listGroup);


    

    return this;


};

UI.States.prototype.getValue = function(){

	return this.dom.value;
};

UI.States.prototype.getId = function(){

	return this.dom.id;
};

UI.States.prototype.getIconId = function(){

	return this.dom.firstChild.firstChild.id;
};