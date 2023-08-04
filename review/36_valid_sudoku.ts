/**
 * @param {character[][]} board
 * @return {boolean}

I could use hashmaps for rows, columns, and 3x3 sub boxes to determine if each of these types of groups contain the digits 1-9 without repetition

Iterate over the 2D array board input -> 
    check if the current number is in its corresponding row in the row hashmap
    check if the current number is in its corresponding column in the column hashmap
    check if the current number is in its corresponding 3x3sub-box in the subBox map

    If any of the above conditions are true, return false, because that would mean the sudoku board is invalid

    If you pass the above if statements, then the current number is valid to add to its row in the row hashmap, its column in the column hashmap, and its sub-box in the subBox map

When on a particular number, how do I find its row, its column, and its 3x3 sub-box?
    row: whatever i is (outer loop)
    column: whatever j is (inner loop)
    3x3 sub-box: if I have the coordinates for the first number (0,0), I will need to fit it into the subbox (0,0) (if each sub box is its own coordinate, and we consider the board a set of 9 boxes 3x3, the first sub box would be (0,0))
        I will need to convert the following coordinates to (0,0):
            (0,0) / 3,3 = (0,0)
            (0,1) / 3,3 = 0,0.333 (round down) = (0,0)
            (0,2) / 3,3 = 0, .666 (round down) = (0,0)
            
            (1,0) / 3,3 = .333, 0 (round down) = (0,0)
            (1,1) / 3,3 = .333, .333 (round down) = (0,0)
            (1,2) / 3,3 = .333, .666 (round down) = (0,0)

            (2,0) / 3,3 = .666, 0 (round down) = (0,0)
            (2,1) / 3,3 = .666, .333 (round down) = (0,0)
            (2,2) / 3,3 = .666, .666 (round down) = (0,0)

        I will need to convert the following coordinates to (0,1):
            (0,3) / 3,3 = 0, 1 (round down) (0,1)
            (0,4) / 3,3 = 0, 1.25 (round down) = (0,1)
            (0,5) / 3,3 = 0, 1.666 (round down) = (0,1)
            
            (1,3) / 3,3 = .333, 1 (round down) = (0,1)
            (1,4) / 3,3 = .333, 1.25 (round down) = (0,1)
            (1,5) / 3,3 = .333, 1.666 (round down) = (0,1)

            (2,3) / 3,3 = .666, 1 (round down) = (0,1)
            (2,4) / 3,3 = .666, 1.25 (round down) = (0,1)
            (2,5) / 3,3 = .666, 1.666 (round down) = (0,1)

    Integer division by 3 gets me a specific box's corresponding outer 3x3 sub-box

Pseudocode:

1. Instantiate a rowMap that'll hold each row and a set as a value (the set will hold the numbers 1-9 to keep track of duplicates)
2. Instantiate a colMap that'll hold each column w/sets as values
3. Instantiate a subBoxMap that'll hold each subBox w/sets as values
4. Iterate over the board input:
    1. Iterate over each board's row:
        1. If the current number is ".", continue
        2. Instantiate a k variable that'll be the subBox key for current box: k = `${Math.floor(i/3)Math.floor(j/3)}`
        3. Convert the current number string to a number: ParseInt(board[i][j], 10)
        4. If !rowMap[i]:
            1. Create rowMap[i] = new Set();
        5. If !colMap[j]:
            1. Create colMap[i] = new Set();
        6. If !subBoxMap[k]:
            1. Create colMap[k] = new Set();
        7. Once on the first number, check the following condition: if (rowMap[i].has(num) || colMap[j].has(num) || subBoxMap[k].has(num))
            1. return false (it's a duplicate)
        8. Add the current number into each hashmap at its corresponding key:
            rowMap[i].add(num)
            colMap[j].add(num)
            subBoxMap[k].add(num)
5. Return true

Time complexity: O(81) - since the sudoku board input is predetermined to be a 9x9 matrix
Space complexity: O(9 * 3) - since we use a hashmap for rows, columns, and sub-boxes, each of which are 9 keys long at most

*/
var isValidSudoku = function(board: string[][]): boolean {
    const rowMap = {};
    const colMap = {};
    const subBoxMap = {};

    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[i].length; j += 1) {
            const stringNum = board[i][j];
            if (stringNum === ".") {
                continue;
            } else {
                const num = parseInt(stringNum, 10);
                const k = `${Math.floor(i/3)}${Math.floor(j/3)}`;

                if (!rowMap[i]) {
                    rowMap[i] = new Set();
                }

                if (!colMap[j]) {
                    colMap[j] = new Set();
                }

                if (!subBoxMap[k]) {
                    subBoxMap[k] = new Set();
                }

                if (rowMap[i].has(num) || colMap[j].has(num) || subBoxMap[k].has(num)) {
                    return false;
                }

                rowMap[i].add(num);
                colMap[j].add(num);
                subBoxMap[k].add(num);
            }
        }
    }

    return true;
};
