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

/*********** Attempt #3 - success - correct decision tree and backtrack method ************/

/*

                           []
                [1]                 []
         [1,2]        [1]       [2]     []
    [1,2,3] [1,2] [1,3] [1] [2,3] [2] [3] []

*/

function subsets(nums: number[]): number[][] {
    const output = [];

    function backtrack(curr, i) {
        if (i >= nums.length) {
            output.push([...curr]);
            return;
        }

        curr.push(nums[i]);
        backtrack(curr, i + 1);

        curr.pop();
        backtrack(curr, i + 1);
    }

    backtrack([], 0);

    return output;
};

/***************** Attempt #4 - good *********************/

/*

                            []
                [1]                  []
         [1,2]        [1]       [2]      []
    [1,2,3] [1,2] [1,3] [1] [2,3] [2] [3] []

Decision tree: add number at i, don't add number at i
When going to the next level, increment i, then ask for each node at that level, add number at i, don't add number at i

Since there are 2 decisions, and it's making the decision at every i, the overall time complexity would be n^2

Pseudocode:
1. Instantiate an output array at []
2. Instantiate a backtrack function that takes in: i, subset
    // Base case
    1. If i = n.length, the subset is complete, you're at the leaf node of null, so push a copy of the subset parameter into output array: output.push(...subset)
    // Recursive case
    // Decision 1: Add the number at i to the subset, then increment i
    1. subset.push(nums[i])
    2. Call backtrack on i + 1 and the new subset
    // Decision 2: Don't add the number at i to the subset, then increment i
    3. Pop back out the number that was added to the subset
    4. Call backtrack on i + 1 and the popped subset
3. Call backtrack function with i = 0 and subset = []
4. Return the output array

*/

function subsets(nums: number[]): number[][] {
    const output: number[][] = [];

    function backtrack(i, subset) {
        if (i === nums.length) {
            output.push([...subset]);
            return;
        }

        subset.push(nums[i]);
        backtrack(i + 1, subset);

        subset.pop();
        backtrack(i + 1, subset);
    }

    backtrack(0, []);

    return output;
};
