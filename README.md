# IPS4 Code Box Extensions
This project provides some extra features to Invision Power Services 4's code box.  By default, the code box is lacking some features typically found in other forum software, such as line numbering and a simple way to copy code snippet.

This theme extension adds the ability to re-add line numbering and copy to clipboard.  It has been tested in a production environment on http://forum.mtasa.com:

![Example of new Code box](http://i.imgur.com/VhD95Wa.png)

You can clearly see the line numbers added to the left of the code, and a small 'clipboard' button at the top left corner.  Pressing this button copies the code to clipboard by leveraging [ClipboardJS](https://clipboardjs.com/ "ClipboardJS").

# Installation
This is not a normal IPS4 extension, and instead requires minor modification to your current IPS4 theme.

 1. Login to the IPS4 Admin Panel
 2. Under "Customization" -> "Themes", hit the dropdown next to your current theme.
 3. Choose "Edit HTML and CSS"
 4. In the 'Templates' tab, access `core/global/global/includeJS`
 5. At the very bottom, add the following two lines:

```html
<script type='text/javascript' src="https://cdn.rawgit.com/zenorocha/clipboard.js/v1.5.12/dist/clipboard.min.js"></script>
<script type='text/javascript' src="https://cdn.rawgit.com/darkdreamingdan/IPS4-CodeBox-Extensions/master/ips4_code_ext.min.js"></script>
```

 6. Done!

# Tips
By default, Google's Prettify only displays the line number every 5 lines.  To make the line numbers appear every line, under the "CSS" tab of the Theme editor, access `core/front/custom/custom.css` and add the following line:
```css
/* Add line numbers every line */
.prettyprint ol.linenums > li { list-style-type: decimal; }
```

It's also good to set a Max height for the code boxes while you're at it, else they eat loads of real-estate:
```css
/* Max height for code boxes */
pre.prettyprint{
    max-height: 800px;
}
```

I personally also prefer a small colour modification to make the code boxes slightly more legible:
```css
li.L1, li.L3, li.L5, li.L7, li.L9 {
  background: white;
}
```