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

/******************* Attempt #2 - solved without help, need to think more on the concept itself *********************/

/*

                         []
                [1]        [2]          [3]
        [1,2]   [1,3]    [2,1]   [2,3]   [3,1]     [3,2]
    [1,2,3]   [1,3,2]    [2,1,3]   [2,3,1] [3,1,2]  [3,2,1]

Each level down on the decision tree, I add a different num at i to the array I pass down to the next recursive call

Once I pass a number into the permutation I'm building, that number is no longer considered in nums, so I would have to take it out of a nums I'm manipulating, and pass that along with the permutation, so the shortened nums can be iterated on too in the next recursive call

The base case would be when the permutation's length is equal nums length, that's when I'd push a copy of it to an output

The recursive case would be me iterating through the nums I'm given as a parameter (shortened nums)
    At each iteration, I put the current number into the permutation, then pass an array that has that number taken out

Pseudocode:
1. Instantiate an output array at []
2. Define a backtrack function that takes in perm: number[], currNums: number[]
    // Base case: the permutation parameter's length is equal to nums.length
    1. If perm.length === nums.length
        1. output.push([...perm])
        2. return;
    // Recursive case: iterate through the nums parameter and make the recursive call at each iteration
    2. For loop through currNums
        1. Call backtrack on perm with the current number pushed onto perm, and the currNum array with the current number taken out
3. Call backtrack on perm = [] and currNums = nums
4. Return the output array

Time complexity: O(n!) - Since I'm making n decisions the first level, which multiplies by n - 1 decisions the next level, and n- 2 the next level, until you reach 0, which is factorial in nature

*/

function permute(nums: number[]): number[][] {
    const output = [];

    function backtrack(perm: number[], currNums: number[]) {
        if (perm.length === nums.length) {
            output.push([...perm]);
            return;
        }

        for (let i = 0; i < currNums.length; i += 1) {
            const numsCopy = [...currNums];
            numsCopy.splice(i, 1)
            perm.push(currNums[i]);
            backtrack(perm, numsCopy);
            perm.pop()
        }
    }

    backtrack([], nums);

    return output;
};

/********************** Attempt #3 - solved, understood concept ************************/

/*

                             []
                    [1]       [2]           [3] *n
        [1,2] [1,3]     [2,1]    [2,3]     [3,1]     [3,2] *n-1
[1,2,3] [1,3,2]   [2,1,3]     [2,3,1]   [3,1,2]   [3,2,1] *n-2

By iterating through each num in nums at each decision tree level, I can create every permutation of the nums arrays

The first level is n
The second level multiplies the number of nodes by n-1
The third level multiplies the number of nodes by n-2
and so on

The time complexity would therefore by n!, or n factorial
The space complexity, n, since that would be the number of levels deep I'd need to go to create n! number of nodes at the leaf nodes

Pseudocode:
1. Instantiate an output array at []
2. Define a backtrack function that takes in: permutation, currNums
    // Base case
    1. If permutation.length === nums.length (permutation I'm looking at is as long as nums, I know it's a full permutation)
        1. Push a copy of the permutation into the output array, then return
    // Recursive case
    2. Iterate over the currNums array
        1. At each iteration, make a copy of currNums at currNumsCopy
        2. Push the current number at i into the permutation array
        3. Remove the current number at i from the currNumsCopy
        4. Call permute on the new permutation array and currNumsCopy
        5. Once that recursion is done, pop the last pushed number from the permutation array, and continue the iterations
3. Call backtrack with permutation = [], currNums = nums
4. Return output array

*/

function permute(nums: number[]): number[][] {
    const output: number[][] = [];
    function backtrack(permutation: number[], currNums: number[]) {
        if (permutation.length === nums.length) {
            output.push([...permutation]);
            return;
        }

        for (let i = 0; i < currNums.length; i += 1) {
            const currNumsCopy = [...currNums];
            permutation.push(currNums[i]);
            currNumsCopy.splice(i, 1);
            backtrack(permutation, currNumsCopy);
            permutation.pop();
        }
    }

    backtrack([], nums);

    return output;
};
