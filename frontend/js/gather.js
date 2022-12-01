const author = document.querySelector('#name')
const poem = document.querySelector('#poem')
const time = document.querySelector('#time')

const url = 'database.json'
const req = { method: 'GET' }
fetch(url, req)
  // turn json information into js object
  .then(res => res.text())
  // get data from poem database and print java script object "time"
  .then(data => {
    const obj = JSON.parse(data)
    // call to backend database.json file to access poems
    // now just displaying poems

    author.textContent = obj.author
    poem.textContent = obj.poem
    time.textContent = obj.date // change to time
    console.log(data)
  })

/* Array.from(document.getElementsByClassName('page')).forEach(e => function (i, e) {
  e.click(function (event) {
    // const x = event.pageX
    // const y = event.pageY
    document.getElementById('cursor-position-x').textContent = event.clientX;
    document.getElementById('cursor-position-y').textContent = event.clientY;

    let nextItem = i + 1
    if (nextItem >= ('.page').length) {
      nextItem = 0
    }

    ('.page:eq(' + nextItem + ')').css('z-index', parseInt(e.css('z-index')) + 1);
    ('.page:eq(' + nextItem + ')').css('clip-path', 'circle(0% at ' + x + 'px ' + y + 'px)')

    anime({
      targets: ('.page')[nextItem],
      update: function (anim) {
        ('.page:eq(' + nextItem + ')').css('clip-path', 'circle(' + (anim.progress * 2) + '% at ' + x + 'px ' + y + 'px)')
      }
    })
  })
})
*/
