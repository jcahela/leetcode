/*

Since I need all unique combinations of candidates where chosen cadndidates sum to target, I can use backtracking

I could start with 0 as the root condition


                                    0
                            add2      don't
                            2           0
                        add2   don't      add2    don't
                    4           2            2         0
                add2    don't add2 don't add2 don't add2 don't
            6          4     4       2     4    2    2       0



*/

/************* Attempt #2 - wasn't sure on the decision tree or how to start *************/
/*

Practiced writing out solution and understanding approach

*/

function combinationSum(candidates: number[], target: number): number[][] {
    const output = [];

    function backtrack(i: number, curr: number[], total: number) {
        if (total === target) {
            output.push([...curr]);
            return;
        }

        if (i >= candidates.length || total > target) {
            return;
        }

        curr.push(candidates[i]);
        backtrack(i, curr, total + candidates[i]);

        curr.pop();
        backtrack(i + 1, curr, total);
    }

    backtrack(0, [], 0);

    return output;
};


/******************* Attempt #3 - understood approach and method of coding out *********************/

/*

                                                           []
                                                    [2]
                                                [2,2]
                                            [2,2,2] [2,2,3]
                        leaf node ->   [2,2,2,2]

*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const output = [];

    function backtrack(curr, i, sum) {
        if (sum > target || i === candidates.length) return;
        if (sum === target) {
            console.log(curr, sum);
            output.push([...curr]);
            return;
        }

        curr.push(candidates[i]);
        backtrack(curr, i, sum + candidates[i]);

        curr.pop()
        backtrack(curr, i + 1, sum);
    }

    backtrack([], 0, 0);

    return output;
};
