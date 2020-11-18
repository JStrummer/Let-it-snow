'use strict'

// global reference
var container = document.querySelector('.app');
var canvas = document.querySelector('canvas');
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

var ctx = canvas.getContext('2d');
var landscape = new Image();
landscape.src = "img/landscape.png";
var lsY = 0;

function snowFlake (maxX, maxY) {
  var width = (Math.random() * 2) + 1;
  var x = Math.random() * (maxX - width);
  var y = -(Math.random() * maxY / 2);
  var speed = (Math.random() * 3) + 1;

  var publicApi = {
    draw () {
      var thisX = x;
      var thisY = y;
      ctx.beginPath();
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.arc(thisX, thisY, width, degToRad(0), degToRad(360));
      ctx.fill();
    },
    move () {
      y += speed;
    },
    check () {
      if (y > maxY) {
        x = Math.random() * (maxX - width);
        y = -(Math.random() * maxY / 2);
        lsY += 0.3;
      }
    }
  }

  return publicApi;
}

function snowFall (size) {
  var flakes = [];
  for (let i = 0; i < size; i++) {
    flakes.push(snowFlake(canvas.width, canvas.height));
  }
  return {
    flakes: flakes
  };
}

// helper functions
function degToRad(degrees) {
  return degrees * Math.PI /180;
}

var sf = snowFall(300);

requestAnimationFrame(anim);

function anim () {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  sf.flakes.forEach((flake) => {
    flake.check();
    flake.draw();
    flake.move();
  });
  ctx.drawImage(landscape, 0, canvas.height - landscape.height - lsY);
  ctx.fillStyle = "white";
  ctx.fillRect(0, canvas.height - lsY - 1, canvas.width, lsY + 1);
  requestAnimationFrame(anim);
}
