map.addInteraction("Click-handler", {
    type: "click",
    target: {
      "layerId": "bible-dataset"
  },
    handler: (e) => {
        console.log("Test", e.feature);//
        const coordinates = JSON.parse(e.feature.properties.coordinates); // JSON.parse() permet de convertir les coordonées de string à object
        const description = e.feature.properties.name;
        // new mapboxgl.Popup()
        //     .setLngLat(coordinates)
        //     .setHTML(description)
        //     .addTo(map);
        
        map.easeTo({
            center: coordinates,
            zoom: 9,
            // pitch: 60,
            pitch: pitch_init,
            duration: 2000 
        });
    }
  });