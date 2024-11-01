# Horizontal Wheel Tab Scrolling

## What it does

This extension allows you to scroll through tabs in a window using the horizontal mouse wheel.

Injects content.js into all tabs in a window, which intercepts the mouse wheel event and sends a message to the background.js file.

The background.js file then changes the active tab based on the direction of the mouse wheel movement.

## Notes 
- This is developed for Firefox. I have not tested it on other browsers.
- This extension does not work on about:* tabs.
- My mouse (MX Master 3) sends 120 units per wheel click. This value is used in the content.js file to determine the threshold for scroll distance. Feel free to change it if needed.
- Wraps around to the last and firsttab when the end is reached.
- Since it doesn't require extra buttons to be pressed, it hinders the user experience if you use with a trackpad. If needed add a event.shiftKey check to the if in the content.js:9.
- I copied the base project from the tabs-tabs-tabs example.
