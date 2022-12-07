mapboxgl.accessToken = 'pk.eyJ1IjoiYWpjaHUyOCIsImEiOiJja3o2M3MzMWswd200MnZwNGdieTNlaHRjIn0.BePZiTybP8rLoo6yQKon_w'
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ajchu28/cla8p13jr002s14qvhnow3727',
  center: [-87.623177, 41.881832],
  zoom: 11.5
})

map.on('load', () => {
  map.addSource('cta', {
    type: 'geojson',
    data: './data/cta.geojson'
    // data: './data/testData.geojson'
  })
  map.addSource('places', {

    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          username: 'Username',
          timestamp: '00:00:00',
          message: 'Hi',
          icon: 'park'
        },
        geometry: {
          type: 'Point',
          coordinates: [-87.623177, 41.881832]
        }
      },
      {
        type: 'Feature',
        properties: {
          username: 'Username2',
          timestamp: '02:00:00',
          message: 'Hello!',
          icon: 'park'
        },
        geometry: {
          type: 'Point',
          coordinates: [-87.625501, 41.871294]
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
      'icon-size': 1.5,
      'icon-allow-overlap': true
    }
  })

  // Add a layer displaying sentiment as a heatmap
  map.addLayer(
    {
      id: 'Sentiment',
      type: 'heatmap',
      source: 'cta',
      maxzoom: 15,
      layout: {
        // Make the layer visible by default.
        visibility: 'none'
      },
      paint: {
        // increase weight as diameter breast height increases
        'heatmap-weight': {
          property: 'sentiment',
          type: 'exponential',
          stops: [
            [1, 0],
            [62, 1]
          ]
        },
        // increase intensity as zoom level increases
        'heatmap-intensity': {
          stops: [
            [11, 1],
            [15, 3]
          ]
        },
        // use sequential color palette to use exponentially as the weight increases
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)'
        ],
        // increase radius as zoom increases
        'heatmap-radius': {
          stops: [
            [11, 15],
            [15, 20]
          ]
        },
        // decrease opacity to transition into the circle layer
        'heatmap-opacity': {
          default: 1,
          stops: [
            [14, 1],
            [15, 0]
          ]
        }
      }
    },
    'waterway-label'
  )

  map.addLayer(
    {
      id: 'cta-point',
      type: 'circle',
      source: 'cta',
      minzoom: 14,
      paint: {
        // increase the radius of the circle as the zoom level and route value increases
        'circle-radius': {
          property: 'sentiment',
          type: 'exponential',
          stops: [
            [{ zoom: 15, value: 1 }, 5],
            [{ zoom: 15, value: 62 }, 10],
            [{ zoom: 22, value: 1 }, 20],
            [{ zoom: 22, value: 62 }, 50]
          ]
        },
        'circle-color': {
          property: 'sentiment',
          type: 'exponential',
          stops: [
            [0, 'rgba(236,222,239,0)'],
            [10, 'rgb(236,222,239)'],
            [20, 'rgb(208,209,230)'],
            [30, 'rgb(166,189,219)'],
            [40, 'rgb(103,169,207)'],
            [50, 'rgb(28,144,153)'],
            [60, 'rgb(1,108,89)']
          ]
        },
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': {
          stops: [
            [14, 0],
            [15, 1]
          ]
        }
      }
    },
    'waterway-label'
  )

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', 'places', (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice()
    const username = e.features[0].properties.username
    const timestamp = e.features[0].properties.timestamp
    const message = e.features[0].properties.message

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML('<div class="usr">' + username + '</div><div class="time">' + timestamp + '</div><div class="msg">' + message + '</div>')
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

// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
  // If these two layers were not added to the map, abort
  if (!map.getLayer('Sentiment') || !map.getLayer('cta-point')) {
    return
  }

  // Enumerate ids of the layers.
  const toggleableLayerIds = ['Sentiment']

  // Set up the corresponding toggle button for each layer.
  for (const id of toggleableLayerIds) {
  // Skip layers that already have a button set up.
    if (document.getElementById(id)) {
      continue
    }

    // Create a link.
    const link = document.createElement('a')
    link.id = id
    link.href = '#'
    link.textContent = id
    link.className = ''

    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
      const clickedLayer = this.textContent
      e.preventDefault()
      e.stopPropagation()

      const visibility = map.getLayoutProperty(
        clickedLayer,
        'visibility'
      )

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none')
        this.className = ''
      } else {
        this.className = 'active'
        map.setLayoutProperty(
          clickedLayer,
          'visibility',
          'visible'
        )
      }
    }

    const layers = document.getElementById('menu')
    layers.appendChild(link)
  }
})

map.addControl(new mapboxgl.NavigationControl(), 'top-left')
