Time to Complete: 30m

Method: Backtracking using a decision tree, but first sorting candidates, and either include a number at i and all its duplicates further down the first branch, or don't include the number at i or any of its duplicates further down the second branch. This avoids duplicate combinations. To speed it up, since the candidates are sorted, you should also add a base case that stops traversing down the current branch if the difference between target and sum is less than the current number (meaning the current number and any numbers after it will result in too large a sum, so its uselesss to traverse this branch any further).

Pseudocode:
/*
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
*/

Code:

```ts
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
```


Time Complexity: O(2^n)

Explanation: Since I'm making 2 decisions at each recursive call, and worst case scenario there are no duplicates, I would be doubling the branches of each level n times, which makes it exponential. I'm also creating a copy of the curr array at leaf node

Space Complexity: O(h + s)

Explanation: Where h is the height of the decision tree, since I need that much space to recurse fully thorugh it dfs style. And where s is the number of subsets that add up to the target, since I'm storing that in an output array outside of the dfs function
