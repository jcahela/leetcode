Time to Complete: 30m

Method: Bucketsort. Use a hashmap to get a count of each distinct number in the nums array. Then, use an array that holds an array of each number organized such that the index of the array is the count, and the array at that index is each number in the nums array with that count. Iterate over the counts array backwards, until you find k amount of numbers (since the filled array with the highest index is the one with the highest count, this naturally gets the most frequent numbers first).

 0   1   2     3     4  5  6
[[], [3], [], [1, 2], [], [], []] <-

Pseudocode:
/*
1. Instantiate an output array as empty
2. Instantiate a buckets array at nums.length + 1 filled with arrays (if nums contains all the same number, it would have nums.length frequency of that number, and since the buckets array is 0 indexed, it'll need 1 more slot at the end to hold the count of nums.length)
3. Instantiate a hashmap for the counts of nums
4. Iterate over the nums array, and put each num and their count in the counts map
5. Iterate over the keys of the counts map, and use the value as a key into the buckets array, and put the current number in the array at that index
6. Iterate over the buckets array backwards, and if you come across an array that's non-empty, iterate over that array
    1. put the first number in the output array, then decrement k
    2. if k is 0, return output
7. Return the output array (if k is ever greater than the number of unique elements in nums, then k would never reach 0 and step 6.2 above, so return output array at the end too, just in case).
*/

Code:

```js
function topKFrequent(nums: number[], k: number): number[] {
    const output = [];
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    const counts = {};

    for (const num of nums) {
        counts[num] ? counts[num] += 1 : counts[num] = 1;
    }

    const uniqueNums = Object.keys(counts)

    for (let i = 0; i < uniqueNums.length; i += 1) {
        buckets[counts[uniqueNums[i]]].push(uniqueNums[i]);
    }
    for (let j = buckets.length - 1; j >= 0; j -= 1) {
        if (buckets[j].length) {
            for (const uniqueNum of buckets[j]) {
                output.push(uniqueNum);
                k -= 1;

                if (k === 0) {
                    return output;
                }
            }
        }
    }
};
```


Time Complexity: O(n)
Explanation: Where n is the length of the nums array. Since I loop through the nums array to create the hashmap of counts (O(n)), then loop through the keys of that map (O(n)). Then, I iterate backwards over the counts array until k is 0, the most expensive operation by order of magnitude is iterating backwards of the counts array n, but it's limited by k such that it'll stop once I reach k number of elements within the subarrays. So overall time complexity is O(n)

Space: O(n)
Explanation: Where n is the length of the nums array. Since I create a hashmap that holds the count of each distinct number in the nums array (O(n)) and create a bucketArray that holds each num at an index that represents their count (O(n)), then create a distinctNums array that holds the keys of the hashmap to push the nums at the correct indexes of the bucketArray (O(n)), the overall space complexity is O(3n) which simplifies to O(n).
