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

function makeHidden(element, contentid, inputid) {
    var children = element.parentElement.childNodes;
    var content = findChild(children, contentid);
    var input = findChild(children, inputid);

    content.hidden = !content.hidden;
    input.hidden = !input.hidden;
}

function findChild(children, childid) {

    for(const child of children)
    {
        if(child.id == childid)
            return child;
        else 
        {
            const result = findChild(child.childNodes, childid);
            if(result)
                return result;
        }
    }
    return;


}

function addComponent(e) {
    e = e.parentElement;

    makeHidden(e, 'acContent', 'acInput');
    var children = e.childNodes;
    var type;
    var device;
    var func;
    for(const child of children)
    {
        if(child.id == 'acType')
            type = child.value;
        else if(child.id == 'acDevice')
            device = child.value;
        else if(child.id == 'acFunction')
            func = child.value;
        
    }
    var thisElement = e;
    while (e.className != 'room-component') {
        console.log(e.className);
        thisElement = e;
        e = e.parentElement;
    }

    var nelement = document.createElement(type);
    nelement.setAttribute('heading', device);

    e.insertBefore(nelement, thisElement);

}

function addRoom(roomName) {
    var nelement = document.createElement('section');
    nelement.setAttribute('class', "room-component");
    nelement.innerHTML = `
    <section id="roomName">\
    <h3>${roomName}</h3>
            
        </section>
            
    <div class=\"tooltip\">\
    <button class=\"hide-image-btn\" type=\"button\" onclick=\"makeHidden(this.parentElement.parentElement,'roomInput', 'roomName')\"></button>\
    <span class=\"tooltiptext\">Hide</span>\
  </div>\
 <div class=\"tooltip\">\
    <button class=\"delete-image-btn\" type=\"button\" onclick=\"deleteElement(this.parentElement.parentElement)\"></button>\
    <span class=\"tooltiptext\">Delete</span>\
  </div>
        </div>
            <div class="headerbuttons" id="roomInput" hidden="true"><input type="text" value="New room"><button type="button" onclick="editRoomName(this, 'roomInput', 'roomName' )">Ok</button></div> 
                            <add-component 
                            heading="Add device">
                        </add-component>
                        </section>`
    document.getElementById('allrooms').appendChild(nelement);
}

function editRoomName(e, contentid, inputid) {
    makeHidden(e.parentElement, contentid, inputid);
    e.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML = e.parentElement.childNodes[0].value;
}

function deleteElement(element) {
    element.remove();
}


//#region register rooms and devices
var selectedRoom = '';
// pull from session data
var userId = 1;
var url = "https://smarthome-dashboard-api.azurewebsites.net";
var devicesList;


const getRooms = async () => {
    await axios.get(url + "/rooms/userId/?userId=" + userId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
        .then(response => {
            if (response.status == 200) {
                console.log(response)
                addRoomsOptions(response.data);
            }
        })
        .catch(error => console.error(error));
};

function getDevices(roomId) {
    axios.get(url + "/devices/roomId/?roomId=" + roomId, { headers: { "Access-Control-Allow-Origin": "*" } })
        .then(response => {
            if (response.status == 200) {
                devicesList = response.data;
            }
        })
        .catch(error => console.error(error)).
        finally(() => { return response.data });
}

// var testRoom = [{"RoomID":5,"RoomName":"bedroom","UserID":1}, {"RoomID":5,"RoomName":"bathroom","UserID":1}];
// var testDevice = [{"DeviceID":2,"Name":"test      ","Url":"test.com  ","RoomID":1},{"DeviceID":3,"Name":"test      ","Url":"test.com  ","RoomID":1},{"DeviceID":4,"Name":"test      ","Url":"test.com  ","RoomID":1},{"DeviceID":5,"Name":"test      ","Url":"test.com  ","RoomID":1},{"DeviceID":6,"Name":"test      ","Url":"test.com  ","RoomID":1},{"DeviceID":8,"Name":"test      ","Url":"test.com  ","RoomID":1},{"DeviceID":7,"Name":"test      ","Url":"test.com  ","RoomID":1}];

function setRoom() {
    selectedRoom = document.getElementById("room-select").value;
}

// addRoomsOptions(testRoom);

function addRoomsOptions(responseData) {

    if (responseData == null)
        return;
    var roomElem = document.getElementById('allrooms');
    let index = 0;

    responseData.forEach(item => {
        var section = document.createElement('section');
        var sectionClassAtt = document.createAttribute('class');
        sectionClassAtt.value = "room-component";
        section.setAttributeNode(sectionClassAtt);

        roomElem.appendChild(section);
        // var devices = getDevices(item.RoomID);
        var devices = devicesList;

        devices.forEach(device => {
            var parent = document.getElementsByClassName("room-component")[index];
            var deviceHtml = "\
            <section id=\"roomName\">\
             <h3 >"+item.RoomName+"</h3>\
             <section class=\"tooltip\">\
                <button class=\"hide-image-btn\" type=\"button\" onclick=\"makeHidden(this.parentElement.parentElement,'roomInput', 'roomName')\"></button>\
                <span class=\"tooltiptext\">Hide</span>\
              </section>\
             <section class=\"tooltip\">\
                <button class=\"delete-image-btn\" type=\"button\" onclick=\"deleteElement(this.parentElement.parentElement)\"></button>\
                <span class=\"tooltiptext\">Delete</span>\
              </section>\
            </section>\
             <section class=\"headerbuttons\" id=\"roomInput\" hidden=\"true\"><input type=\"text\" value="+ item.RoomName +"><input type=\"button\" onclick=\"editRoomName(this, 'roomInput', 'roomName' )\"></section>\
              <color-selector\
              id=\"firstComp\"\
                   draggable=\"true\"\
                   heading="+ device.Name + "\
                   subheading=\"Some functionality\"></color-selector>\
                   <onoff-switch\
              id=\"firstComp\"\
                   draggable=\"true\"\
                   heading="+ device.Name + "\
                   subheading=\"Some functionality\"></onoff-switch>\
                <add-component\
                  heading=\"Add device\">\
                </add-component>\
          ";
            parent.innerHTML = deviceHtml;
        });
        index++;
    });
}

getRooms();

//#endregion