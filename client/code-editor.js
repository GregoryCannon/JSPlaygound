const ROLE = Object.freeze({STUDENT: 0, TEACHER: 1});
const NEWLINE = '<br/>';

// Config variables
const IS_PROD = false;
const SERVER_URL =
    IS_PROD ? 'https://csinenglish.herokuapp.com' : 'http://localhost:3000';
const STUDENT_VERSION_INCREMENT = 1;
// The version is rounded before incrementing so the .1 exists as a
// marker that a teacher was the last editor.
const TEACHER_VERSION_INCREMENT = 100.1;
const SAMPLE_INCREMENT = 1000;
const STUDENT_SYNC_INTERVAL_MS = 1000;
const TEACHER_SYNC_INTERVAL_MS = 1000;
const EDIT_TO_PUSH_DELAY_MS = 500;
const TICK_MS = 100;

function allowTabbing(textarea, onTabCallback) {
  // Allow tabbing in the code editor
  textarea.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      this.value =
          this.value.substring(0, start) + '\t' + this.value.substring(end);

      // put caret at right position again
      this.selectionStart = this.selectionEnd = start + 1;

      onTabCallback();
    }
  });
}
allowTabbing = allowTabbing.bind(this);

class CodeEditor {
  constructor(
      userRole, codeTextArea, codeContainer, renderedCodeContainer, outputDiv,
      studentButtonContainer, studentCodeTitle) {
    this.userRole = userRole;
    this.codeTextArea = codeTextArea;
    this.codeContainer = codeContainer;
    this.renderedCodeContainer = renderedCodeContainer;
    this.outputDiv = outputDiv;
    this.studentButtonContainer = studentButtonContainer;
    this.studentCodeTitle = studentCodeTitle;

    // UI Setup
    this.codeTextArea.style.visibility = 'hidden';

    // Event listeners
    codeTextArea.addEventListener('input', this.onCodeChangedByUser);
    runCodeButton.addEventListener('click', this.runCode);
    allowTabbing(codeTextArea, this.onCodeChangedByUser);

    // State variables
    this.hasChangedCode = false;
    this.codeVersion = 0;
    this.userName = '';
    this.codeMap = null;
    this.ticksUntilPush = -1;

    this.syncWithServer();
    this.tickLoop();
  }

  getCodeVersion =
      () => {
        return this.codeVersion;
      }

  incrementVersion =
      () => {
        console.log('Old version', this.codeVersion);
        this.codeVersion = Math.floor(this.codeVersion) +
            (this.userRole == ROLE.STUDENT ? STUDENT_VERSION_INCREMENT :
                                             TEACHER_VERSION_INCREMENT);
        console.log('New version', this.codeVersion);
      }

  loadCode =
      (newVersion, newCode) => {
        this.codeTextArea.value = newCode;
        this.codeVersion = newVersion;
        this.onCodeChanged(/* byUser= */ false);
        this.outputDiv.innerHTML = '';
      }

  loadSampleCode =
      (newCode) => {
        // Set to the next clean multiple of the SAMPLE_INCREMENT
        const newVersion = SAMPLE_INCREMENT *
            (Math.floor((this.codeVersion - 0.001) / SAMPLE_INCREMENT) + 1);
        this.loadCode(newVersion, newCode);
        this.hasChangedCode = true;
        this.schedulePush();
      }

  onCodeChanged =
      (byUser) => {
        if (byUser) {
          this.hasChangedCode = true;
          this.schedulePush();
        } else {
          // Local changes were overwritten
          this.hasChangedCode = false;
          console.log('hasChangedCode = false, overwritten');
        }
        this.renderCodeWithSyntaxHighlighting(
            codeTextArea.value, renderedCodeContainer);
        this.textAreaAdjust(
            codeTextArea, [codeContainer, renderedCodeContainer]);
      }

  onCodeChangedByUser =
      () => {
        this.onCodeChanged(/* byUser= */ true);
      }

  renderStudentButtons =
      () => {
        // Clear existing buttons
        while (this.studentButtonContainer.firstChild) {
          this.studentButtonContainer.removeChild(
              this.studentButtonContainer.firstChild);
        }

        // Render new buttons
        for (const student of Object.keys(this.codeMap).sort()) {
          const button = document.createElement('button');
          button.innerHTML = student;
          button.onclick = () => {
            this.setUserName(student);
            this.studentCodeTitle.innerHTML = `${student}'s Code:`
          };
          this.studentButtonContainer.appendChild(button);
        }
      }

  /** Uses the Prism library to render code with syntax highlighting */
  renderCodeWithSyntaxHighlighting =
      (codeText, parentElt) => {
        /* Create pre code */
        let code = document.createElement('code');
        code.className = 'language-javascript';

        codeText = codeText.replace(/(?:\r\n|\r|\n)/g, '\r\n');
        code.innerHTML = codeText;

        let pre = document.createElement('pre');
        pre.setAttribute('aria-hidden', 'true');  // Hide for screen readers
        pre.style.background = 'transparent';
        pre.append(code);

        while (parentElt.firstChild) {
          parentElt.removeChild(parentElt.firstChild);
        }
        parentElt.appendChild(pre);
        Prism.highlightElement(code);
      }

