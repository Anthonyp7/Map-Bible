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
    maxBounds: bounds,
    attributionControl: false // Retrait des crédits Mapbox
});

let pitch_init = 45



map.setMaxZoom(10.75);
// map.setMinZoom(5.75);
map.dragRotate.disable();
map.doubleClickZoom.disable();

// Ajout de l'échelle de distance
let scale = new mapboxgl.ScaleControl()
map.addControl(scale)


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
    // console.log("test")
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
    layerId: "bible-dataset"
},
    handler: (e) => {
        
    if (feature) {
        map.setFeatureState(feature, { ["state"]: false });
        feature = null;
    }
    }
});




// Changement du curseur 
map.on('mouseenter', ['bible-dataset', 'tribes-icon'], () => {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', ['bible-dataset', 'tribes-icon'], () => {
    map.getCanvas().style.cursor = '';
});



// map.addInteraction("move-handler2", {
//     type: "mousemove",
//     target: {
//     "layerId": "places"
// },
//     handler: (e) => {
//     // console.log("test")
//     if (e.feature) {
        
//         if (feature) {
//         map.setFeatureState(feature, { ["state"]: false });
//         }

//         feature = e.feature;
//         map.setFeatureState(feature, { ["state"]: true });
//     }}
// });


// map.addInteraction("leave-handler2", {
//     type: "mouseleave",
//     target: {
//     "layerId": "places"
// },
//     handler: (e) => {
        
//     if (feature) {
//         map.setFeatureState(feature, { ["state"]: false });
//         feature = null;
//     }
//     }
// });

// map.setLayerZoomRange('county-population', 4, 24); // minzoom=4, maxzoom=24



map.addInteraction("move-handler-tribe", {
    type: "mousemove",
    target: {
    "layerId": "tribes-icon"
},
    handler: (e) => {
    if (e.feature) {
        
        if (feature) {
            map.setPaintProperty("tribes", "fill-opacity", ['match', ['get', 'name'], feature.properties.name, 0, 1]);
        }

        feature = e.feature;
        map.setPaintProperty("tribes", "fill-opacity", ['match', ['get', 'name'], feature.properties.name, 1, 0]);
        
    }}
});


map.on('mouseleave', 'tribes-icon', () => {
    console.log('Souris sortie de my-layer');
    if (feature) {
        console.log("on arrete tout");
        map.setPaintProperty("tribes", "fill-opacity", 0);
        feature = null;
    }
});







function display_tribes(){
    var layer = document.getElementById('tribes');
    var tribes = document.querySelector('.tribes');
    console.log("ok", layer.classList);
    
    if(layer.classList.contains("show")){
        console.log("oui");
        map.setPaintProperty('tribes', 'fill-opacity', 0);
        layer.classList.remove('show');
        tribes.style.content = 'url("../Images/layer-light.png")';
    }
    else{
        console.log("non");
        map.setPaintProperty('tribes', 'fill-opacity', 1);
        // map.setLayoutProperty('tribes', 'visibility', 'visible');
        layer.classList.add("show");
        tribes.style.content = 'url("../Images/layer-checked.png")';
    }
}



function dark_mode(){
    var toggle = document.getElementById('theme-toggle');
    var sidebar = document.querySelector('.sidebar');
    var botbar = document.querySelector('.botbar');
    var h1 = document.querySelector('.botbar h1');
    var h2 = document.querySelector('.sidebar h2');
    var p = document.getElementById('description');
    // var light = document.getElementById('light');
    var passage = document.getElementById('passage');
    console.log("ok", toggle.classList);

    // LIGHT
    if(toggle.classList.contains("show")){
        console.log("oui");
        map.setPaintProperty('Land - Night', 'background-opacity', 0);
        map.setPaintProperty('hide-salt-lake night', 'fill-opacity', 0);
        map.setPaintProperty('depth - night', 'fill-opacity', 0);
        map.setPaintProperty('waters - night', 'fill-opacity', 0);
        map.setPaintProperty('places', 'text-color', '#00132A');
        map.setPaintProperty('minor-places', 'text-color', '#00132A');
        // map.setLayoutProperty('depth - night', 'visibility', 'none');
        // map.setLayoutProperty('waters - night', 'visibility', 'none');
        sidebar.style.backgroundColor = 'var(--light)';
        botbar.style.backgroundColor = 'var(--light)';
        h1.style.color = 'var(--dark)';
        h2.style.color = 'var(--dark)';
        p.style.color = 'var(--dark)';
        // light.style.color = 'var(--dark)';
        passage.style.color = 'var(--dark)';
        toggle.classList.remove('show');
    }
    // DARK
    else{
        console.log("non");
        map.setPaintProperty('Land - Night', 'background-opacity', 1);
        map.setPaintProperty('hide-salt-lake night', 'fill-opacity', 1);
        // map.setLayoutProperty('depth - night', 'visibility', 'visible');
        // map.setLayoutProperty('waters - night', 'visibility', 'visible');
        map.setPaintProperty('depth - night', 'fill-opacity', 1);
        map.setPaintProperty('waters - night', 'fill-opacity', 1);
        map.setPaintProperty('places', 'text-color', '#FAEBD7');
        map.setPaintProperty('minor-places', 'text-color', '#FAEBD7');
        sidebar.style.backgroundColor = 'var(--sea)';
        botbar.style.backgroundColor = 'var(--sea)';
        h1.style.color = 'var(--light)';
        h2.style.color = 'var(--light)';
        p.style.color = 'var(--light)';
        // light.style.color = 'var(--light)';
        passage.style.color = 'var(--light)';
        toggle.classList.add("show");
    }
}




// map.addInteraction("move-handler3", {
//     type: "mousemove",
//     target: {
//     "layerId": "places"
// },
//     handler: (e) => {
//     // console.log("test")
//     if (e.feature) {
//         console.log(e.feature);
//         console.log(feature);
//         // console.log(map.getLayoutProperty('places', 'icon-image'))
//         if (feature) {
//             map.setPaintProperty('places', 'icon-color', '#000');
//             // map.setFeatureState(feature, { ["state"]: false });
//         }

//         feature = e.feature;
//         // map.setFeatureState(feature, { ["state"]: true });
//         map.setPaintProperty('places', 'icon-color', '#fff');
//     }}
// });