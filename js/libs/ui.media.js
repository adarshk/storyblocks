UI.Form = function(){

	UI.Element.call(this);

	var scope = this;

	return this;
};


UI.Form.prototype = Object.create(UI.Element.prototype);
UI.Form.prototype.constructor = UI.Form;

UI.Form.prototype.addContainer = function(){

	var dom = document.createElement('div');
	//dom.className = 'container-fluid media';
	dom.className = 'container';
	this.dom = dom;

	return this;
};


UI.Form.prototype.addRow = function(){

	var row = document.createElement('div');
	row.className = 'row';
	this.dom.appendChild(row);

	this.row = row;

	return this;

};

UI.Media = function(){

	UI.Element.call(this);

	var scope = this;

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

UI.Media.prototype = Object.create(UI.Element.prototype);
UI.Media.prototype.constructor = UI.Media;

UI.Media.prototype.addContainer = function(){

	var dom = document.createElement('div');
	//dom.className = 'container-fluid media';
	dom.className = 'container';
	this.dom = dom;

	return this;
};


UI.Media.prototype.addRow = function(){

	var row = document.createElement('div');
	row.className = 'row';
	this.dom.appendChild(row);

	this.row = row;

	return this;

};

UI.Media.prototype.add = function () {

	// this.dom.appendChild( argument.dom );


	return this;

};


UI.Media.prototype.setOptions = function(options){



};

UI.Media.prototype.appendText = function(formName){

	// var formName = String(formName);

	var dom = document.createElement('div');
	dom.className = 'icon-container';

	this.dom = dom;

	var col6 = document.createElement('div');
	col6.className = 'col-md-4';

	var col4 = document.createElement('div');
	col4.className = 'col-md-4';

	// var para = document.createElement( 'p' );
	
	var icon = document.createElement('span');

	if (formName === 'area-chart' || formName === 'map-marker'){
		icon.className = 'fa fa-' + formName+ ' fa-4x';
	}
	else{
		icon.className = 'fa fa-file-' + formName+ '-o fa-4x';
	}
	
	// para.appendChild(icon);


	// var textNode = document.createTextNode(formName);
	// textNode.className = 'formName';
	// para.appendChild(textNode);

	// col.appendChild(para);
	// icon.appendChild(textNode);


/*	var listGroup = document.createElement('div');
	listGroup.className = 'list-group';
		
		var listGroupItem = document.createElement('a');
		listGroupItem.className = 'list-group-item active';

			var panel = document.createElement('div');
			panel.className = 'panel panel-default';

				var panelHeading = document.createElement('div');
				panelHeading.className = 'panel-heading';

					var textNode = document.createTextNode(formName);
					textNode.className = 'Map';

				panelHeading.appendChild(textNode);


				var panelBody = document.createElement('div');
				panelBody.className = 'panel-body';	
				panelBody.appendChild(icon);




			panel.appendChild(panelHeading);
			panel.appendChild(panelBody);

		listGroupItem.appendChild(panel);

	listGroup.appendChild(listGroupItem);*/



/*<div class="list-group">
  <a href="#" class="list-group-item active">
    <div class="panel panel-default">
  <div class="panel-heading">Map</div>
  <div class="panel-body">
    Map
  </div>
</div>
  </a>


  <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
  <a href="#" class="list-group-item">Morbi leo risus</a>
  <a href="#" class="list-group-item">Porta ac consectetur ac</a>
  <a href="#" class="list-group-item">Vestibulum at eros</a>
</div>*/


	var name = document.createElement('p');
	name.className = 'text-capitalize formname';

	if(formName === 'area-chart')
		name.textContent = 'chart';
	else if(formName === 'map-marker')
		name.textContent = 'map';
	else{

		// var changeFirstLetter = formName(0).toUpperCase();
		// var formNameSpliced = formName.splice(1);
		// name.textContent = changeFirstLetter + formNameSpliced;
		name.textContent = formName;
	}

    col6.appendChild(icon);
    // col6.appendChild(name);

    // this.row.appendChild(col);
    // this.dom.appendChild(col);
    
    this.dom.appendChild(col6);
    // this.row.appendChild(col6);
    // this.row.appendChild(col4);

    // this.dom.appendChild(listGroup);


    

    return this;


};

UI.Media.prototype.getValue = function(){

	return this.dom.value;
};