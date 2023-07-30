function hasCycle(head: ListNode | null): boolean {
  if (!head?.next) return false;
  let slow = head;
  let fast = head;

  while (fast) {
      slow = slow.next;
      fast = fast.next?.next;
      if (slow === fast) {
          return true
      }
  }
  return false;
};

class ListNode {
  prev: ListNode | null;
  next: ListNode | null;
  key: number;
  val: number;

  constructor(key: number, val: number) {
      this.key = key;
      this.val = val;
      this.prev = null;
      this.next = null;
  }
}

class LRUCache {
  capacity: number;
  cache: object;
  left: ListNode;
  right: ListNode;

  constructor(capacity: number) {
      this.capacity = capacity;
      this.cache = {};
      // the LRUCache left ListNode points at the least recently used ListNode
      this.left = new ListNode(0,0);
      // the LRUCache right ListNode points at the most recently used ListNode
      this.right = new ListNode(0,0);
      this.left.next = this.right;
      this.right.prev = this.left;
  }

  get(key: number): number {

  }

  put(key: number, value: number): void {
      this.cache[key] = new ListNode(key, value);
      let prev = this.right.prev;
  }
}
