
import './components/map.css'
import LineChart from './components/LineChart'
import Navbar from './components/Navbar';
import React , { useRef, useEffect } from 'react';
import ReactMapGL, {Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';



// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1Ijoib2xsYWRhcHUiLCJhIjoiY2t0Mmx2Z2trMGxrZzMwcjJlNTBsbXJ1biJ9.IKx4MbNoGLsI2itEuHVxxg';
class Map extends React.Component {

  constructor(props){
    super(props);
    this.state = {value: '12',setp: null};
  }
  handleChange=(event)=> {
    this.setState({value: event.target.value});
  }

  


  componentDidMount() {


var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/light-v10',
  center: [144.962754, -37.825517], // initial map center in [lon, lat]
  zoom: 12,
  attributionControl: false
  
});
map.addControl(new mapboxgl.AttributionControl(), 'top-left');
map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
map.addControl(new mapboxgl.NavigationControl({padding: 3}));

map.on('load', () => {
var filterHour = ['==', ['number', ['get', 'Hour']], 12];
var filterDay = ['!=', ['string', ['get', 'DAY_OF_WEEK']], 'placeholder'];

  map.addLayer({
    id: 'collisions',
    type: 'circle',
    source: {
      type: 'geojson',
      data: './new_road_crash.geojson' // replace this with the url of your own geojson
    },
    paint: {

      'circle-color': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'TOTAL_PERSONS']],
        0,
        '#2DC4B2',
        1,
        '#3BB3C3',
        2,
        '#669EC4',
        3,
        '#8B88B6',
        49,
        '#A2719B',
        500,
        '#AA5E79'
      ],
      'circle-opacity': 0.8
    },
    'filter': ['all',filterHour,filterDay]
  });


  //--------------------------------------
   // Create a popup, but don't add it to the map yet.
   const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });
 
    map.on('mouseenter', 'collisions', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
     
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.circle_data;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    // Populate the popup and set its coordinates
    // based on the feature found.

    popup.setLngLat(coordinates).setHTML(description).addTo(map);
 
  
  });
     
    map.on('mouseleave', 'collisions', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });
  //---------------------------------------
  map.addLayer({
    id: 'TrafficVolume',
    type: 'line',
    source: {
      type: 'geojson',
      data: './new_Traffic_Volume.geojson' // replace this with the url of your own geojson
    },
    paint: {
      'line-color': ['get', 'color'],
      'line-width': 1

    }
  });
  // Add zoom and rotation controls to the map.

  
  document
  .getElementById('slider')
  .addEventListener('input', ({ target }) => {
  const hour = parseInt(target.value);
  // update the map
  filterHour = ['==', ['number', ['get', 'Hour']], hour];
  map.setFilter('collisions', ['all', filterHour, filterDay]);
   
  // converting 0-23 hour to AMPM format
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 ? hour % 12 : 12;
   
  // update text in the UI
  document.getElementById('active-hour').innerText = hour12 + ampm;
  });
 
document
.getElementById('filters')
.addEventListener('change', ({ target }) => {
const day = target.value;
// update the map filter
if (day === 'all') {
filterDay = ['!=', ['string', ['get', 'DAY_OF_WEEK']], 'placeholder'];
} else if (day === 'weekday') {
filterDay = [
'match',
['get', 'DAY_OF_WEEK'],
['Friday','Saturday', 'Sunday'],
false,
true
];
} else if (day === 'weekend') {
filterDay = [
'match',
['get', 'DAY_OF_WEEK'],
['Friday','Saturday', 'Sunday'],
true,
false
];
} else {
console.error('error');
}
map.setFilter('collisions', ['all', filterHour,filterDay]);
});

  
});

// CHANGE: Add layer names that need to be toggled
var toggleableLayerIds = ['collisions', 'TrafficVolume'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement('a');
  link.href = '#';
  link.className = 'active';
  link.textContent = id;

  link.onclick = function(e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = '';
    } else {
      this.className = 'active';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  };

  var layers = document.getElementById('menu');
  layers.appendChild(link);

}


  }
  render () {
    
    return(
      <div>
        
 <div id='map'></div>
 
  <div id='console'>
    <h1>Road Accident and collisions</h1>
    <p>Data: <a href='https://discover.data.vic.gov.au/dataset/road-crashes-for-five-years-victoria'>Vehicle collision injuries and deaths</a> in Australia, 2016-2019</p>
    <div class='session'>
      <h2>Casualty</h2>
      <div class='row colors'>
      </div>
      <div class='row labels'>
        <div class='label'>0</div>
        <div class='label'>1</div>
        <div class='label'>2</div>
        <div class='label'>3</div>
        <div class='label'>4</div>
        <div class='label'>5+</div>
      </div>
    </div>
    <div class='session' id='sliderbar'>
      <h2>Hour: <label id='active-hour'>12PM</label></h2>
      <input id='slider' class='row' type='range' min='0' max='23' step='1' value={this.state.value} onChange={this.handleChange} />
    </div>
    <div class='session'>
      <h2>Day of the week</h2>
      <div class='row' id='filters'>
        <input id='all' type='radio' name='toggle' value='all' checked='checked'/>
        <label for='all'>All</label>
        <input id='weekday' type='radio' name='toggle' value='weekday'/>
        <label for='weekday'>Weekday</label>
        <input id='weekend' type='radio' name='toggle' value='weekend'/>
        <label for='weekend'>Weekend</label>
      </div>
    </div>
    <h2>Map Layers</h2>
    <nav id="menu"></nav>
  
  </div>
      </div>
    )
  }
}

export default Map;