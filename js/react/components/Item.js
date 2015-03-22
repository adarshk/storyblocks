/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');

var Group = ReactCanvas.Group;
// var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;

var Item = React.createClass({

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    /*imageUrl: React.PropTypes.string.isRequired,*/
    title: React.PropTypes.string.isRequired,
    itemIndex: React.PropTypes.number.isRequired,
    fontSize: React.PropTypes.number.isRequired,
    lineHeight: React.PropTypes.number.isRequired,
  },

  statics: {
    getItemHeight: function () {
      return 80;
    }
  },

  render: function () {
    return (
      <Group style={this.getStyle()}>
        <Text style={this.getTitleStyle()}>{this.props.title}</Text>
      </Group>
    );
  },

  getStyle: function () {
    return {
      width: this.props.width,
      height: this.props.height,
      /*height: Item.getItemHeight(),*/
      backgroundColor: (this.props.itemIndex % 2) ? '#eee' : '#a5d2ee'
    };
  },

  getImageStyle: function () {
    return {
      top: 10,
      left: 10,
      width: 60,
      height: 60,
      backgroundColor: '#ddd',
      borderColor: '#999',
      borderWidth: 1
    };
  },

  getTitleStyle: function () {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      fontSize: this.props.fontSize,
      lineHeight: this.props.lineHeight
    };
  }

});

module.exports = Item;
