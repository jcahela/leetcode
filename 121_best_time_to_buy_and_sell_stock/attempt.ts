/*

Since I can only choose a single day to buy, and I must choose a different day in the future to sell that stock, I can only move forward. So I could use a sliding window approach

minBuy

if buy is greater than sell, that'd be losing money, so I can set buy to be the sell day, and continue forward

Now that buy is smaller than sell, I have my first potential choice:

Buy is at 1
Sell is at 6
Profit is at 5

Continue incrementing sell

Is the new sell resulting in a greater profit? If so you have a new sell day, but if not you don't

Is the new sell less than the current buy? If so you can set the new buy to be this sell date, since if you run into any larger numbers in the future, this new smaller buy date would still be the better buy date as it's less than the previous buy date and would result in more profit

   b       s
[7,1,5,3,6,4]


b = 1
s = 8
profit = 7

       b     s
[7,2,5,1,8,4]

7

       b     s
[7,2,5,1,8,4]

Pseudocode:
1. Instantiate a buyIndex var at 0
2. Instantiate a sellIndex var at 1
3. Instantiate a profit var at 0
4. While sellIndex is less than the length of prices array
    1. Instantiate a buyPrice at prices[buyIndex]
    2. Instantiate a sellPrice at prices[sellIndex]
    3. First, check if buyPrice is greater than sellPrice
        1. If so, buyIndex = sellIndex
        2. And, sellIndex = buyIndex + 1
        3. Continue the loop
    4. Else (buyPrice is either less than or equal to sellPrice, so we can check the profit)
        1. profit = Math.max((sellPrice - buyPrice), profit)
        2. sellIndex + 1
5. Return profit

Time complexity: O(n) - Since we're only iterating through the prices array once to find the best time to buy and sell using a sliding window

Space complexity: O(1) - Since we're only using pointers and a var holding a profit number

*/


//  b s
// [7,1,5,3,6,4]

function maxProfit(prices: number[]): number {
  let buyIndex = 0;
  let sellIndex = 1;
  let profit = 0;

  while (sellIndex < prices.length) {
      const buyPrice = prices[buyIndex];
      const sellPrice = prices[sellIndex];

      if (buyPrice > sellPrice) {
          buyIndex = sellIndex;
          sellIndex = buyIndex + 1;
      } else {
          profit = Math.max((sellPrice - buyPrice), profit);
          sellIndex += 1;
      }
  }

  return profit;
};

/************** Attempt #3 easy *****************/

/*

Use a sliding window with buy as the left pointer and sell as the right

If sell is greater than buy, I set buy to be that sell number

Then, once sell is greater than buy, I calculate the profit I would make, and save it in the profit var if it's a larger profit than the current profit var

Since you can only move forward, you can't buy at an index greater than the sell, you can only move forward in the window, so a sliding window would work

Pseudocode:
1. Instantiate a profit var at 0
2. Instantiate a buy var at 0
3. Instantiate a sell var at 1
4. While sell is < prices.length
    1. If the number at sell is smaller than or equal to the number at buy
        1. Set buy to be sell
    2. Else (number at sell is larger than number at buy)
        1. Replace profit with the difference of sell and buy if the difference is larger than profit
    3. Increment sell
5. Return profit

Time complexity: O(p) - Where p is length of prices array since we only need to iterate through it once
Space complexity: O(1) - Since I'm only using pointers

*/

function maxProfit(prices: number[]): number {
    let profit = 0;
    let buy = 0;
    let sell = 1;
    while (sell < prices.length) {
        if (prices[sell] <= prices[buy]) {
            buy = sell;
        } else {
            profit = Math.max(profit, (prices[sell] - prices[buy]));
        }
        sell += 1;
    }

    return profit;
};
