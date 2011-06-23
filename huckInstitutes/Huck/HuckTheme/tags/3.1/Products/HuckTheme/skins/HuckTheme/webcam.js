/******************************************************************************
 * Written by: Paul Rentschler
 * Created on: 12 March 2009
 *
 * Description: Used to continuously update the webcam image on the 
 *               Millennium Science Complex page
 ******************************************************************************/


var intervalId = 0;
var count = 1234;

function refresh() {
    /* causes the image on the page to reload by giving the IMG tag
       a new source URL
       */
       
    var img = document.getElementById('webcamimage');
    if (img) {
        // change the source URL to cause the image to reload
        img.src = 'http://www.huck.psu.edu/webcam.php?c=' + count;
        count++;
        
    } else {
        // the image couldn't be found on the page, stop the timer
        window.clearInterval(intervalId);
    }
}



jq(document).ready(
    /* when the document loads:
       - start the timer to continously refresh the image
       */

    function () {
        intervalId = window.setInterval("refresh()", 3000);
    }
);
