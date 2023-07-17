/**

Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.


Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]
 

Constraints:

1 <= temperatures.length <= 105
30 <= temperatures[i] <= 100


 * @param {number[]} temperatures
 * @return {number[]}

I could use a monotonic stack to keep track of days which I haven't found a higher temperature, and once I find a higher temperature, pop off the end of the stack to compare (subtract indices)

Temperatures:

 i
 0  1  2  3  4  5  6  7
[73,74,75,71,69,72,76,73]
[]
[1, 1, 4, 2, 1, 1, 0, 0]

Iterations:
1. Stack is empty, push the current index to the stack
2. Stack is not empty, is the current temperature greater than the temperature at the index of the last index in the stack?
    currentTemp = 74; lastIndex = 0; tempAtLastIndex = 73. 74 > 73? TRUE
    1. If true:
        1. While the current temperature is greater than the temperature at the index of the last index in the stack:
            1. Set the difference between the current index and index at the end of the stack at the index at the end of the stack(0)'s location in the output array: output[stack[stack.length - 1]] = lastIndex - currentIndex
            2. pop the index out of the stack
    2. Push the current index to the stack

Output:
[1,1,4,2,1,1,0,0]

Pseudocode:
1. Instantiate a stack that will track indices that have monotonically increasing temperatures that haven't been found yet
2. Instantiate an output array that is the length of the temperatures array, with 0 as its initial value at each index
3. Iterate over the temperatures array
    1. If the stack is not empty AND the current temperature is greater than the temperature at the index of the last index in the stack
        1. While the current temperature is greater than the temperature at the index of the last index in the stack:
            1. Set the difference between the current index and index at the end of the stack at the index at the end of the stack(0)'s location in the output array: output[stack[stack.length - 1]] = currentIndex - lastIndex
            2. pop the index out of the stack
    2. Push the current index to the stack
4. Return the output array

Time complexity: O(n) - Where n is the length of the temperatures array. Worst case scenario, the temperature decreases from index 0 to index length - 2, then at length - 1 (final index in temperatures array) the temperature is greater than all previous temperatures. In this example, you would continue to fill the stack with each index, until reaching the last index, at which point you will go through a while loop from the end of the stack down to the beginning, the time complexity would then be O(2n), where 1 n is used to iterate through n-1 of the temps array, and at the last iteration, iterate over the stack backwards, which at that point would have a length of n-1 also. At worst, this is 2n time complexity, which simplifies to O(n).

Space complexity: O(n) - Where n is the length of the temperature array, since we're using a stack that could hold all indices of the temp array if the temp array is only decreasing in temperature.

*/

/*

                         i
 0  1  2  3  4  5  6  7
[73,74,75,71,69,72,76,73]
[7]
[1,  1, 4, 2, 1, 1, 0, 0]

*/

var dailyTemperatures = function(temperatures) {
    const stack = [];
    const output = Array.from({ length: temperatures.length }, () => 0);

    for (let i = 0; i < temperatures.length; i += 1) {
        const currentTemp = temperatures[i];

        while (stack.length && currentTemp > temperatures[stack[stack.length - 1]]) {
            const lastIndex = stack[stack.length - 1];
            output[lastIndex] = i - lastIndex
            stack.pop();
        }

        stack.push(i);
    }

    return output;
};
