function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = '#BFFBF7';
}

function onDragEnd(event) {

    event
        .currentTarget
        .style
        .backgroundColor = '#fff';
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

    var pos = document.getElementById(id).style.order;
    console.log(event.target)
    document.getElementById(id).style.order = event.target.style.order;
    event.target.style.order = pos;

    event
        .dataTransfer
        .clearData();
}


//#region register rooms and devices
const closeRoomsBtn = document.getElementById("close-rooms-form");
const closeDevicesBtn = document.getElementById("close-devices-form");
const addRoomBtn = document.getElementById("add-room-btn");
const addDeviceBtn = document.getElementById("add-device-btn");
const roomForm = document.getElementById("add-room-form");
const deviceForm = document.getElementById("add-device-form");

function addRoomsOptions(responseData) {
    responseData.forEach(item => {
        var roomElem = document.getElementById('room-select');
        var opt = document.createElement('option');
        var node = document.createTextNode(item.roomName);
        var att = document.createAttribute("value"); 
        att.value = item.id;

        opt.appendChild(node);
        opt.setAttributeNode(att);
        roomElem.appendChild(opt);
    });
}

function openRoomsForm() {
    console.log("add room");
    let roomsForm = document.getElementById("add-room-form");

    roomsForm.style.display = "block";
}

function openDevicesForm() {
    console.log("add device");
    let deviceForm = document.getElementById("add-device-form");

    deviceForm.style.display = "block";
}

function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}

closeRoomsBtn.addEventListener('click', function (event) {
    event.preventDefault();
    closeForm("add-room-form");
});

closeDevicesBtn.addEventListener('click', function (event) {
    event.preventDefault();
    closeForm("add-device-form");
});

addRoomBtn.addEventListener('click', function (event) {
    event.preventDefault();
    openRoomsForm();
});

addDeviceBtn.addEventListener('click', function (event) {
    event.preventDefault();
    openDevicesForm();
});

roomForm.addEventListener('submit', function (event) {
    event.preventDefault();
    registerRoom();
});

deviceForm.addEventListener('submit', function (event) {
    event.preventDefault();
    registerDevice();
});

function registerRoom() {
    let roomName = document.getElementById("room-name").value;

    //   retrieve the Id from session data
    //   let userId = document.getElementById("room-name");
    let userId = 0; //this is a dummy id

    let roomsForm = document.getElementById("add-room-form");

    roomsForm.style.display = "none"
    console.log(roomName);
}

function registerDevice() {
    let deviceName = document.getElementById("device-name");
    let room = document.getElementById("room-select").value;
    //   retrieve the Id from session data
    //   let userId = document.getElementById("room-name");
    let userId = 0; //this is a dummy id

    let deviceForm = document.getElementById("add-device-form");

    deviceForm.style.display = "none";
    console.log(deviceName);
    console.log(room);
}

//#endregion