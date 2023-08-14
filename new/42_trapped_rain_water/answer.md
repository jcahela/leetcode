Time to Complete: 45m

Method: I can calculate the max left height and max right height from any given index, and use the minimum height between those two bounds to get a minimum. I can then subtract the minimum by the height at the current index in order to get the water being trapped at that index. This works because, if you have a left or right height minimum that is less in height than the current index, the current index would trap no water (it's taller than any of its tallest neighbors, nearby or far away, so water would fall from there, and not get trapped). If your current height is less than the minimum height between the max left and max right heights, water would get trapped there, specifically the difference between the smaller height bound and the current height. This is how you would find a dip in elevation where a bowl-like shape exists and water can be trapped, by determining that you're on a height that is inside that bowl (the minimum between the max left and max right heights is larger than the current height, meaning the boundaries of the current trap are larger, and your current height is inside that bowl)

Pseudocode:
/*
1. Instantiate a leftBound array at height.length filled with 0s
2. Instantiate a rightBound array at height.length filled with 0s
4. Instantiate a left pointer at 0 and right pointer at height.length - 1
3. Instantiate a leftMax var that starts at 0
5. Instantiate a rightMax var that starts at 0
6. while left pointer is less than the length of heights
    1. leftNum = height[left]
    2. rightNum = height[right]
    3. leftMax = Math.max(leftMax, leftNum)
    4. rightMax = Math.max(rightMax, rightNum);
    5. leftBound[left] = leftMax
    6. rightBound[right] = rightMax
    7. Increment left 
    8. Decrement right
7. Instantiate a trappedWater var at 0
8. Iterate over the height array
    1. Add to trappedWater the following: Math.min(leftBound[i], rightBound[i]) - currentNum
9. Return trappedWater
*/


Code:

```js
function trap(height: number[]): number {
    const leftBound = Array.from({ length: height.length }, () => 0);
    const rightBound = Array.from({ length: height.length }, () => 0);

    let left = 0;
    let right = height.length - 1;

    let leftMax = 0;
    let rightMax = 0;

    while (left < height.length) {
        const leftNum = height[left];
        const rightNum = height[right];
        leftMax = Math.max(leftMax, leftNum);
        rightMax = Math.max(rightMax, rightNum);

        leftBound[left] = leftMax;
        rightBound[right] = rightMax;

        left += 1;
        right -= 1;
    }

    let trappedWater = 0;

    for (let i = 0; i < height.length; i += 1) {
        trappedWater += Math.min(leftBound[i], rightBound[i]) - height[i];
    }

    return trappedWater;
};
```


Time Complexity: O(n)
Explanation: Where n is the length of the height array. Since we iterate over it 3 times sequentially, it simplifies to O(n)

Space Complexity: O(n)
Explanation: Where n is the length of the height array. Since we're using the maxLeft and maxRight arrays to hold the same amount of numbers as the height array, the space complexity simplifies to O(n).
