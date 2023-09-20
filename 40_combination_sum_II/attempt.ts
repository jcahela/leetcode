/******************* Attempt #1 - success! Similar method to subsets II, but also speeding it up with an extra base case *********************/

/*

[1,2,2,3]

Target = 5

[[1,2,2], [2,3]]

In order to not include duplicates, I need to sort the candidates and then for my first choice, include the first number that might have duplicates

In the second choice, I need to skip to the next number that's not a duplicate, since the second branch should be any candidate leaf nodes with none of the duplicates, whereas the first branch would be any candidate leaf nodes with at least 1 duplicate

                             []
                    [1]               []
            [1,2]   [1]         [2]          []
        [1,2,2]  [1,2] [1,3] [1] [2,3]  [2]   [3]   []

[1,1,2,5,6,7,10]

[[1,1,6], [1,2,5], [1,7], [2,6]]

Pseudocode:
1. Sort candidates from smallest to largest
2. Instantiate an output array at []
3. Define dfs that takes in i, curr, and sum
    // Base case
    1. If sum === target
        1. Push a copy of curr into output array
        2. Return
    2. If i === candidates.length
        1. Return
    3. If the difference between the target and the current sum is less than the current number at i in candidates, since candidates is sorted smallest to largest, that means the current number in candidates, and any numbers after it, would result in a sum that's too large, so it'd be useless to check the current branch any further. So return.
    // Recursive case

    // Choice 1 - include the number at i and any potential duplicates
    3. Push the num at i in sorted candidates into the curr array
    4. Call dfs on i + 1, curr, and sum + nums[i]

    // Choice 2 - don't include the number at i or any potential duplicates
    5. Pop the last added number from curr array
    6. While there is a next number after i (while i + 1 < nums.length) and while the next number is the same as the current number (nums[i] === nums[i + 1])
        1. Increment i
    7. Call dfs on i + 1, curr, and sum
4. Call dfs on i = 0, curr = [], and sum = 0
5. Return the output array

Time complexity: O(2^n) - Since I'm making 2 decisions at each recursive call, and worst case scenario there are no duplicates, I would be doubling the branches of each level n times, which makes it exponential. I'm also creating a copy of the curr array at leaf node

Space complexity: O(h + s) - Where h is the height of the decision tree, since I need that much space to recurse fully thorugh it dfs style. And where s is the number of subsets that add up to the target, since I'm storing that in an output array outside of the dfs function

*/

function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const output: number[][] = [];
  function dfs(i: number, curr: number[], sum: number) {
      if (sum === target) {
          output.push([...curr]);
          return;
      }

      if (i === candidates.length) return;

      if (target - sum < candidates[i]) return;

      curr.push(candidates[i]);
      dfs(i + 1, curr, sum + candidates[i]);

      curr.pop();

      while (i + 1 < candidates.length && candidates[i] === candidates[i + 1]) {
          i += 1;
      }

      dfs(i + 1, curr, sum);
  }
  dfs(0, [], 0);
  return output;
};

// I needed to speed up the algorithm but ignoring branches where it'd be impossible to find a sum that = target from the point where I was at
