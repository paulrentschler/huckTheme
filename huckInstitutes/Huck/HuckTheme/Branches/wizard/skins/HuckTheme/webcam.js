// Written by: Paul Rentschler
// Created on: 12 March 2009

  var intervalId = 0;
  var count = 1234;

  function refresh() {
    var img = document.getElementById('webcamimage');
    if (img) {
      img.src = 'http://www.huck.psu.edu/webcam.php?c=' + count;
      count++;
    } else {
      window.clearInterval(intervalId);
    }
  }

  window.onload = function () {
    intervalId = window.setInterval("refresh()", 3000);
  }