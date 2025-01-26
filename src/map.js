const bounds = [
    [14, 30], // Southwest coordinates
    [42, 42] // Northeast coordinates
];



mapboxgl.accessToken = 'pk.eyJ1IjoiYXBlcm96ZW5pNyIsImEiOiJjbTMyNHpoNWgxMG5kMmpzNzUzdjhnY3dyIn0.sRs6nQfyHOAQ519ZWLjHwg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aperozeni7/cm5ntn1zk00d201qubbveehkn',
    center: [35.5, 25.5],
    zoom: 7,
    maxBounds: bounds
});

let pitch_init = 45



map.setMaxZoom(10.75);
// map.setMinZoom(5.75);
map.dragRotate.disable();
map.doubleClickZoom.disable();


map.easeTo({
    pitch: pitch_init,
    duration: 3000 // Durée de l'animation en millisecondes
});



// Hover sur dataset
let feature;

map.addInteraction("move-handler", {
    type: "mousemove",
    target: {
    "layerId": "bible-dataset"
},
    handler: (e) => {
    if (e.feature) {
        
        if (feature) {
        map.setFeatureState(feature, { ["state"]: false });
        }

        feature = e.feature;
        map.setFeatureState(feature, { ["state"]: true });
    }}
});


map.addInteraction("leave-handler", {
    type: "mouseleave",
    target: {
    "layerId": "bible-dataset"
},
    handler: (e) => {
        
    if (feature) {
        map.setFeatureState(feature, { ["state"]: false });
        feature = null;
    }
    }
});





// Changement du curseur 
map.on('mouseenter', 'bible-dataset', () => {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'bible-dataset', () => {
    map.getCanvas().style.cursor = '';
});


//////////////////////////////













// // let feature;

// map.addInteraction("Click-handler", {
//     type: "click",
//     target: {
//       "layerId": "bible-dataset"
//   },
//     handler: (e) => {
//       console.log("Test", feature);//
//       if (feature) {
//           map.setFeatureState(feature, { ["state"]: false });
//         feature = null;
//       } else {
//         feature = e.feature;
//         map.setFeatureState(feature, { ["state"]: true });
//         console.log("Test2", feature, e.feature);
//       }
//     }
//   });

