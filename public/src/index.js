var fetch = require('isomorphic-fetch ');

fetch('./text', {
    method: "GET",
    mode: "cors"
})
    .then(response => response.json())
    .then(json => {
        document.innerHtml('json')
    });