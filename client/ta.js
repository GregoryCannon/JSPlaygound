const studentButtonContainer = document.getElementById('students-container');
const studentCodeTitle = document.getElementById('student-code-title');

const outputDiv = document.getElementById('output-div');
const codeTextArea = document.getElementById('code-area');
const codeContainer = document.getElementById('code-container');
const renderedCodeContainer =
    document.getElementById('rendered-code-container');

const IS_PROD = false;
const SERVER_URL =
    IS_PROD ? 'https://csinenglish.herokuapp.com' : 'http://localhost:3000';
let codeMap = {};
let currentStudent = '';
let hasChangedCode = false;
const TEACHER_VERSION_INCREMENT = 100;

function renderButtons() {
  // Clear existing buttons
  while (studentButtonContainer.firstChild) {
    studentButtonContainer.removeChild(studentButtonContainer.firstChild);
  }

  console.log('Rendering buttons...', codeMap);
  for (const student of Object.keys(codeMap).sort()) {
    console.log('Button for', student);
    const button = document.createElement('button');
    button.innerHTML = student;
    button.onclick = () => {
      currentStudent = student;
      refreshCode();
    };
    studentButtonContainer.appendChild(button);
  }
}

function refreshCode() {
  if (currentStudent && codeMap.hasOwnProperty(currentStudent)) {
    const [currentStudentVersion, currentStudentCode] = codeMap[currentStudent];
    // Load display
    studentCodeTitle.innerHTML = `${currentStudent}'s Code:`;
    renderCodeWithSyntaxHighlighting(currentStudentCode, renderedCodeContainer);
    // Load text editor
    codeTextArea.value = currentStudentCode;
    codeVersion = currentStudentVersion;
    onCodeChanged();
    hasChangedCode = false;
    outputDiv.innerHTML = '';
  }
}

function textAreaAdjust(element, syncedElements) {
  element.style.height = '1px';
  element.style.width = '1px';
  const newHeight = (25 + element.scrollHeight) + 'px';
  const newWidth = (25 + element.scrollWidth) + 'px';
  for (const elt of [element, ...syncedElements]) {
    elt.style.height = newHeight;
    elt.style.width = newWidth;
  }
}

function onCodeChanged() {
  hasChangedCode = true;
  console.log('haschangedcode = true');

  renderCodeWithSyntaxHighlighting(codeTextArea.value, renderedCodeContainer);

  // WriteCookie(codeText);
  textAreaAdjust(codeTextArea, [codeContainer, renderedCodeContainer]);
}

function postToServerAsUser(userNameStr, codeStr) {
  if (hasChangedCode) {
    // Increment code version
    codeVersion = Math.floor(codeVersion + TEACHER_VERSION_INCREMENT) + 0.1;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', SERVER_URL, true);

    // Send the proper header information along with the request
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange =
        function() {  // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        console.log('Posted to server.');
      }
    };
    xhr.send(JSON.stringify(
        {name: userNameStr, version: codeVersion, code: codeStr}));
    hasChangedCode = false;
  }
}

function pullThenPushToServer() {
  console.log('refreshing...');
  fetch(SERVER_URL + '/data')
      .then(response => response.json())
      .then((newMap) => {
        if (hasChangedCode) {
          // Load the code map from the server, but preserving local edits
          newMap[currentStudent] = [codeVersion, codeTextArea.value];
          console.log(
              'Preserving edits for ', currentStudent, codeTextArea.value);

          // Post to server
          postToServerAsUser(currentStudent, codeTextArea.value);

          // Refresh button list
          codeMap = newMap;
          renderButtons();
        } else {
          codeMap = newMap;
          // Maybe refresh code
          if (codeMap.hasOwnProperty(currentStudent) &&
              codeMap[currentStudent][0] > codeVersion) {
            refreshCode();
          }
          // Refresh button list
          renderButtons();
        }
      });

  setTimeout(pullThenPushToServer, 1000);
}

pullThenPushToServer();