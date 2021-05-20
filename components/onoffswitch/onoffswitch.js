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
        
        //function to make call using dropdown list values
        doc.getElementById('img').onclick = function() { 
          if (this.value == 'on')
          {
            this.value = 'off';
            this.src = "./assets/images/r.png";
          }
          else {
            this.value = 'on';
            this.src = "./assets/images/b.png";
          }
          
          //make call
          //findChild(that.childNodes,'oosSelectDevice').value; 
        };
        doc.getElementById('oosSelectDevice').onchange = function() { 
          const ddl = findChild(that.childNodes,'oosSelectDevice');
          findChild(that.childNodes,'heading').innerHTML = ddl.options[ddl.selectedIndex].text; 
        };
        that.appendChild(doc.documentElement.getElementsByTagName('body')[0]);
      });
  }
}

customElements.define("onoff-switch", onoffswitch);
