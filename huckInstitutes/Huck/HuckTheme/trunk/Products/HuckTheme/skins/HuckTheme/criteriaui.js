/******************************************************************************
 * Written by: Paul Rentschler
 * Created on: 10 August 2010
 *
 * Description: Makes setting collection criteria easier by making all
 *               select boxes have a height of 15 instead of the standard 6
 ******************************************************************************/


jq(document).ready(
    /* when the document loads, grab all of the select boxes in the main
       criteria table area and set their size to 15
       */
       
    function () {
        // make all the select boxes a height of 15
        jq('table.listing select').each( function(index, box) {
            if (box.size > 2) {
                box.size = 15;
            }
        });
    }
);
