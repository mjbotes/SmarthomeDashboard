loadScript("./components/generic-componentA/generic-componentA.js");
loadScript("./components/colorSelector/colorSelector.js");
loadScript("./components/generic-componentB/generic-componentB.js");
loadScript("./components/onoffswitch/onoffswitch.js");
loadScript("./components/addcomponent/addcomponent.js");

function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}