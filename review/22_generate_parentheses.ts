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

/*    Attempt 2     */
/**
 * @param {number} n
 * @return {string[]}


To generate ALL combinations of well-formed parentheses, I can use backtracking and recursion to go through a decision tree

                                    (
                        addopen         addclosed
                        ((                  ()
                    addopen   addclosed             addO
                    (((         (()                 ()(
                addC         addO      addC        addO    addC
                ((()         (()(      (())         ()((    ()()
            addC            addC        addO        addC        addO
        ((())               (()()       (())(       ()(()       ()()(
    addC                addC            addC          addC        addC
    ((()))              (()())          (())()        ()(())        ()()()

What decision do I make at each recursive step?

    1. If I have less than n open parentheses, I may add an open parenthesis
    2. If I have an equal number of closed and open parentheses, I MUST add an open parentheses
    3. If I have n open parentheses, I MUST add a closed parenthesis
    4. Once the final string is n * 2 in length, add it to the answer array and return

Pseudocode:

1. Instantiate a res array that's empty
2. Define a dfs function with parameters: parenString: string, openCount: number, closeCount: number
    1. if parenString is equal to n * 2
        1. Add parenString to the res array
        2. return
    2. if openCount < n
        1. Call the dfs function on an added open parenthesis: parenString + '(', openCount + 1, closeCount
    3. if openCount > closeCount (strictly greater than, if open and close are equal, you CAN'T add a close)
        1. Call the dfs function on an added close parenthesis: parenString + ')', openCount + 1, closeCount
3. Call dfs with the following args: '', 0, 0
4. Return the res array
                
Time complexity: O(n^2) - Since I'm making 2 decisions each recursive call, and the height of the decision tree is 2n, which simplifies to n

Space complexity: O(n) - Since the height of the decision tree is how much stack space is needed, and the decision tree height is 2n, it simplifies to O(n)

 */

function generateParenthesis(n: number): string[] {
    const res = [];

    function dfs(parenString: string, openCount: number, closeCount: number) {
        if (parenString.length === (n * 2)) {
            res.push(parenString);
            return;
        }

        if (openCount < n) {
            dfs(parenString + '(', openCount + 1, closeCount);
        }

        if (openCount > closeCount) {
            dfs(parenString + ')', openCount, closeCount + 1);
        }
    }
    
    dfs('', 0, 0);

    return res;
};
