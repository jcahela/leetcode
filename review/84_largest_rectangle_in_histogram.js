/**
 * @param {number[]} heights
 * @return {number}

 For the example [2,1,5,6,2,3]

 The largest rectangle is the one made up of 5 and 6, where 5 is the height, and 2 is the width, making it have an area of 10
 if there was another 2 at the end of the histogram, there'd be another rectangle of size 10 made up of the heights 5,6,2,3,2, with the lowest height of 2 being the height of the rectangle, and the width being 5 (making the area 10)

Brute force approach:
Iterate over the heights array, at each iteration, iterate a pointer from the current height starting at the height after it. Calculate the rectangle. Have a var hold the current largest rectangle
    - Starting at index 0 and 1, calculate the area: whichever height is lowest between 0 and 1, is the height. The number of heights between 0 and 1, including the ones at 0 and 1, is the width. If the area just calculated is greater than the current greatestArea var, set the var to be the newly calculated area
    - Move on to index 0 and 2, calculate the area: whichever height is lowest between indices 0 and 2, is the height. The number of heights between 0 and 2, including the ones at 0 and 2, is the width. If the area is greater, set the area (this doesn't work, because if the height at index 1 is lower than both 0 and 2, the height isn't the lower between 0 and 2, but the height is actually the one at index 1.)

1. Instantiate a mutable variable to hold the largestRectangle, starting at 0
2. Iterate over the heights array
    3. At each iteration, iterate over the heights array again, starting at i+1
    4. Calculate the lowest height between the two points, multiplied by the difference in indices + 1
    5. Check the calculated area against the largestRectangle variable, and set it to the newly calculated area if greater than the current largestRectangle

Time complexity: O(n^2)
Space complexity: O(1)


-------------------------

Using a stack:

Method: Using a monotonic increasing stack, I can iterate over the heights array. At each height, I can check if the height at the top of the stack is a height greater than the current height. If it's greater than the current height, first calculate the area that height would've made with the width of the current index minus the index of the height that's in the stack which is taller than the current height. The reason for this calculation is because, if the height at the top of the stack is greater than the current height, it can't extend its height to the current height to add to the rectangle area, it can only calculate its own height as the height, and a width of 1 as the width. Then, move on to the 2nd top-most height. If that height is also more than the current height, since we know the stack is monotonic increasing, it would be able to extend to the top-most stack to calculate its area. Therefore, I would just subtract the current index from the index at the 2nd top-most height to get the width for that area, then pop the 2nd top-most height from the stack. I would keep doing this until I reach a height that is equal to or less than the current height. If that's the case, I can continue to extend the leftmost heights in the stack towards the right, since it's always increasing in height. At the end of these checks, I can then push the current height onto the stack with either its original index as the index, or, if I popped 1 or more heights off the stack, set it to the index that is the index of the last height popped from the stack. Since the height at that last-popped index couldn't extend past the current height, it stands to reason that the current height COULD extend backwards to that height, calculating the full height. At the end of the iteration, I can then loop over the remaining items in the stack, these heights were not popped from the stack, meaning they satisfied the monotonic increasing nature of the stack. Because of this, their widths could be extended from their current index to the end of the array, so I can calculate their rectangles.

1. Instantiate a largestRectangle variable that starts at 0
2. Instantiate a stack that'll hold the monotonic increasing heights
3. Iterate over the heights array
    1. If on the first iteration, push the current height, and its index, as an array, onto the stack, then continue
    2. Check if the current height is smaller than the height at the top of the stack.
        1. If so, first instantiate an index var that'll hold the index of the latest height popped from the stack. 
        2. Then, iterate over a while loop: while the stack is not empty, and the item at the top of the stack is greater than the current height, do the following:
            1 pop the item on the top of the stack
            2 calculate its area with: (stackHeight * (currentIndex - stackIndex)). Set the largestRectangle if this area is greater than it
        3. After the while loop, you'll be at a point where the stack is monotonic increasing, and adding the current height and its index to the stack will maintain its monotonic increasing nature. Only add the current height to the stack if it's GREATER THAN the height at the top of the stack. If it's the same height, don't need to add it to the stack. When adding the height to the stack, set its index to be the index var since it should be the index of the most recent popped out height from the stack (it can go back that far)
    3. If the current height is greater than the height at the top of the stack, add it to the stack
4. Iterate over the stack, at each iteration, calculate the rectangle:
    1. Current height as the height, (length of the heights array - index for that height) as the width
    2. Set the largestRectangle if this area is greater than it
5. Return largestRectangle

Time complexity: O(n) - worst case scenario, it's a heights array that is also monotonic increasing, but with a height at the end that is smaller than all the heights before it. What this will do to the algorithm is, I'd iterate over the heights array n-1 times, then as I got to the last height, I'd iterate backwards through the entire stack, popping off, calculating areas, and all that, til the array became empty, then I'd place the last item in the stack. However, this is only 2n iterations, once through the heights array, and once through the stack which is of length 1, so it simplifies to O(n).
Space complexity: O(n) - since I'm using a stack, if the heights array were truly monotonic increasing, I'd have n amount of heights in the stack at the end of the heights loop.


 */

// [1,2,3] - the items remaining in the stack at the end are heights that can continue to the end of the heights array (1 at index 1, 2 at index 4, and 3 at index 5)

// [[1,0], [2,2], [3,5]]
//            0 1 2 3 4 5
//                        i
// heights = [2,1,5,6,2,3]


var largestRectangleArea = function(heights) {
  const stack = []; // monotonic increasing stack
  let largestRectangle = 0; // 10

  for (let i = 0; i < heights.length; i += 1) {
      if (i === 0) {
          stack.push([heights[i], i]);
          continue;
      }

      const currentHeight = heights[i]; // 3

      if (currentHeight > stack[stack.length - 1][0]) {
          stack.push([currentHeight, i]);
      }

      if (currentHeight < stack[stack.length - 1][0]) {
          let lastIndex; // 2
          while (stack.length && currentHeight < stack[stack.length - 1][0]) {
              const [topHeight, topIndex] = stack.pop(); // [5,2]
              lastIndex = topIndex;
              const currentArea = topHeight * (i - topIndex); // 5 * 4 - 2 = 10
              largestRectangle = Math.max(largestRectangle, currentArea);
          }
          stack.push([currentHeight, lastIndex]);
      }
  }

  for (rect of stack) { // [[1,0], [2,2], [3,5]]
      const [currentHeight, currentIndex] = rect; // [3,5]
      const currentRectangle = currentHeight * (heights.length - currentIndex); // 3 * (6 - 5) = 3
      largestRectangle = Math.max(largestRectangle, currentRectangle); // 10
  }

  return largestRectangle;
};
