/*

Unsorted array: [5, 3, 8, 4, 2]

Bubble Sort steps:

1. Iterate through the array
2. At each iteration, check if the current number is greater than the next number
  2.a. If it is greater than the next number, swap the two numbers
  2.b. If it is smaller than or equal to the next number, skip this iteration
3. If at any point during the loop you detected an iteration was smaller than the next number, repeat the loop
4. Keep repeating the loop until you've gone through a full loop cycle where every number in each iteration was correctly smaller than the next
  - This can be tracked by a binary value, such as: containedSwaps, which starts as true, and is switched to false if a loop of the array occurs where each
  iteration was correctly smaller than the next


  [5, 3, 8, 4, 2]
*/

let count = 0;

function bubbleSort(arr) { // [2, 3, 4, 5, 8]
  let containedSwaps = true;

  while (containedSwaps) {
    let didSwapThisCycle = false; // true
    for (let i = 0; i < arr.length; i++) {
      count++;
      const currentNum = arr[i]; // 2
      const nextNum = arr[i+1]; // 3

      if (nextNum && currentNum > nextNum) {
        arr[i] = nextNum;
        arr[i+1] = currentNum;
        didSwapThisCycle = true;
      }
    }
    if (!didSwapThisCycle) {
      containedSwaps = false;
    }
  }

  return arr;
}

console.log(bubbleSort([5, 3, 8, 4, 2]));
console.log(count);
