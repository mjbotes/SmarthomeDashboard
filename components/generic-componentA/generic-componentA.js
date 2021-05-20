//gca
class genericComponentA extends HTMLElement {
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

  /*gcaHandleImageClicks(e) {
    e.src = "./assets/images/b.png";
  }*/

  render() {
    const that = this;
    fetch('./components/generic-componentA/generic-componentA.html')
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
          this.src = "./assets/images/" + document.getElementById('gcaSelectDevice').value; 
        };
        that.appendChild(doc.documentElement);
      });
  }
}

customElements.define("generic-componenta", genericComponentA);
