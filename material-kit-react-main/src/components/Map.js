
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'; // Make sure to import the Leaflet Draw CSS
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Circle, useMap,useMapEvent  } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

const DrawControl = (animalType) => {
  const map = useMap(); // Correctly using useMap hook within a MapContainer
  const router = useRouter();

  useEffect( () => {
    // Initialize the draw control
    const drawControlInstance = new L.Control.Draw({
      draw: {
        polygon: {
          shapeOptions: {
            color: 'gold',
          },
        },
        circle: false,
        marker: false,
        polyline: false,
        rectangle: false,
      },
      edit: {
        featureGroup: new L.FeatureGroup(),
      },
    });

    // Add the draw control to the map
    map.addControl(drawControlInstance);

    // Event handler for when a polygon is created
    map.off('draw:created'); // Remove any existing listener
    map.on('draw:created',async (e) => {
      const layer = e.layer;
      var firstPolygon = true;
      var polyExistsBefore =false;

      map.eachLayer((existingLayer) => {
        if (existingLayer instanceof L.Circle) {
          // If the layer is a circle, remove it from the map
          map.removeLayer(existingLayer);
        }

        if (existingLayer instanceof L.Polygon) {
          // If the layer is a circle, remove it from the map
        polyExistsBefore = true;
        if(firstPolygon)
          {
            firstPolygon = false;
          }
          else{
            map.removeLayer(existingLayer);
          }
        }
      });

      if (layer instanceof L.Polygon) {
        // Calculate the area of the polygon
        const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        // If polygon area is too small, remove the draw control
       
      }


      const geoJSON = layer.toGeoJSON();
      var cords = geoJSON.geometry.coordinates[0];
      var toSend = [];

         for (let index = 0; index < cords.length -1; index++) {
         const point = cords[index];
         toSend.push({
          animalType: animalType.animalType.animalType,
          latitude : point[1],
          longitude : point[0]
         })
      }

      var resultconfirm = confirm('Czy dodać narysowany wielokąt jako pastuch?')
      if(resultconfirm)
      {
        const URL = 'http://localhost:8080/api/animalShepherd/add'
    
        var options = {  
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(toSend)
        }

        var response = await fetch(URL,options);
        if(response.status === 200){
          router.push('/animalShepherds')
        }
        else{
          alert('Wystąpił nieoczekiwany błąd')
        }
      }
      else{

      }

      console.log('Created layer GeoJSON:', cords);
      console.log('To send GeoJSON:', toSend);
      // layer.addTo(map);
      

    });

    // Cleanup: Remove draw control when component unmounts
    return () => {
       map.removeControl(drawControlInstance);
    };
  }, [map]); // Re-run when map is available

  return null; // This component doesn't need to render anything itself
};

const PolygonDrawer = (animalType) => {
  const map = useMap();

  useEffect(() => {
    // Fetch polygons from an API
    const fetchPolygons = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/animalShepherd/getAllByType?type='+animalType.animalType.animalType); // Replace with your API URL
        const data = await response.json();
        if(data.length)
        {

          var dataForPolygon = data.map(m=>[m.latitude,m.longitude])
          map.setView([dataForPolygon[0][0], dataForPolygon[0][1]], 16)
          dataForPolygon.push(dataForPolygon[0])
          console.log(dataForPolygon);
          const polygon = L.polygon(dataForPolygon, { color: 'green' });

          const coordinatesText = dataForPolygon
          .map(coord => `[${coord[0]}, ${coord[1]}]`)
          .join('<br>'); // Format coordinates for better readability
        polygon.bindPopup(`<pre>${coordinatesText}</pre>`);

          polygon.addTo(map);
      }

        return;
        // Example API Response:
        // [
        //   [[51.505, -0.09], [51.51, -0.1], [51.51, -0.08], [51.505, -0.09]],
        //   [[51.52, -0.07], [51.525, -0.075], [51.525, -0.065], [51.52, -0.07]]
        // ]

        // Draw polygons on the map
        data.forEach((polygonCoordinates) => {
          const polygon = L.polygon(polygonCoordinates, { color: 'blue' });
          polygon.addTo(map);
        });
      } catch (error) {
        console.error('Error fetching polygons:', error);
      }
    };

    fetchPolygons();
  }, [map]);

  return null;
};

