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

/*************************** Attempt #2 - success using two arrays *********************************/

/*

Each height takes up water based on the smaller of the two max borders around it

1st height of 0 takes no water, since it spills over to the side (left of this has no heights)

2nd height of 1 takes no water, since the smaller surrounding border is 0 (spills over to the left)

3rd height of 0 takes 1 water, since the smaller surrounding border is 1 (the left border)

4th height of 2 takes no water, since the smaller surrounding border is 1 (left border)

5th height of 1 takes 1 water, since the smaller surrounding border is 2

6th height of 0 takes 2 water, since the smaller surrounding border is 2

So first I need to check what the max left border is

Then I need to find what the max right border is

Then use the smaller of the two at each index to calculate how much water would be held at a specific height at that index

 0 1 1 2 2 2 2 3 2 2 2 1
[0,1,0,2,1,0,1,3,2,1,2,1]

Pseudocode:
1. Instantiate a minBorder array at [];
2. Iterate through height array
    1. If the minBorder array is empty, push the current height to it
    2. Push the max between the current height and the top height in minBorder
3. Iterate through the height array backwards
    1. Set the minBorder at the current index to the minimum between the current height and the height in the minBorder at that index
4. Instantiate an output arr at 0
5. Iterate over height array
    1. Add to output the minBorder at that index - height at that index
6. Return height

Time complexity: O(n) - Since I only iterate over heights 3 times, which simplifies to n
Space complexity: O(n) - Since I store n amount of items in the minBorder array

*/

function trap(height: number[]): number {
    const maxLeftBorder = Array.from({ length: height.length }, () => 0);
    const maxRightBorder = Array.from({ length: height.length }, () => 0);
    let l = 0;
    let r = height.length - 1;
    while (l < height.length) {
        maxLeftBorder[l] = !maxLeftBorder[l - 1] ? height[l] : Math.max(height[l], maxLeftBorder[l - 1]);
        maxRightBorder[r] = !maxRightBorder[r + 1] ? height[r] : Math.max(height[r], maxRightBorder[r + 1])
        l += 1;
        r -= 1;
    }

    let output = 0;

    for (let i = 0; i < height.length; i += 1) {
        output += Math.min(maxLeftBorder[i], maxRightBorder[i]) - height[i];
    }

    return output;
};
