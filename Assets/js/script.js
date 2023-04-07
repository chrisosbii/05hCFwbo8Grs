/* Universal variables */
var startHour = 9;
var storage = ["","","","","","","","","","","","","","","","","","","","","","","",""];
var timer;
var clock;

/**
 * updateTime checks the current time and compares it to all objects in the
 * schedule. If < current then in past, = is precent, < is future
 */
function updateTime(){
  var currentTime = dayjs().hour();
  // update currentTime for testing
  // var currentTime = 14;
  console.log(currentTime);
  var id = $('.container-fluid').parent();
  for (var i = startHour; i < 9 + startHour; i ++){
    var tempTimeBlock = $("#hour-" + i);
    if (currentTime > i){
      tempTimeBlock.removeClass("past present future").addClass("past");
    }
    if(currentTime == i){
      tempTimeBlock.removeClass("past present future").addClass("present");
    }
    if(currentTime < i){
      tempTimeBlock.removeClass("past present future").addClass("future");
    }
  }
}

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //render the values
  //var schedule = $('.container-fluid').parent();
  //var startHour = 9;
  //for (var i = 0; i < 8; i ++){
  //  var timeBlock = document.createElement('div');
  //  timeBlock.addClass("row time-block past");
  //}

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on('click', function () {
    console.log('in save');
    var id = $(this).parent();
    var key = id.attr('id');
    var info = id.children().eq(1).val();
    console.log(key);
    let hour = key.split("-")[1];
    //update storage
    storage[+hour - 1] = info;
    //save to local storage
    localStorage.setItem("wds", JSON.stringify(storage));
  });

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  updateTime();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  // get storage and parse to json
  console.log(localStorage.getItem("wds"));
  storage = JSON.parse(localStorage.getItem("wds"));
  if (storage !== null){
    console.log(storage);
    //check all objects for values
    for (var i = 0; i < storage.length; i ++){
      if (storage[i] != ""){
        console.log(storage[i] + " @ " + i);
        let id = "#hour-" + (i + 1);
        console.log(id);
        $(id).children().eq(1).val(storage[i]);
      }
    }
    
  }
  else {
    // if not found set the storage to ""
    storage = ["","","","","","","","","","","","","","","","","","","","","","","",""];
  }

  // TODO: Add code to display the current date in the header of the page.
  // added here to remove 1 second delay of showing up
  $("#currentDay").text(dayjs().format('dddd, MMMM D hh:mm A'));

  // Add code to display current time
  // make a new timer
  timer = setInterval(function() {
    // update day
    $("#currentDay").text(dayjs().format('dddd, MMMM D hh:mm A'));
    // if hour has changed and minutes == 0 then update time
    if (dayjs().minute() == 0){
      updateTime();
    }
  }, 1000);

});
