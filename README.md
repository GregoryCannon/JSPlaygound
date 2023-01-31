# JSPlaygound (aka "GregLab")
A simple and kid-friendly pair-programming tool for use in teaching sessions. Kids code in Javascript with syntax highlighting, and complete built-in exercises on a variety of programming topics. Teaching assistants can view and edit the code of all students assigned to their breakout room.

The app is lovingly dubbed "GregLab" by the CS in English organization as it was developed as a replacement for the more complex but clunkier website AppLab.

The site is hosted live at [csinenglish.herokuapp.com](https://csinenglish.herokuapp.com/). Try it out! 
*(Pick any breakout room from the dropdown and type anything for your name)*

## Technology
The frontend is created in vanilla HTML/CSS/Javascript, and uses the [Prism Library](https://prismjs.com/) for syntax highlighting.

The backend contains a simple Node.js server that tracks student code in memory, and maintains a versioning system to allow for simultaneous editing without conflicts (teachers' edits get priority when conflicts arise). When document data is passed to clients, it is compressed using the [LZString Library](https://pieroxy.net/blog/pages/lz-string/index.html) to reduce the size of the data payloads.
