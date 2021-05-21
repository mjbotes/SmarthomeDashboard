//gca
class colorSelector extends HTMLElement {
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
    fetch('./components/colorSelector/colorSelector.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(res, 'text/html');
        doc.getElementById('heading').innerHTML = that.heading;
        doc.getElementById('subheading').innerHTML = that.subheading;
        //function to make call using dropdown list values
        /*doc.getElementById('img').onclick = function() { 
          console.log(findChild(that.childNodes,'csSelectDevice').value)
          this.src = "./assets/images/" + findChild(that.childNodes,'csSelectDevice').value; 
        };*/
        doc.getElementById('csSelectDevice').onchange = function() { 
          const ddl = findChild(that.childNodes,'csSelectDevice');
          findChild(that.childNodes,'heading').innerHTML = ddl.options[ddl.selectedIndex].text; 
        };
        that.appendChild(doc.documentElement.getElementsByTagName('body')[0]);
        getCPDeviceFunctions();
        addCPDeviceOptions(testDevice);
      });
      
      var testDevice = [{ "DeviceID": 2, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 3, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 4, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 5, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 6, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 8, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }, { "DeviceID": 7, "Name": "test      ", "Url": "test.com  ", "RoomID": 1 }];
      const getCPDeviceFunctions = async() => {
      await axios.get(url+"functions/deviceId/?deviceId="+3, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then(response => {
            if (response.status == 200){
                console.log(response)
                addFunctionOptions(response.data);
            }
       })
        .catch(error => console.error(error))
      };

    function addFunctionOptions(responseData) {
      responseData.forEach(item => {
        var functionElem = document.getElementById('csSelectOnButton');
        console.log(deviceElem);
        var opt = document.createElement('option');
        var node = document.createTextNode(item.Name);
        var att = document.createAttribute("value");
        att.value = item.DeviceID;

        opt.appendChild(node);
        opt.setAttributeNode(att);
        functionElem.appendChild(opt);
      });

    }

    function addCPDeviceOptions(responseData) {
      responseData.forEach(item => {
        var deviceElem = document.getElementById('csSelectDevice');
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

customElements.define("color-selector", colorSelector);
