map.addInteraction("Click-handler", {
    type: "click",
    target: {
      "layerId": "bible-dataset"
  },
    handler: (e) => {
      var sidebar = document.getElementById('sidebar');
        // console.log("Test", e.feature);//
        // DATA //
        const coordinates = JSON.parse(e.feature.properties.coordinates); // JSON.parse() permet de convertir les coordonées de string à object
        const name = e.feature.properties.name;
        // const description = e.feature.properties.name;

        // AFFICHAGE DES INFORMATIONS //
        document.getElementById('data-name').innerText = name


        sidebar.classList.add('show'); // Affichage de la sidebar
        
        
        

        // NAVIGATION //
        map.easeTo({
            center: coordinates,
            zoom: 9,
            // pitch: 60,
            pitch: pitch_init,
            duration: 2000 
        });
    }
});


// document.addEventListener("DOMContentLoaded", function() {
//   var element = document.querySelector("#close-button");
//   if (element) {
//       element.addEventListener("click", function() {
//           console.log("okay");
//       });
//   } else {
//       console.error("L'élément avec l'ID 'yourElementId' n'existe pas.", element);
//   }
// });

function hide_sidebar(){
  // alert('okokokok');
  sidebar.classList.remove('show');
}
