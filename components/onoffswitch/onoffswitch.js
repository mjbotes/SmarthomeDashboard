//gca
class onoffswitch extends HTMLElement {
  constructor() {
    super();

    this.heading = "";
    this.subheading = "";
  }

  connectedCallback() {

    this.heading = this.getAttribute("heading");
    this.subheading = this.getAttribute("subheading");

    this.render();
  }

  /*gcaHandleImageClicks(element) {
    console.log(findChild(element.childNodes,'gcaSelectDevice').value)
    this.src = "./assets/images/" + findChild(element.childNodes,'gcaSelectDevice').value; 
  }*/

  render() {
    const that = this;
    fetch('./components/onoffswitch/onoffswitch.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(res, 'text/html');
        doc.getElementById('heading').innerHTML = that.heading;
        doc.getElementById('subheading').innerHTML = that.subheading;

        let lightSwitch = doc.querySelector('#check');

        lightSwitch.addEventListener('change', function() {
          console.log(this.value);
          if (this.value == 'on') {
            this.value = 'off';
            this.src = "./assets/images/r.png";
          }
          else {
            this.value = 'on';
            this.src = "./assets/images/b.png";
          }
        });
        doc.getElementById('oosSelectDevice').onchange = function () {
          const ddl = findChild(that.childNodes, 'oosSelectDevice');
          findChild(that.childNodes, 'heading').innerHTML = ddl.options[ddl.selectedIndex].text;
        };
        that.appendChild(doc.documentElement.getElementsByTagName('body')[0]);
        addDevicesOptions(testDevice);

      });
    var url = "https://smarthome-dashboard-api.azurewebsites.net";
    var testDevice = [{ "DeviceID": 2, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 3, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 4, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 5, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 6, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 8, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 7, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }];
    // const getDevices = async() => {
    //   await axios.get(url+"/devices/roomId/?roomId="+1, {headers: {"Access-Control-Allow-Origin": "*"}})
    //     .then(response => {
    //         if (response.status == 200){
    //             console.log(response)
    //             addDevicesOptions(response.data);
    //         }
    //    })
    //     .catch(error => console.error(error))};



    function addDevicesOptions(responseData) {
      responseData.forEach(item => {
        var deviceElem = document.getElementById('oosSelectDevice');
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



customElements.define("onoff-switch", onoffswitch);
