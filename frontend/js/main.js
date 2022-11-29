const prompts = {
  intro: 'wait ⤏ create. move ⤏ consume.',
  routeQ: `what route are you taking?
  `
}

function addBubble (html, side) {
  const p = document.createElement('p')
  p.classList.add(side)
  p.innerHTML = html
  document.querySelector('.chatList').appendChild(p)
  setTimeout(() => {
    p.style.opacity = 1
  }, 100)
}

window.addEventListener('load', () => {
  setTimeout(() => addBubble(prompts.intro, 'bubble'), 500)
  setTimeout(() => addBubble(prompts.routeQ, 'bubble'), 1500)
})
