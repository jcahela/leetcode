Time to Complete: 30m

Method: Hashmap to hold the key-value pairs, with the key being the given key, and the value being a 2D array of timestamp and values in tuples. Then, using binary search, find the largest timestamp that doesn't exceed the given timestamp when getting, or the timestamp itself.

Pseudocode:
/*
1. Get the value at the given key. If that value doesn't exist, return ""
2. If that value (list) does exist, set up binary search: instantiate a left pointer at 0 and a right pointer at the last index of the list
3. Instantiate a valueTimestamp variable that'll hold either the found timestamp, or the greatest timestamp which was less than the timestamp parameter, it starts as undefined
4. While left is less than or equal to right:
    1. Calculate the midpoint m
    2. Get the [value, timestamp] array at index m
    3. If the timestamp at index m is less than the given timestamp, search the right half of the list
    4. If the timestamp at index m is greater than the given timestamp, search the left half of the list
    5. Else, you've found the correct timestamp, so return the value at index m
    6. If the timestamp you're looking for doesn't exist, after the if-elseif-else block in steps 4.3 - 4.5, left will be greater than right, either because the timestamp you're looking for was greater than the one at m (in which case r becomes m - 1, which should be less than l), or because the timestamp you're looking for was less than the one at m (in which case l becomes m + 1, which should be greater than r). At this point, if the timestamp at m is greater than the timestamp you're looking for, set the result var to its left neighbor, if the left neighbor exists
    7. If the timestamp at m is less than the timestamp you're looking for, set the result var to the valuetimestamp at m
5. At the end of the binary search, either valueTimestamp result variable will be an array containing a value and timestamp, or it will be undefined (if the left neighbor didn't exist in step 4
6. If the result var is undefined, return "". If the result var is not undefined, return the timestamp at index 1 (result[1]).
*/
Code:

```js
class TimeMap {
    dict: object;

    constructor() {
        this.dict = {};
    }

    set(key: string, value: string, timestamp: number): void {
        this.dict[key] ? this.dict[key].push([timestamp, value]) : this.dict[key] = [[timestamp, value]];
    }

    get(key: string, timestamp: number): string {
        const arr = this.dict[key];
        if (!arr) return "";

        let currentMin;
        let currentMinVal;

        let l = 0;
        let r = arr.length - 1;

        while (l <= r) {
            const m = Math.ceil((l + r) / 2);

            const midTuple = arr[m];

            if (midTuple[0] < timestamp) {
                if (!currentMin) {
                    currentMin = midTuple[0];
                } else {
                    currentMin = Math.max(midTuple[0], currentMin);
                }
                currentMinVal = midTuple[1];
                l = m + 1;
            } else if (midTuple[0] > timestamp) {
                r = m - 1;
            } else {
                return midTuple[1];
            }
        }

        return currentMinVal !== undefined ? currentMinVal : "";
    }
}
```


Time Complexity:
Explanation:

Space Complexity:
Explanation:
