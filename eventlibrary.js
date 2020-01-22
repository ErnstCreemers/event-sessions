var EventLibrary = new(function() {
  //assign _root and config private variables
  var _root = this;
  var _counter = 0;
  var _events;
  var _defaultSettings = {
    selector: "event-wrapper",
  }
  /**
   *
   */
  this.init = function(settings) {
    //Check if settings and events are set
    if (settings == undefined) {
      throw new Error("Please make sure you initialize correctly by filling in event data");
    } else if (settings.events == undefined) {
      throw new Error("Please fill in event data");
    }

    //Extract event data from settings
    _events = settings.events;

    //Delete event data from settings because it bugs with mergeObjects
    delete settings.events;

    //Combine defaultsettings with usersettings
    _mergeObjects(_defaultSettings, settings || {});
    s = _defaultSettings;

    _getEventsFromData(_events);

  }

  var _mergeObjects = function(obj1, obj2) {
    for (var attrname in obj1) {
      if (obj2.hasOwnProperty(attrname)) {
        obj1[attrname] = obj2[attrname];
      }
    }
  }

  //Loop trough eventdata array, for each object in array call a function
  var _getEventsFromData = function(data) {
    for (var i = 0, l = data.length; i < l; i++) {
      _appendToHTML(data[i]);
    }
  }

  //The object gets used to fill in the HTML
  var _appendToHTML = function(obj) {

    var html = [
      '<div class="event-box">',
      '<div class="event-infowrapper" id="infowrapper' + _counter + '"><a target="_blank" href="' + obj.link + '">RESERVE</a></div>',
      '<div class="event-imagewrapper" id="imagewrapper' + _counter + '">',
      '<span class="event-place">' + obj.place + '</span>',
      '</div>',
      '<div class="event-info">',
      '<div class="event-color" id="color' + _counter + '">',
      '</div>',
      '<span class="event-location">' + obj.location + '</span>',
      '<span class="event-availability">' + obj.availability + ' free spots left</span>',
      '</div>',
      '</div>'
    ].join('');

    document.getElementById(s.selector).innerHTML += html;

    document.getElementById("imagewrapper" + _counter).style.backgroundImage = 'url(Backgroundimages/' + obj.backgroundimage + ')';
    document.getElementById("color" + _counter).style.backgroundColor = obj.eventcolor;
    document.getElementById("infowrapper" + _counter).style.backgroundColor = obj.eventcolor;

    _counter++;
  }

})();
