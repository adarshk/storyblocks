/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactCanvas = require('react-canvas');
var Item = require('./components/Item');
var articles = require('./common/app_data');

var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;

var FontFace = ReactCanvas.FontFace;
var measureText = ReactCanvas.measureText;

var App = React.createClass({


  render: function () {
    var size = this.getSize();
    this.appid = "main-canvas";
    this.titleStyle = this.getTitleStyle();
    this.article = articles[0];
    this.addText = measureText(this.article.title, this.getSize().width, this.titleStyle.fontFace, this.titleStyle.fontSize, this.titleStyle.lineHeight);
    return (
      // <Surface top={0} left={0} width={size.width} height={size.height}>
      <Surface top={0} left={0} width={this.addText.width} height={this.addText.height}>
        <ListView
          id = {this.appid}
          style={this.getListViewStyle()}
          numberOfItemsGetter={this.getNumberOfItems}
          itemHeightGetter={Item.getItemHeight}
          itemGetter={this.renderItem} />
      </Surface>
    );
  },

  renderItem: function (itemIndex, scrollTop) {
     this.article = articles[itemIndex % articles.length];
     this.addText = measureText(this.article.title, this.getSize().width, this.titleStyle.fontFace, this.titleStyle.fontSize, this.titleStyle.lineHeight);
      return (
      <Item
        width = {this.addText.width}
        height = {this.addText.height}
        /*height={Item.getItemHeight()}*/
        /*imageUrl={this.article.imageUrl}*/
        title={this.article.title}
        itemIndex={itemIndex}
        fontSize = {this.titleStyle.fontSize}
        lineHeight = {this.titleStyle.lineHeight} />
    );
  },

  getTitleStyle: function () {
    return {
      top: 0,
      left: 0,
      width: 20,
      fontSize: 20,
      lineHeight: 30,
      fontFace: FontFace('Avenir Next, Helvetica, sans-serif', null, {weight: 500})
    };
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  },

  // ListView
  // ========

  getListViewStyle: function () {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  getNumberOfItems: function () {
    return 1;
  },

});

React.render(<App id="mainCanvas"/>, document.getElementById('main'));
