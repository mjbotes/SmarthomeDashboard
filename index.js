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
var selectedRoom = '';
// pull from session data
var userId = 1;
var url = "https://smarthome-dashboard-api.azurewebsites.net";


const getRooms = async() => {
    await axios.get(url+"/rooms/userId/?userId="+userId, {headers: {"Access-Control-Allow-Origin": "*",
    "Accept":"*/*"
}})
    .then(response => {
        if (response.status == 200){
            console.log(response)
            addRoomsOptions(response.data);
        }
   })
    .catch(error => console.error(error));
   };

function getDevices(roomId) {
    axios.get(url+"/devices/roomId/?roomId="+roomId, {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(response => {
        if (response.status == 200){
            console.log(response)
            addRoomsOptions(response.data);
        }
   })
    .catch(error => console.error(error)).
    finally(()=>{return response.data});
}


function setRoom() {
    selectedRoom = document.getElementById("room-select").value;
}

function addRoomsOptions(responseData) {
    if (responseData == null)
        return;
    var roomElem = document.getElementById('allrooms');
    let index = 0;

    return;
    responseData.forEach(item => {
        var html = "<section class=\"room-component\"></section>";
        roomElem.appendChild(html);
        var devices = getDevices(item.RoomID);
        
        devices.forEach(device => {
            var parent = document.getElementsByClassName("room-component")[index];
            var deviceHtml = "\
            <div id=\"roomName\">\
             <h3 >"+item.RoomName+"</h3>\
             <div class=\"tooltip\">\
                <input type=\"button\" onclick=\"makeHidden(this.parentElement,'roomInput', 'roomName')\">\
                <span class=\"tooltiptext\">Hide</span>\
              </div>\
             <div class=\"tooltip\">\
                <input type=\"button\" onclick=\"deleteElement(this.parentElement.parentElement)\">\
                <span class=\"tooltiptext\">Delete</span>\
              </div>\
            </div>\
             <div class=\"headerbuttons\" id=\"roomInput\" hidden=\"true\"><input type=\"text\" value="+ item.RoomName +"><input type=\"button\" onclick=\"editRoomName(this, 'roomInput', 'roomName' )\"></div>\
              <color-selector\
              id=\"firstComp\"\
                   draggable=\"true\"\
                   heading="+ device.Name +"\
                   subheading=\"Some functionality\"></color-selector>\
                   <onoff-switch\
              id=\"firstComp\"\
                   draggable=\"true\"\
                   heading="+ device.Name +"\
                   subheading=\"Some functionality\"></onoff-switch>\
                <add-component\
                  heading=\"Add device\">\
                </add-component>\
          ";
          parent.innerHTML = deviceHtml;
        });

        index++;
        // var section = document.createElement('section');
        // var sectionClassAtt = document.createAttribute('class');
        // var sectionIdAtt = document.createAttribute('id');
        // sectionClassAtt.value = "room-component";
        // sectionIdAtt.value = "room-component";
        // section.setAttribute(sectionClassAtt);
        // section.setAttribute(sectionIdAtt);
        // roomElem.appendChild(section);

        // var sectionElem = document.getElementById('room-component');
        // var div = document.createElement('div');
        // var divIdAtt = document.createAttribute('id');
        // divIdAtt.value = "rootName";
        // div.setAttribute(divIdAtt);
        // sectionElem.appendChild(div);

        // var divElem = document.getElementById('rootName');
        // var h3 = document.createElement('h3');
        // var h3Text = document.createTextNode(item.roomName);
        // h3.appendChild(h3Text);
        // divElem.appendChild(h3);
    });
}

function openRoomsForm() {
    console.log("add room");
    let roomsForm = document.getElementById("add-room-form");
    let form = document.getElementById("hidden-forms");

    roomsForm.style.display = "block";
    form.style.display = "block";
}

function openDevicesForm() {
    console.log("add device");
    let form = document.getElementById("hidden-forms");
    let deviceForm = document.getElementById("add-device-form");

    deviceForm.style.display = "block";
    form.style.display = "block";
}

function closeForm(formId) {
    let form = document.getElementById("hidden-forms");

    document.getElementById(formId).style.display = "none";
    form.style.display = "none";
}

// closeRoomsBtn.addEventListener('click', function (event) {
//     event.preventDefault();
//     closeForm("add-room-form");
// });

// closeDevicesBtn.addEventListener('click', function (event) {
//     event.preventDefault();
//     closeForm("add-device-form");
// });

// addRoomBtn.addEventListener('click', function (event) {
//     event.preventDefault();
//     openRoomsForm();
// });

// addDeviceBtn.addEventListener('click', function (event) {
//     event.preventDefault();
//     openDevicesForm();
// });

// roomForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     registerRoom();
// });

// deviceForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     registerDevice();
// });

// function registerRoom() {
//     let roomName = document.getElementById("room-name").value;

//     //   retrieve the Id from session data
//     //   let userId = document.getElementById("room-name");
//     let userId = 0; //this is a dummy id

//     axios.post(url, {
//         roomName: roomName
//       })
//       .then(function (response) {
//         console.log(response);
//       });

//     closeForm("add-room-form")



//     console.log(roomName);
// }

// function registerDevice() {
//     let deviceName = document.getElementById("device-name").value;
    
//     //   retrieve the Id from session data
//     //   let userId = document.getElementById("room-name");
//     let userId = 0; //this is a dummy id

//     axios.post(url, {
//         deviceName: deviceName
//       })
//       .then(function (response) {
//         console.log(response);
//       });
//     closeForm("add-device-form")
//     console.log(deviceName);
//     console.log(selectedRoom);
// }

getRooms();

//#endregion