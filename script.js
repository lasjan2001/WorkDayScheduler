// Variables
var currentJumbo = $('#currentDay');
var now = parseInt(moment().format('H'));
var startTime = 5;
var endTime = 8;

var events = JSON.parse(localStorage.getItem('events')) || [];
var checkStorage = localStorage.getItem('events');

// Append Date and Time 
$('#currentDay').text(moment().format('LLLL'));

// Rows
for (var i = 0; i < 16; i++){

    var divRow = $('<div class="row">');
    divRow.attr('data-id', i);
    $('.container').append(divRow);
    
    //Local Storage
    if (checkStorage == null) {

        events.push({eventId : i});
        localStorage.setItem('events', JSON.stringify(events));
    };
        
// Time Grid
    var timeCol = $('<div class="time-block hour col-2">');
    var hour = moment(startTime, 'h').format('LT');
    timeCol.text(hour);
    divRow.append(timeCol);
    startTime++

// Event Grid
    var eventDescCol = $('<div class="description col-8">');
    eventDescCol.attr('data-time', startTime);

    // Set Timeframe Class
    if (moment(startTime).isBefore(now)) {
        eventDescCol.addClass('past');
    } else if (moment(startTime).isSame(now)) {
        eventDescCol.addClass('present');
    } else if (moment(startTime).isAfter(now)) {
        eventDescCol.addClass('future');
    };

    //TextArea
    var eventDescText = $('<textarea class="col-12" cols="90" rows="2"/>');
    eventDescText.attr('data-id', i);
    eventDescCol.html(eventDescText);
    divRow.append(eventDescCol);

    var eventText = events[i].description;
    eventDescText.val(eventText);

// Save Grid
    var saveCol = $('<div class="saveBtn col-2">');
    divRow.append(saveCol);
    var saveBtn = $('<i class="fas fa-save"></i>');
    saveBtn.attr('data-id', i);
    saveCol.html(saveBtn);
};

    // Event Listener
    $('.fa-save').on("click", function() {
        // Set id
        var dataId = $(this).attr('data-id');
        var eventText = $(`textarea[data-id|='${dataId}']`).val();
        events[dataId].description = eventText;

        localStorage.setItem('events', JSON.stringify(events));
    });
    
