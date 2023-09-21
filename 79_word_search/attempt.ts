/*********************** Attempt #1 - didn't pass all testcases - 75/86 passed - logical approach though ************************/

/*

board = [["A","B","C","E"],
         ["S","F","C","S"],
         ["A","D","E","E"]]
        i  
word = "SEE"

Maybe I could iterate through the board until I find the first letter of the word

Then, I can recursively call the dfs function and pass in curr (a string that's just the first letter), increment i, and set the current cell to an adjacent word

I can have a base case that sets an external variable to true if curr is the same as the word parameter, then returns

I can have a base case that just returns up if the current 

                                        ['S']
         If left, Go Left['SC']     If down, Go Down['SE']     If up, go up ['SE']      If Right, go right, no right
[If the last letter in curr does not equal the current letter at i, return up]

Recursive step: a series of if statements

// go up
if (board[i - 1][j]) {
    dfs()

// go right
} else if (board[i][j + 1]) {
    dfs()

// go down
} else if (board[i + 1][j]) {
    dfs()

// go left
} else if (board[i][j - 1]) {
    dfs()
}

Base case:
if (curr === word) {
    externalVar = true;
    return
}

if (curr[curr.length - 1] !== word[i]) {
    return;
}

Pseudocode:
1. Instantiate a wordExists var at false
2. Instantiate a visited hashmap at {}
2. Define dfs function that takes in k: number, i: number, j: number curr: string
    // Base case
    1. if curr === word
        1. set wordExists to true
        2. return

    // Recursive case
    2. if the letter to the right of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
        1. Add this direction's `${i}${j}` coordinates to the visited hashmap
        2. call dfs on k + 1, i, j + 1, curr + board[i][j + 1]
    3. else if the letter to the up of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
        1. Add this direction's `${i}${j}` coordinates to the visited hashmap
        2. call dfs on k + 1, i - 1, j, curr + board[i - 1][j]
    4. else if the letter to the left of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
        1. Add this direction's `${i}${j}` coordinates to the visited hashmap
        2. call dfs on k + 1, i, j - 1, curr + board[i][j - 1]
    5. else if the letter to the down of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
        1. Add this direction's `${i}${j}` coordinates to the visited hashmap
        2. call dfs on k + 1, i + 1, j, curr + board[i + 1][j], 'up'

3. Loop through the board at i
    1. Loop through the board at j
        1. if the current letter at [i][j] === the first letter in word: call the dfs function, pass in i = 0, curr = `${letter at [i][j]}`
        2. if wordExists is true, break from this inner loop
        3. Clear out the visited hashmap
    2. if wordExists is true, break from this outer loop
4. Return wordExists

Time complexity: O(m*n*s) - Where m is the number of rows in the board, n is the number of letters in each row, and s is the number of letters that match the first letter in word, since I'm only going a direction from that beginning letter if a letter exists in that direction, and if that letter matches the next letter in word, I'm not going down branches I don't need to go down

Space complexity: O(h) - Where h is the number of possible words in the board that closely match word, since I'd go down any matching paths until I find a letter 

Issue: I think I need a hashmap to hold visited coordinates, instead of using fromDirection

*/
/*
// Base case
1. if curr === word
    1. set wordExists to true
    2. return

// Recursive case
2. if the letter to the right of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
    1. Add this direction's `${i}${j}` coordinates to the visited hashmap
    2. call dfs on k + 1, i, j + 1, curr + board[i][j + 1]
3. else if the letter to the up of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
    1. Add this direction's `${i}${j}` coordinates to the visited hashmap
    2. call dfs on k + 1, i - 1, j, curr + board[i - 1][j]
4. else if the letter to the left of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
    1. Add this direction's `${i}${j}` coordinates to the visited hashmap
    2. call dfs on k + 1, i, j - 1, curr + board[i][j - 1]
5. else if the letter to the down of the current letter exists, and if that coordinate is not in the visited hashmap, and that letter === the next letter in word (k + 1)
    1. Add this direction's `${i}${j}` coordinates to the visited hashmap
    2. call dfs on k + 1, i + 1, j, curr + board[i + 1][j], 'up'
*/

/*

["A","B","C","E"]
["S","F","C","S"]
["A","D","E","E"]

word = "SEE"

*/
function exist(board: string[][], word: string): boolean {
    let wordExists = false;
    let visited = {};

    function dfs(k: number, i: number, j: number, curr: string) {
        if (curr.toLowerCase() === word.toLowerCase()) {
            wordExists = true;
            return;
        }

        const rightLetter = board[i][j + 1] || null;
        const upLetter = board[i - 1] ? board[i - 1][j] : null;
        const leftLetter = board[i][j - 1] || null;
        const downLetter = board[i + 1] ? board[i + 1][j] : null;
        
        visited[`${i}${j}`] = true;
        if (rightLetter && !visited[`${i}${j + 1}`] && rightLetter.toLowerCase() === word[k + 1].toLowerCase()) {
            dfs(k + 1, i, j + 1, curr + rightLetter);
        }
        
        if (upLetter && !visited[`${i - 1}${j}`] && upLetter.toLowerCase() === word[k + 1].toLowerCase()) {
            dfs(k + 1, i - 1, j, curr + upLetter);
        }
        
        if (leftLetter && !visited[`${i}${j - 1}`] && leftLetter.toLowerCase() === word[k + 1].toLowerCase()) {
            dfs(k + 1, i, j - 1, curr + leftLetter);
        }
        
        if (downLetter && !visited[`${i + 1}${j}`] && downLetter.toLowerCase() === word[k + 1].toLowerCase()) {
            dfs(k + 1, i + 1, j, curr + downLetter);
        }
    }

    for (let m = 0; m < board.length; m += 1) {
        for (let n = 0; n < board[m].length; n += 1) {
            if (board[m][n].toLowerCase() === word[0].toLowerCase()) {
                dfs(0, m, n, board[m][n]);
                if (wordExists) break;
                visited = {};
            }

            if (wordExists) break;
        }
    }
    console.log('after', wordExists);
    return wordExists;
};
