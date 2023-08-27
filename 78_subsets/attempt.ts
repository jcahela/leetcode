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

/**************** Attempt #2 - Success no assistance, didn't fully follow the 2 decisions decision tree method, but ended up in the same result *****************/

/*

                                  []
                        [1]      [2]         [3]
                    [1,2] [1,3] [2,3]
                [1,2,3]

if I have an i that increments each recursive call, I could start out at 0

Start:

output = [[1,2,3], [1,2], [1,3], [1], [3], []]
subset = []


findSubsets(3)

I could make the base case if i === nums.length, that means it's not pointing to anything anymore, so add the subset to the output?

then, add the num at i to the subset,
then, call the function on i + 1
    subsets[i + 1]

then, remove the number I just added
then, call the function on i + 1
    subsets[i + 1]


*/

function subsets(nums: number[]): number[][] {
    const output = [];
    const subset = []; // [1,2,3]

    function findSubsets(i) { // 3
        if (i === nums.length) {
            output.push([...subset]);
            return;
        }

        subset.push(nums[i]);
        findSubsets(i + 1);
        subset.pop();
        findSubsets(i + 1);
    }
    // [1,2,3]
    findSubsets(0);

    return output;
};
