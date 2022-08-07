var gridSize;
let gridMatrix = [];
let coords = [];
let fruitCell = [];
let lastDirection = [0, 0];

let autoMoveTimer = null;
let clickedWait = 250;
let inGame = true;

const placeHead = () => {
    coords = [];
    let y = randomInteger(gridSize);
    let x = randomInteger(gridSize);
    coords.push([y, x]);

    gridMatrix[y][x] = 2;
    // console.log("head placed");
}
const addTail = () =>{
    coords.push(coords[coords.length-1]);
    console.log("new tail");
    console.log(coords);
}

const placeFruit = () => {
    fruitCell.pop();
    fruitCell.pop();

    let y = randomInteger(gridSize);
    let x = randomInteger(gridSize);

    while(gridMatrix[y][x] != 0){
        y = randomInteger(gridSize);
        x = randomInteger(gridSize);
    }

    fruitCell.push(y);
    fruitCell.push(x);

    gridMatrix[y][x] = 3;
    console.log("fruit placed");
}


const newMatrix = () => {
    gridMatrix = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        gridMatrix[i] = new Array(gridSize);
    }

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++)
            gridMatrix[i][j] = 0;
        
    }
    // console.log(gridMatrix);
}


const setGridSize = () => {
    gridSize = $("#gridSizeInput").val();
    newMatrix();
    drawGrid();
}

const drawGrid = () => {
    // console.log("grid size: " + gridSize);
    let grid = $("#grid");

    grid.empty();
    grid.css("grid-template-columns", "repeat(" + gridSize + ", 1fr)");
    grid.css("grid-template-rows", "repeat(" + gridSize + ", 1fr)");

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            grid.append(
                '<div class="cell cell_' + i + "_" + j + ' flexCenter"></div>'
            );
        }
    }
    console.log("new grid");
}
const reloadDiv = (cells) => {
    for(let i = 0; i < cells[length]; i++){
        $(cells[i]).load(location.href + "#grid >" + cells[i]);
    }
}

const checkEnd = () => {
    console.log("check");
    if(coords[0][0] < 0 || coords[0][0] < 0 || coords[0][0] > gridSize - 1 || coords[0][1] > gridSize - 1){
        inGame = false;
        // alert("you lost");
        console.log("lost");
    }
}
const drawContentes = () => {

    let reloadCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            
            let cell = String(".cell_" + i + "_" + j); 
            let classes = ["head", "tail", "apple"];

            for(let k = 0; k < classes.length; k++){
                if($(cell).hasClass(classes[k]))
                    $(cell).removeClass(classes[k]);
            }

            // console.log(cell);
            if(gridMatrix[i][j] == 2)
                $(cell).addClass("head");
            
            if(gridMatrix[i][j] == 1)
                $(cell).addClass("tail");
            
            if(gridMatrix[i][j] == 3)
                $(cell).addClass("apple");

            if(gridMatrix[i][j] != 0)
                reloadCells.push(cell);
        }
    }
    reloadDiv(reloadCells);

    // console.log("content drawed");
}

const gameInit = () => {
    placeHead();
    placeFruit();
    drawContentes();
}

function randomInteger(max){
    return Math.floor(Math.random() * (max));
}

const updateGridValues = () =>{
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if(gridMatrix[i][j] != 3)
                gridMatrix[i][j] = 0;
        }
    }
    for (let i = 0; i < coords.length; i++) {
        const tmp = coords[i];
        // console.log(tmp);

        if(i == 0)
            gridMatrix[tmp[0]][tmp[1]] = 2;
        else
            gridMatrix[tmp[0]][tmp[1]] = 1;
    }
    // console.log(gridMatrix);
}

const fruitCollision = () => {
    if(fruitCell[0] == coords[0][0] && fruitCell[1] == coords[0][1]){
        $(".fruitNumder").html(parseInt($(".fruitNumder").html()) + 1);
        placeFruit();
        addTail();
    }
}

const move = (direction) => {
    // console.log(coords);
    
    coords.unshift(
        [
        coords[0][0] + direction[0]
        ,
        coords[0][1] + direction[1]
        ]
    );
    coords.pop();

    checkEnd();
    // console.log(coords);
    if(inGame){
        fruitCollision();
    
        updateGridValues();
    
        
        // console.log(coords);
        drawContentes();
    
        lastDirection = direction;
    
        autoMove();
    }
    
}

const autoMove = () => {
    autoMoveTimer = setTimeout(()=>{
        move(lastDirection);
    }, clickedWait);
}

$(document).ready(() => {
    setGridSize();
    gameInit();

    $("#gridSizeInput").on("change", () => {
        setGridSize();
        gameInit();
    });
    



    /*
    ##     ##  ######  ######## ########     #### ##    ## ########  ##     ## ######## 
    ##     ## ##    ## ##       ##     ##     ##  ###   ## ##     ## ##     ##    ##    
    ##     ## ##       ##       ##     ##     ##  ####  ## ##     ## ##     ##    ##    
    ##     ##  ######  ######   ########      ##  ## ## ## ########  ##     ##    ##    
    ##     ##       ## ##       ##   ##       ##  ##  #### ##        ##     ##    ##    
    ##     ## ##    ## ##       ##    ##      ##  ##   ### ##        ##     ##    ##    
     #######   ######  ######## ##     ##    #### ##    ## ##         #######     ##   
    
    */
    
    let playerCanMove = true;

    $(document).keydown((event) => {

        if(playerCanMove == true && (event.key == "ArrowUp" || event.key == "w")){
            window.clearTimeout(autoMoveTimer); //cancel timeout
            autoMoveTimer = null;
            $(".keyUp").css("border-color", "red").css("color", "red");
            move([-1, 0]);
            
            setTimeout(() => {
                $(".keyUp").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".keyUp").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowRight" || event.key == "d")){
            window.clearTimeout(autoMoveTimer); //cancel timeout
            autoMoveTimer = null;
            $(".keyRight").css("border-color", "red").css("color", "red");
            move([0, 1]);
            
            setTimeout(() => {
                $(".keyRight").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".keyRight").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowDown" || event.key == "s")){
            window.clearTimeout(autoMoveTimer); //cancel timeout
            autoMoveTimer = null;
            $(".keyDown").css("border-color", "red").css("color", "red");
            move([1, 0]);
            setTimeout(() => {
                $(".keyDown").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".keyDown").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowLeft" || event.key == "a")){
            window.clearTimeout(autoMoveTimer); //cancel timeout
            autoMoveTimer = null;
            $(".keyLeft").css("border-color", "red").css("color", "red");
            move([0, -1]);
            setTimeout(() => {
            $(".keyLeft").css("border-color", "grey").css("color", "grey");
                }, 1000)
        }else{
            $(".keyLeft").css("border-color", "grey").css("color", "grey");
        }
        
    });
    
});