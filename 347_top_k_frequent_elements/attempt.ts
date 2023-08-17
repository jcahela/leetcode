/*

If I use an array data structure, I can treat each index as the count, and the numbers at that index as the numbers in nums input with that count. So each index in the array will be an array, and each number will be in a specific index based on its frequency in nums

ex.

[1,1,1,2,2,3]

  0  1   2   3   4  5  6
[[],[3],[2],[1],[],[],[]]

Then, if I iterate over the array backwards, I can get numbers from each array at each index k number of times, and put that in an output. Once k is 0, I can break out of the backwards loop, and return the output array with the k most frequent elements

Pseudocode:
1. Instantiate an output array as empty
2. Instantiate a buckets array at nums.length + 1 filled with arrays (if nums contains all the same number, it would have nums.length frequency of that number, and since the buckets array is 0 indexed, it'll need 1 more slot at the end to hold the count of nums.length)
3. Instantiate a hashmap for the counts of nums
4. Iterate over the nums array, and put each num in the counts map
5. Iterate over the keys of the counts map, and use the value as a key into the buckets array, and put the current number in the array there
6. Iterate over the buckets array backwards, and if you come across an array that's non-empty, iterate over that array
    1. put the first number in the output array, then decrement k
    2. if k is 0, break
7. Return the output array

Time complexity: O(n) - since we iterate over the nums array once to get the count, each unique number once to place them into the buckets array, then potentially n number of iterations in the bucket until k is 0, whichever comes first, the simplified time complexity would be O(n)

Space complexity: O(n) - since we store each uniqe number in the buckets array, and each unique number in the hashmap of counts, the overall time complexity is O(n)


*/

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

    return output;
};
