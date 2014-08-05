 // // Firebase Authentication Simple Login
  // var myRef = new Firebase("https://planhacker.firebaseio.com");
  // var auth = new FirebaseSimpleLogin(myRef, function(error, user) {
  //   if (error) {

  //     // an error occurred while attempting login
  //     alert(error);
  //     return

  //   } else if (user) {

  //     // user authenticated with Firebase
  //     console.log("User ID: " + user.uid + ", Provider: " + user.provider);

  //     // put function to log in the user.

  //     // if new user, then...

  //     // if regular user, then ...

  //     // add function to allow user to log out


  //   } else {
  //     // if user is logged out, then ...
  //       // show log-in box modal

  //     }
  //   });

  // // Monitor user's authentication status
  // var authRef = new Firebase("https://planhacker.firebaseio.com/.info/authenticated");
  // authRef.on("value", function(snap) {
  //   if (snap.val() === true) {
  //     alert("authenticated");
  //   } else {
  //     alert("not authenticated");
  //   }
  // });

  // // Logging Users In
  // auth.login("password"); // this could be "facebook", "twitter", "password", etc...

  // // Logging Users Out
  // auth.logout();

  // // Storing User Data
  // // we would probably save a profile when we register new users on our site
  // // we could also read the profile to see if it's null
  // // here we will just simulate this with an isNewUser boolean
  // var isNewUser = true;

  // var myRef = new Firebase("https://planhacker.firebaseio.com");
  // var auth = new FirebaseSimpleLogin(myRef, function(error, user) {
  //   if (error) {

  //   }
  //   else if (user) {
  //     if( isNewUser ) {
  //       // save new user's profile into Firebase so we can
  //       // list users, use them in security rules, and show profiles
  //       myRef.child('users').child(user.uid).set({
  //         displayName: user.displayName,
  //         provider: user.provider,
  //         provider_id: user.id
  //       });
  //     }
  //   }
  //   else { ... }
  // };

  // // Create New User Account
  // auth.createUser(email, password, function(error, user) {
  //   if (!error) {
  //     console.log('User Id: ' + user.uid + ', Email: ' + user.email);
  //   }
  // });

  // Wait until DOM is fully loaded 
  $(document).ready(function () {
    // Initialize the Calendar
    $('#calendar').fullCalendar({
      eventSources: [{
        url: "https://planhacker.firebaseio.com/users/user/events.json", // JSON feed from my Firebase
        type: 'GET',
        data: {
          title: "title",
          startParam: "start",
          endParam: "end"
        },
        success: displayEventObjects, // retrieves the event data and push it to calendar
        error: function () {
          alert("There's a problem.");
        },
      }],
      timezone: 'America/Los_Angeles',
      // Settings for Calendar (options & callbacks)
      defaultView: 'agendaWeek',
      selectable: true,
      selectHelper: true,
      unselectAuto: true,
      editable: true,
      draggable: true,
      droppable: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      weekMode: 'variable',
      theme: false,
      // Create new event
      select: function(start, end) {
        console.log('in select.  start: ' + start + '  end: ' + end);
        // Temporary hack because Timezone is not working. 
        // We are NOT going to die in Year 2038... -_-
        start_time = start.unix() + 60*60*7; // global variable
        end_time = end.unix() + 60*60*7; // global variable
        $('#newEventModal').modal('show');
      },
      // View Event Info
      eventClick: function (calEvent, jsEvent, view) {
        id = calEvent.id; // global variable
        var title = calEvent.title;
        $('#myModal .modal-body').children().remove();
        $('#myModal .modal-title').children().remove();
        $('#myModal .modal-title').append("<p>" + title + "</p>");
        $('#myModal').modal('show');
        $("#myModal .modal-header p").click(function () {
          $("#myModal .modal-title").append("<input id='editEventTitle' value='" + title + "'></input>");
          $("#myModal .modal-title p").remove();
        });
      },
      eventDrop: function (event, delta, revertFunc) {
        id = event.id; 
        console.log( event.id + " " + event.title 
          + " was dropped on start: " 
          + event.start 
          + " and end: " 
          + event.end);
        start_time = event.start;
        end_time = event.end;
        dropEvent(id, start_time, end_time); // call method
      },
      eventResize: function (event, delta, revertFunc) {
        id = event.id;
        console.log( event.id + " " + event.title 
          + " was resized on start: " 
          + event.start 
          + " and end: " 
          + event.end);
        end_time = event.end;
        resizeEvent(id, end_time); // call method
      },
      drop: function (date, jsEvent) {

        start_time = date; // global variable
        
        end_time = date; // global variable

        var id = $(this).data('id');

        var title = $(this).data('title');

        dropTaskEvent(start_time, end_time, title, id);
      },
    }); // End initialization
  }); // END of $(document).ready()

  //_______________________FUNCTIONS & EVENT HANDLERS____________________________//

  // GLOBAL VARIABLES
  var start = null;
  var end = null;
  var start_time = null;
  var end_time = null;
  var id = null;

  // Make the task draggable
  setInterval(function(){
    console.log('rebinding')
    $('.external-event').draggable({revert: true,revertDuration: 500, zIndex:500});
  }, 1000);

  // Receive JSON feed from Firebase and iterate thru array
  // Then push events onto the calendar
  function displayEventObjects (data) {
    var events_array = [];
    for (i in data) {
      events_array.push({
        id: i,
        title: data[i].title,
        start: data[i].start,
        end: data[i].end
      });
    };
    for (var i = 0; i < events_array.length; i++) {
      if (events_array[i].title) {
        event_start = moment(events_array[i].start * 1000);
        event_end = moment(events_array[i].end * 1000);
        $('#calendar').fullCalendar('renderEvent',
        {
          id: events_array[i].id,
          title: events_array[i].title,
          start: event_start.format(), // 2014-09-05T06:28:00Z'
          end: event_end.format(),
        });
      }
    };
  };

  // Drop task onto Calendar
  function dropTaskEvent(start_time, end_time, title, id) {

    var ref = new Firebase("https://planhacker.firebaseio.com/users/user/");

    var eventsRef = ref.child("events");

    eventsRef.push(
    {
      title: title,
      start: start_time.unix() + 60*60*7,
      end: end_time.unix() + 60*60*9,  
    }
    );

    // $('#calendar').fullCalendar('renderEvent');

    $('#calendar').fullCalendar('refetchEvents');

  };

  // Update firebase with new start and end time
  function dropEvent (id, start_time, end_time) {

    var eventsRef = new Firebase("https://planhacker.firebaseio.com/users/user/events/" + id);

    eventsRef.update(
    {
      start: start_time.unix() + 60*60*7, 
      end: end_time.unix() + 60*60*7
    }
    ); // Updates event in Firebase

  };

  // Update firebase with new end time
  function resizeEvent (id, end_time) {

    var eventsRef = new Firebase("https://planhacker.firebaseio.com/users/user/events/" + id);

    eventsRef.update({ end : end_time.unix() +60*60*7 });

  };

  // Save New Event to Calendar
  $('#newEventModal .btn.btn-primary').click(function setEventTitle(event) {

    var title = $('#eventTitleInput').val();

    if (title) {

      var ref = new Firebase("https://planhacker.firebaseio.com/users/user/");

      var eventsRef = ref.child("events");

      eventsRef.push(            
      {
        title: title,
        start: start_time,
        end: end_time,
      }); // push to Firebase

      $('#calendar').fullCalendar('refetchEvents'); 

    }

    $('#newEventModal').modal('hide');

  });

  // Update Event Details
  $("#saveChanges").click(function (editEventTitle) {

    var input = $("#myModal input").val();

    var eventsRef = new Firebase("https://planhacker.firebaseio.com/users/user/events/" + id);

    eventsRef.update({title : input}); // Push data to Firebase

    $('#calendar').fullCalendar('removeEvents', id); 

    $('#calendar').fullCalendar('refetchEvents');

    $('#myModal').modal('hide');

  });

  // Remove Event
  $('#myModal .btn.btn-danger').click(function removeEvent() {

    var eventsRef = new Firebase("https://planhacker.firebaseio.com/users/user/events/" + id);

    eventsRef.remove();

    $('#calendar').fullCalendar('removeEvents', id);

    $('#myModal').modal('hide');

  });
