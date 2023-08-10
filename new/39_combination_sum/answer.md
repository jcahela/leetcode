Time to Complete: 30m

Method: Decision tree and recursive DFS. In order to avoid duplicate combinations, when you add a specific number down the first branch of the tree, the second branch will not add any more of that number. That way, two branches will never result in duplicate combinations:

For the following nums: [2,3,6,7]

/*
                                                                        0
                                          add2                                                 neveradd2
                                         [2]                                                      []
                           add2                       neveradd2                     add3                         neveradd3
                           [2,2]                         [2]                         [3]                            []
                  add2            neveradd2      add3      neveradd3       add6          neveradd6         add6         neveradd6
                [2,2,2]              [2,2]       [2,3]        [2]          [3,6]           [3]             [6]              []
          add2      neveradd2    add3    neveradd3   add[3]     neveradd3
      [2,2,2,2]      [2,2,2]    [2,2,3]     [2,2]     [2,3,3]       [2,3]
*/

You get the picture. You're allowed duplicates, but along each branch you eliminate a number from being added to the next recursive call combination sum array. This prevents duplicates from forming since each branch will have a different number of allowed numbers, and the further right you go in the tree, the fewer numbers are alloweed to be added to the arrays.

Pseudocode:
/*
1. Instantiate a result variable at an empty array
2. Define a dfs function that has 3 parameters: i: number, the current index being considered, curr: number[] (the current combination), total: number (sum of the current combination):
  Base case:
    1. if total === target, that means the current combination is a valid combination to add to result:
      1. so push a COPY of curr onto res (a copy so that when you recurse back up, you aren't modifying the combination within the result array)
      2. Return
    2. if i === candidates.length OR total > target
      1. In these cases, either you're at the end of the candidates array and have no other numbers to add to the current combination array, in which case it should return out of the current recursive call, or your total exceeded your target, in which case it should return out of the current recursive call
  Recursive step:
    // Decision 1: Add the current number to the current combo sum array and check that, allowing the same number to be added later
    1. Add the current number in candidates to the current combination sum array: curr.push(candidates[i])
    2. Call the dfs function on the new combination sum array, the same index, and the new total:
      dfs(i, curr, total + candidates[i])
    // Decision 2: Never add the current number to the current combo sum array and check that (meaning, you don't add the number, and you increment i so you never add the number within this branch)
    3. Remove the last added number from the curr array
    4. Call the dfs function on the popped combination sum array, the next index, and old total:
      dfs(i + 1, curr, total)
3. Call the dfs function with 0, [], and 0
4. Return the result array
*/

Code:

```js
function combinationSum(candidates: number[], target: number): number[][] {
    const res = [];

    function dfs(i: number, curr: number[], total: number) {
        if (total === target) {
            res.push([...curr]);
            return;
        }

        if (i >= candidates.length || total > target) {
            return;
        }

        // Decision 1: Add the current number in candidates to the current combination sum array
        curr.push(candidates[i]);
        dfs(i, curr, total + candidates[i]);

        // Decision 2: Never add the current number in candidates to the current sum array, along this branch
        curr.pop();
        dfs(i + 1, curr, total);
    }

    dfs(0, [], 0);

    return res;
};
```


Time Complexity: O(n * 2^h)
Explanation: You make 2 decisions every recursive layer (should I add number at i down this branch, or never add the number at i?), and the height of the decision tree will be the amount of times you have to make those 2 decisions. Since you have to make a copy of the current combination sum array each recursive call, the total time complexity will be O(n*2^h)

Space: O(n * h)
Explanation: Since you have to create a new combination sum array each recursion, until you reach the height of the tree
