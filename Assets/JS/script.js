//get today's date and display it
var today = moment().format('dddd MMMM Do YYYY');
var hourNow = moment().format('h'); //to print current time on page
var hourNowH = moment().format('H');
var minuteNow = moment().format('mma');
var timeNow = hourNow + ':' + minuteNow;
var dateDisplay = document.getElementById("dateText");
dateDisplay.textContent = today;
var now = document.getElementById("timeNow");
now.textContent = timeNow;

//populate the "table" of time/desc/save for each hour in the work day
var hourContainer = document.getElementById("container");

for (var i = 1; i < 10; i++) {
    //create new div for time, event and save
    var tm = document.createElement('div');
    var desc = document.createElement('input');
    var btn = document.createElement('div');
    //give each div a unique ID
    tm.setAttribute("id", "h" + i + "tm");
    desc.setAttribute("id", "h" + i + "desc");
    btn.setAttribute("id", "h" + i + "btn");
    //give each div appropriate classes & other info
    tm.setAttribute("class", "row timeblock hour");
    desc.setAttribute("class", "row future textarea form-control");
    desc.setAttribute("type", "text");
    desc.setAttribute("name", "h" + i + "desc");
    desc.setAttribute("placeholder", "Enter description and click save");
    desc.setAttribute("maxlegth", "50");
    desc.setAttribute("size", "50");
    btn.setAttribute("class", "row saveBtn far fa-save fa-2x");
    btn.setAttribute("data-hour", "h" + i);
    //Set default content
    tm.textContent = moment(i + 7, "H").format("ha");
    //append to container element
    hourContainer.appendChild(tm);
    hourContainer.appendChild(desc);
    hourContainer.appendChild(btn);
}

var PPF = '';
var rowH = '';
for(i = 1 ; i < 10 ;i++) {
    var rowTime = document.getElementById("h"+i+"tm").textContent;
    if (moment(rowTime,"ha").format("H")*1 < hourNowH*1) {
        PPF = "past";
        $( "#h"+i+"desc" ).removeClass( "future" ).addClass( "past" );
    } else if (moment(rowTime,"ha").format("H")*1 === hourNowH*1) {
        PPF = "present"
        $( "#h"+i+"desc" ).removeClass( "future" ).addClass( "present" );
    } else {
        PPF = "future"
    }
    rowH = moment(rowTime,"ha").format("H");
    console.log(rowTime + " " + PPF + "H: " + hourNowH + "rowH: " + rowH);
}


switch (PPF) {
  case 'past':
    console.log('past');
    break;
  case 'present':
    console.log('present');
    break;
  default:
    console.log(`future`);
}


$(document).ready(function () {
    $(".saveBtn").click(function (e) {
        e.preventDefault();
        // console.log(e);
        //set variable to store for time and event description
        var btnClicked = e.target.dataset.hour;
        var descID = btnClicked + "desc";
        var timeID = btnClicked + "tm";
        var dayID = moment().format('MMDDYY');
        // console.log("dayID: " + dayID);
        // console.log(timeID);
        var descToSave = document.getElementById(descID).value;
        console.log(descToSave);
        var timeToSave = document.getElementById(timeID).textContent;
        // console.log(timeToSave);
        //local storage stuff
        var currentEventsRaw = localStorage.getItem("events");
        var currentEvents = [];
        if (!!currentEventsRaw) {
            currentEvents = JSON.parse(currentEventsRaw);
        }
        currentEvents.push({ day: dayID, descID: descID, event: descToSave });
        localStorage.setItem("events", JSON.stringify(currentEvents));
    });
});


var btnClearScores = document.getElementById("btnClear");

function showEvents() {
    var i = -1;
    var j = -1;
    var allEventsRaw = localStorage.getItem("events"); // I am a string
    console.log("allEventsRaw: " + allEventsRaw);
    var currentEvents = []; // I am an empty array
    if (!!allEventsRaw) {
        currentEvents = JSON.parse(allEventsRaw);
        console.log("currentEvents all: " + currentEvents); // I should be an array of events
        currentEvents.forEach(function(item){
            currentEvents.push(item);
            i++;
            console.log("currentEvents["+i+"]: " , currentEvents[i]); 
            // var eventDisplay = document.getElementById(currentEvents[i].descID);
            // eventDisplay.textContent = currentEvents[i].event;
            document.getElementById(currentEvents[i].descID).value = currentEvents[i].event;
            });
        };
    }

showEvents();

btnClearScores.addEventListener("click", function () {
    var r = confirm("Are you sure you want to clear all the scores?");
    if (r == true) {
        localStorage.clear();
        location.reload();
    } else {
        return;
    }

})