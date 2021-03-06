//get today's date and display it
var today = moment().format('dddd MMMM Do YYYY');
var dateDisplay = document.getElementById("dateText");
dateDisplay.textContent = today;

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
    // console.log(tm);
}

$(document).ready(function () {
    $(".saveBtn").click(function (e) {
        e.preventDefault();
        //set variable to store for time and event description
        var btnClicked = e.target.dataset.hour;
        var descID = btnClicked + "desc";
        var timeID = btnClicked + "tm";
        var dayID = moment().format('MMDDYY');
        console.log("dayID: " + dayID);
        console.log(timeID);
        var descToSave = document.getElementById(descID).value;
        console.log(descToSave);
        var timeToSave = document.getElementById(timeID).textContent;
        console.log(timeToSave);
        //local storage stuff
        var currentEventsRaw = localStorage.getItem("events");
        var currentEvents = [];
        if (!!currentEventsRaw) {
            currentEvents = JSON.parse(currentEventsRaw);
        }
        currentEvents.push({ day: dayID, time: timeToSave, event: descToSave });
        localStorage.setItem("events", JSON.stringify(currentEvents));
    });
});


var btnClearScores = document.getElementById("btnClear");

function showEvents() {
    var i = -1;
    var allEventsRaw = localStorage.getItem("events"); // I think I am a string
    console.log("allEventsRaw: " + allEventsRaw);
    var currentEvents = []; // I aman empty array
    if (!!allEventsRaw) {
        currentEvents = JSON.parse(allEventsRaw);
        console.log("currentEvents all: " + currentEvents); // I should be an array of events
        currentEvents.forEach(function(item){
            currentEvents.push(item);
            i++;
            console.log("currectEvents["+i+"]: " + currentEvents[i]); 
            var eventDisplay = document.getElementById(currentEvents.time);
            });
        currentEvents.forEach(element => {
            console.log(currentEvents[i].time)
            // eventDisplay.textContent = currentEvents.event;
        });
        
        // for (let k = 0; k < currentEvents.length; k++) {
        //     var eventDisplay = document.getElementById("h" + k + "desc");
        //     //   let newListItem = document.createElement("li");
        //     eventDisplay.textContent = currentEvents[k].event;
        //     //   scoreDisplay.appendChild(newListItem);
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