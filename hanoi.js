var discNum = 3;
var col = [];
var point;
var disc = [];
var discStack = [[],[],[]];
var hold = false;
var d = 0;
var pos = 0;
for(var i = discNum; i >= 1; i--){
   discStack[0].push(i);
}

function setup() {
   var canvas = createCanvas(1200, 800);
   point = new pointerCreate();
   for (var i = 1; i <= 3; i++) {
      col[i] = new columnCreate(i);
   }
   for (var i = 1; i <= discNum; i++) {
      disc[i] = new discCreate(i, discNum);
   }
   canvas.parent('canvContainer');;
};

function resetSketch(){
	discNum = document.getElementById("select").value;
	col = [];
	point;
	disc = [];
	discStack = [[],[],[]];
	hold = false;
	d = 0;
	pos = 0;
	for(var i = discNum; i >= 1; i--){
		discStack[0].push(i);
	}
   var canvas = createCanvas(1200, 800);
   point = new pointerCreate();
   for (var i = 1; i <= 3; i++) {
      col[i] = new columnCreate(i);
   }
   for (var i = 1; i <= discNum; i++) {
      disc[i] = new discCreate(i, discNum);
   }
   canvas.parent('canvContainer');
}

function draw() {
   background(51);
   point.show();
   for(var i = 1; i <= 3; i++){
      col[i].show();
   }
   for(var i = 1; i <= discNum; i++){
      disc[i].show();
   }
};

function keyPressed(){
   if (keyCode === RIGHT_ARROW && point.x < 3*300){
      if(hold){
         point.move(1);
         disc[d].move(1, 0, 2);
         pos += 1;
      }else{
         point.move(1);
         pos += 1;
      }
   }else if(keyCode === LEFT_ARROW && point.x > 300){
      if(hold){
         point.move(-1);
         disc[d].move(-1, 0, 2);
         pos += -1;
      }else{
         point.move(-1);
         pos += -1;
      }
   }else if(keyCode === UP_ARROW && hold == false){
      d = discStack[pos].pop();
      disc[d].move(0, -1, 0);
      hold = true;
   }else if(keyCode === DOWN_ARROW && hold == true){
      if(discStack[pos].length == 0 || discStack[pos][discStack[pos].length-1] > d){
         disc[d].move(0, 1, discStack[pos].length);
         discStack[pos].push(d);
         d = null;
         hold = false;
      }else{
         console.log('error');
      }
   }
}

function columnCreate(x){
   this.x = 300*x;
   this.show = function(){
      fill(255);
      rect(this.x - 10, height-300, 20, 300);
   };
};

function pointerCreate(){
   this.x = 300;
   this.show = function(){
      fill(255);
      rect(this.x - 10, height-500, 20, 20);
   };
   this.move = function(dir){
      this.x += dir*300;
   };
}

function discCreate(w, s){
   this.w = w;
   this.x = 300;
   this.y = height-20*s+(20*w)-20;
   this.show = function(){
      fill(255);
      rect(this.x-(20*this.w), this.y, this.w*40, 20);
   };
   this.move = function(dirx, diry, ex){
//        ex = ex || 0;
      this.x += dirx*300;
      if(diry == -1){
         this.y = 340;
      }else{
         this.y += diry*400 + 20*(2-ex);
      }
   };
}