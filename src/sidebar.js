function show_sidebar(e){
  // Fermeture de la Botbar si elle est ouverte
  if(botbar.classList.contains("show")){
    hide_botbar()
  }

  var sidebar = document.getElementById('sidebar');
    // Affichage de la sidebar
    sidebar.classList.add('show');
  
    // DATA //
    const coordinates = JSON.parse(e.feature.properties.coordinates); // JSON.parse() permet de convertir les coordonées de string à object
    const name = e.feature.properties.name;
    const img1 = e.feature.properties.image1;
    const img2 = e.feature.properties.image2;
    const description = e.feature.properties.description;


    // AFFICHAGE DES INFORMATIONS //
    document.getElementById('data-name').innerText = name;
    
    var place_type = document.querySelector('.heading');
    if(e.feature.properties.type == "water"){
      document.getElementById('origine').innerHTML = `
      <div class="icon-info">
        
        <img class="icon" src="../Images/info.svg">
        \n
        <p class="light" id="light"><i>David; Jean; Paul; Jacques</i></p>

        <span class="icon-info-text">étant né ou ayant vécu à cette localité</span>
      </div>`;

      place_type.style.backgroundImage = 'url("../Images/sea-banner2.png")';

    }
    else{
      console.log("erreur ?", e.feature.properties.type);
      place_type.style.backgroundImage = 'url("../Images/tyr1.png")';
    }
    document.getElementById('description').innerText = description;
    document.getElementById('image1').innerHTML = `<img src='${img1}'>`;
    document.getElementById('image2').innerHTML = `<img src='${img2}'>`;
    document.getElementById('passage').innerText = "Nb 34:11; Mt 4:13; Jn 6:16-21\nLa Mer de Kinnereth, ou mer de Galilée est un lac se trouvant au nord du pays d'Israël et est traversée par le Jourdain. Plusieurs villes bordent ce lac, c'est le cas notamment de Capernaüm où Jésus à effectué un grand nombre de miracle.La Mer de Kinnereth, ou mer de Galilée est un lac se trouvant au nord du pays d'Israël et est traversée par le Jourdain. Plusieurs villes bordent ce lac, c'est le cas notamment de Capernaüm où Jésus à effectué un grand nombre de miracle.";

     
    // NAVIGATION //
    map.easeTo({
        center: coordinates,
        zoom: 9,
        // pitch: 60,
        pitch: pitch_init,
        duration: 2000 
    });
}

function hide_sidebar(){
  sidebar.classList.remove('show');
}



function show_botbar(e){
  // Fermeture de la Sidebar si elle est ouverte
  if(sidebar.classList.contains("show")){
    hide_sidebar()
  }
  var botbar = document.getElementById('botbar');
    botbar.classList.add('show'); // Affichage de la sidebar
  
    // DATA //
    const coordinates = JSON.parse(e.feature.properties.coordinates); // JSON.parse() permet de convertir les coordonées de string à object
    const name = e.feature.properties.name;
    // const img1 = e.feature.properties.image1;
    // const description = e.feature.properties.name;

    // AFFICHAGE DES INFORMATIONS //
    document.getElementById('tribe-name').innerText = name;
    // document.getElementById('images').innerHTML = `<img src='${img1}'>`;


    // NAVIGATION //
    map.easeTo({
        center: coordinates, // + 0,10 à la longitude : [35.76,32.25] --> [35.76,32.35]
        zoom: 9,
        // pitch: 60,
        pitch: pitch_init,
        duration: 2000 
    });

    // Si l'échelle est affichée
    if(map.hasControl(scale)){
      map.removeControl(scale)
    }
}

function hide_botbar(){
  botbar.classList.remove('show');
  map.addControl(scale)
}













//// SIDE BAR SEAS \\\\
map.addInteraction("Click-handler", {
    type: "click",
    target: {
      "layerId": "bible-dataset"
  },
    handler: (e) => {
      show_sidebar(e)
    }
});


//// SIDE BAR CITIES \\\\
map.addInteraction("Click-handler3", {
  type: "click",
  target: {
    "layerId": "places"
},
  handler: (e) => {
    show_sidebar(e)
  }
});

//// BOTTOM BAR \\\\
map.addInteraction("Click-handler2", {
  type: "click",
  target: {
    "layerId": "tribes"
},
  handler: (e) => {
    show_botbar(e)
  }
});




