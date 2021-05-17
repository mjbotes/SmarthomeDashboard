//gcb
class genericComponentB extends HTMLElement {
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

  render() {
    const that = this;
    fetch('./components/generic-componentB/generic-componentB.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(res, 'text/html');
        doc.getElementById('heading').innerHTML = that.heading;
        doc.getElementById('subheading').innerHTML = that.subheading;
        doc.getElementById('img').onclick = function() { this.src = "./assets/images/r.png"; };
        that.appendChild(doc.documentElement);
      });
  }
}

customElements.define("generic-componentb", genericComponentB);

