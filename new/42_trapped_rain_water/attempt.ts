/* SUCCESS

At a particular height, I will need to know its left bound and right bound

For example, at index 6, with a height of 0, the left bound would be the max on the left, and the right bound
would be the max on the right, but it'll only fill up to the lower of the two bounds

leftBound:
[0,1,1,2,2,2,2,3,3,3,3,3]

rightBound:
[3,3,3,3,3,3,3,3,2,2,2,1]

                   i                                          
[0,1,0,2,1,0,1,3,2,1,2,1]

Iterations
0. Math.min(leftBound[i], rightBound[i]) - 0 = 0 - 0 = 0
1. Math.min(leftBound[i], rightBound[i]) - 1 = 1 - 1 = 0
2. Math.min(leftBound[i], rightBound[i]) - 0 = 1 - 0 = 1
3. Math.min(leftBound[i], rightBound[i]) - 2 = 2 - 2 = 0
4. Math.min(leftBound[i], rightBound[i]) - 1 = 2 - 1 = 1
5. Math.min(leftBound[i], rightBound[i]) - 0 = 2 - 0 = 2
6. Math.min(leftBound[i], rightBound[i]) - 1 = 2 - 1 = 1
7. Math.min(leftBound[i], rightBound[i]) - 3 = 3 - 3 = 0
8. Math.min(leftBound[i], rightBound[i]) - 2 = 2 - 2 = 0
9. Math.min(leftBound[i], rightBound[i]) - 1 = 2 - 1 = 1
10. Math.min(leftBound[i], rightBound[i]) - 2 = 2 - 2 = 0
11. Math.min(leftBound[i], rightBound[i]) - 1 = 1 - 1 = 0

6

Pseudocode:
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

Time complexity: O(n) - Since we only iterate through the height array twice, but at the same level, it simplifies to O(n)
Space complexity: O(n) - Since we use 2 arrays for bounds to hold the left and right bounds

*/

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
