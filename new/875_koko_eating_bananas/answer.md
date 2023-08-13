Time to Complete: 30m

Method: By looking at the brute force method, I can check every possible k value until I get to the first k that resulted in all the piles being eaten in h hours. What are the possible values of k? The minimum amount of bananas koko can eat per hour is 1, so k's lowest value can be 1. The maximum amount of bananas koko can eat per hour is whatever the max pile of bananas is in the piles array, so max(p). If koko eats the max pile of bananas every hour, it'd take piles.length number of hours to eat all the piles. And since h is guaranteed to be greater than or equal to the length of piles, eating the max(p) number of bananas as k would be the most koko would need to eat per hour to eat all the bananas in h hours or less. Therefore, first k I'd need to check in a brute force method is 1, up to the last k I'd need to check which is max(p), the largest pile in the piles array. The time complexity of this solution would be O(max(p) * p) - where max(p) is the largest pile in p, and p is the length of the piles array. Since I'd need to check the k values in the range from 1 - max(p), and since at each of these checks I'd need to iterate over the piles array to determine if koko ate all the bananas within h number of hours.

However, I can find the k in range 1 - max(p) faster using binary search. By checking the mid point, and seeing if the k at that midpoint resulted in 1) eating all bananas, and 2) eating it in exactly h hours, I can then eliminate either all the values below or above the midpoint. For example, if my range of k values to check is 1 - 10, and the first value I check in the midpoint is 6, and that results in koko eating all bananas in the pile before h number of hours, we know 6 is too large. Therefore, all numbers above 6 are too large. If the midpoint 6 results in not finishing the bananas by the time h number of hours is up, we know 6 is too small. Therefore, all numbers below 6 are too small.

I need to 1) find a way to test if a given k finishes the bananas in the piles array in exactly h number of hours, and 2) binary search through the values of k to perform step 1 as few times as possible.

Simplifying this problem, if I was given a k, can I determine if that k finishes the bananas too quickly or too slowly? If it finishes the bananas in < h number of hours, it'd be too quick, so I'd need a smaller k. If it finishes the bananas in > h number of hours, it'd be too slow, so I'd need a larger k.

Pseudocode:
/*
1. Instantiate a min variable at 1
2. Instantiate a max variable at Math.max(...piles)
3. Instantiate a minK variable that starts at 0
4. Define a calculateHours function that takes in a k (mid between min and max), it can use the piles in the outer function, and the h in the outer function, because it won't mutate them
    1. In calculateHours, instantiate an hours var at 0
    2. Iterate over the piles
        1. In each iteration, store the current pile in a let variable currentPile
        2. Divide the current pile by k, then round up (since koko will take an hour to eat any remainder)
        3. Add that to the hours
    3. Return hours var
5. While min <= max
    1. Calculate a mid: Math.ceil((min + max) / 2)
    2. Instantiate a midHours var at calculateHours(mid)
    3. If midHours is less than or equal to h
        1. Set minK to mid
        2. Set max = mid - 1 (although this mid could result in eating all bananas in exactly h hours, you still need to search the left for a smaller number that could do the same, i.e. the MINIMUM k)
    4. Else (midHours is greater than h)
        1. You're eating too slow, increase mid: min = mid + 1
6. Return the minK variable
*/


Code:

```js
function minEatingSpeed(piles: number[], h: number): number {
    let min = 1;
    let max = Math.max(...piles);
    let minK;

    function calculateHours(k: number): number { // 16
        let hours = 0; // 8
        for (let i = 0; i < piles.length; i += 1) {
            let currentPile = piles[i];
            hours += Math.ceil(currentPile / k);
        }
        return hours;
    }

    while (min <= max) {
        const mid = Math.ceil((min + max) / 2); // 16

        const midHours = calculateHours(mid); // 8

        if (midHours <= h) {
            max = mid - 1;
            minK = mid;
        } else {
            min = mid + 1;
        }
    }

    return minK
};
```


Time Complexity: O(n * log*Max(n))
Explanation: Where n is the length fo the piles array. Since I'm running the calculateHours function which is O(n) within a binary search from 1 to the max pile in the piles array, which is O(log Max(n)), the overall time complexity is O(n * log*Max(n))

Space: O(1)
Explanation: Since I'm only using pointers and holding single points of data to divide from from within calculateHours
