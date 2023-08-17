/* None

The time complexity of O(log (m + n)) implies a binary search method

How to do binary search on two different arrays at the same time, while treating them as one array?

[1,3,5] [2,4,6]

merged = [1,2,3,4,5,6]

median = 3.5

Since both arrays are sorted, I know the min and max of both arrays

I could take the min between the two mins to be the ultimate min
And the max between the two maxes to be the ultimate max

 l1    r1 l2  r2     
[1, 3, 5] [2, 4]

that would make the minimum 1 and the maximum 5, both from the first array

Brute force would be to merge the two arrays, then find the median using math at O(1), but that time complexity os O(m + n) not O(log(m + n))


*/

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

};
