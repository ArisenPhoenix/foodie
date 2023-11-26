

export const getRandomArrayItem = (array: any[]) => {
    return  array[Math.floor(Math.random() * array.length)]
   }
  
export const getRandomArrayIndex = (array: any[]) => {
    return Math.floor(Math.random() * array.length)
    }

export const shuffle = (array: any[]) => {
    let currentIndex = array.length
    let randomIndex: number;
  
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array; 
  }


  export const GET_LARGEST_ARRARY_OF_ARRAYS = (arrayOfArrays: any[][]) => {
    return arrayOfArrays.reduce((a, b) => a.length > b.length ? a : b, []);
  }