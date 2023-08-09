Time to Complete: 30m

Method: Using binary search, and figuring out at each iteration which side to shift the pointers to next (left or right). In a sorted array, the number on the left is always less than the number on the right. This can be used to determine if the left pointer is currently on the minimum number: if at any iteration the left number is less than the right number, you're on an array between left and right that's completely sorted, left < all numbers in between < right. So set the minimum var to the left if the left number is less than the minimum var (you could be in a situation where left is less than right, but you've already found the minimum number, and you want the min var to keep holding the minimum and not overwrite it with a greater number). If this isn't the case, then your left pointer isn't on a possible minimum, so calculate the mid point. The mid point could be the minimum, and if it's smaller than the currently calculated minimum (outside the loop), then set that minimum var to be the current mid number. Then check: is the number at mid greater than or equal to the number at l? That means the cycle occurs on the right sorted portion of the array, so set l to be m + 1. Else (the number at m is less than the number at l), that means the cycle occurs on the left sorted portion of the array, so set r to be m - 1. Finally, return mid, since either you've found the minimum number by landing on a subarray in which left is less than right, or the last number you checked with m is the minimum if you never landed on the minimum with the left pointer.

Pseudocode:
/*
1. Instantiate a min number that starts at the first number in the array (if the array is of length 1, or if the array is rotated n times so in its original sorted state, this will already be the minimum number. If the array is longer than 1 or the array has been rotated n - 1 times, this won't be the minumum, but we'll find it in the binary search of the array, so it doesn't matter)
2. Make a left pointer at 0
3. Make a right pointer at nums.length - 1
4. While left <= right:
    1. Check if the number at the left pointer is less than the number at the right pointer
        1. If this is true, that means the left number is the minimum, since every number between left and right would be greater than left
        2. So, return the number at left pointer
    2. Calculate the midpoint to be left + right / 2 rounded up
    3. If the number at m is greater than or equal to the number at l:
        1. The cycle occurs on the right, so the minimum number is on the right sorted portion (right of m)
        2. so set l to be m + 1
    4. else (number at m is less than number at l)
        1. The cycle occurs on the left, so the minimum number is in the left sorted portion (left of m)
        2. so set r to be m - 1
5. Return min
*/

Code:

```js
function findMin(nums: number[]): number {
    let min = nums[0];

    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        if (nums[l] < nums[r]) {
            min = Math.min(nums[l], min);
            break;
        }

        const m = Math.ceil((l + r) / 2);

        min = Math.min(nums[m], min);

        if (nums[m] >= nums[l]) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return min;
};
```


Time Complexity: O(log n)
Explanation: Since I'm halving the array I'm searching for each iteration

Space: O(1)
Explanation: Since I'm only using pointers
