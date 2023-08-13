/*

First I need to use binary search to find the array that contains the range where the target could be

Then, once I find that array, I need to use binary search within the array to find the specific target

If I find the target in the array where it could be, return true

If i don't find the target in the array where it could be, return false at the end

Pseudocode:
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at matrix.length - 1
3. While left <= right
    1. Instantiate a mid pointer at Math.ceil((left + right) / 2)
    2. Instantiate a current array var at matrix[mid]
    3. Instantiate an arrMin var at current array[0]
    4. Instantiate an arrMax var at current array[currentarray.length - 1]
    5. if the target is less than arrMin - the target array is to the left
        1. right = mid - 1
    6. If the target is greater than arrMax - the target array is to the right
        2. left = mid + 1
    7. Else (target is greater than arrMin and lesser than arrMax, meaning the target is within this array)
        1. Instantiate an l pointer at 0
        2. Instantiate an r pointer at current array.length - 1
        3. While l <= r
            1. Instantiate an m pointer at Math.ceil((l + r) / 2)
            2. Instantiate a currentNum var at currentArray[m]
            3. If the target is less than the currentNum, check the left to the currentNum
                1. r = m - 1
            4. If the target is greater than the currentNum, check the right to the currentNum
                1. l = m + 1
            5. Else, you found the target
                1. Return true
        4. Break (if at this point you didn't find the target, it's not in any of the other arrays, so break out of the original binary search)
4. Return false

Time complexity: O(log(m * n)) - Where m is the length of the matrix and n is the length of the target array, since I'm running binary search on n within the binary search on m, the two get multiplied to equal O(log(m*n))

Space complexity: O(1) - Since I'm only using pointers for binary search and comparisons

*/

function searchMatrix(matrix: number[][], target: number): boolean {
  let left = 0;
  let right = matrix.length - 1;
  while (left <= right) {
      const mid = Math.ceil((left + right) / 2);
      const currentArr = matrix[mid];
      const min = currentArr[0];
      const max = currentArr[currentArr.length - 1];

      if (target < min) {
          right = mid - 1;
      } else if (target > max) {
          left = mid + 1;
      } else {
          let l = 0;
          let r = currentArr.length - 1;

          while (l <= r) {
              const m = Math.ceil((l + r) / 2);
              const currentNum = currentArr[m];

              if (target < currentNum) {
                  r = m - 1;
              } else if (target > currentNum) {
                  l = m + 1;
              } else {
                  return true;
              }
          }

          break;
      }
  }

  return false;
};
