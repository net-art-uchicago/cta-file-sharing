getPoems()

function getPoems () {
    const req = { method: 'GET'}
    fetch('poems.json', req)
        .then(res => res.json())
        .then(data => appendData(data))
        .catch(err => console.log('error: ' + err))
}  

function appendData (data) {
    const mainCont = document.querySelector("#poem")

    for (let i = 0; i < data.length; i++){
        let div = document.createElement("div");
        div.innerHTML = `${data[i].text} ...signed ${data[i].author}
                        // ${data[i].location} // ${data[i].datetime}
                        // ROUTE ${data[i].route}`;
        mainCont.appendChild(div)
    }
}