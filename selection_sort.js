/*

Unsorted array: [5, 3, 8, 4, 2]

Selection Sort steps:

1. Have an unsorted and sorted array
2. Start out with the sorted array being empty, and the unsorted array containing the entire given array
3. Iterate through the unsorted array, and SELECT the lowest one
4. Put that lowest one into the sorted array
5. Iterate through the unsorted array again and find the lowest one
6. Put that lowest one into the sorted array
7. Continue until the unsorted array is empty


  [5, 3, 8, 4, 2]
*/

function selectionSort(arr) {
  const sorted = [];

  while (arr.length) {
    let lowestIndex = 0;
    let lowest = arr[lowestIndex];
    for (let i = 1; i < arr.length; i++) {
      const currentNum = arr[i];
      if (currentNum < lowest) {
        lowest = currentNum;
        lowestIndex = i;
      }
    }

    arr.splice(lowestIndex, 1);
    sorted.push(lowest);
  }

  return sorted;
}

console.log(selectionSort([5, 3, 8, 4, 2]));
