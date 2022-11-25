mapboxgl.accessToken = 'pk.eyJ1IjoiYWpjaHUyOCIsImEiOiJja3o2M3MzMWswd200MnZwNGdieTNlaHRjIn0.BePZiTybP8rLoo6yQKon_w'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ajchu28/cla8p13jr002s14qvhnow3727',
  center: [-87.623177, 41.881832],
  zoom: 11.5
})

map.on('load', () => {
  map.addSource('places', {

    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          description:
          '<strong>Poem</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Traveling Poem</a> This is something poetic. </p>',
          icon: 'theatre'
        },
        geometry: {
          type: 'Point',
          coordinates: [-87.623177, 41.881832]
        }
      }]
    }
  })

  // Add a layer showing the places.
  map.addLayer({
    id: 'places',
    type: 'symbol',
    source: 'places',
    layout: {
      'icon-image': '{icon}',
      'icon-size': 2.5,
      'icon-allow-overlap': true
    }
  })

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', 'places', (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice()
    const description = e.features[0].properties.description

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map)
  })

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer'
  })

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = ''
  })
})
