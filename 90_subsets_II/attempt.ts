/*

In order to find all subsets on a nums array without duplicates, you'd make a decision tree

[1,2,3]

                                    []
                            add1          dont
                            [1]             []
                        add2     don't     add2      don't
                        [1,2]     [1]       [2]        []
                add3    don't    add3   don't   add3   don't    add3    don't
            [1,2,3]     [1,2]     [1,3]   [1]    [2,3]  [2]      [3]      []



If the nums array contains duplicate, what complications does that add?

[2,1,2]

                                    []
                            add2          dont
                            [2]             []
                        add1     don't     add1      don't
                        [2,1]     [2]       [1]        []
                add2    don't    add2   don't   add2   don't    add2    don't
            [2,1,2]     [2,1]     [2,2]   [2]    [1,2]  [1]      [2]      []

Maybe I could use an object that'll hold the array as strings when adding to the object as keys

Then I could check for if the current subset exists in the hashmap before adding to the result

Pseudocode:
1. Instantiate a variable res that's an empty array
2. Instantiate a hashmap that's empty originally
3. Define a dfs function with the parameters (subset: number[], i: number)
    // Base case
    1. If i >= nums.length:
        1. Check if the current subset exists in the hashmap
            1. If it does, return
            2. If it doesn't, add it to the hashmap with true as its value, then push a copy of it to the res array, then return
    // Recursive case
    1. Choose to include the current i number
        1. Add the current number to the current subset
        2. Call dfs on the new subset and new i
    2. Choose not to include the current i number
        1. Pop the last added number from the current subset
        2. Call dfs on the popped subset and new i
4. Call the dfs function with an empty array and 0 as arguments
5. Return the res variable

Time complexity: O(2^n) - Since I need to make 2 decisions each recursive level, and the levels of the decision tree at n long, where n is the number of nums in the nums input, or height of the tree

Space complexity: O(n*h) - Since I need to create a copy each recursive call, and the recursive stack is h, or tree height, deep

*/

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
