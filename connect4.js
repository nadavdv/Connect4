let currPlayer = 0
let players = ["redPlayer","yellowPlayer"]
let gameOver = false
let draw = false

let rows=6
let columns=7

window.onload = function() {
    setGame()
}

function setGame(){
    board = [[-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1],]

    heights = [5,5,5,5,5,5,5]

    let cols = document.querySelectorAll(".col")
    cols.forEach(col => col.addEventListener('click', e => colHandleClick(col)))
    cols.forEach(col => col.addEventListener('mouseover', e => colHandleHover(col)))
    cols.forEach(col => col.addEventListener('mouseout', e => colHandleOut(col)))
    

}


function colHandleClick(col){
    if(!gameOver && !draw){
        let message = document.getElementById("messages")
        message.innerText=""
        let colNum = col.classList.item(1).charAt(3)
        if(heights[colNum]>=0){
            let tile = document.getElementById(heights[colNum]+"-"+colNum)
            board[heights[colNum]][colNum]= currPlayer
            heights[colNum]--
            tile.classList.remove(players[currPlayer]+"Hover")
            tile.classList.add(players[currPlayer])
            

            if(isGameOver(currPlayer)){
                let winner = document.getElementById("winner")
                winner.innerText = players[currPlayer] + " is the winner!"
            }

            if(isDraw()){
                draw = true
                let winner = document.getElementById("winner")
                winner.innerText = "Draw!"
            }

            switchTurns()
            colHandleHover(col)
        }

        else{
            let message = document.getElementById("messages")
            message.innerText = "choose again"
        }
    }


}

function colHandleHover(col){
    if(!gameOver && !draw){
        let colNum = col.classList.item(1).charAt(3)
        if(heights[colNum]>=0){
            let tile = document.getElementById(heights[colNum]+"-"+colNum)
            tile.classList.add(players[currPlayer]+"Hover")
        }

    }
}

function colHandleOut(col){
    if(!gameOver && !draw){
        let colNum = col.classList.item(1).charAt(3)
        if(heights[colNum]>=0){
            let tile = document.getElementById(heights[colNum]+"-"+colNum)
            tile.classList.remove(players[currPlayer]+"Hover")
        }

    }
}



function switchTurns(){
    if(currPlayer==0)
        currPlayer=1
    else
        currPlayer=0
}

function isDraw(){
    for(let h=0 ; h<heights.length ; h++){
        if(heights[h]>=0)
            return false
    }
    return true
}


function isGameOver(curr){
    gameOver =  ( horizontally(curr) || vertically(curr) || diagonally(curr))
    return gameOver
}


function horizontally(curr){
    
    for(let r=0 ; r<rows ; r++){
        let counter=0
        for(let c=0 ; c<columns ; c++){
            if(board[r][c] == curr)
                counter++
            else
                counter=0
            
            if(counter==4)
                return true
        }
    }
    return false;
}


function vertically(curr){

    for(let c=0 ; c<columns ; c++){
        let counter=0
        for(let r=0 ; r<rows ; r++){
            if(board[r][c] == curr)
                counter++
            else
                counter=0
            
            if(counter==4)
                return true
        }
        counter=0
    }
    return false;
}


function diagonally(curr){

    // first direction
    for(let r=0 ; r<rows-3 ; r++){
        for(let c=0 ; c<columns-3 ; c++){
            if(board[r][c] == curr & board[r+1][c+1] == curr & board[r+2][c+2] == curr & board[r+3][c+3] == curr)
                return true
        }
    }

    // second direction
    for(let r=3 ; r<rows ; r++){
        for(let c=0 ; c<columns-3 ; c++){
            if(board[r][c] == curr & board[r-1][c+1] == curr & board[r-2][c+2] == curr & board[r-3][c+3] == curr)
                return true
        }
    }

    return false;
}
