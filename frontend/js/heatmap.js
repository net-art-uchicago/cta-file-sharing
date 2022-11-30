mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3c2NvaGVuIiwiYSI6ImNsYWlydHpkZjA1NjUzbnA4MWFyOHZqd24ifQ.2taNnYIsG1csIs8QmJ45SQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-87.65005, 41.85003],
  zoom: 10
})

map.on('load', () => {
  map.addSource('cta', {
    type: 'geojson',
    data: './data/cta.geojson'
    // data: './data/testData.geojson'
  })

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
          'rgba(236,222,239,0)',
          0.2,
          'rgb(208,209,230)',
          0.4,
          'rgb(166,189,219)',
          0.6,
          'rgb(103,169,207)',
          0.8,
          'rgb(28,144,153)'
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
})

// click on tree to view route in a popup
map.on('click', 'cta-point', (event) => {
  new mapboxgl.Popup()
    .setLngLat(event.features[0].geometry.coordinates)
    .setHTML(`<strong>Sentiment:</strong> ${event.features[0].properties.sentiment}`)
    .addTo(map)
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
