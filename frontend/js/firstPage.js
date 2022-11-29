const options = {
    enableHighAccuracy : true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);   
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

currentLocation = navigator.geolocation.getCurrentPosition(success, error, options)

const test_location = [41.234324,23.23423423]

async function nearStop () {
  const res = await fetch('api/cta-near-stop?loc=121.121029,23.1029381208')
  const data = await res.json()
  
}
//nearby stops should give empty list if not near
//what does structure of stop look like?

const stop = "55th and Ellis"

async function Routes() {
  const res = await fetch('api/cta-routes')
  const data = await res.json()
  data.forEach()
}
//display routes in drop down, what does this get return?

const route = 55 

async function getClosestDistance() {
  const res = await fetch('api/cta-bus-distance?stop=&route=')
  const data = await res.json()
  data.forEach(poem => {poem.author})  
  Date.now()
}
//given certain bus's distance, do I have to calculate average time?

poem = [
{
datetime: 1668544391012, // number, unicode timestamp
location: [41.78868316205326, -87.59874232864101], // Array of GPS coordinates
text: "an example poem", // string
author: "Bobby Bob", // string,
route: 172 // number, a bus route
}
]
//prompt for author name?
//box to type in 
async function postPoem (poem) {
    const res = await fetch('api/add-poem'); 
    {method:'POST', 
    headers: {
      'Accept':'applications/json, text/plain, */*', 
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(poem)}
    const data = await res.json()

    console.log(data)
  }  