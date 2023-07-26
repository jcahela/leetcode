/*

Since the container can contain other potential heights in between (essentially ignores them), I can use two pointers that start at either end of the heights array. Using those two pointers, I could calculate the area:
    the smaller height of the two boundary heights (height) x the difference between r and l (width)
Then, I would increment/decrement the smaller of the two heights, because the only way to get a bigger width is by having a larger height, since the other containers being checked will have a smaller width as the pointers move inward. So, to search for a bigger height, I need to increase the limiting variable in the height, since the width is always shrinking, and that limiting variable is the smaller of the two heights.

I'd then calculate the area again, replace the area variable if it's larger, then increment/decrement the smaller height, and keep checking

       l r
 0 1   2 3   4 5 6 7 8
[1,8,600,2,500,4,8,3,7]

1st area: 1 * 8 = 8
    - increment l

2nd area: 7 * 7 = 49
    - decrement r

3rd area: 3 * 6 = 18
    - decrement r

4th area: 8 * 5 = 40
    - increment l (when equal)

5th area: 8 * 4 = 32
    - decrement r

6th area: 4 * 3 = 12
    - decrement r

7th area: 500 * 2 = 1000
    - decrement r

8th area: 2 * 1 = 2

Largest area = 1000

Pseudocode:
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at heights.length - 1
3. Instantiate a largestArea variable at 0
4. while l < r
    1. Get the min between the number at l and the number at r. That'll be the height: Math.min(heights[l], heights[r])
    2. Subtract r and l, that'll be the width: r - l
    3. Multiply 1 and 2 together, that's the area
    4. Set the largestArea variable to be the larger between itself and the newly calculated area
    5. if left is less than or equal to right:
        1. increment l
    6. else:
        1. decrement r
5. Return largestArea

Time complexity: O(n) - since we only iterate through heights once using the two pointers
Space complexity: O(1) - since we only use pointers and a largestArea variable


*/

//    l           r
// [1,8,6,2,5,4,8,3,7]

function maxArea(height: number[]): number {
  let l = 0;
  let r = height.length - 1;
  let largestArea = 0; // 49

  while (l < r) {
      const h = Math.min(height[l], height[r]); // 3
      const w = r - l; // 7
      const area = h * w; // 49
      largestArea = Math.max(largestArea, area); // 49

      if (height[l] <= height[r]) {
          l += 1;
      } else {
          r -= 1;
      }
  }

  return largestArea;
};
