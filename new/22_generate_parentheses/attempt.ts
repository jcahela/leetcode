/*

In order to generate n pairs, that means I will be allowed to have exactly n open parentheses, and n closed parentheses

I could use backtracking and recursion to get every possible combination of parentheses


                        (
                    /         \
                   ()         ((
                   / \         | \
                ()(           (((  (()
                /
              ()((
              /
            ()(()


Pseudocode:
1. Base case: if openCount is 0 and closedCount is 0, return string
2. Add parameters: openCount, closedCount, outputStr
3. Have an output array to hold each string

*/

function generateParenthesis(n: number, openCount: number, closedCount: number, outputStr: string): string[] {
  if (outputStr.length = (n * 2)) {
      return outputStr;
  }

  if openCount 
};
