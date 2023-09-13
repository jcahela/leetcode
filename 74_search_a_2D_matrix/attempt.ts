/*

I could use binary search on the outer array to find which inner array contains the target

Then I could use binary search on the inner array to find the target

Pseudocode:
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at matrix.length - 1
3. While left is <= right (so they are allowed to converge to check any middle-most indices)
    1. Instantiate a mid pointer at Math.ceil((left + right) / 2);
    2. Instantiate a currentArr at matrix[mid]
    3. Instantiate a currentArrMin at currentArr[0]
    4. Instantiate a currentArrMax at currentArr[currentArr.length - 1]
    5. If the target is less than currentArrMin
        1. Set right to mid - 1
    6. Else if target is greater than currentArrMax
        1. Set left to mid + 1
    7. Else (the target is in this array's min-max range)
        1. Instantiate an l pointer to 0
        2. Instantiate a r pointer to currentArr.length - 1
        3. While l <= r
            1. Instantiate an m pointer to Math.ceil((l + r) / 2);
            2. Instantiate a currentNum at currentArr[m]
            3. If the target is less than currentNum
                1. Set r to mid - 1
            4. If the target is greater than currentNum
                1. Set l to mid + 1
            5. Else
                1. You found target, return true
        4. After the loop on step 3, that means you've found the only array that could've held the target, but you didn't find the target in step 3, so the target doesn't exist in the matrix, so return false.

Time complexity: O(log(m * n)) - Since I'm using binary search and halving the number of arrays in m (outer array) I have to search at each iteration, then once I find the array that could contain the target, I'm using binary search again and halving the number of nums to check in that array n, so overall the time complexity is O(log(m * n))

Space complexity: O(1) - Since I'm only using pointers

*/

function searchMatrix(matrix: number[][], target: number): boolean {
  let left = 0;
  let right = matrix.length - 1;

  while (left <= right) {
      const mid = Math.ceil((left + right) / 2);
      const currentArr = matrix[mid];
      const currentArrMin = currentArr[0];
      const currentArrMax = currentArr[currentArr.length - 1];

      if (target < currentArrMin) {
          right = mid - 1;
      } else if (target > currentArrMax) {
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

          return false;
      }
  }
  return false;
};

/*************** Attempt #2 - easy, double binary search ***************/

/*



*/

function searchMatrix(matrix: number[][], target: number): boolean {

    let left = 0;
    let right = matrix.length - 1;

    while (left <= right) {
        const mid = Math.ceil((left + right) / 2);

        const midArr = matrix[mid];

        const min = midArr[0];
        const max = midArr[midArr.length - 1];

        if (target < min) {
            right = mid - 1;
        } else if (target > max) {
            left = mid + 1;
        } else {
            let l = 0;
            let r = midArr.length - 1;

            while (l <= r) {
                const m = Math.ceil((l + r) / 2);

                const midNum = midArr[m];

                if (target < midNum) {
                    r = m - 1;
                } else if (target > midNum) {
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