  recompileCode =
      (code) => {
        let newString = 'let output = "";\n'

        // Replace 'int' with 'let'
        code = code.replace(/int[ A-Za-z0-9_-]*=/g, function(match) {
          return match.replace('int', 'let');
        });

        // Replace console.log
        code = code.replace(/console\.log/g, 'output += "<br/>" + ')
        // Replace print statements
        code = code.replace(/print/g, 'output += "<br/>" + ');

        newString += code;
        newString += ';this.showOutput(output)';
        return newString;
      }

  runCode =
      () => {
        // Clear old output
        this.outputDiv.innerHTML = '';

        setTimeout(() => {
          const code = codeTextArea.value;
          console.log(code);
          const newCode = this.recompileCode(code);
          console.log(newCode);

          try {
            eval(newCode);
          } catch (error) {
            this.showOutput('There was an error: ' + error.message);
          }
        }, 300);
      }

  setUserName =
      (newName) => {
        this.userName = newName;

        if (newName) {
          this.codeTextArea.style.visibility = 'visible';
        }

        // Maybe load their code from the map
        if (this.codeMap !== null && this.codeMap.hasOwnProperty(newName)) {
          const [remoteVersion, remoteCode] = this.codeMap[this.userName];
          this.loadCode(remoteVersion, remoteCode)
        }
      }

  showOutput =
      (outputStr) => {
        if (outputStr.indexOf(NEWLINE) == 0) {
          outputStr = outputStr.replace(NEWLINE, '');
        }
        if (outputStr && outputStr.length > 0) {
          this.outputDiv.innerHTML = outputStr;
        } else {
          this.outputDiv.innerHTML = '(Finished running. There was no output.)';
        }
      }


  textAreaAdjust =
      (element, syncedElements) => {
        element.style.height = '1px';
        element.style.width = '1px';
        const newHeight = (25 + element.scrollHeight) + 'px';
        const newWidth = (25 + element.scrollWidth) + 'px';
        for (const elt of [element, ...syncedElements]) {
          elt.style.height = newHeight;
          elt.style.width = newWidth;
        }
      }

  pullFromServer =
      () => {
        fetch(SERVER_URL + '/data')
            .then(response => response.json())
            .then((newMap) => {
              console.log('Fetched', this.userRole);
              // Pull code
              if (newMap.hasOwnProperty(this.userName)) {
                const [remoteVersion, remoteCode] = newMap[this.userName];

                // Maybe load code
                if (remoteVersion > this.codeVersion) {
                  this.loadCode(remoteVersion, remoteCode)
                }

                // If teacher, maybe overwrite student code
                if (this.userRole === ROLE.TEACHER &&
                    remoteVersion < this.codeVersion) {
                  newMap[this.userName] =
                      [this.codeVersion, codeTextArea.value];
                }
              }

              // Pull student list
              if (this.userRole === ROLE.TEACHER) {
                this.codeMap = newMap;
                this.renderStudentButtons();
              }
            });
      }

  pushToServer =
      () => {
        if (this.hasChangedCode) {
          this.incrementVersion();
          this.makePostRequest(
              {
                name: this.userName,
                version: this.codeVersion,
                code: this.codeTextArea.value
              },
              () => {console.log('Posted to server.')});
          this.hasChangedCode = false;
          console.log('hasChangedCode = false, pushed');
        }
      }

  makePostRequest =
      (body, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', SERVER_URL, true);

        // Send the proper header information along with the request
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Call a function when the state changes.
        xhr.onreadystatechange = function() {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            callback();
          }
        };

        // Send the request
        xhr.send(JSON.stringify(body));
      }

  schedulePush =
      () => {
        console.log('hasChangedCode = TRUE');
        this.ticksUntilPush = Math.round(EDIT_TO_PUSH_DELAY_MS / TICK_MS);
      }

  syncWithServer =
      () => {
        // Update the code version if it was changed
        if (this.hasChangedCode) {
          this.incrementVersion();
        }

        // Pull
        this.pullFromServer();

        // Auto-loop
        setTimeout(
            this.syncWithServer,
            this.userRole === ROLE.STUDENT ? STUDENT_SYNC_INTERVAL_MS :
                                             TEACHER_SYNC_INTERVAL_MS);
      }

  tickLoop = () => {
    // Push to server if ready, or keep waiting
    if (this.ticksUntilPush === 0) {
      this.pushToServer();
      this.ticksUntilPush = -1;
    } else if (this.ticksUntilPush !== -1) {
      this.ticksUntilPush -= 1;
    }

    // Auto-loop
    setTimeout(this.tickLoop, TICK_MS);
  }
}