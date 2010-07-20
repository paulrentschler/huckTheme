// Written by: Paul Rentschler
//             Tim Simkins
// Created on: 26 February 2010

function getEventDate(dateType)
{
    // validate the dateType
    if (dateType == "startDate") {
        dateType += "_0";
    } else if (dateType == "endDate") {
        dateType += "_1";
    } else {
        dateType = "";
    }

    if (dateType != "") {

        // grab all the fields for the date
        year = jq("#edit_form_" + dateType + "_year").val();
        month = jq("#edit_form_" + dateType + "_month").val() - 1;
        day = jq("#edit_form_" + dateType + "_day").val();
        hour = jq("#edit_form_" + dateType + "_hour").val();
        minute = jq("#edit_form_" + dateType + "_minute").val();
        ampm = jq("#edit_form_" + dateType + "_ampm").val();

        // handle the ampm
        if (hour == 12 && ampm == "AM") {
            hour = 0;
        } else if (hour < 12 && ampm == "PM") {
            hour = parseInt(hour, 10) + 12;
        }

        // convert the date fields to a javascript date object and return it
        return new Date(year, month, day, hour, minute, 0, 0);

    } else {
        return "";
    }
}


function setEventDate(dateType, dateObj)
{
    // validate the dateType
    if (dateType == "startDate") {
        dateType += "_0";
    } else if (dateType == "endDate") {
        dateType += "_1";
    } else {
        dateType = "";
    }

    if (dateType != "") {
        // set the fields
        jq("#edit_form_" + dateType + "_year").val( dateObj.getFullYear() );
        jq("#edit_form_" + dateType + "_month").val( formatNumberForSelectBox(dateObj.getMonth() + 1) );
        jq("#edit_form_" + dateType + "_day").val( formatNumberForSelectBox(dateObj.getDate()) );
        jq("#edit_form_" + dateType + "_minute").val( formatNumberForSelectBox(dateObj.getMinutes()) );

        // handle the ampm
        var hours = dateObj.getHours();
        if (hours == 0) {
            jq("#edit_form_" + dateType + "_hour").val("12");
            jq("#edit_form_" + dateType + "_ampm").val("AM");
        } else if (hours == 12) {
            jq("#edit_form_" + dateType + "_hour").val("12");
            jq("#edit_form_" + dateType + "_ampm").val("PM");
        } else if (hours > 12) {
            jq("#edit_form_" + dateType + "_hour").val( formatNumberForSelectBox(hours - 12) );
            jq("#edit_form_" + dateType + "_ampm").val("PM");
        } else {
            jq("#edit_form_" + dateType + "_hour").val( formatNumberForSelectBox(hours) );
            jq("#edit_form_" + dateType + "_ampm").val("AM");
        }
    }
}


function formatNumberForSelectBox(aNumber)
{
    // if the number is less than 10, add a 0 in front
    if (aNumber < 10) {
        aNumber = "0" + aNumber;
    }

    return aNumber;
}


function roundUpDateToNearestHour(dateObj)
{
    if (dateObj.getMinutes() != 0) {
        dateObj.setMinutes(0);
        dateObj.setTime(dateObj.getTime() + (60*60*1000));
    }

    return dateObj;
}



function onStartDateChange ()
{
    if (okToChangeEventEndDate) {
        var currentEndDate = getEventDate("endDate");
        if (eventOriginalEndDate.getTime() == currentEndDate.getTime()) {
            currentEndDate.setTime(getEventDate("startDate").getTime() + (60*60*1000));
            setEventDate("endDate", currentEndDate);
            eventOriginalEndDate = currentEndDate;
        } else {
            okToChangeEventEndDate = false;
        }
    }
}




var okToChangeEventEndDate = false;
var eventOriginalEndDate = new Date();


jq(document).ready(
    function () {
        // get the start date from the form 
        var eventStartDate = getEventDate("startDate");

        // does the start date match the end date (aka are we adding an event?)
        if (eventStartDate.getTime() == getEventDate("endDate").getTime()) {

            // the start date is the current date, so it's ok to mess with them
            okToChangeEventEndDate = true;

            // round up the start date to the nearest whole hour
            eventStartDate = roundUpDateToNearestHour( eventStartDate );
            setEventDate("startDate", eventStartDate);

            // set the end date to be one hour from now
            eventOriginalEndDate.setTime(eventStartDate.getTime() + (60*60*1000));
            setEventDate("endDate", eventOriginalEndDate);

            // assign change events for all the start date fields
            jq("#edit_form_startDate_0_year").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_month").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_day").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_hour").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_minute").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_ampm").change( function () { onStartDateChange(); } );
        }
    }
);
