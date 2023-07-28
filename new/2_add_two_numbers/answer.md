Time to Complete: 30m

Method: The question is fairly straightforward, so the method is a systematic approach. First, reverse the two given linked lists, then traverse each one, and store its value in a string, concatenating the strings as you traverse the reversed linked lists. Then, convert both strings into numbers, add them together, and store that result in a string. Then, traverse that string backwards twice: on the first pass, create a hashmap that holds the index as the key, and creates new ListNodes as the values with the corresponding number at that index as the value. On the second pass, set the node at each index to point at the node at the index - 1. Finally, return the node at the sum's final index (the head). This question is good practice for manipulating, traversing, reversing, and creating linked lists.

Pseudocode:
/*

// Reverse l1
1. Instantiate a prev1 that starts at null
2. Instantiate a curr1 that starts at l1
3. While curr1
    1. Store curr1.next in a tmp variable
    2. Set curr1.next = prev1
    3. Set prev1 = curr1
    4. Set curr1 = tmp variable

// Reverse l2
4. Instantiate a prev2 that starts at null
5. Instantiate a curr2 that starts at l2
6. While curr2
    1. Store curr2.next in a tmp variable
    2. Set curr2.next = prev2
    3. Set prev2 = curr2
    4. Set curr2.next = tmp variable

// Store reversed l1 list values in a string
7. Instantiate addend1Str as an empty string
8. While (prev1)
    1. Add the current number as a string to the empty string: addend1Str += `${prev1.val}`;
    2. increment prev1

// Store reversed l2 list values in a string
9. Instantiate addend2Str as an empty string
10. While (prev2)
    1. Add the current number as a string to the empty string: addend2Str += `${prev2.val}`;
    2. increment prev2

// Add the two numbers
11. sum = `${BigInt(addend1Str, 10) + BigInt(addend2Str, 10)}`; // BigInt is the same as parseInt, but allows you to keep precision when trying to convert a string to a number that is larger than the max limit of parseInt. In this example, the number 1e+30 was attempted to convert to a number, but parseInt couldn't handle it. So BigInt (ES11 in 2020) was introduced to handle precision at large numbers like this.

// 1st pass: Create the nodes by traversing backwards along the sum string and storing in a map
12. Instantiate an indexPointer that starts at the end of the sum string: sum.length - 1
13. Instantiate a Map that holds the index as the key, and the node as the value.
14. While indexPointer is greater than 0
    1. Store the current index in the map as the key, and create a new node as the value: map[index] = new ListNode(sum[index])

// 2nd pass: set the next pointers on each node
15. Set indexPointer back to sum.length - 1
16. While indexPointer is greater than 0
    1. Set the current node at the current index in the map to have its next pointer point at the node at the previous index in the map: map[index].next = map[index - 1] || null (|| null is necessary in case you're at the beginning of the sum string, and there is no map[-1]).

// Return the head of the new list stored in the hashmap
17. Return map[sum.length - 1]

*/

Code:

```js
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
let prev1 = null;
let curr1 = l1;
while (curr1) {
    const tmp = curr1.next;
    curr1.next = prev1;
    prev1 = curr1;
    curr1 = tmp;
}

let prev2 = null;
let curr2 = l2;
while (curr2) {
    const tmp = curr2.next;
    curr2.next = prev2;
    prev2 = curr2;
    curr2 = tmp;
}

let addend1Str = '';
while (prev1) {
    addend1Str += `${prev1.val}`;
    prev1 = prev1.next;
}

let addend2Str = '';
while (prev2) {
    addend2Str += `${prev2.val}`;
    prev2 = prev2.next;
}

const sum = `${BigInt(addend1Str) + BigInt(addend2Str)}`;

let indexPointer = sum.length - 1;
let answerMap = {};
while (indexPointer >= 0) {
    const newVal = parseInt(sum[indexPointer]);
    answerMap[indexPointer] = new ListNode(newVal);
    indexPointer -= 1;
}

indexPointer = sum.length - 1;
while (indexPointer >= 0) {
    answerMap[indexPointer].next = answerMap[indexPointer - 1] || null;
    indexPointer -= 1;
}

return answerMap[sum.length - 1];
};
```


Time Complexity: O(l1 + l2)
Explanation: Since I traverse both lists to reverse them, traverse them again to get the addends, then iterate over a string version of the sum, the worst time complexity is the addition of the two lengths of lists

Space: O(s)
Explanation: Where s is the length of the string of the sum of the two addends gotten by the list, which is what I use to create the hashmap
