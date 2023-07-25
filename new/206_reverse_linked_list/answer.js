function reverseList(head) {
  let curr = head;
  let prev = null;

  while (curr) {
      let nxt = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nxt;
  }

  return prev;
};
