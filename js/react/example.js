/** @jsx React.DOM */

'use strict';

var React = require('react');
// var Editor = require('../utils/Editor.js');
// var Viewport = require('../render/Viewport.js');
// var Sidebar = require('../views/Sidebar/Sidebar.js');
// var Toolbar = require('../views/Toolbar/Toolbar.js');


var StoryBlocks = React.createClass({

  getInitialState: function(){

    return {

    };

  },



  render: function() {


    return (
          null
        );
    },

    componentDidMount: function() {
      var editor = new Editor();
      var viewport = new Viewport(editor);
      var container = document.body;
      // var container = this.refs.example.getDOMNode();
      container.appendChild(viewport.dom);

      var sidebar = new Sidebar(editor);
      container.appendChild(sidebar.dom);

      var toolbar = new Toolbar(editor);
      container.appendChild(toolbar.dom);      

      $.getJSON('/data/countries.json',function(cdata){

                // countries_shapeFile_data = cdata;
                window.data = cdata;
            });

     editor.setTheme( '/css/light.css' ); 

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
      // console.log(event.relatedTarget.id);
      editor.signals.elementDragnDrop.dispatch(event.relatedTarget.id);

      },

      ondrop : function (event){
        // console.log(event);
      }

    });
    }

});

React.render(<StoryBlocks />, document.body);