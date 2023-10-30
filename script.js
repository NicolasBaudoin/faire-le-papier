// Variables globales
let prevJockey, currJockey;
let prevDistance, currDistance;
let prevLocalisation, currLocalisation;
let prevRaceType, currRaceType;
let prevHandicap, currHandicap;
let prevHorseShoeing, currHorseShoeing;
let fristLastRace;
let raceLast3Months;

// create object
class Horse {
    constructor(id,  timeInSeconds, currJockey, prevJockey, prevDistance, currDistance, prevlocalisation, currLocalisation, prevRaceType, currRaceType) {
        this.id = id;
        this.timeInSeconds = timeInSeconds;
        this.prevJockey = prevJockey;
        this.currJockey = currJockey;
        this.prevDistance = prevDistance
        this.currDistance = currDistance
        this.prevLocalisation = prevlocalisation;
        this.currLocalisation = currLocalisation;
        this.prevRaceType = prevRaceType;
        this.currRaceType = currRaceType;
    }
};

let horses = [];
let btn = document.getElementById('create-button');
let horseList = document.getElementById('horse-list');

// Fonction pour ajouter un nouveau cheval
// event create a horse from user data ----------------------
btn.addEventListener('click', function addNewHorse(event) {

    event.preventDefault();

    // Variables 
    let id = document.getElementById('id').value; 
    // temps entrée utilisateur 
    let minutes = parseInt(document.getElementById('minutes').value);
    let secondes = parseInt(document.getElementById('secondes').value);
    let dixiemes = parseInt(document.getElementById('dixiemes').value);

    // Convertir en secondes
    let timeInSeconds = minutes * 60 + secondes + dixiemes / 100;

    // Récupérer les données
    // JOCKEY
     prevJockey = document.getElementById('prevJockey').value; //previous type of jockey
     currJockey = document.getElementById('currJockey').value; // current type of jockey
    // Distance
     prevDistance = document.getElementById('prevDistance').value; // previous distance of the race
     currDistance = document.getElementById('currDistance').value; // current distance of the race
    // Lieu
     prevLocalisation = document.getElementById('prevLocalisation').value;// previous localisation (vincenne or province)
     currLocalisation = document.getElementById('currLocalisation').value;// current localisation (vincenne or province)
    // Type de course
     prevRaceType = document.getElementById('prevRaceType').value;//previous type of race (monté (m) or attelé (a))
     currRaceType = document.getElementById('currRaceType').value;//current type of race (monté (m) or attelé (a))
    // Handicap
     prevHandicap = document.getElementById('prevHandicap').value;// previous localisation (25m derrière or normal)
     currHandicap = document.getElementById('currHandicap').value;// current localisation (25m derrière or normal)
    // Ferrage
     prevHorseShoeing = document.getElementById('prevShoeing').value;//previous shoeing of the horse (fc : ferrage complet, dfc: defférrage complet, fh : ferré de 2 membres seulement, dh: déferré de 2 membres seulement)
     currHorseShoeing = document.getElementById('currShoeing').value;//current shoeing of the horse (fc : ferrage complet, dfc: defférrage complet, fh : ferré de 2 membres seulement, dh: déferré de 2 membres seulement)
    // premiere place et dernière course
     fristLastRace = document.getElementById('lastRaceRank').value;// horse's firs tplace or not (true or false)
     raceLast3Months = document.getElementById('lastActivity').value;// Ask if horses had a race in the last 3 months (true or false)

     // Create class
    let newHorse = new Horse(id, timeInSeconds, prevJockey, currJockey, prevDistance, currDistance, prevLocalisation, currLocalisation, prevRaceType, currRaceType, prevHandicap, currHandicap,prevHorseShoeing, currHorseShoeing, fristLastRace, raceLast3Months);
    // push the new horse into an array horses  to be in a list
    horses.push(newHorse);
    console.log(`Le cheval numéro ${id} a été créé`);
    console.log(id, timeInSeconds, prevJockey, currJockey, prevDistance, currDistance, prevLocalisation, currLocalisation, prevRaceType, currRaceType, prevHandicap, currHandicap, prevHorseShoeing, currHorseShoeing, fristLastRace, raceLast3Months, );
    
    // Calculate the final time the horse will probably have for the current race
    let initialTimeInSecond = timeInSeconds;
    let finalTimeInSeconds = adjustTime(initialTimeInSecond);
    let FinalTimeForUser = convertirTemps(finalTimeInSeconds);
    newHorse.time = FinalTimeForUser;
    
    // Create a new list item 
    var horseItem = document.createElement('li');
    if (raceLast3Months == 'false'){
        horseItem.classList.add('horse-card');
        horseItem.classList.add('trash-horse');
    }else horseItem.classList.add('horse-card');
    
    // @Horsecard template
    horseItem.innerHTML = ` <span class = 'horse-id'>${newHorse.id}</span> <span class = 'horse-time'>${newHorse.time}</span>  <a href='#' class='remove-cross' onclick='removeHorse(event)'>X</a>`;
    horseItem.setAttribute('data-id', newHorse.id);
    horseItem.setAttribute('data-time', finalTimeInSeconds);
    horseList.appendChild(horseItem);

    
});

