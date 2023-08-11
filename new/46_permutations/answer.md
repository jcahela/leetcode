Time to Complete: 30m

Method: Backtracking and dfs on a decision tree. As opposed to subsets, permutations include all the different orders of the numbers in the number input. First, create a decision tree that starts at an empty array, and each recursive call, you add every number to the array that isn't a number that's already been added:

So for a nums input that looks like [1,2,3], the decision tree looks like this:

/*

                                                      []
                            add1                     add2                     add3
                             [1]                     [2]                       [3]
                    add2         add3         add1       add3            add1       add2
                    [1,2]        [1,3]        [2,1]      [2,3]            [3,1]        [3,2]
                   add3          add2         add3        add1             add2          add1
                  [1,2,3]       [1,3,2]       [2,1,3]     [2,3,1]         [3,1,2]       [3,2,1]
*/

Notice at each level of the decision tree, I am adding every number that hasn't already been added to each node. So the first level has 3 nodes, each with one distinct number of the nums input. Since nums is length 3, level 1 has 3 nodes. Next on level 2, I add the first number that hasn't been added to its parent node. The first node of level 2 I add 2, then the second node I add 3, since the parent of both already has 1 in it. The same for the 3rd and 4th node of level 2, since the parent already has 2, I add 1, then I add 3, to its children nodes. I continue this pattern for level 3, where I add the last number that wasn't already added to each node's parents. This results in each layer multiplying by n - 1 until you get to the leaf nodes. If n = 6, the first layer has 6 nodes, the second layer as 6 * 5 nodes, the third layer has 6 * 5 * 4 nodes, etc, with a total of 720 permutations.

Pseudocode:
/*
1. Instantiate a result array that's empty
2. Define a dfs recursive function with the parameters: curr: number[], and currNums: number[]. curr will be the current permutation, and currNums will be the current nums input being considered with the current permutation
  // Base case:
    1. If the current permutation length is the same as nums length, push a copy of the current permutation onto the result array, and return up
  // Recursive step:
  2. Iterate over the current nums parameter
    1. Create a copy of the current numbers parameter.
    2. Push the current iteration number into the curr permutation array
    3. Remove that number that was pushed from its place in the copy of the current numbers parameter
    4. Call the dfs function recursively on the current permutation array with the new number put in, and the copy of the currNums array with that number removed
    5. Pop the last number added from the current permutation array
3. Call the dfs function with an empty array and the nums input as arguments
4. Return the res variable
*/


Code:

```js
function permute(nums: number[]): number[][] {
  const res = [];

  function dfs(curr: number[], currNums: number[]) {
      if (curr.length === nums.length) {
          res.push([...curr]);
          return;
      }

      let i = 0;

      while (i < currNums.length) {
          const copy = [...currNums];
          curr.push(currNums[i]);
          copy.splice(i, 1);
          dfs(curr, copy);
          // original solution was missing these next 2 lines, and it would've solved!
          curr.pop();
          i += 1;
      }
  }

  dfs([], nums);

  return res;
};
```


Time Complexity: O(n!)
Explanation: Since you need to get every permutation of a list of numbers, and since every level of the decision tree multiplies the number of nodes by the amount of numbers that haven't already been added (n - 1) the total time complexity is n factorial, where n is the length of the nums input, since level by level the decision tree would be 6 nodes for level 1 -> 6 * 5 nodes for level 2 -> 6 * 5 * 4 nodes for level 3 -> 6 * 5 * 4 * 3 nodes for level 4 -> and 6 * 5 * 4 * 3 * 2 nodes for level 5, resulting in that many nodes for level 6, which is where all the permutations would lie.

Space: O(n^2)
Explanation: Where n is length of the nums input, since I have to copy it every time I take a number out of it to put into the current permutation array. And since the recursive stack adds to the height of the decision tree, and since the decision tree height is n long, the overall space complexity is O(n^2)
