//gca
class addcomponent extends HTMLElement {
  constructor() {
    super();

    this.heading = "";
  }
  
  connectedCallback() {

    this.heading = this.getAttribute("heading");

    this.render();
  }

  /*gcaHandleImageClicks(element) {
    console.log(findChild(element.childNodes,'gcaSelectDevice').value)
    this.src = "./assets/images/" + findChild(element.childNodes,'gcaSelectDevice').value; 
  }*/

  render() {
    const that = this;
    fetch('./components/addcomponent/addcomponent.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(res, 'text/html');
        doc.getElementById('heading').innerHTML = that.heading;
        /*doc.getElementById('imgAdd').onclick = function() {

        }*/
        that.appendChild(doc.documentElement.getElementsByTagName('body')[0]);
        addDevicesOptions(testDevice);
      });

      
      
      function addDevicesOptions(responseData) {
        var url = "https://smarthome-dashboard-api.azurewebsites.net";
      var testDevice = [{ "DeviceID": 2, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 3, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 4, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 5, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 6, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 8, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 7, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }];
        responseData.forEach(item => {
          var deviceElem = document.getElementById('acType');
          console.log(deviceElem);
          var opt = document.createElement('option');
          var node = document.createTextNode(item.Name);
          var att = document.createAttribute("value");
          att.value = item.DeviceID;
  
          opt.appendChild(node);
          opt.setAttributeNode(att);
          deviceElem.appendChild(opt);
        });
  
      }
  }
}


customElements.define("add-component", addcomponent);