// -----------------------------------------------------------------------------------------
// @Structure de donnée  
// -----------------------------------------------------------------------------------------
let adjustFunctions = new Map();

adjustFunctions.set('jockey', jockeyDiff);
adjustFunctions.set('distance', distanceDiff);
adjustFunctions.set('localisation', localisationDiff);
adjustFunctions.set('raceType', raceTypeDiff);
adjustFunctions.set('handicap', handicapDiff);
adjustFunctions.set('horseShoeing', horseShoeingDiff);
adjustFunctions.set('lastPlace', lastPlace);

// @Traitement des données et convertion du temps ---------------------------------------------------------------------------------
// Ajustement avec plusieurs fonctions
function adjustTime(value) {
    let adjustedValue = value;
    for (let adjustFunction of adjustFunctions.values()) {
        adjustedValue = adjustFunction(adjustedValue);
    }
    return adjustedValue;
};
// Convert Time function
function convertirTemps(s) {
    let minutes = Math.floor(s / 60);
    let secondes = Math.floor(s % 60);
    let centiemes = s.toString().split(".")[1]
    console.log(s)
    console.log(minutes, secondes, centiemes)
    return `${minutes.toString().padStart(2, '0')} : ${secondes.toString().padStart(2, '0')} . ${centiemes.toString()}`;
}

