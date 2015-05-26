
/**
 * PPZoomer - Creates a zoom layer effect.  Currently only
 *            supports one level of zoominess.
 **********************************************************
 *
 * To use the PPZoomer you need supplementary CSS and HTML.
 * Tags in the initial present state need a next_section
 * attribute that contains the id of the section to display.
 *
 * What follows is a short example:
 *
 *.......................HTML..............................
 *
 *  <div id="categories" class="section present" >
 *    <category next_section="news_links">News</category>
 *    <category next_section="local_news">Local News</category>
 *  </div>
 *  ...
 *    <div id="news_links" class="section future" >
 *        <a href="http://www.cbc.ca/news">CBC</a>
 *    <div> 
 *
 *.......................CSS...............................
 *
 *  .section { position: absolute; width: 400px; margin-left: -200px;
 *             top: 200px; left: 50%; }
 *
 *  .past { opacity: 0; visibility: hidden; transform: scale(16);
 *          transition: 0.8s ease; }
 *
 *  .present { transition: 0.8s ease; }
 * 
 *  .future { opacity: 0; visibility: hidden; transform: scale(0.2);
 *          transition: 0.8s ease; }
 *
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


