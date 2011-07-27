/* - registration-form.js - */
/******************************************************************************
 * Written by: Paul Rentschler
 * Created on: 27 July 2011
 *
 * Description: Used to hide/show optional parts of a registration form.
 ******************************************************************************/

jq(document).ready( function () {

  /** Genetics Symposium and Biophysics Regional Meeting **/

  // hide the optional portion of the form
  jq("fieldset#pfg-fieldsetname-poster").hide();
  jq("fieldset#pfg-fieldsetname-presentation").hide();

  // setup the events that will trigger the hide/show action
  jq("input#poster-presenter_1, input#poster-presenter_2").bind("click", function () {
    if (jq(this).val() == "Yes") {
      jq("fieldset#pfg-fieldsetname-poster").show("fast");
    } else {
      jq("fieldset#pfg-fieldsetname-poster").hide("fast");
    }
  });
  jq("input#presenter_1, input#presenter_2").bind("click", function () {
    if (jq(this).val() == "Yes") {
      jq("fieldset#pfg-fieldsetname-presentation").show("fast");
    } else {
      jq("fieldset#pfg-fieldsetname-presentation").hide("fast");
    }
  });

});