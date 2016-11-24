function cb_onRePrettyPrinted (){
  	// Apply MTA Markup to the final prettified code
    applyMTAMarkup();	
}

function cb_onQuoted ( pre ) {
	// Get rid of any MTA highlights
    pre.find('span.mta_highlight').replaceWith(function() { return $(this).contents(); });
    pre.find('a.mta_highlight').replaceWith(function() { return $(this).contents(); });
}

function cb_onContentChanged () {
	// Apply MTA Markup to any script boxes not already marked up, and not in an edit window
	$('pre.lang-lua:not(.mtaMarkup):not(.cke_widget_element)').each(applyMTAMarkupToPre)
}