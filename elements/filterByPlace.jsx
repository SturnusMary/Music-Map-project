export function FilterByPlace(place, arr){
   let objOfOneSong;
   for(let i=0; i < arr.length; i++) {
       for(let k in arr[i]) {
          if(place == arr[i][k]) {
             objOfOneSong = arr[i];
             return objOfOneSong;
          }
       }
    }
}
