
	mapboxgl.accessToken = maptoken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // style:"mapbox://styles/mapbox/street-v12",
        center: [        77.10249020  ,28.70405920], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });


 console.log(coordinates)

const marker=new mapboxgl.Marker()
.setLngLat(coordinates)
.addTo(map);