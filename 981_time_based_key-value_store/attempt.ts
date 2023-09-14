/*


hashmap:

{
    'foo': {
        1: 'bar',
        3: 'bar2',
        largest: 5,
        5: 'bar5'
    }
}


Pseudocode:
1. Instantiate a dictionary hashmap in the constructor
2. For set:
    1. Add the given key as the key, and set its value equal to another hashmap:
        1. Set the other hashmap to have a key that is the timestamp, and a value as the value input
        2. If the largest key doesn't exist in the object value of the given key, set it to be the current timestamp
            OR
           If the largest key does exist in the object value of the given key, but the current timestamp is greater than it, replace it with the current timestamp

3. For get:
    1. Search for the value in this.dict[key][timestamp]
        1. If it exists, return the value at that inner key
        2. If it doesn't exist, return the value at this.dict[key][largest]

Time complexity: O(1) - Since I'm using hashmaps which take O(1) to set and get
Space complexity: O(n) - Where n is the whole input array series after instantiating TimeMap, since I'm using a dictionary to hold each key and each timestamp at each key

*/

class TimeMap {
  dict: object;

  constructor() {
      this.dict = {};
  }

  set(key: string, value: string, timestamp: number): void {
      if (!this.dict[key]) {
          this.dict[key] = {}
      }

      this.dict[key][timestamp] = value;

      if (!this.dict[key]['largest'] || this.dict[key]['largest'] < timestamp) {
          this.dict[key]['largest'] = timestamp;
      }
  }

  get(key: string, timestamp: number): string {
      console.log(this.dict);
      if (this.dict[key][timestamp]) {
          return this.dict[key][timestamp];
      } else {
          if (this.dict[key]['largest'] && this.dict[key]['largest'] < timestamp) {
              return this.dict[key][this.dict[key]['largest']];
          } else {
              return "";
          }
      }
  }
}

/**
* Your TimeMap object will be instantiated and called as such:
* var obj = new TimeMap()
* obj.set(key,value,timestamp)
* var param_2 = obj.get(key,timestamp)
*/

/************************** Attempt 2 Optimal time complexity - code a bit jank ********************************/
/*

The data structure to hold the time based store is an object {}

The keys can be the keys given, and the values can be arrays with tuples, each tuple will have the timestamp and value at that timestamp:

{
    'foo': [[1, 'bar'], [4, 'bar2']]
}

Getting 'foo' at timestamp 3 should return 'bar' from timestamp 1 (the largest timestamp less than timestamp 3, since timestamp 3 doesn't exist)

Getting 'foo' at timestamp 0 should return ""

Getting 'foo' at timestamp 4 should return 'bar2'

Since I need to keep track of every timestamp, and know the greatest timestamp_prevs which are less than a non-found timestamp, I need to keep track of the timestamps order. This is naturally done with an array since the storing of values at differen timestamps are done at ever increasing timestamps

So, to find the correct value to return when given a key that has multiple timestamps, I can use binary search

                    r
                    m
                              l                                     
[[1, 'bar'], [4, 'bar2'], [6, 'bar3'], [7, 'bar4']]

The timestamp I'm given to get is 5

is target < m[0]?
    1. Go left

Is target > m[0]?
    1. Go right

In this scenario, r and m ended up pointing at the one to return

                                            r
                                            m
                                                      l                                     
[[1, 'bar'], [4, 'bar2'], [6, 'bar3'], [7, 'bar4']]

The timestamp I'm given is 8

target > m[0]
    1. Go right

target > m[0]
    1. Go right

                                            r
                                            m
                                l                                     
[[1, 'bar'], [4, 'bar2'], [6, 'bar3'], [8, 'bar4']]

The target I'm given is 7

target > m[0]
    1. go right

target < m[0]
    1. go left


    r
    m
                  l                                     
[[1, 'bar'], [4, 'bar2'], [6, 'bar3'], [7, 'bar4']]

If I'm looking for 3

If I exit the loop and don't return anything, I can check if the timestamp at m is less than the target
    1. If so, return the current timestamp value at m
Else: the current timestamp at m is greater than the one I'm looking for, so return the one to the left of m
    1. return timestamp[m - 1]

Pseudocode:
Constructor:
1. add dict to instance variables in constructor args
2. set this.dict = dict

Set:
1. If the given key exists in this.dict:
    1. Push the current timestamp and value as a tuple onto the value at that key in this.dict
    2. Else, set the key to be in this.dict, with its value being an array holding the tuple

Get:
1. Instantiate a timestamps var at this.dict[key]
2. Instantiate a left pointer at 0
3. Instantiate a right pointer at timestamps.length - 1
4. Instantiate a mid pointer at Math.ceil((l + r) / 2);
5. While l <= r
    1. Check if timestamp > timestamps[mid][0]
        1. If so, you need to go right, so l = m + 1
    2. Else check if timestamp < timestamps[mid][0]
        1 If so, you need to go left, so r = m - 1
    3. Else: timestamps[mid][0] === timestamp
        1. You've found it, so return the value at the current tuple timestamps[mid][1]
    4. Recalculate mid
6. At the end, if you're here, that means you never found the timestamp in the array, so check the mid pointer that's saved outside the while loop
    1. If timestamps[m][0] < timestamp:
        return timestamps[m][1]
    2. Else: (timestamps[m][0] > timestamp, since if it was equal, it would've returned within the above while loop)
        return timestamps[m - 1][1]

Time complexity: O(log n) - Where n is the length of the timestamps list at the given key when being asked to get a value at a specific timestamp. Since I'm using binary search to find the correct timestamp or the greatest timestamp that's less than the correct timestamp, and since the constructor and set functions are both O(1), the worst case time complexity for this problem is O(log n)

Space complexity: O(n) - Where n is the number of unique timestamps I'm asked to store within the various keys, since I'm using arrays at each key given to hold each timestamped value given

*/

