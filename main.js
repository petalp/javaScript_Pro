// 1.Deposit some money
// 2.Determine number of lines to bet on
// 3.Collect a bet amount
// 4.Spin the slot machine
// 5.check if the user won
// 6.give the user their winnings
// 7.play again

const prompt = require("prompt-sync")();

const COLS = 3;
const ROWS = 3;

const SYMBOLS_COUNT = {
    "A" : 3,
    "B" : 4,
    "C" : 6,
    "D" : 10,
}

const SYMBOL_VALUE = {
    'A':5,
    'B': 10,
    'C' : 20,
    'D' : 35
}



const depositAmount = () => {
    while(true){
        const deposit = prompt("Enter the amount you want to bet?: ");
        const amount = parseFloat(deposit);
        if (isNaN(amount) || amount < 0){
            console.log("You have entered invalid bet amount!!!!");
        } else{
            return amount;
        }
    }
}

const numberOfLines = () => {
    while(true){
        const lineNumber = prompt("Enter the number of lines you want to bet on: ");
        const lines = parseFloat(lineNumber);
        if (isNaN(lines) || lines< 0 || lines > 3){
            console.log("You have entered invalid bet amount!!!!");
        } else{
            return lines;
        }
    }
}

const numberOfBet = (balance, lines) => {
    while(true){
        const betAmount = prompt("Enter the amount you want to bet?: ");
        const bet = parseFloat(betAmount);
        if (isNaN(bet) || bet < 0 || bet > balance/lines){
            console.log("You don't enough money to bet for the game");
        } else{
            return bet;
        }
    }
}


const spin = () => {
    const symbols = [];
    for (let [symbol, i] of Object.entries(SYMBOLS_COUNT)){
        for (let count=0; count<i; count++){
            symbols.push(symbol)
        }
    }
    

    // time for the spinning the values
    const reelSymbols = [...symbols];
    const reels = [];
    for (let i=0; i<COLS; i++){
        reels.push([]);
        for (let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length)
            const selectValue = reelSymbols[randomIndex]
            reels[i].push(selectValue)
            reelSymbols.splice(randomIndex, 1)
        }
    } return reels

}

const transpose = (reels) => {
    const rows = []
    for (let i=0; i<ROWS; i++){
        rows.push([])
        for (let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }return rows
}

const printRow = (rows) => {
    // print the row for the game
    for (let  row of rows){
        reelString = "";
        for (let [i, value] of Object.entries(row)){
            reelString += value;
            if (i != row.length){
                reelString += " | ";
            }
        }console.log(reelString);
    }
}

const winning = (rows, lines, bet) => {
    // check if the player wins or not
    const win = 0;
    for (let i=0; i<lines; i++){
        const symbol = rows[i];
        let allSame = true;
        for (let row of symbol){
            if (row != symbol[0]){
                allSame = false
                break;
            }
        }

        if(allSame){
            win += bet*SYMBOL_VALUE[symbol[0]]
        }
    } return win
}

const game = () => {
    // this function plays the game !!!!!
        let balance = depositAmount()

        while (true) {
        const lineNumber = numberOfLines()
        const betAmount = numberOfBet(balance, lineNumber)
        balance -= lineNumber * betAmount
        const reels = spin()
        const row = transpose(reels)
        printRow(row)
        const wins = winning(row, lineNumber, betAmount)
        balance += wins
        console.log("You have won" + wins)

        if (balance <= 0){
            console.log("You balance has finished");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?");
        if(playAgain.toLowerCase() != "y"){
            break;
        }
        }
    }

game()