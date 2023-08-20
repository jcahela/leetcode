/**
 * @param {number[]} heights
 * @return {number}

To find the largest rectangle I will be given an array of heights that look like this:


If I use a monotonic increasing stack, I can iterate through the heights:

[[2,0]]

1

is 1 > 2? No, so pop 2 off, calculate the height and width of the rectangle 1 makes with the 2 before it, then push 1 on, but save the index of the most recently popped off height:

  height: 1
  width: (currentIndex - poppedIndex) + 1 = 2

  area: 2

[[1,0]]

5

is 5 > 1? Yes, so push 5 onto the stack

[[1,0], [5,2]]

6

is 6 > 5? Yes, so push 6 onto the stack

[[1,0], [5,2], [6,3]]

2

is 2 > 6? No, so pop 6 off, then calculate the height and width of the rectangle

4-3 + 1 = 2 * 2 = 4


           i
 0 1 2 3 4 5
[2,1,5,6,2,3]

*/

var largestRectangleArea = function(heights) {
  let largestRectangle = 0; // 10
  const stack = []; // [[1,0], [2,2], [3,5]] // the ones left on the stack had their indices moved back to a point where it can be counted as rectangles from that index to the end.
  // so for number 2 at index 4, once you calculate all heights that are larger than it, it lands on index 2, at which point it can make a rectangle until the last index

  for (let i = 0; i < heights.length; i++) {
      const currentHeight = heights[i]; // 2
      if (i === 0) {
          stack.push([currentHeight, i]);
          continue;
      }

      const topStackHeight = stack[stack.length - 1][0]; // 6
      
      if (currentHeight > topStackHeight) {
          stack.push([currentHeight, i]);
      }

      if (currentHeight < topStackHeight) {
          let furthestBackIndex = i; // 2
          while (stack.length && stack[stack.length - 1][0] > currentHeight) {
              const [poppedStackHeight, poppedStackIndex] = stack.pop(); // 5, 2
              const poppedStackArea = poppedStackHeight * (i - poppedStackIndex); // 5 * (4 - 2) = 10

              if (poppedStackArea > largestRectangle) {
                  largestRectangle = poppedStackArea;
              }

              furthestBackIndex = poppedStackIndex;
          }
          if ((stack.length && stack[stack.length - 1][0] < currentHeight) || !stack.length) {
              stack.push([currentHeight, furthestBackIndex]);
          }
      }
  }

  for (let i = 0; i < stack.length; i++) {
      const [currentHeight, currentIndex] = stack[i];
      const area = currentHeight * (heights.length - currentIndex);
      if (area > largestRectangle) {
          largestRectangle = area;
      }
  }

  return largestRectangle;
};

/************************ Attempt #2 easy, fast ~20 mins ***************************/
/**

Use a monotonic increasing stack that keeps track of heights that could have their areas calculated forward in the heights array

[[0,2], [1,1]] -> [[0,1]]

1-0 * 2 = 2

After putting it onto the stack, any heights that were popped from the stack should have their index saved in the array that was just pushed, because theoretically the height that was pushed from the stack could go backwards to any larger heights before it

At the end, you'll then calculate the monotonic increasing stack heights and what their area would be if it went to the end of the heights array

Pseudocode:

1. Instantiate a stack at []
2. Instantiate a largestRect var at 0
3. Iterate through the heights array
    1. if the stack is empty
        1. Push the current height onto the stack with its index as a tuple ([index, height])
    2. Else
        1. Instantiate a lastPoppedHeightIndex var with let at the current index
        2. While the current height is smaller than the height at the top of the stack
            1. Pop the top tuple from the stack and store its first value as topIndex and second value as topHeight
            2. Calculate the area as currentIndex - topIndex for width, and topHeight as height
            3. Replace largestRect with that calculated area if the calculated area is greater than the current largestRect
            4. Set lastPoppedHeightIndex as topIndex
        3. Add the current height onto the stack as a tuple, but use lastPoppedHeightIndex as its index, so its height can be calculated up to the end of the array from that lastPoppedHeightIndex: [lastPoppedHeightIndex, currentHeight]
4. Iterate through the stack
    1. Store the current tuple's first value as currentIndex and second value as currentHeight
    2. Calculate the area with the height being currentHeight, and the width being heights.length - currentIndex
    3. Set largestRect to the above calculated area if the above calculated area is greater than largestRect
5. Return largestRect

Time complexity: O(h) - Where h is the length of the heights array. Since we iterate through heights once, and only backtrack to make sure the stack is constantly increasing, then iterate through the remainder of increasing heights in the stack after the original looo, that is all a coefficient of h and not an order of magnitude greater, so it simplifies to O(h)

Space complexity: O(h) - Where h is the length of the heights array. If the heights array is constantly increasing, the stack would hold h amount of items

 */

function largestRectangleArea(heights: number[]): number {
    const stack = [];
    let largestRect = 0;
    for (let i = 0; i < heights.length; i += 1) {
        if (!stack.length) {
            stack.push([i, heights[i]]);
        } else {
            let lastPoppedHeightIndex = i;
            while (stack.length && heights[i] < stack[stack.length - 1][1]) {
                const [topIndex, topHeight] = stack.pop();
                const poppedArea = (i - topIndex) * topHeight;
                console.log(topIndex);
                largestRect = Math.max(largestRect, poppedArea);
                lastPoppedHeightIndex = topIndex;
            }

            stack.push([lastPoppedHeightIndex, heights[i]]);
        }
    }

    for (let i = 0; i < stack.length; i += 1) {
        const [backtrackedIndex, backtrackedHeight] = stack[i];
        const backtrackedArea = (heights.length - backtrackedIndex) * backtrackedHeight;
        largestRect = Math.max(largestRect, backtrackedArea);
    }

    return largestRect;
};
