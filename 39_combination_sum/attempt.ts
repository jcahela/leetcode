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
