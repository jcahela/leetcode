/*

In order to generate all combinations of well-formed parentheses, I will need to go down an entire tree of combinations, so recursion could work well for that

I'd need to follow these rules:
1. If there are an equal number of open and closed parentheses, I can't add a closed, I'd have to add an open
    so, if the output string is empty, or the open and closed are the same, add an open
2. If there are more open than closed, I can add a closed
3. If there are n open parentheses (limit for open), I HAVE to add a closed until I reach 2n length (the length of a fully formed string of well formed parentheses of n pairs)

I can create an output array that starts as empty

Then, define a backtrack function that'll form all my parentheses. The backtrack function will take (parameters openCount: number, closedCount: number, outputStr: string):

1. Base case: if output string length is n * 2, push output string into output array, then return
2. Regular case: if open count is less than n, add an open parentheses, add 1 to the open count, call backtrack on the new params
3. Regular case: if close count is less than open count, add a closed parentheses, add 1 to the closed count, call backtrack on the new params

Time complexity: O(4^n) - since I'd be recursing through all possiblities

*/

function generateParenthesis(n: number): string[] {
    const output = [];

    function backtrack(openCount: number, closedCount: number, outputStr: string) {
        if (outputStr.length === (n * 2)) {
            output.push(outputStr);
            return;
        }

        if (openCount < n) {
            backtrack(openCount + 1, closedCount, outputStr + '(');
        }

        if (closedCount < openCount) {
            backtrack(openCount, closedCount + 1, outputStr + ')');
        }
    }

    backtrack(0,0,'');

    return output;
};
