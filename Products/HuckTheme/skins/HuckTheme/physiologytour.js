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
  if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) {
    // insert the launching image
    jq("div.video-right").prepend('<a id="tour-launcher" href=""><img src="/education/physiology/images/interactive-tour.jpg" width="300" height="172" alt="Click this image of a translucent head for a flash-based interactive tour of the Physiology Graduate program. All content is also available through the various pages of this web site." /></a>');

    // insert the overlay that will hold the flash tour
    jq("body").append('<div id="showcase-tour"><a href="" class="close" id="showcase-tour-close"></a><object type="application/x-shockwave-flash" data="/physio-tour/showcase.swf" width="740" height="550" bgcolor="#ffffff"><param name="movie" value="/physio-tour/showcase.swf" bgcolor="transparent" /><param name="bgcolor" value="#ffffff" /><param name="wmode" value="transparent" /></object></div>');

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