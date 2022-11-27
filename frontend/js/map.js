defLong=-87.597481
defLat=41.784628

function add_markers(map) {
    const user = "someone"
    const timestamp = "12:45"
    const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    // Create a new marker.
    //first create a div to contain the text
    for (i=1;i<=20;i++){
    const marker = new mapboxgl.Marker({color: "rgb(167, 60, 113)"})
    .setLngLat([defLong+Math.random()/50-0.01, defLat+Math.random()/50-0.01])
    .setPopup(new mapboxgl.Popup().setHTML(`<div class="usr">${user}</div><div class="time">${timestamp}</div><div class="msg">${message}</div>`))
    .addTo(map)
    }
}

function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoieXJ1YW4iLCJhIjoiY2xhOHF6cmFsMDU4MTNwcGcycjJ5ZjcxOSJ9.uxn15xdxIi9r4wvvZGQarA'
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/yruan/cla8r0dyb004t14n28stg1rn8', // style URL 
    center: [defLong, defLat], // starting position [lng, lat]
    zoom: 15, // starting zoom
    projection: 'globe' // display the map as a 3D globe
    })
    //create geolocate control
    const geoLocate = new mapboxgl.GeolocateControl({ 
        positionOptions: {
        enableHighAccuracy: true
        },	
        trackUserLocation: false
    })
    // Add the geolocate control to the map.
    map.addControl(geoLocate)
    //define the thing to do when the map is loading
    map.on('style.load', () => {
    map.setFog({}) // Set the default atmosphere style
    geoLocate.trigger() //trigger the event to find user location.
    //add markers to the map
    add_markers(map)
    })	
}

createMap()