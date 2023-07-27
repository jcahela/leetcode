class MinStack {
    minStack: number[];
    stack: number[];

    constructor() {
    // If I use a minStack, I can hold the current minimum element each time I push onto the stack. Whenever I add a number, I check to see if the top number in the minStack is lower or greater than the number I'm pushing. If the number I'm pushing is lower, that becomes the new minimum. If the number at the top of minStack is lower, that remains the minimum, so I push that on again. Pop can pop in O(1) normally, top can get the top of the stack normally, push can push normally
        this.minStack = [];
        this.stack = [];
    }

    push(val: number): void {
        this.stack.push(val);
        if (!this.minStack.length) {
            this.minStack.push(val);
        } else {
            if (this.minStack[this.minStack.length - 1] > val) {
                this.minStack.push(val);
            } else {
                this.minStack.push(this.minStack[this.minStack.length - 1]);
            }
        }
    }

    pop(): void {
        this.minStack.pop();
        this.stack.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
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
