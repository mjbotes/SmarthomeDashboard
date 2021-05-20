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
      });
  }
}

customElements.define("add-component", addcomponent);
