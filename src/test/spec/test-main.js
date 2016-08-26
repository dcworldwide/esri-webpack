var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/tests.webpack\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

window.dojoConfig = {
    packages: [
        { name: "local", location: "/base"},
        { name: "esri", location: "http://js.arcgis.com/3.17/esri"},
        { name: "dojo", location: "http://js.arcgis.com/3.17/dojo" },
        { name: "dojox", location: "http://js.arcgis.com/3.17/dojox" }
    ],
    async: true
};


/**
 * This function must be defined and is called back by the dojo adapter
 * @returns {string} a list of dojo spec/test modules to register with your testing framework
 */
window.__karma__.dojoStart = function(){
    return tests;
};
