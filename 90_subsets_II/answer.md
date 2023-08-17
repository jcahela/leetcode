Time to Complete: 30m

Method: Using backtracking, you use the same method as subsets I, but sort the nums array first, because if there are duplicates, you can end up with duplicate subsets that are just in different orders than the other. By sorting first, you guarantee that i will land on the next number, and whether it's a duplicate or not, it'll guarantee that if you create a duplicate, it'll be in the same order as a previous duplicate. This allows you to use a hashmap to check for duplicates before adding to the result array. If you don't sort, the subset you create will be a different order, and thus a different key, when checking the hashmap, resulting in potential duplicate sets getting into the result array.

Alternate method: Instead of using a hashmap, don't even create duplicate subsets within the decision tree by the following: still sort the nums array before creating the dfs algorithm, but when incrementing i, continue incrementing i until you reach a number that's not the same as the previous number, guaranteeing that you won't create another subset with the same amount of numbers as a previous branch.

Pseudocode:
/*
1. Instantiate a variable res that's an empty array
2. Instantiate a hashmap that's empty originally
3. Instantiate a sorted array that is the nums input sorted
3. Define a dfs function with the parameters (subset: number[], i: number)
    // Base case
    1. If i >= sorted.length:
        1. Check if the current subset exists in the hashmap
            1. If it does, return
            2. If it doesn't, add it to the hashmap with true as its value, then push a copy of it to the res array, then return
    // Recursive case
    1. Choose to include the current i number
        1. Add the current number in sorted to the current subset
        2. Call dfs on the new subset and new i
    2. Choose not to include the current i number
        1. Pop the last added number from the current subset
        2. Call dfs on the popped subset and new i
4. Call the dfs function with an empty array and 0 as arguments
5. Return the res variable
*/

Code:

```js
function subsetsWithDup(nums: number[]): number[][] {
  const res: number[][] = [];
  const sorted = nums.sort();
  const dup = {};
  function dfs(subset: number[], i: number) {
      if (i >= sorted.length) {
          if (!dup[subset.join('')]) {
              dup[subset.join('')] = true;
              res.push([...subset]);
          }
          return;
      }

      subset.push(sorted[i]);
      dfs(subset, i + 1);

      subset.pop();
      dfs(subset, i + 1);
  }
  
  dfs([], 0);

  return res;
};
```


Time Complexity: O(2^n)
Explanation: Since I need to make 2 decisions each recursive level, and the levels of the decision tree at n long, where n is the number of nums in the nums input, or height of the tree

Space Complexity: O(n*h)
Explanation: Since I need to create a copy each recursive call, and the recursive stack is h, or tree height, deep
