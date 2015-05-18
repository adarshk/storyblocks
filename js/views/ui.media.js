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


	var dom = document.createElement('div');
	dom.className = 'icon-container';

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


UI.Media.prototype.addMapIcon = function(){

	this.dom.className = 'icon-container img-container';
	this.dom.id = 'map-img';
	

	var col6Map = document.createElement('div');
	
	
	var mapicon = document.createElement('img');

	mapicon.className = 'icon-img';
	
	mapicon.src = '/img/icons/map.png';


	col6Map.appendChild(mapicon);
	this.dom.appendChild(col6Map);
    
    return this;


};


UI.Media.prototype.addTextIcon = function(){

	this.dom.className = 'icon-container img-container';
	this.dom.id = 'text-img';

	var col6Text = document.createElement('div');

	var texticon = document.createElement('img');

	texticon.className = 'icon-img';
	
	texticon.src = '/img/icons/color.png';

    
    col6Text.appendChild(texticon);
     
    this.dom.appendChild(col6Text);

    return this;


};

UI.Media.prototype.addChartIcon = function(){

	this.dom.className = 'icon-container img-container';
	this.dom.id = 'chart-img';

	var col6Text = document.createElement('div');

	var texticon = document.createElement('img');

	texticon.className = 'icon-img';
	
	texticon.src = '/img/icons/chart.png';

    
    col6Text.appendChild(texticon);
     
    this.dom.appendChild(col6Text);

    return this;


};


UI.Media.prototype.addImageIcon = function(){

	this.dom.className = 'icon-container img-container';
	this.dom.id = 'image-img';

	var col6Text = document.createElement('div');

	var texticon = document.createElement('img');

	texticon.className = 'icon-img';
	
	texticon.src = '/img/icons/image.png';

    
    col6Text.appendChild(texticon);
     
    this.dom.appendChild(col6Text);

    return this;


};


UI.Media.prototype.addVideoIcon = function(){

	this.dom.className = 'icon-container img-container';
	this.dom.id = 'video-img';

	var col6Text = document.createElement('div');

	var texticon = document.createElement('img');

	texticon.className = 'icon-img';
	
	texticon.src = '/img/icons/video.png';

    
    col6Text.appendChild(texticon);
     
    this.dom.appendChild(col6Text);

    return this;


};

UI.Media.prototype.addIcon = function(formName){

	// var formName = String(formName);

	this.dom.id = formName + '-container';

	var col6Container = document.createElement('div');
	col6Container.className = 'col-md-4';

	var col6 = document.createElement('div');
	// col6.className = 'col-sm-4';
	// col6.className = 'col-md-4';
	// col6.className = formName + 'Container';

	var col4 = document.createElement('div');
	col4.className = 'col-md-4';

	// var para = document.createElement( 'p' );
	
	var icon = document.createElement('span');

	// var formNames = ['Map', 'Chart', 'Text', 'Image','Video'];
	// var formNames = ['map-marker', 'area-chart', 'text', 'image','video'];

	if (formName === 'Map'){
		icon.className = 'fa fa-map-marker fa-4x';
	}

	else if (formName === 'Chart'){
		icon.className = 'fa fa-columns fa-4x';
	}

	else if (formName === 'Text'){
		icon.className = 'fa fa-file-text-o fa-4x';
	}

	else if (formName === 'Image'){
		icon.className = 'fa fa-file-image-o fa-4x';
	}

	else if (formName === 'Video'){
		icon.className = 'fa fa-file-video-o fa-4x';
	}

	else if (formName === 'Tweet'){
		icon.className = 'fa fa-twitter-square fa-4x';
	}

	else if (formName === 'Empty'){
		icon.className = 'fa fa-instagram fa-4x';
	}

	else if (formName === 'Table'){
		icon.className = 'fa fa-area-chart fa-4x';
	}


	else{
		icon.className = 'fa fa-file-text-o fa-4x';
	}




	// if (formName === 'area-chart' || formName === 'map-marker'){
	// 	icon.className = 'fa fa-' + formName+ ' fa-4x';
	// }
	// else{
	// 	icon.className = 'fa fa-file-' + formName+ '-o fa-4x';
	// }
	icon.id = formName;
	

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
    col6Container.appendChild(col6);
    // col6.appendChild(name);

    // this.row.appendChild(col);
    // this.dom.appendChild(col);
    col4.appendChild(col6);
    this.dom.appendChild(col6);
    // this.row.appendChild(col6);
    // this.row.appendChild(col4);

    // this.dom.appendChild(listGroup);


    

    return this;


};

UI.Media.prototype.getValue = function(){

	return this.dom.value;
};


UI.Media.prototype.getId = function(){

	return this.dom.id;
};

UI.Media.prototype.getIconId = function(){

	return this.dom.firstChild.firstChild.id;
};