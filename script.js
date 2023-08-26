// create object
class Horse {
    constructor(id,  time, currJockey, prevJockey, prevDistance, currDistance, prevlocalisation, currLocalisation, prevRaceType, currRaceType) {
        this.id = id;
        this.time = time;
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

// event create a horse from user data ----------------------
btn.addEventListener('click', function addNewHorse(event) {
    event.preventDefault();

    let id = document.getElementById('id').value;  //ID
    let time = document.getElementById('time').value; // time of last 1 000 meters
    let prevJockey = document.getElementById('prevJockey').value; //previous type of jockey
    let currJockey = document.getElementById('currJockey').value; // current type of jockey
    let prevDistance = document.getElementById('prevDistance').value; // previous distance of the race
    let currDistance = document.getElementById('currDistance').value; // current distance of the race
    let prevLocalisation = document.getElementById('prevLocalisation').value;// previous localisation (vincenne or province)
    let currLocalisation = document.getElementById('currLocalisation').value;// current localisation (vincenne or province)
    let prevRaceType = document.getElementById('prevRaceType').value;//previous type of race (monté (m) or attelé (a))
    let currRaceType = document.getElementById('currRaceType').value;//current type of race (monté (m) or attelé (a))
    let prevHandicap = document.getElementById('prevHandicap').value;// previous localisation (25m derrière or normal)
    let currHandicap = document.getElementById('currHandicap').value;// current localisation (25m derrière or normal)
    let prevHorseShoeing = document.getElementById('prevShoeing').value;//previous shoeing of the horse (fc : ferrage complet, dfc: defférrage complet, fh : ferré de 2 membres seulement, dh: déferré de 2 membres seulement)
    let currHorseShoeing = document.getElementById('currShoeing').value;//current shoeing of the horse (fc : ferrage complet, dfc: defférrage complet, fh : ferré de 2 membres seulement, dh: déferré de 2 membres seulement)
    let fristLastRace = document.getElementById('lastRaceRank').value;// horse's firs tplace or not (true or false)
    let raceLast3Months = document.getElementById('lastActivity').value;// Ask if horses had a race in the last 3 months (true or false)

    let newHorse = new Horse(id, time, prevJockey, currJockey, prevDistance, currDistance, prevLocalisation, currLocalisation, prevRaceType, currRaceType, prevHandicap, currHandicap,prevHorseShoeing, currHorseShoeing, fristLastRace, raceLast3Months);
    // push the new horse into an array horses  to be in a list
    horses.push(newHorse);
    console.log(`Le cheval numéro ${id} a été créé`);
    console.log(id, time, prevJockey, currJockey, prevDistance, currDistance, prevLocalisation, currLocalisation, prevRaceType, currRaceType, prevHandicap, currHandicap, prevHorseShoeing, currHorseShoeing, fristLastRace, raceLast3Months, );
    
    // Calculate the final time the horse will probably have for the current race
    let initialTimeInSecond = timeToSecond(newHorse.time);
    // let finalTimeCalculated = parseFloat(initialTimeInSecond);
    newHorse.time = finalTime(initialTimeInSecond);
    
    // Create a new list item 
    var horseItem = document.createElement('li');
    if (raceLast3Months == 'false'){
        horseItem.classList.add('horse-card');
        horseItem.classList.add('trash-horse');
    }else horseItem.classList.add('horse-card');
    
    horseItem.innerHTML = `<span class = 'horse-time'>${newHorse.time}</span> <span class = 'horse-id'>${newHorse.id}</span>  <a href='#' class='remove-cross' onclick='removeHorse(event)'>X</a>`;
    horseItem.setAttribute('data-id', newHorse.id);
    horseItem.setAttribute('data-time', newHorse.time);
    horseList.appendChild(horseItem);


    // @functions to calcul the time of the new horse with all parameters -----------------------------------------------------------------------

    // function compare jockey
    function jockeyDiff(e){
        if(prevJockey == 'normal' && currJockey == 'crack'){
            // console.log(`cas 1 ${e-1}`)
            return e - 1
        }else if (prevJockey == 'crack' && currJockey == 'normal'){
            // console.log(`cas 2 ${e+1}`)
            return e + 1 
        }else {
            // console.log(`cas 3 ${e}`)
            return e
        }
    }
    // function compare distance
    function distanceDiff(e){

        if(prevDistance == '2850' && currDistance == '2600'){
            return e - 0.5
        } else if (prevDistance == '2600' && currDistance == '2850'){
            return e + 0.5
        }else if (prevDistance == '2850' && currDistance == '2150'){
            return e - 2
        }else if (prevDistance == '2150' && currDistance == '2850'){
            return e + 2
        }else if (prevDistance == '2600' && currDistance == '2150'){
            return e - 1.5
        }else if (prevDistance == '2150' && currDistance == '2600'){
            return e + 1.5
        }else return e
    };
    // function compare localisation
    function localisationDiff(e){
        if(prevLocalisation == 'p' && currLocalisation == 'v'){
            return e + 1
        }else if (prevLocalisation == 'v' && currLocalisation == 'p'){
            return e - 1
        }else return e
    };
    // function compare  type of race
    function raceTypeDiff(e){
        if (prevRaceType == 'm' && currRaceType == 'a'){
            return e + 1
        }else if (prevRaceType == 'a' && currRaceType == 'm'){
            return e - 1
        }else return e
    };
    // Compare handicap
    function handicapDiff(e){
        if(prevHandicap == 'h' && currHandicap == 'n'){
            return e - 1
        }else if (prevHandicap == 'n' && currHandicap== 'h'){
            return e + 1
        }else return e
    };
    // horse shoeing compare function
    function horseShoeingDiff(e){
        if (prevHorseShoeing == 'fc' && currHorseShoeing == 'dfc'){
            // console.log(`Cas 1 ferrage`)
            return e - 1
        } else if (prevHorseShoeing == 'dfc' && currHorseShoeing == 'fc'){
            // console.log(`Cas 2 ferrage`)
            return e + 1
        }else if (prevHorseShoeing == 'dfc' && currHorseShoeing == 'fh' ){
            // console.log(`Cas 3 ferrage`)
            return e + 0.5
        }else if (prevHorseShoeing == 'fh' && currHorseShoeing == 'fc'){
            // console.log(`Cas 4 ferrage`)
            return e + 0.5
        }else return e
    }
    // function if the horse finished first last race
    function lastPlace(e){
        if(fristLastRace == 'true'){
            return e - 1
        } else {
            return e
        }
    };

    // function invalid horse if it hasn't run in the last 3 months
    function finalTime(e){
        let jockeyTime = jockeyDiff(e)
        // console.log(`Jockey time : ${jockeyTime}`);
        let distanceTime = distanceDiff(jockeyTime)
        // console.log(`Distance time : ${distanceTime}`);
        let localisationTime = localisationDiff(distanceTime)
        // console.log(`localisation time : ${localisationTime}`);
        let handicapTime = handicapDiff(localisationTime)
        // console.log(`handicap time : ${handicapTime}`);
        let horseShoeingTime = horseShoeingDiff(handicapTime);
        // console.log(`Ferrage time : ${horseShoeingTime}`);
        let raceTypeTime = raceTypeDiff(horseShoeingTime);
        // console.log( `Race type time : ${raceTypeTime}`);
        let lastPlaceTime = lastPlace(raceTypeTime)
        // console.log(`last place time : ${lastPlaceTime}`);
        let finalTime = lastPlaceTime - 60
        return `  1.${parseFloat(finalTime).toFixed(1)}`
    };
});

// END CREATE HORSE FUNCTION ----------------------------

// @global function
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

// convert time in this format (1 23 234) to seconds
function timeToSecond(time){
    let tab = time.split(' ') ;
    console.log(tab)
    let milliem = parseInt(tab[2]) / 10;
    let totalTime = parseInt(tab[0]*60) + parseInt(tab[1])+ milliem;
    return totalTime ;
};


// @sort-btn function

function sort() {
    //declaring variables
    var horseList, i, run, stop;

    //taking content of list as input
    horseList = document.getElementById('horse-list');

    run = true;

    while(run){
        run = false;
        li = horseList.getElementsByTagName('li');

        //loop traversing through all the list items
        for (i = 0; i < (li.length - 1); i++) {
            stop = false;
            if (li[i].innerHTML.toLowerCase() > li[i + 1].innerHTML.toLowerCase()){
                stop = true;
                break;
            }
        }
        // if the current item is smaller than the next item then adding it after it using inserBefore() method
        if (stop){
            li[i].parentNode.insertBefore(li[i + 1], li[i]);

            run = true
        }
    }
}

