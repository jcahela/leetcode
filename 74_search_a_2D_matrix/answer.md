Time to Complete: 30m

Method: Binary search then binary search. I can use binary search of the outer array to find the array I need to search. In order to do this, I use the same concept as binary search on an array of numbers, but I check the target against the min of the midpoint array, and the max of the midpoint array. If the target is less than the midpoint array's min, set the right pointer to mid - 1, and if the target is greater than midpoint array's max, set the left pointer to mid + 1. Using this method, I can find the array whose range contains the target in log n times, where n is the number of arrays, or rows, in the matrix. Once I find the correct array, I can use binary search again to find the target in that array in log m times, where m is the length of that array.

Pseudocode: 
/*
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
4. Return false (if you've reached here, either the target didn't exist in the array whose range could contain the target, or no array existed in the matrix that could contain the target. Either way, false)
*/

Code:
```ts
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
```

Time Complexity: O(log(m * n))
Explanation: Where m is the length of the matrix, and n is the length of the array found whose range contains the target. Since I'm using binary search on the matrix itself to find a target array whose range contains the target, I'm doing that in O(logm) time. Then, nested in the outer loop, I'm running another binary search on the target array found in the first binary search. Best case scenario I don't even find a target array, and I don't perfrom the second binary search, and return false after the first binary search (which is O(log n)). Worst case scenario, the target array is found and I have to perform binary search on it to determine if the target exists in it. So worst case time complexity is O(log(m * n))

Space Complexity: O(m)
Explanation: Where m is the length of the target array, if found. Since I'm storing this array in a variable  to then binary search through, the overall space complexity is O(m).
