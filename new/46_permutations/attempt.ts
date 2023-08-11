/* ALMOST solved

I noticed all permutations are the same length as nums

So at first I'd start with a decision tree that has an empty array as the root

[1,2,3]

                                                      []
                            add1                     add2                     add3
                             [1]                     [2]                       [3]
                    add2         add3         add1       add3            add1       add2
                    [1,2]        [1,3]        [2,1]      [2,3]            [3,1]        [3,2]
                   add3          add2         add3        add1             add2          add1
                  [1,2,3]       [1,3,2]       [2,1,3]     [2,3,1]         [3,1,2]       [3,2,1]

When the current permutation is empty, I add all items to the permutation then where does i point?

Down the first branch I add 1, then i points to 2. I add 2, then i points to 3

Down the second branch, I add 1, then i points to 3, then i points to 2

Down the third branch, I add 2, then i points to 1, then i points to 3

Maybe I could make a copy of nums, then loop from i to the end of the copy

At each iteration, I make a recursive call and pass in the copy array minus the number that i's currently pointing at, and pass in the permutation with that number at i added to the permutation:
    curr.push(nums[0])
    numsCopy = [...nums]
    numsCopy.splice(i, 1);
    dfs(curr, numsCopy);

*/

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
