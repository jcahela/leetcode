/*

This looks like it could be solved recursively to find every possible subset of an array of unique numbers

The max length of a subset is the length of the original nums, but every subset would be a valid subset, so I'd push to the output array every time

So I would instantiate an output array first, then define a backtrack function with the parameters (subset, remainingNums)

    - At each recursive call, push the current subset to the output array
    - Then, add the first number to the output array and recursively call the function
    - Then, add the last number to the output array and recursively call the function

function backtrack(subset, remaining) {
    if (subset.length) output.push(subset);

    backtrack([remaining[0]], remaining.slice(1));
    remaining.pop();
    backtrack([remaining[remaining.length - 1]], remaining)
}

*/

function subsets(nums: number[]): number[][] {
  const output = [];

  function backtrack(subset, remaining) {
      if (subset.length) {
          output.push(subset);
          return;
      }

      backtrack([...subset, remaining[0]], remaining.slice(1));
      remaining.pop();
      backtrack([...subset, remaining[remaining.length - 1]], remaining)
  }

  backtrack([], nums);

  return output;
};
