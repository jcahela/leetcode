/******************** Attempt #4 - easy, one liners ********************/

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

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
