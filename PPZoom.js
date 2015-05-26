
/**
 * TODO -- document
 */
function PPZoomer ( startPointId, childTagName ) {
  this.startPointId = startPointId;
  this.childTagName = childTagName;

  var that = this;
  var initBinder = function() { that.init(); }
  PPUtils.bind("load", window, initBinder);
}

PPZoomer.prototype.init = function () {
  this.presentView = $( this.startPointId );
 
  var that = this;
  var backBinder = function() { that.back(event); }
  PPUtils.bind("keyup", document, backBinder );

  var children = this.presentView.getElementsByTagName(this.childTagName);
  var zoomBinder = function() { that.zoomer(event); }

  for( var i = 0; i < children.length; i++ ) {
    PPUtils.bind("click", children[i], zoomBinder );
  }


}


PPZoomer.prototype.back = function (event) {

  // 27 == ESCAPE
  if (event.keyCode === 27 && this.presentView !== $( this.startPointId )) {
    this.goBackInTime();
  }
 
}


PPZoomer.prototype.goBackInTime = function () {

  this.presentView.removeClass("present");
  this.presentView.addClass("future");

  this.pastView.addClass("present");
  this.pastView.removeClass("past");

  this.presentView = this.pastView;
}

PPZoomer.prototype.setPresentView = function ( viewName ) {

  this.presentView.removeClass("present");
  this.presentView.addClass("past");

  this.pastView = this.presentView;
  this.presentView = $(viewName);

  this.presentView.addClass("present");
  this.presentView.removeClass("future");
}


PPZoomer.prototype.zoomer = function (event) {
  event.preventDefault();

  var next_section = event.target.getAttribute("next_section");
  this.setPresentView(next_section);
}


