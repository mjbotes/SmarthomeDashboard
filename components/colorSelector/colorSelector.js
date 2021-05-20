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
      });
  }
}

customElements.define("color-selector", colorSelector);
