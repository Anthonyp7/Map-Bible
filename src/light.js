

// function interpolateColor(color1, color2, factor) {
//     const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
//     return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
// }
  
  
// const startColor = map; // Rouge
// const endColor = [0, 0, 255]; // Bleu



    // MODE NUIT //
map.on('style.load', () => {
    map.setFog({
        color: 'rgba(30, 30, 60, 1)', // Couleur sombre pour un effet nuit
        "high-color": 'rgba(50, 50, 80, 0.5)', // Couleur en altitude
        "horizon-blend": 0.1, // Mélange avec l'horizon
        range: [1, 8], // Portée du brouillard
        "space-color": 'rgba(20, 20, 40, 1)', // Couleur du ciel
        "star-intensity": 0.2 // Intensité des étoiles (si compatible)
    });
    
});

