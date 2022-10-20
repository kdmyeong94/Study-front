// myCanvas영역
 let canvas = $("#myCanvas")[0];
 
 let ctx = canvas.getContext("2d");
 let w = $("#myCanvas").width();
 let h = $("#myCanvas").height();
 // 뱀과 먹이의 크기
 let sq = 15;
 let food;
 let snake;
 // 게임 시작 후 처음 움직이는 방향설정
 let d = "RIGHT";
 
 
 
//먹이의 위치를 랜덤으로 추출
 function placeFood() {
  food = {
   // 해당 영역의 너비만큼 sq의 길이를 빼준다 
   x : Math.round(Math.random()*(w-sq)/sq),
   y : Math.round(Math.random()*(h-sq)/sq)
  }
 }

 // 뱀의 위치를 랜덤으로 추출
 function placeSnake() {
  snake = {
   x : Math.round(Math.random()*(w-sq)/sq),
   y : Math.round(Math.random()*(h-sq)/sq)
  }
 }
 
 // 위치에 맞춰 색을 넣어준다.
 function paint_cell(x,y, color){
  ctx.fillStyle=color;
  ctx.fillRect(x*sq,y*sq,sq,sq);
  ctx.strokeStyle="white";
  ctx.strokeRect(x*sq,y*sq,sq,sq);
 }
 
 // food와 snake의 위치를 최초 세팅
 placeFood();
 paint_cell(food.x, food.y, "grey");
 placeSnake();
 paint_cell(snake.x, snake.y, "green");
 
//  ------------------------------------------------------



//  키입력시 방향 전환
$(this).keydown(function(e){
    let key = e.which;
    if(key == "37") {
     snake.x -= 1;
     d = "LEFT";
    }
    else if(key == "38") {
     snake.y -= 1;
     d = "UP";
    }
    else if(key == "39") {
     snake.x += 1;
     d = "RIGHT";
    }
    else if(key == "40") {
     snake.y += 1;
     d = "DOWN";
    }
  
    eat();
    paint_bg();
    color = "grey";
    paint_cell(food.x, food.y);
    color = "green";
    paint_cell(snake.x, snake.y);
  
   });


//  입력된 방향으로 자동 이동
function moving() {
    if (d == "RIGHT"){
     snake.x = snake.x + 1;
    }else if (d == "LEFT"){
     snake.x = snake.x - 1;
    }else if (d == "UP") {
     snake.y = snake.y - 1;
    }else if (d == "DOWN"){
     snake.y = snake.y + 1;
    }
     SnakeOut();
     eat();
     paint_bg();
     paint_cell(food.x, food.y, "grey");
     paint_cell(snake.x, snake.y, "green");
}
// 시작시 자동 움직임
let AutoMove = setInterval(moving, 100);


// 이동후 배경 다시 칠하기
function paint_bg(){       
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "white";
        ctx.strokeRect(0, 0, w, h);
      
}

// 먹이 먹기
function eat(){
    if(food.x == snake.x && food.y == snake.y){
        let value = parseInt($('#current').text());
        value += 1;
        $('#current').text(value);
        placeFood();
    }
}

// 게임오버 표시
function GameOver() {
    let value = $('#current').text();
    $('#final').text(value);
    $('#gameover').fadeIn();
}

// 벽에 닿았을 때 게임오버
function SnakeOut() {
    if (snake.x < 0 || snake.x > (w-sq)/sq || snake.y < 0 || snake.y > (h-sq)/sq) {
     clearInterval(AutoMove);
     GameOver();
    }
}





   


