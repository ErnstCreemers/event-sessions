var EventLibrary = new(function() {
  //assign _root and config private variables
  var _root = this;
  var _counter = 0;
  var _events;
  var _defaultSettings = {
    wrapper: "event-wrapper",
  };

  /**
   * @param {string} wrapper - container element for EventLibrary. Must be an #id element.
   *
   * @param {Object[]} events - List of events for the EventLibrary
   * @param {string} events[].place
   * @param {string} events[].location
   * @param {string} events[].info
   * @param {string} events[].availability
   * @param {string} events[].eventcolor
   * @param {string} events[].backgroundimage
   * @param {string} events[].link
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

    _addEventInitializer();
  }

  this.addEvent = function() {
    event.preventDefault(); // disable normal form submit behavior

    var eventPlace = document.getElementById("eventPlace").value;
    var eventLocation = document.getElementById("eventLocation").value;
    var eventInfo = document.getElementById("eventInfo").value;
    var eventAvailability = document.getElementById("eventAvailability").value;
    var eventEventColor = document.getElementById("eventEventColor").value;
    var eventBackgroundimage = document.getElementById("eventBackgroundimage").value;
    var eventLink = document.getElementById("eventLink").value;

    var eventObject = {
      place: eventPlace,
      location: eventLocation,
      info: eventInfo,
      availability: eventAvailability,
      eventcolor: eventEventColor,
      backgroundimage: eventBackgroundimage,
      link: eventLink
    };

    // Add new event object to array of existing events.
    _events.push(eventObject);

    // Clear existing events
    document.getElementById("event-wrapper").innerHTML = "";

    // Append all new events to dom
    _getEventsFromData(_events);

    // Initialize the "add event" button again
    _addEventInitializer();
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

    document.getElementById(s.wrapper).innerHTML += html;

    document.getElementById("imagewrapper" + _counter).style.backgroundImage = 'url(Backgroundimages/' + obj.backgroundimage + ')';
    document.getElementById("color" + _counter).style.backgroundColor = obj.eventcolor;
    document.getElementById("infowrapper" + _counter).style.backgroundColor = obj.eventcolor;

    _counter++;
  };

  //The object gets used to fill in the HTML
  var _addEventInitializer = function() {
    document.getElementById(s.wrapper).innerHTML += '<button id="addEventButton">Add event</button>';

    document.getElementById("addEventButton").addEventListener("click", _showAddEventForm);
  };

  var _showAddEventForm = function() {
    // remove addEventButton
    document.getElementById("addEventButton").outerHTML = "";

    var html = [
      '<form class="add-event-form" onsubmit="EventLibrary.addEvent()">',
      'Place:<br>',
      '<input type="text" name="place" id="eventPlace" value="EINDHOVEN" required>',
      '<br>',
      'Location name:<br>',
      '<input type="text" name="location" id="eventLocation" value="GENNEPER PARKEN" required>',
      '<br>',
      'Info:<br>',
      '<input type="text" name="info" id="eventInfo" value="RESERVE" required>',
      '<br>',
      'Availability:<br>',
      '<input type="text" name="availability" id="eventAvailability" value="20" required>',
      '<br>',
      'Event color:<br>',
      '<input type="text" name="eventcolor" id="eventEventColor" value="#e88a0f" required>',
      '<br>',
      'Background image (link):<br>',
      '<input type="text" name="backgroundimage" id="eventBackgroundimage" value="eindhoven2.jpg" required>',
      '<br>',
      'Link:<br>',
      '<input type="text" name="link" id="eventLink" value="https://www.youtube.com/watch?v=YtGUjkczE34" required>',
      '<br><br>',
      '<input type="submit" value="Add event">',
      '</form>'
    ].join('');

    document.getElementById(s.wrapper).innerHTML += html;
  }
})();