const MapComponent = (animalType) => {
  const [isClient, setIsClient] = useState(false);
  const [drawnLayer, setDrawnLayer] = useState(null);

  
console.log(animalType)
 
  useEffect(() => {
    // Only run on the client side
    setIsClient(true);

    if (typeof window !== 'undefined') {
      // Fix default marker icon issue (Leaflet icons need to be set)
      delete L.Icon.Default.prototype._getIconUrl;

      // Use the CDN URLs for the default Leaflet marker icons
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
      });
    }
  }, []);

  if (!isClient) {
    return null; // Only render on the client side
  }

  return (
    <div>
     
    <MapContainer
      id='map'
      center={[52.896011, 16.461339]} // Set center to your desired location
      zoom={16} // Zoom level for the map
      style={{ height: '80vh', width: '80%' }}
se
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <DrawControl animalType = {animalType} /> {/* Use the DrawControl component inside the MapContainer */}
    <SearchControl/>
    <CenterCoordinates/>
    <GeoPointSearchControl/>
    <PolygonDrawer animalType = {animalType}/>
    </MapContainer>
    </div>
  );
};

export default MapComponent;


const CenterCoordinates = () => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    // Create a custom control
    const GeoPointSearch = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.padding = '10px';
        container.style.border = '2px solid #ccc';
        container.style.borderRadius = '5px';

        // Initial center of the map
        const center = map.getCenter();

        // Input fields for latitude and longitude
        container.innerHTML = `
          <div style="display: flex; flex-direction: column;">
            
          <span>Aktualny środek mapy:<span/>
            <input id="latInput" type="text" placeholder="Szerokość geo" style="margin-bottom: 5px; padding: 5px; width: 120px;" value="${(center ? center.lat.toFixed(5) : '')}" />
            <input id="lngInput" type="text" placeholder="Długość geo" style="margin-bottom: 5px; padding: 5px; width: 120px;" value="${(center ? center.lng.toFixed(5) : '')}" />
          </div>
        `;

        // Attach event listeners for input values
        const latInput = container.querySelector('#latInput');
        const lngInput = container.querySelector('#lngInput');

        // Update inputs every second with the current map center
        const updateCenter = () => {
          const newCenter = map.getCenter();
          latInput.value = newCenter.lat.toFixed(5);
          lngInput.value = newCenter.lng.toFixed(5);
        };

        // Start an interval to update the map center every 1 second
        const intervalId = setInterval(updateCenter, 1000);

        // Event listener for Search button
      

        // Return the container
        return container;
      },

      onRemove: function () {
        // Cleanup when control is removed
      },
    });

    // Add the control to the map
    const geoPointControl = new GeoPointSearch({ position: 'topright' });
    map.addControl(geoPointControl);

    // Cleanup the control when the component unmounts
    return () => {
      map.removeControl(geoPointControl);
    };
  }, [map]);

  return null;
};


const SearchControl = () => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim(); // Use Nominatim Geocoder

    const control = L.Control.geocoder({
      query: '',
      placeholder: 'Search for a location...',
      geocoder: geocoder,
      defaultMarkGeocode: true, // Add marker on search result
    }).addTo(map);

    control.on('markgeocode', function (e) {
      const { bbox } = e.geocode;
      map.fitBounds(bbox); // Zoom to the searched location
    });
    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
};

const GeoPointSearchControl = () => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    // Create a custom control
    const GeoPointSearch = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.padding = '10px';
        container.style.border = '2px solid #ccc';
        container.style.borderRadius = '5px';
        const center = map.getCenter();

        // Input fields for latitude and longitude
        container.innerHTML = `
          <div style="display: flex; flex-direction: column;">
          <span>Wyszukaj:<span/>
            <input id="latInput" type="text" placeholder="Szerokośc geo" style="margin-bottom: 5px; padding: 5px; width: 120px;" readonly />
            <input id="lngInput" type="text" placeholder="Długość geo" style="margin-bottom: 5px; padding: 5px; width: 120px;" readonly />
            <button id="searchButton" style="padding: 5px; cursor: pointer;">Szukaj</button>
          </div>
        `;

        return container;
      },

      onRemove: function () {
        // Cleanup when control is removed
      },
    });

    // Add the control to the map
    const geoPointControl = new GeoPointSearch({ position: 'topright' });
    map.addControl(geoPointControl);

    // Attach event listeners
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
      const lat = parseFloat(document.getElementById('latInput').value);
      const lng = parseFloat(document.getElementById('lngInput').value);

      if (!isNaN(lat) && !isNaN(lng)) {
        const latLng = L.latLng(lat, lng);
        map.setView(latLng, 15); // Zoom to the point
        L.marker(latLng).addTo(map).bindPopup(`Coordinates: [${lat}, ${lng}]`).openPopup();
      } else {
        alert('Please enter valid latitude and longitude!');
      }
    });

    // Cleanup the control when the component unmounts
    return () => {
      map.removeControl(geoPointControl);
    };
  }, [map]);

  return null;
};
