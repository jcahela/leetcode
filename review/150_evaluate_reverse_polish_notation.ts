/*

I can use a stack to hold all numbers and results

Then, once I encounter an operator, I can take the last 2 numbers from the stack
    - if the last 2 numbers are normal operands, I perform the operator on them, then push that result back to the stack
    - this results in later operations to be performed on the results of previous operations, which is normal in reverse polish notation such as this example:

    ["2", "1", "+", "3", "*"]
        = (2 + 1) * 3
        = 3 * 3
        = 9

Pseudocode:
1. Instantiate an operands stack that will hold the operands and results of operations
2. Iterate over the tokens
    1. If the token I'm looking at is "+"
        1. pop the top number from the stack and store it in variable num1
        2. pop the top number from the stack and store it in variable num2
        3. Add the two numbers together and push the sum onto the stack
        4. continue
    2. If the token is "-"
        1. pop the top number from the stack and store it in variable num1
        2. pop the top number from the stack and store it in variable num2
        3. Do num2 - num1 (the 2nd to top number will be the first number to subtract from, since I add numbers to the stack in order from left to right in the original tokens array. ["1","2","-"]) would be 1 - 2, and since 1 would be pushed onto the stack before 2, I would need to subtract num2 by num1 in the way I'm naming it by popping out from the last number.
        4. Push the difference onto the stack
        5. continue
    3. If the token is "*"
        1. pop the top number from the stack - num1
        2. pop the top number from the stack - num2
        3. Push num1 * num2 onto the stack
        4. continue
    4. If the token is "/"
        1. pop the top number from the stack - num1
        2. pop the top number from the stack - num2
        3. Push Math.trunc(num2 / num1) onto the stack
        4. continue
    5. If you've reached here, the token you have is a number in string form. So convert it to a number (ParseInt(val, 10)) and push that onto the stack
3. Return the top number in the stack (by this point, all the tokens will have been iterated over, and the last operator would've taken the last 2 numbers from the stack, performed the operation on it, then pushed it back to the stack, so the final answer will now be at the top of the stack).

Time complexity: O(n) - since we only iterate over the tokens once
Space complexity: O(n - t) - where n is the length of the tokens input, and t is the number of operators in the tokens input. Since we store all numbers and results in the tokens, it can at most approach n, minus the number of tokens in n, since that never gets pushed onto the stack
*/

function evalRPN(tokens: string[]): number {
  let operands: number[] = [];
  for (let val of tokens) {
      if (val === "+") {
          const num1 = operands.pop();
          const num2 = operands.pop();
          operands.push(num1 + num2);
          continue;
      }

      if (val === "-") {
          const num1 = operands.pop();
          const num2 = operands.pop();
          operands.push(num2 - num1);
          continue;
      }

      if (val === "*") {
          const num1 = operands.pop();
          const num2 = operands.pop();
          operands.push(num1 * num2);
          continue;
      }

      if (val === "/") {
          const num1 = operands.pop();
          const num2 = operands.pop();
          operands.push(Math.trunc(num2 / num1));
          continue;
      }

      operands.push(parseInt(val, 10));
  }

  return operands.pop();
};
