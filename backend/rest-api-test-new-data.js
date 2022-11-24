const testExample = {
  poem: 'a',
  date: 1,
  author: 'a',
  lat: 1,
  long: 1,
  route: 1
}

// [TEST] to check if it returns error correctly if the posted data doesnt match given data

// const testExampleWrong = {
//   datetime: 1668544391012, // number, unicode timestamp
//   location: [41.78868316205326, -87.59874232864101], // Array of GPS coordinates
//   text: 'an example poem', // string
//   author: 'Bobby Bob', // string,
//   route: 172 // number, a bus route
// }

function validate (obj) {
  let pass = true
  for (const key in testExample) {
    if (!obj[key]) pass = false
    else if (typeof obj[key] !== typeof testExample[key]) pass = false
  }
  return pass
}

function addPoem (poem) {
  const passedValidation = validate(poem)
  if (passedValidation) {
    return {
      status: 1,
      msg: 0
    }
  } else {
    const retMsg = {
      error: 'data failed validation',
      recieved: poem,
      expected: testExample
    }
    console.log(retMsg)
    return {
      status: 0,
      msg: retMsg
    }
  }
}

module.exports = addPoem
