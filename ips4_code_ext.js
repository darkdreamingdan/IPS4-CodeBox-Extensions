// IPS Prettyprint line numbers, clipboard and MTAMarkup injection
function rePrettyPrint() {
	$('pre.prettyprint').each(function(index, element) {
	  if ( !$(element).hasClass('cke_widget_element') && !$(element).hasClass('linenums') ) {
		$(element).addClass('linenums');
		$(element).removeClass('prettyprinted');
	  }	
	});
	// Re-prettyprint
    prettyPrint();
	
	// Add select all button		
  	$('pre.ipsCode').each(function(index, element) {		
	  if ( !$(element).hasClass('cke_widget_element') && !$(element).hasClass('clipboard') ) {		
        // Make line numbers have breaks so gaps can be copied		
        $(element).find('li').append('<br />');		
        		
        newdiv = document.createElement('div');		
        newdiv.className = "copyDiv";		
        a = document.createElement('a');		
        a.className = "copyHref";		
        a.href = "javascript:void(0)";		
        a.innerHTML = "&#128203;";		
        a.style = "position:absolute; padding-left:5px; text-decoration: none; color:grey";		
		a.setAttribute("data-clipboard-action","copy");		
        		
        var clipboard = new Clipboard( a, { target: function() { return element; }  } );		
        $(element).after($(newdiv));		
        $(newdiv).append($(a)).append($(element));		
        $(element).addClass('clipboard');		
      }		
    });
}
  
$(document).ready(function() {
	// Fix for IPS bug adding extra new line in quotes
	$('div.ipsQuote_contents').find('pre').each(function(index,element) { $(element).html($(element).html().replace(/(\\r\\n|\\n|\\r)/m,""))  });
	
  	// Add line numbers, clipboard
	rePrettyPrint();
	
	// Apply any custom markup to the prettified code
	if (typeof(cb_onRePrettyPrinted) === typeof(Function)) { cb_onRePrettyPrinted() } ;
  
	// Uber hack to strip line numbers when quoting
	ips.templates._render = ips.templates._render || ips.templates.render;
	var wrappedRender = function(key,obj) 
	{
	  var r = ips.templates._render(key,obj);
	  if ( key == 'core.editor.quote' )
	  {
		  var rJQ = $(r);
		  var pre = rJQ.find('pre.prettyprint');
		  pre.removeClass("prettyprinted");
		  pre.removeClass("linenums");
	      // Remove copy to clipboard button padding
          rJQ.find(".copyHref").remove();		
          rJQ.find(".copyDiv").replaceWith(function() { return $(this).contents(); });
          // Remove line numbering
		  pre.find('li').replaceWith(function() { return $(this).contents(); });
		  pre.find('ol').replaceWith(function() { return $(this).contents(); });
		  // Callback for any custom addons
          if (typeof(cb_onQuoted) === typeof(Function)) { cb_onQuoted(pre) } ;
		  return rJQ.prop('outerHTML');
	  }
	  return r;
	}
	ips.templates.render = wrappedRender;
  
    // After page has loaded, we add a handler to monitor AJAX content loading for reprettifying
    $(document).on('contentChange', function (e, newNode) {
        console.log("Reprettifying")
        $('div.ipsQuote_contents').find('pre').each(function(index,element) { $(element).html($(element).html().replace(/(\\r\\n|\\n|\\r)/m,""))  });
        rePrettyPrint();
		// Add any custom any custom addons
		if (typeof(cb_onContentChanged) === typeof(Function)) { cb_onContentChanged() } ;
    });
});