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

    for(var i = 0; i < children.length; i++)
    {
        if(children[i].id == childid)
            return children[i];
        else 
        {
            const result = findChild(children[i].childNodes, childid);
            if(result)
                return result;
        }
    }
    return ;
    
    
}

function addComponent(e) {
    e = e.parentElement;

    makeHidden(e, 'acContent', 'acInput');
    var children = e.childNodes;
    var type;
    var device;
    var func;
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].id == 'acType')
            type = children[i].value;
        else if(children[i].id == 'acDevice')
            device = children[i].value;
        else if(children[i].id == 'acFunction')
            func = children[i].value;
        
    }
    var thisElement = e;   
    while(e.className  != 'room-component'){
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
    nelement.innerHTML = `<h3>${roomName}</h3>
                            <add-component 
                            heading="Add device">
                        </add-component>`
    document.getElementById('allrooms').appendChild(nelement);
}

function editRoomName(e, contentid, inputid) {
    makeHidden(e.parentElement, contentid, inputid);
    e.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML = e.parentElement.childNodes[0].value;
}

function deleteRoom(element) {
    element.parentElement.parentElement.remove();
}