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
