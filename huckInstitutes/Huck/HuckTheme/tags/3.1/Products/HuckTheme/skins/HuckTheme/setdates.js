/******************************************************************************
 * Written by: Paul Rentschler
 * Created on: 3 August 2010
 *
 * Description: Inserts two buttons after every date/time selector to insert
 *               either Today's date or the current date/time (now).
 ******************************************************************************/


function insertDate (buttonId) {
    /* set the associated date fields to the current date
       */
    idParts = buttonId.split('-');

    var today = new Date();
    jq('#edit_form_' + idParts[2] + '_' + idParts[3] + '_year').val( today.getFullYear() );
    jq('#edit_form_' + idParts[2] + '_' + idParts[3] + '_month').val( formatNumberForSelectBox(today.getMonth()+1) );
    jq('#edit_form_' + idParts[2] + '_' + idParts[3] + '_day').val( today.getDate() );
}



function insertTime (buttonId) {
    /* set the associated time fields to the current time
       rounded to the nearest five minutes
       */
       
    idParts = buttonId.split('-');

    var today = new Date();
    var hours = today.getHours();
    if (hours == 0) {
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_hour").val("12");
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_ampm").val("AM");
    } else if (hours == 12) {
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_hour").val("12");
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_ampm").val("PM");
    } else if (hours > 12) {
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_hour").val( formatNumberForSelectBox(hours - 12) );
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_ampm").val("PM");
    } else {
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_hour").val( formatNumberForSelectBox(hours) );
        jq("#edit_form_" + idParts[2] + '_' + idParts[3] + "_ampm").val("AM");
    }
    jq('#edit_form_' + idParts[2] + '_' + idParts[3] + '_minute').val( formatNumberForSelectBox(Math.round(today.getMinutes() / 10) * 10) );
}



function formatNumberForSelectBox(aNumber) {
    /* the select boxes for the day of the week and for minutes have
       a prefixed zero (0) for numbers less than 10, make sure that
       the zero is prefixed
       */

    // if the number is less than 10, add a 0 in front
    if (aNumber < 10) {
        aNumber = "0" + aNumber;
    }
    return aNumber;
}



jq(document).ready(
    /* when the document loads:
       - add "today" and "now" buttons to all calendar widgets on the page
       - assign click functions to the new "today" and "now" buttons
       */
       
    function () {
        // get all of the calendar widgets
        var widgets = jq('.ArchetypesCalendarWidget');
        var todayButtonIds = new Array();
        var nowButtonIds = new Array();
        for (var i = 0; i < widgets.length; i++) {
            // add the Today button
            var buttonId = widgets[i].id + '-' + i + '-today';
            jq('#' + widgets[i].id + ' .plone_jscalendar').append('<span><input type="button" name="today" value="Today" class="standalone" id="' + buttonId + '" /></span>');
            todayButtonIds.push(buttonId);

            // add the Now button
            var buttonId = widgets[i].id + '-' + i + '-now';
            jq('#' + widgets[i].id + ' .plone_jscalendar').append('<span><input type="button" name="now" value="Now" class="standalone" id="' + buttonId + '" /></span>');
            nowButtonIds.push(buttonId);
        }

        for (var i=0; i < todayButtonIds.length; i++) {
            jq('#' + todayButtonIds[i]).click( function() {
                insertDate(this.id);
            })
        }

        for (var i=0; i < nowButtonIds.length; i++) {
            jq('#' + nowButtonIds[i]).click( function() {
                insertDate(this.id);
                insertTime(this.id);
            })
        }
    }
);
