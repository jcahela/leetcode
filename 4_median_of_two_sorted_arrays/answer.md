Time to Complete: 45m

Method: Partitioning the two arrays into equal left and right portions, then using binary search to find the median. Partitioning the two number arrays so that you can find the spot where the left and right partitions meet (the median). If you add the lengths of the two number arrays and divide them by 2, you get the length you'd want the left partition to be. For example, if nums1 is length 6, and nums2 is length 7, the total is 13. Divide that by 2, and you get 6.5, and rounded down you get 6. So the left parition will be length 6, and the right partition length 7. Once you have the size of what you want the left partition to be, you want to perform binary search on the shorter input array, in order to find the median. The median will either exist in the shorter array or the longer array, but it will be found with binary search of the shorter array through calculating partitions of the two arrays to create the left and right partitions, and continuing until you find a scenario where the max number in the left partition (made up of A and B numbers, potentially) is less than the min number of the right partition (made up of A and B numbers, potentially).

Pseudocode:
/*
1. Instantiate a variable A and B, which will be the input nums1 and nums2. A will be the shorter of the two, and B will be the longer, if they're different lengths
2. Instantiate a total variable that is the total length of A and B (to calculate the half, or left partition size)
3. Calculate a half variable that is the total / 2 rounded down
4. Instantiate a left and right pointer, to binary search A (l = 0 and r = A.length - 1)
5. Instantiate a while loop that always runs (since we're guaranteed to find a median somewhere in the 2 arrays)
    1. Instantiate a midACutoff variable that is the middle between left and right. Since A is guaranteed to be the shorter of the 2 arrays from step 1, then half of this array is guaranteed to be less than the half variable (if the middle of A was more than the half variable, it'd be too many numbers, but that would be impossible)
    2. Instantiate a midBCutoff which is half - midACutoff - 2 (whatever numbers A is including in the left partition, B includes the rest until the numberes equal to half. If half is 6, and midACutoff is 4, then midBCutoff is 0. A contributes 5 numbers, B contributes 1, for a total of 6, which is the 'half').
    3. Instantiate the ALeft, BLeft, ARight, and BRight variables
        1. ALeft will be the number at midACutoff. If midACutoff is out of bounds, set it to -Infinity
        2. ARight will be the number at midACutoff + 1. If midACutoff + 1 is out of bounds, set it to Infinity
        3. BLeft will be the number at midBCutoff. If midBCutoff is out of bounds, set it to -Infinity
        4. BRight will be the number at midBCutoff + 1. If midBCutoff + 1 is out of bounds, set it to Infinity
    4. Now, we can check the two partitions. The max of the lefts, and the min of the rights, should be in the correct ascending order. So, if ALeft is <= BRight, AND BLeft is <= ARight, then we've found the correct partitions.
        1. If we've found the correct partitions, we can calculate the median. If the total length of nums1 and nums2 (the theoretical 'sorted' array combination of both) is even, then we have to calculate the median by getting the max of the two left partitions (max(ALeft, BLeft)), and adding that number to the min of the two right partitions (min(ARight, BRight)), then divide that by 2 to get the average between the two numbers. It doesn't matter that we don't have the left and right partitions sorted, what matters is we know the max of the point where the left partition ends will be the last number in the left partition, and the min of the point where the right partition starts will be the first number in the right partition. Getting these two numbers allows us to calculate the median average.
        2. If the total length of nums1 and nums2 is odd, there's a single number that's the median. Since we used the half variable rounded down to calculate the left partition, we know the left partition is smaller than the right partition. So, return the mininumum of the rights (min(ARight, BRight)). If we rounded up to get the half, we'd get the maximum of the lefts (max(ALeft, BLeft))
    5. If ALeft is > BRight, then the A contribution to the left partition is too large. We need to move the right pointer down to get a smaller midACutoff, which gets us a larger midBCutoff, in order to satisfy step 5.4. So set the right pointer r = midACutoff - 1
    6. Else (in this else, if steps 5.4 and 5.5 are false, that means BLeft > ARight), if this is reached, we know ARight has too few numbers, since the last number in the left partition of B is greater than the first number of the right partition of A, so we need A to grow. So set the left pointer l = midACutoff + 1

We don't need to return anything at the end or exit the while loop, because either the median exists in A, or it exists in B, so we'll always get to a point where the left partition, made up of numbers of A and B, and the right partition, made of numbers of A and B, are equal to half, and satisfy the condition of max(left) < min(right).
*/

Code:

```js
var findMedianSortedArrays = function(nums1, nums2) {
    const A = nums1.length < nums2.length ? nums1 : nums2;
    const B = nums1.length < nums2.length ? nums2 : nums1;

    const total = A.length + B.length;
    const half = Math.floor(total / 2);

    let l = 0;
    let r = A.length - 1;

    while (true) {
        const midACutoff = Math.floor((l + r) / 2);
        const midBCutoff = half - midACutoff - 2;
        const ALeft = (midACutoff < 0) ? -Infinity : A[midACutoff];
        const ARight = ((midACutoff + 1) > (A.length - 1)) ? Infinity : A[midACutoff + 1];
        const BLeft = (midBCutoff < 0) ? -Infinity : B[midBCutoff];
        const BRight = midBCutoff + 1 > B.length - 1 ? Infinity : B[midBCutoff + 1];

        if (ALeft <= BRight && BLeft <= ARight) { 
            if (total % 2 === 0) {
                return ((Math.max(ALeft, BLeft) + Math.min(ARight, BRight))) / 2;
            } else {
                return Math.min(ARight, BRight);
            }
        } else if (ALeft > BRight) {
            r = midACutoff - 1;
        } else {
            l = midACutoff + 1;
        }
    }
};
```


Time Complexity: O(log * min(n,m))
Explanation: Where n is the length of nums1 and m is the length of nums2. Since we're performing binary search on the minimum of the two, the total time complexity is O(log * min(n,m))

Space Complexity: O(n + m)
Explanation: Where n is the length of nums1 and m is the length of nums2, since I'm storing these in arrays A and B, and using pointers to do binary search on A.
