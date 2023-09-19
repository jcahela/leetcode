Time to Complete: 30m

Method: Using a stack data structure to hold the collection of numbers (named stack), and a stack data structure to hold the running minimum at each number (named minStack). This works by modifying both stack and minStack at the same time when doing the push method, modifying both when doing the pop method, and using both stack and minStack to return the top (most recent number in stack) value, and the mininum (most recent number in minStack), respectively. By modifying both stack and minStack every time you add or remove a number from the stack, you guarantee that the same indices for both stack and minStack correspond with each other. The number in the stack at index 3 has, at the time of its addition to the stack, a corresponding minimum value in the minStack at index 3. In a way, minStack is holding a history of minimums of the stack, with its first minimum at the bottom of minStack, and its most recent minimum at the top.

Pseudocode: For the main class declaration, instantiate a stack and minStack in the constructor: this.stack = [], this.minStack = [].

For the push method, push the val input onto this.stack. For this.minStack, check if there's a value at the top of minStack, if there is, compare it with the current value. If the current value is lower than the top of minStack, the current value is the new minimum. Push the current value onto the minStack. If the top of the minStack is less than the current value, it remains the minimum, so push it onto the top of the minStack. If there is no value in minStack, then the current value is by default the current minimum, so push it onto this.minStack. The point of the push method is to, at the end of it, push 1 value onto this.stack, and 1 value onto this.minStack, to maintain the current minimum at the time of pushing that value.

For the pop method, just pop out the top value of this.stack and this.minStack. This will maintain the minimum value by removing the top value from this.stack and its corresponding minimum from the top of this.minStack

For the top method, return the top value of this.stack

For the getMin method, return the top value of this.minStack

Code:

```ts
class MinStack {
  minStack: [number, number][];
  constructor() {
      this.minStack = []
  }

  push(val: number): void {
      if (!this.minStack.length) {
          this.minStack.push([val, val]);
      } else {
          this.minStack.push([val, Math.min(val, this.minStack[this.minStack.length - 1][1])])
      }

      // Above can be one-lined: this.minStack.push([val, Math.min(val, this.minStack.length ? this.minStack[this.minStack.length - 1][1] : Infinity)])

  }

  pop(): void {
      this.minStack.pop();
  }

  top(): number {
      return this.minStack[this.minStack.length - 1][0];
  }

  getMin(): number {
      return this.minStack[this.minStack.length - 1][1];
  }
}
```

Time Complexity: O(1)
Explanation: Since we are only doing push and pop operations, and using a minStack stack data structure to maintain a list of running minimums as they correspond with the numbers at that index in the main collection stack data structure, all operations are O(1).

Space Complexity: O(n)
Explanation: Where n is the number of values in total added to the stack in the duration of whatever test is being done. Each time a number O(1) is pushed onto the stack and minStack, O(2) space is used. It gets simplified to O(1) for each 1 value pushed, each time the push method is run. So, it corresponds to O(n), where n is the total number of numbers that were pushed
