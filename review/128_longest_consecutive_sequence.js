/**

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109


 * @param {number[]} nums
 * @return {number}

If I store the nums in a set, I could use O(1) time to check if a consecutive number is there
Then, I iterate over the nums array and check if the current number is the start of a sequence by checking if its left neighbor (currentNumber - 1) exists in the set
    If the current number - 1 exists in the set, then I can move on to the next
    If the current number - 1 doesn't exist in the set, then I'm at the beginning of a sequence, and I can increment by 1 until I find a number not in the set, then count that sequence

Time complexity: O(n) - where n is the length of the nums array since I'm iterating over it once to create the set, and if the whole thing consists of n number of subsequences (none of the sequences are more than 1 in length), then every number would be the start of a sequence, and I'd only check n + 1 to find its upper neighbor doesn't exist in the set, resulting in 2n operations, which simplifies to n.

Space complexity: O(n) - where n is the length of the nums array since I'm only using pointers and a set which contains all the nums

*/
var longestConsecutive = function(nums) {
  const numsSet = new Set(nums); // {100,4,200,1,3,2}

  let currentLongestSequence = 0; // 4

  for (let i = 0; i < nums.length; i += 1) {
      const leftNeighbor = nums[i] - 1; // 0
      let currentSequence = 0; // 4

      if (!numsSet.has(leftNeighbor)) {
          let currentNum = nums[i]; // 5
          while (numsSet.has(currentNum)) {
              currentSequence += 1;
              currentNum += 1;
          }
          currentLongestSequence = Math.max(currentLongestSequence, currentSequence);
      }
  }

  return currentLongestSequence;

};
