getPoems()

function addBubble (html, side) {
  const p = document.createElement('p')
  p.classList.add(side)
  p.innerHTML = html
  document.querySelector('.chatList').appendChild(p)
  setTimeout(() => {
    p.style.opacity = 1
  }, 100)
}

function getPoems () {
  const req = { method: 'GET' }
  fetch('poems.json', req)
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(err => console.log('error: ' + err))
}

function displayData (data) {
  
  
  var i = 0
  function myLoop(){
    let rand = Math.floor(Math.random() * data.length)
    let text = `<b>${data[rand].poem}</b> 
      <br><br> ...signed <b>${data[rand].author}</b> 
      <br><br> ✩ (${data[rand].lat}, ${data[rand].long})
      <br> ✩ date... ${(data[rand].date)}
      <br> ✩ route... ${data[rand].route}`
    setTimeout(function() {
      addBubble(text, "bubble")
      i++
      if (i < 3){
        myLoop()
      }
    }, 3000)
  }

  myLoop()

}


