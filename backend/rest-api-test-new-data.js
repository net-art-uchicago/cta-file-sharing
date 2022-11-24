const ex = { poem: 'a', date: 1, author: 'a', lat: 1, long: 1, route: 1 }

function validate (obj) {
  let pass = true
  for (const key in ex) {
    if (!obj[key]) pass = false
    else if (typeof obj[key] !== typeof ex[key]) pass = false
  }
  return pass
}

function addPoem (poem) {
  const passedValidation = validate(poem)
  if (passedValidation) return { success: true }
  else {
    return {
      error: 'data failed validation',
      recieved: poem,
      expected: ex
    }
  }
}

module.exports = addPoem
