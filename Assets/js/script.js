
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //render the values
  //var schedule = $('.container-fluid').parent();
  var startHour = 9;
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
    console.log(id.attr('id'));
    console.log(id.children().eq(1).val());
  });

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentTime = dayjs().hour();
  console.log(currentTime);
  var id = $('.container-fluid').parent();
  for (var i = startHour; i < 9 + startHour; i ++){
    var tempTimeBlock = $("#hour-"+i);
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


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  

  // TODO: Add code to display the current date in the header of the page.

});
