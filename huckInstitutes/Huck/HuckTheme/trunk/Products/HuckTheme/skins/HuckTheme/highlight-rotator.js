/******************************************************************************
 * Written by: Paul Rentschler
 * Created on: 25 August 2010
 *
 * Description: Handles rotating images
 * Notes: Special thanks to the tutorials by Soh Tanaka:
 *         http://www.sohtanaka.com/web-design/automatic-image-slider-w-css-jquery/
 *         http://designm.ag/tutorials/image-rotator-css-jquery/
 ******************************************************************************/


jq(document).ready(function() {
    /* when the document loads, show the paging box, activate the first link,
       and setup how to rotate through the images
       */
    
    
    /*** Define the functions necessary to handle the rotating ***/
    
    rotate = function() {
        /* handles updating the pager and creating the sliding animation
           */

        // determine the number of times to slide
        var triggerId = $active.attr('rel') - 1;

        // determine the distance to slide
        var imageReelPosition = triggerId * imageWidth;

        // remove all the active tags and then apply it to the correct entry
        jq('.highlight-paging a').removeClass('active');
        $active.addClass('active');
        
        // perform the slider animation
        if (imageReelPosition == 0) {
            //jq('.highlight-list').css('left', 0);
            jq('.highlight-list').animate( {left: -imageReelPosition}, 200 );
        } else {
            jq('.highlight-list').animate( {left: -imageReelPosition}, 600 );
        }
        
        // update the caption
        var $activeCaption = jq('#' + $active.attr('container') + '-item' + $active.attr('rel') + ' div.highlight-caption');
        var $captionBox = jq('.highlight-caption-box');
        var currentHeight = $captionBox.height();
        $captionBox.animate( {opacity: 0}, 250, function() {
            $captionBox.html($activeCaption.clone());
            jq('.highlight-caption-box div').show();
            $captionBox.animate( {opacity: 0.80}, 250 );
            if ($captionBox.is(':hidden')) {
                // show the animated caption box
                $captionBox.show();
                
                // hide the individual captions
                jq('.highlight-list .highlight-caption').hide();
            }
        });
    };



    rotateSwitch = function() {
        /* controls the automatic rotation of images
           */

        // define the timing interval
        var timerInterval = 5000;  // milliseconds

        // setup the timer and store it's reference in "play"
        play = setInterval(function() {
            $active = jq('.highlight-paging a.active').next();
            if ( $active.length === 0) {
                $active = jq('.highlight-paging a:first');
            }
            rotate();
        }, timerInterval);
    }
    
    



    /*** Set the hover event handler ***/
    jq(".highlight-list a").hover(function() {
        // stop the rotation
        clearInterval(play);
    }, function() {
        // resume the rotation
        rotateSwitch();
    });	



    /*** Assign the onclick event handlers ***/
    jq(".highlight-paging a").click(function() {
        // activate the clicked page
        $active = jq(this);
        
        // reset the timer and move to the item
        clearInterval(play);
        rotate();
        rotateSwitch();
        
        // prevent the browser from going to the link anchor
        return false;
    });
    
    
    
    
    // get the size of the images, how many there are, and determine the overall width
    var imageWidth = jq('.highlight-window').width();
    var imageSum = jq('.highlight-list li').size();
    var imageReelWidth = imageWidth * imageSum;
    
    // adjust the image reel (highlight-list) to it's new size
    jq('.highlight-list').width(imageReelWidth);
    
    // show the paging box and activate the first link
    jq('.highlight-paging').show();
    $active = jq('.highlight-paging a:first');
    rotate();
    
    // start the rotation
    rotateSwitch();

});


/*



*/
