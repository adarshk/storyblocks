/** @jsx React.DOM */

'use strict';

var React = require('react');



var Example = React.createClass({

render: function() {
      
      
return (
      <div className="example">
         <img src="http://images5.fanpop.com/image/photos/28700000/Elephant-elephants-28788752-1024-768.jpg"></img>
      </div>
      );
      }

});

React.render(<Example />, document.body);