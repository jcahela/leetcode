Time to Complete: 45m

Method: Using a monotonic increasing stack, I can iterate over the heights array. At each height, I can check if the height at the top of the stack is a height greater than the current height. If it's greater than the current height, first calculate the area that height would've made with the width of the current index minus the index of the height that's in the stack which is taller than the current height. The reason for this calculation is because, if the height at the top of the stack is greater than the current height, it can't extend its height to the current height to add to the rectangle area, it can only calculate its own height as the height, and a width of 1 as the width. Then, move on to the 2nd top-most height. If that height is also more than the current height, since we know the stack is monotonic increasing, it would be able to extend to the top-most stack to calculate its area. Therefore, I would just subtract the current index from the index at the 2nd top-most height to get the width for that area, then pop the 2nd top-most height from the stack. I would keep doing this until I reach a height that is equal to or less than the current height. If that's the case, I can continue to extend the leftmost heights in the stack towards the right, since it's always increasing in height. At the end of these checks, I can then push the current height onto the stack with either its original index as the index, or, if I popped 1 or more heights off the stack, set it to the index that is the index of the last height popped from the stack. Since the height at that last-popped index couldn't extend past the current height, it stands to reason that the current height COULD extend backwards to that height, calculating the full height. At the end of the iteration, I can then loop over the remaining items in the stack, these heights were not popped from the stack, meaning they satisfied the monotonic increasing nature of the stack. Because of this, their widths could be extended from their current index to the end of the array, so I can calculate their rectangles.

Pseudocode:
/*
1. Instantiate a largestRectangle variable that starts at 0
2. Instantiate a stack that'll hold the monotonic increasing heights
3. Iterate over the heights array
  3.1. If on the first iteration, push the current height, and its index, as an array, onto the stack, then continue
  3.2. Check if the current height is smaller than the height at the top of the stack.
    3.2.1. If so, first instantiate an index var that'll hold the index of the latest height popped from the stack.
    3.2.2. Then, iterate over a while loop: while the stack is not empty, and the item at the top of the stack is greater than the current height, do the following:
      3.2.2.1 pop the item on the top of the stack
      3.2.2.2 calculate its area with: (stackHeight * (currentIndex - stackIndex)). Set the largestRectangle if this area is greater than it
    3.2.3. After the while loop, you'll be at a point where the stack is monotonic increasing, and adding the current height and its index to the stack will maintain its monotonic increasing nature. Only add the current height to the stack if it's GREATER THAN the height at the top of the stack. If it's the same height, don't need to add it to the stack. When adding the height to the stack, set its index to be the index var since it should be the index of the most recent popped out height from the stack (it can go back that far)
  3.3. If the current height is greater than the height at the top of the stack, add it to the stack
4. Iterate over the stack, at each iteration, calculate the rectangle:
  4.1. Current height as the height, (length of the heights array - index for that height) as the width
  4.2. Set the largestRectangle if this area is greater than it
5. Return largestRectangle
*/

Code:

```js
var largestRectangleArea = function(heights) {
    let largestRectangle = 0;
    const stack = [];

    for (let i = 0; i < heights.length; i++) {
        const currentHeight = heights[i];
        if (i === 0) {
            stack.push([currentHeight, i]);
            continue;
        }

        const topStackHeight = stack[stack.length - 1][0];
        
        if (currentHeight > topStackHeight) {
            stack.push([currentHeight, i]);
        }

        if (currentHeight < topStackHeight) {
            let furthestBackIndex = i;
            while (stack.length && stack[stack.length - 1][0] > currentHeight) {
                const [poppedStackHeight, poppedStackIndex] = stack.pop();
                const poppedStackArea = poppedStackHeight * (i - poppedStackIndex);

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
```


Time Complexity: O(n)
Explanation: Where n is the number of heights in the heights array. Worst case scenario, it's a heights array that is also monotonic increasing, but with a height at the end that is smaller than all the heights before it. What this will do to the algorithm is, I'd iterate over the heights array n-1 times, then as I got to the last height, I'd iterate backwards through the entire stack, popping off, calculating areas, and all that, til the array became empty, then I'd place the last item in the stack. However, this is only 2n iterations, once through the heights array, and once through the stack which is of length n-1, so it simplifies to O(n).

Space Complexity: O(n)
Explanation: Where n is the number of heights in the heights array. Since I'm using a stack, if the heights array were truly monotonic increasing, I'd have n amount of heights in the stack at the end of the heights loop.