// Les fonctions d'ajustements -------------------------------------------------------------------------------------------------------
//@jockey
function jockeyDiff(s){        
    // Comparaison
    if(prevJockey == 'normal' && currJockey == 'crack'){
        // console.log(`cas 1 ${e-1}`)
        return e - 1
    }else if (prevJockey == 'crack' && currJockey == 'normal'){
        // console.log(`cas 2 ${e+1}`)
        return e + 1 
    }else {
        // console.log(`cas 3 ${e}`)
        return s
    }
};
//@distance
function distanceDiff(s){

    if(prevDistance == '2850' && currDistance == '2600'){
        return s - 0.5
    } else if (prevDistance == '2600' && currDistance == '2850'){
        return s + 0.5
    }else if (prevDistance == '2850' && currDistance == '2150'){
        return s - 2
    }else if (prevDistance == '2150' && currDistance == '2850'){
        return s + 2
    }else if (prevDistance == '2600' && currDistance == '2150'){
        return s - 1.5
    }else if (prevDistance == '2150' && currDistance == '2600'){
        return s + 1.5
    }else return s
};
//@localisation
function localisationDiff(s){
    if(prevLocalisation == 'p' && currLocalisation == 'v'){
        return s + 1
    }else if (prevLocalisation == 'v' && currLocalisation == 'p'){
        return s - 1
    }else return s
};
//@type of race
function raceTypeDiff(s){
    if (prevRaceType == 'm' && currRaceType == 'a'){
        return s + 1
    }else if (prevRaceType == 'a' && currRaceType == 'm'){
        return s - 1
    }else return s
};
//@handicap
function handicapDiff(s){
    if(prevHandicap == 'h' && currHandicap == 'n'){
        return s - 1
    }else if (prevHandicap == 'n' && currHandicap== 'h'){
        return s + 1
    }else return s
};
// horse shoeing compare function
function horseShoeingDiff(s){
    if (prevHorseShoeing == 'f' && currHorseShoeing == 'n'){
        // console.log(`Cas 1 ferrage`)
        return s - 1
    } else if (prevHorseShoeing == 'n' && currHorseShoeing == 'f'){
        // console.log(`Cas 2 ferrage`)
        return s + 1
    } else if (prevHorseShoeing == 'n' && currHorseShoeing == 'h' ){
        // console.log(`Cas 3 ferrage`)
        return s + 0.5
    } else if (prevHorseShoeing == 'h' && currHorseShoeing == 'n' ) {
        return s - 0.5
    } else if (prevHorseShoeing == 'h' && currHorseShoeing == 'f'){
        // console.log(`Cas 4 ferrage`)
        return s + 0.5
    } else if (prevHorseShoeing == 'f' && currHorseShoeing == 'h'){
        return s - 0.5
    } 
    else return s
};
// function if the horse finished first last race
function lastPlace(s){
    if(fristLastRace == 'true'){
        return s - 1
    } else {
        return s
    }
};
// @Usefull functions -----------------------------------------------------------------------------------------------------
// Remove element
function removeHorse(event) {
    event.preventDefault();
    // remove from list
    let horseToRemove = event.target.parentNode;
    let id = horseToRemove.getAttribute('data-id');
    horseList.removeChild(horseToRemove);
    // Find and remove the horse from the `horses` array
    let index = horses.findIndex(horse => horse.id == id);
    horses.splice(index, 1);
};
// @sort function

function sort() {
    console.log("Début de la fonction sort")
    // Récupérer la liste des chevaux
    let horseList = document.getElementById('horse-list');
    let li = horseList.getElementsByTagName('li');

    // Créer un tableau pour stocker les liens entre les horse cards et leurs temps respectifs
    let horseTimes = [];

    // Remplir le tableau avec les liens et les temps correspondants
    for (let i = 0; i < li.length; i++) {
        let horseCard = li[i];
        let horseTime = parseFloat(horseCard.getAttribute('data-time'));
        horseTimes.push({ card: horseCard, time: horseTime });
        console.log(`Cheval ${i + 1} - Temps : ${horseTime}`);
    }

    // Trier le tableau en fonction des temps
    horseTimes.sort(function(a, b) {
        console.log("Tableau trié :", horseTimes);
        return a.time - b.time;
        
    });

    // Réorganiser les horse cards dans la liste
    for (let i = 0; i < horseTimes.length; i++) {
        horseList.appendChild(horseTimes[i].card);
    }
    console.log("Nouvel ordre des éléments :", horseList.innerHTML);
    console.log("Fin de la fonction sort")
}




// @INFOBUBLE FUNCTION
// Show infobubble
function afficherInfobulle() {
    let infobulle = document.getElementById("tuto");
    infobulle.style.display = "block";
}

// Hide infobubble
function masquerInfobulle() {
    let infobulle = document.getElementById("tuto");
    infobulle.style.display = "none";
}

// toggle show/hide infobubble
let infobulleIcone = document.getElementById("infobulle-icone");
infobulleIcone.addEventListener('mouseover', afficherInfobulle);
infobulleIcone.addEventListener('mouseout', masquerInfobulle);
