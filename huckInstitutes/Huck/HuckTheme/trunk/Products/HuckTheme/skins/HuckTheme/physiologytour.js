/* - physiology-tour.js - */
/******************************************************************************
 * Written by: Paul Rentschler
 * Created on: 3 February 2011
 *
 * Description: Inserts the launching image and the necessary code to make
 *               the flash-based interactive showcase for the physiology
 *               program work.
 ******************************************************************************/

jq(document).ready( function () {

  // test for flash support
  var flashSupported = false;
  if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) {
    flashSupported = true;
  } else if (navigator.plugins && navigator.plugins["Shockwave Flash"]) {
    flashSupported = true;
  } else {
    // if the two easy checks don't work (i'm talking to you IE), 
    //  use the Adobe Flash detection script
    var requiredMajorVersion = 0;
    var requiredMinorVersion = 0;
    var requiredRevision = 0;
    
    flashSupported = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
  }
  
  if (flashSupported) {
    // insert the launching image
    jq("div.video-right").prepend('<a id="tour-launcher" href=""><img src="/education/physiology/images/interactive-tour.jpg" width="300" height="50" alt="Image of a translucent head on a DNA strand background used to launch a flash-based interactive tour of the Physiology Graduate program. All content is also available through the various pages of this web site." /></a>');

    // insert the overlay that will hold the flash tour
    jq("body").append('<div id="showcase-tour"><a href="" class="close" id="showcase-tour-close"></a><iframe src="/physio-tour/index.html" width="740" height="550" frameborder="0"><p>Sorry, your browser does not support the use of inline frames (iframes).</p><p>All the content contained in this showcase is available through our web site.</p></iframe></div>');

    // assign the click events
    jq("#tour-launcher").click( function (e) {
      e.preventDefault();
      var leftPos = (jq(window).width() - jq("#showcase-tour").width()) / 2;
      jq("#showcase-tour").css("left", leftPos).show();
      jq(".video-right object").hide();
    });

    jq("a#showcase-tour-close").click( function (e) {
      e.preventDefault();
      jq("#showcase-tour").hide();
      jq(".video-right object").show();
    });
  }

});