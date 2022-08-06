var gridSize;
let gridMatrix = [];
let coords = [];


const placeHead = () => {
    coords = [];
    let y = randomInteger(gridSize);
    let x = randomInteger(gridSize);
    coords.push(y);
    coords.push(x);

    gridMatrix[y][x] = 2;
    console.log("head placed");
}

const placeFruit = () => {
    let y = randomInteger(gridSize);
    let x = randomInteger(gridSize);

    while(gridMatrix[y][x] != 0){
        y = randomInteger(gridSize);
        x = randomInteger(gridSize);
    }
    
    gridMatrix[y][x] = 3;
    console.log("fruit placed");
}


const newMatrix = () => {
    gridMatrix = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        gridMatrix[i] = new Array(gridSize);
    }

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++){
            gridMatrix[i][j] = 0;
        }
    }
    console.log(gridMatrix);
}


const setGridSize = () => {
    gridSize = $("#gridSizeInput").val();
    newMatrix();
    drawGrid();
}

const drawGrid = () => {
    console.log("grid size: " + gridSize);
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

const drawContentes = () => {
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
            
            $(cell).load(location.href + "#grid >" + cell);
        }
    }

    console.log("content drawed");
}

const checkNewCoords = () => {
    if(coords[0] < 0 || coords[1] < 0)
        playerCanMove = false;
    else
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if(gridMatrix[i][j] == 1 && i == coords[0] && j == coords[1])
                    playerCanMove = false;
                else if(i == coords[0] && j == coords[1])
                    gridMatrix[i][j] = 2;
            }
        }
    drawContentes();
}

const gameInit = () => {
    placeHead();
    placeFruit();
    drawContentes();
}

function randomInteger(max){
    return Math.floor(Math.random() * (max));
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

    $(document).keydown(function(event){

        if(playerCanMove == true && (event.key == "ArrowUp" || event.key == "w")){
            $(".keyUp").css("border-color", "red").css("color", "red");
            coords[0]--;
            setTimeout(function (){
                $(".keyUp").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".keyUp").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowRight" || event.key == "d")){
            $(".keyRight").css("border-color", "red").css("color", "red");
            coords[1]++;
            setTimeout(function (){
                $(".keyRight").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".keyRight").css("border-color", "grey").css("color", "grey");

        }

        if(playerCanMove == true && (event.key == "ArrowDown" || event.key == "s")){
            $(".keyDown").css("border-color", "red").css("color", "red");
            coords[0]++;
            setTimeout(function (){
                $(".keyDown").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".keyDown").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowLeft" || event.key == "a")){
            $(".keyLeft").css("border-color", "red").css("color", "red");
            coords[1]--;
            setTimeout(function (){
            $(".keyLeft").css("border-color", "grey").css("color", "grey");
                }, 1000)
        }else{
            $(".keyLeft").css("border-color", "grey").css("color", "grey");
        }
        checkNewCoords();
    });
});