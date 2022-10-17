export const createShip = (length) => {
    let hits = [];
    let coords = [];

    const hit = (space) => {
        let hitstr = JSON.stringify(hits);
        let coordstr = JSON.stringify(coords);
        let spot = JSON.stringify(space);
        if (hitstr.includes(spot)){
            return false
        } else if (coordstr.includes(spot)) {
            hits.push(spot)
            return true
        } else {
            return false;
        }
    }

    const isSunk = () => {
        if(hits.length === length){
            return true
        } else {
            return false
        }
    }

    return {
        length: length,
        hits,
        hit,
        isSunk,
        coords
    }
}