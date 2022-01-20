// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/positionhub").build();

dragElement(document.getElementById("MainDiv"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    document.getElementById("DivCursor").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get mouse position
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        // call function to give new position to div
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate new mouse position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set move
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        // send message to others
        connection.invoke("SendPosition",
            (elmnt.offsetLeft - pos1), (elmnt.offsetTop - pos2)).catch(function (err) {
                return console.error(err.toString());
            });
    }

    function closeDragElement() {
        // stop move
        document.onmouseup = null;
        document.onmousemove = null;

    }
}

connection.on("GetPosition", function (left, top) {
    console.log(left + " " + top);

    document.getElementById("MainDiv").style.top = top + "px";
    document.getElementById("MainDiv").style.left = left + "px";
})

connection.start().then(function () {
    console.log("ready");
})