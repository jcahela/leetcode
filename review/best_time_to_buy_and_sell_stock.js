/**
 * @param {number[]} prices
 * @return {number}

Description:

You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

--------------------------------------

Thoughts:

        l         r
ex1. [7,1,5,3,6,4]

                l r
ex2. [7,6,4,3,1]

              l   r
ex3. [7,1,5,6,0,7]

Since profits can only be compared moving forward in time (don't need to go back) I can use a sliding window approach, and check for any increases in price

Start left and right pointers at indices 0 and 1, then check:
    Is right bigger than left? Then that's our first calculated profit
        once calculated, increment the right pointer to look for a larger sell
        if the new right pointer is pointed at a number that would result in a bigger profit, set the profit again, then increment right
        if the new right pointer is a lower profit but still bigger than left, increment right
    Is right smaller than left? Then that's our new buy time, so set left equal to right and start again
    This can all be done within a while loop of while right pointer is less than the length of prices

Pseudocode:
1. Instantiate a left pointer at 0
2. Instantiate a right pointer at 1
2.5 Instantiate a profit number at 0
3. While the right pointer is less than the length of the prices array
    1. Is number at the right pointer > number at the left pointer?
        Is the current difference between number at right and number at left greater than the current profit?
            Set the profit to be the difference between number at right and number at left
        Increment right pointer
    2. Else (number at the right pointer is < or = number at left pointer)
        Set left pointer to be right pointer
        set right pointer to be left + 1
4. Return profit

Time complexity: O(n) - where n is the length of the prices array, since we only have to iterate over it once to get the max profit
Space complexity: O(1) - since we're only using pointers to calculate the profit

*/

// Profit = 5
//    l         r
//  0 1 2 3 4 5
// [7,1,5,3,6,4]

// Profit = 0
//          l r
//  0 1 2 3 4
// [7,6,4,3,1]

var maxProfit = function(prices) { 
    let l = 0;
    let r = 0;
    let profit = 0;

    while (r < prices.length) {
        if (prices[r] > prices[l]) {
            if (prices[r] - prices[l] > profit) {
                profit = prices[r] - prices[l]
            }
            r += 1;
        } else {
            l = r;
            r = l + 1;
        }
    }

    return profit;
}
