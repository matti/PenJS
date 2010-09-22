
  function MakeDropShadow() {

    var node = document;
    var tag = '*';
    var wantedClass = 'dropshadow';

    // Build a regular expression that will search specically for 'wantedClass'
    var pattern = new RegExp("(^|\\s)"+wantedClass+"(\\s|$)");

    // Scan through all tag elements in the document
    var scan_elem = node.getElementsByTagName(tag);
    for (i = 0; i < scan_elem.length; i++) {

      // If element has a class of 'wantedClass'
      if (pattern.test(scan_elem[i].className) ) {

        // Get the value from the element
        var text_value = scan_elem[i].innerHTML;

        // Create Shadow Children for this element
        CreateShadowChildren(scan_elem[i],text_value);
      }
    } // End for loop
  }

 function CreateShadowChildren(shadow_element,shadow_value) {

  var top_pos = -2.0;
  var left_pos = -2.5;

  // Assign starting color (in Hex notation) for the Red, Green, and Blue
  // Components (when they all have the same value you will alwys get a gray color).
  // For lighter shadows start with a "lighter" color of 66, 77, 88 99, aa, bb, etc..
  var starting_color = '44';
  var cRed = parseInt(starting_color,'16');
  var cGreen = parseInt(starting_color,'16');
  var cBlue = parseInt(starting_color,'16');

  // Set the max number of shadow elements to create.
  // This should never be set larger than the Z-Index value of dropshadow class
  var max_shadows = 13; 

  // Calculate color increament based on range of gray colors (from starting_color to
  // the lighest gray color of #fefefe) and max number of shadows you want
  var color_inc =  parseInt(( parseInt('fe','16') - parseInt(starting_color,'16') ) / max_shadows,'10');

  for (j = 1; j <= max_shadows; j++) {

    // Build full color Hex string from it's individual RGB values
    var full_color_value = cRed.toString(16) + cGreen.toString(16) + cBlue.toString(16);

    // Create a Shadow DIV
    var shadow_div = document.createElement('div');

    //  Add the shadow_value to Shadow DIV
    shadow_div.innerHTML = shadow_value;

    // Style Shadow DIV
    shadow_div.style.width=shadow_element.offsetWidth + "px";
    shadow_div.style.color = '#000' //+ full_color_value;
    shadow_div.style.borderColor = '#000' //+ full_color_value;
    shadow_div.style.display = "block";
    shadow_div.style.position = "absolute";
    shadow_div.style.top = top_pos + "px";
    shadow_div.style.left = left_pos + "px";
    shadow_div.style.zIndex = (-1) * j;

    // Apppend Shadow DIV to shadow element
    shadow_element.appendChild(shadow_div);

    // Increment positons and shadows individual RGB color values
    top_pos += .5;
    left_pos += .5;
    cRed += color_inc;
    cGreen += color_inc;
    cBlue += color_inc;
  }

 }

// Run the MakeDropShadow function when the page finishes loading
window.onload = MakeDropShadow;

