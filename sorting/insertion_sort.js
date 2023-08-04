/*

Unsorted array: [5, 3, 8, 4, 2]

Insertion Sort steps:

1. Have an unsorted and sorted array
2. Start out with the sorted array being empty, and the unsorted array containing the entire given array
3. Get the first item from the unsorted array
4. Iterate through the sorted array, and insert that item in the correct index in the sorted array
5. Get the first item from the unsorted array
6. Iterate through the sorted array, and insert that item in the correct index in the sorted array
7. Continue until the unsorted array is empty


  [5, 3, 8, 4, 2]
*/

function insertionSort(arr) {
  const sorted = [];

  while (arr.length) {
    const numToInsert = arr.splice(0, 1);

    for (let i = 0; i < sorted.length; i++) {
      const currentNum = sorted[i];
      const nextNum = sorted[i+1];
      const currentIndex = i;

      if (nextNum && currentNum <= numToInsert && numToInsert <= nextNum) {
        sorted.splice(currentIndex, 0, numToInsert);
      } 
      if (!nextNum) {
        sorted.push(numToInsert);
      }
    }
  }

  return sorted
}

console.log(insertionSort([5, 3, 8, 4, 2]));
