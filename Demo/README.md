# EVENT Library.

This Library is developed for all those wo would like to add an agenda list for concerts or events.

## Customizable:

- Place
- Location
- Picture
- Eventcolor
- Availability
- Link

## Installing

### Step 1. Include the library and css within the head.

```
<script src="EventLibrary.js"></script>
<link rel="stylesheet" type="text/css" href="eventlibrary.css">
```

### Step 2. Add the selector.

```
    <!-- Container element for EventLibrary -->
    <div id="event-wrapper">
    </div>
```

### Step 3. Initialise library.

```
<script>
  EventLibrary.init({
    selector: "event-wrapper",
    events: [{
        place: 'EINDHOVEN',
        location: 'GENNEPER PARKEN',
        info: 'RESERVE',
        availability: 5,
        eventcolor: "green",
        backgroundimage: 'eindhoven1.jpg',
        link: "https://www.youtube.com/watch?v=leYgTALl2xw"
      }
     ]
  });
</script>
```

event-wrapper comes with the following parameters, ```('place', 'location', 'info', 'availability', 'eventcolor', 'backgroundimage', 'link').```

In case you want to add multiple objects add ``` , ``` after each object.

This should get you going. 

## License:

This Libary is free to use for everyone. (sharing is caring).

## Credits:

Ernst Creemers




