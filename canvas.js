var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.9 * window.innerHeight;

var settings = {
  radius: canvas.width/4,
  x: canvas.width/2,
  y: canvas.height/2,
  modulus: 130,
  multTable: 2,
  speed: 0.01,
  animate: false,
  bgColor: 'white',
  linesColor: 'black'
};

 function pointPos(nth, r) {

    var d = (Math.PI * 2) / settings.modulus;
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
  });


function update(){
  if(settings.animate){
    settings.modulus += settings.speed;
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

  for(var i = 0; i < settings.modulus; i++){
    var v = pointPos(i, settings.radius);
    ctx.moveTo(v.x, v.y);
    v = pointPos(i * settings.multTable, settings.radius);
    ctx.lineTo(v.x, v.y);
  }
  ctx.font = "15px Arial";
  ctx.fillStyle = settings.linesColor;
  ctx.fillText("Table of " + Math.round(settings.multTable * 100)/100 + " modulus " + Math.round(settings.modulus * 100)/100, 10, canvas.height - 10);
  ctx.stroke();
  ctx.closePath();

}

update();

function takeScreenshot(canvas, filename) {
  var lnk = document.createElement('a'),
      e;
  lnk.download = filename;

  lnk.href = canvas.toDataURL("image/png;base64");
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}
