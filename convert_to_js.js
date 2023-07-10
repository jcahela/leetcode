// Input = [2, 7, 3, 5, 4, 6, 8]
// Expected Output: [7, 8, 5, 6, 6, 8, -1]

const nums = [2, 7, 3, 5, 4, 6, 8];

function getNextGreaterElements(nums) {
  const stack = []; // acts as a placeholder for indices that haven't been figured out where its next greater element is. Once you reach a number in the nums array that is greater than the number at the most recent index, that index in the result array gets set to the current number in nums, and the the next most recent index in the stack is checked. If the number at that index in the nums array is still less than the current number, you put the current number in that index in the result array, since the current number would still be the NEXT greater element. This is the while loop below. Once you hit an index in the stack whose number in the nums array is GREATER than the current number in the nums array, you've found a number that isn't a next greater element, and the current index is also one that hasn't been figured out yet what its own next greater element is. That's when you push the current index onto the stack, then check the next number in the nums array.
  const result = Array.from({length: nums.length}, () => -1);

  for (let i = 0; i < nums.length; i += 1) { 
    const currentNum = nums[i];
    const mostRecentIndexInStack = stack[stack.length - 1];
    
    while (stack.length > 0 && nums[mostRecentIndexInStack] < currentNum) {
      result[mostRecentIndexInStack] = currentNum;
      stack.pop();
    }
  
    stack.push(i);
  }
  
  return result

}
  
console.log(getNextGreaterElements(nums));
