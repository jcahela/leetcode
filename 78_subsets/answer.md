Time to Complete: 30m

Method: Backtracking. First, create a decision tree, which asks for every number in nums, do you or do you not include it in the subset?

/*
                            []
                    Add1        Don't
                     [1]          []
            Add2    Don't         Add2     Don't
        [1,2]        [1]           [2]       [] 
    Add3  Don't   Add3   Don't   Add3   Don't   Add3   Don't
[1,2,3]  [1,2]    [1,3]   [1]    [2,3]    [2]    [3]    []
*/

The leaf nodes/subsets of this decision tree become the possible subsets of the original nums array [1,2,3]. You can then use recursion and add the subset to an output array each time you reach a leaf node (in the recursive function, that'd be when the index is equal the length of the array). Then, in the recursive backtrack function, you have 2 decisions, either add the number, and go along that path in the tree, or don't add the number, and go along that path in the tree.

Pseudocode:
/*
1. Instantiate an output array that starts empty
2. Define a backtrack function that takes in parameters - subset: number[], index: number
  1. Base case: if i === nums.length (you've made the last decision in the current branch and are ready to push the subset into the output array)
    1. Push the current subset into the output array
  2. Decision 1: include nums at i.
    1. Since you want to include nums at i, call the backtrack function and pass in a new array, with subset spread into it, and nums[i] at the end ([...subset, nums[i]]), and with index + 1 for the index
  3. Decision 2: don't include nums at i.
    1. Since you don't want to include nums at i, call the backtrack function and just pass in subset, with index + 1 for the index
3. Call the backtrack function
4. Return the output
*/


Code:

```js
function subsets(nums: number[]): number[][] {
    const output = [];

    function backtrack(subset, i) {
        if (i === nums.length) {
            output.push(subset);
            return;
        }
        // decision to include nums[i]
        backtrack([...subset, nums[i]], i + 1);

        // decision to not include nums[i]
        backtrack(subset, i + 1);
    }

    backtrack([], 0);

    return output;
};
```


Time Complexity: O(n * 2^n)
Explanation: Since each number in the nums array has 2 decisions to make, and you end up with 2^n subsets (ex. [1,2,3], there are 2 decisions at index 1, 2 decisions at index 2, and 2 at index 3, and since they occur within recursive calls of the previous index, it's 2 * 2 * 2, or 8 total subsets), and since at each recursive call you create a copy of the subset to put into the output array, the ultimate time complexity is O(n * 2^n).

Space Complexity: O(n)
Explanation: The most numbers stored in the subset array at any one point is n in length, and the highest height of the decision tree will also be n in height, and since the subset array is outside the recursive function, the total time complexity is O(2n), which simplfies to O(n).