class TimeMap {
    dict: object;
    
    constructor() {
        this.dict = {};
    }

    set(key: string, value: string, timestamp: number): void {
        this.dict[key] ? this.dict[key].push([timestamp, value]) : this.dict[key] = [[timestamp, value]];
    }

    get(key: string, timestamp: number): string {
        const timestamps = this.dict[key];
        if (!timestamps) return "";
        let l = 0;
        let r = timestamps.length - 1;
        let m;

        while (l <= r) {
            m = Math.ceil((l + r) / 2);
            if (timestamp > timestamps[m][0]) {
                l = m + 1;
            } else if (timestamp < timestamps[m][0]) {
                r = m - 1;
            } else {
                return timestamps[m][1];
            }
        }

        if (timestamps[m][0] < timestamp) {
            return timestamps[m][1];
        } else {
            if (m === 0) {
                return "";
            } else {
                return timestamps[m - 1][1];
            }
        }
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

/**************** Attempt #3 - good, easy, fast ******************/
class TimeMap {
    dict: object;
    
    constructor() {
        this.dict = {};
    }

    set(key: string, value: string, timestamp: number): void {
        this.dict[key] ? this.dict[key].push([timestamp, value]) : this.dict[key] = [[timestamp, value]];
    }

    get(key: string, timestamp: number): string {
        // check if the key exists in the dict, if not return ""
        if (!this.dict[key]) return "";

        // if the key does exist in dict, check if it exists at the timestamp using binary search
        let l = 0;
        let r = this.dict[key].length - 1;
        const timestamps = this.dict[key];

        let largestTimestampPrev: [number, string] = [-1, ""];

        while (l <= r) {
            const m = Math.ceil((l + r) / 2);

            if (timestamp < timestamps[m][0]) {
                r = m - 1;
            } else if (timestamp > timestamps[m][0]) {
                // store the timestamp at m if that timestamp is greater than the currently saved largestTimestampPrev's timestamp (since it's still less than the target timestamp)
                largestTimestampPrev = largestTimestampPrev[0] < timestamps[m][0] ? timestamps[m] : largestTimestampPrev;
                l = m + 1;
            } else {
                return timestamps[m][1];
            }
        }

        return largestTimestampPrev[1];

    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

/********** Attempt #4 - got everything right except I incremented/decremented l and r instead of setting it 1 more/1 less than m ***********/

class TimeMap {
    dict: object;
    
    constructor() {
        this.dict = {};
    }

    set(key: string, value: string, timestamp: number): void {
        this.dict[key] ? this.dict[key].push([timestamp, value]) : this.dict[key] = [[timestamp, value]];
    }

    get(key: string, timestamp: number): string {
        if (!this.dict[key]) return "";

        const values = this.dict[key];
        let largestTimestamp;

        let l = 0;
        let r = values.length - 1;

        while (l <= r) {
            const m = Math.ceil((l + r) / 2);

            const ts = values[m][0];

            if (ts < timestamp) {
                if (!largestTimestamp) {
                    largestTimestamp = values[m];
                } else {
                    largestTimestamp = largestTimestamp[0] < ts ? values[m] : largestTimestamp;
                }
                l = m + 1;
            } else if (ts > timestamp) {
                r = m - 1;
            } else {
                largestTimestamp = values[m];
                break;
            }
        }

        return largestTimestamp ? largestTimestamp[1] : "";
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
