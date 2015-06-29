var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var settings = {
  radius: canvas.width/4,
  x: canvas.width/2,
  y: canvas.height/2,
  modulo: 130,
  multTable: 2,
  speed: 0.01,
  animate: true,
  bgColor: '#ecf0f1',
  linesColor: '#34495e'
};

 function pointPos(nth, r) {

    var d = (Math.PI * 2) / settings.modulo;
    var v = {
      x: settings.x + (Math.cos((nth * d) - Math.PI/2) * r),
      y: settings.y + (Math.sin((nth * d) - Math.PI/2) * r)
    };

    return v;
}

window.addEventListener('keydown', function(e) {

  if (e.keyCode == 32) { //Space bar
        settings.animate = !settings.animate;
    }

  if (e.keyCode == 37) { //Left arrow key
    settings.modulo -= settings.speed;
    settings.multTable -= settings.speed;
  }
  if (e.keyCode == 39) { //Right arrow key
    settings.modulo += settings.speed;
    settings.multTable += settings.speed;
  }

  });


function update(){

  if(settings.animate){
    settings.modulo += settings.speed;
    settings.multTable += settings.speed;
  }

  render();
  requestAnimationFrame(update);
}


function render(){
ctx.beginPath();
ctx.fillStyle = settings.bgColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fill();
ctx.arc(settings.x, settings.y, settings.radius, 0, Math.PI*2);
ctx.strokeStyle = settings.linesColor;

  for(var i = 0; i < settings.modulo; i++){
    var v = pointPos(i, settings.radius);
    ctx.moveTo(v.x, v.y);
    v = pointPos(i * settings.multTable, settings.radius);
    ctx.lineTo(v.x, v.y);
  }

  ctx.stroke();
  ctx.closePath();

}

update();
