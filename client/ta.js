const studentButtonContainer = document.getElementById('students-container');

const outputDiv = document.getElementById('output-div');
const outputSection = document.getElementById('output-section');
const codeSection = document.getElementById('ta-code-section');
const samplesContainer = document.getElementById('samples');
const activitiesContainer = document.getElementById('activities');
const codeTextArea = document.getElementById('code-area');
const codeContainer = document.getElementById('code-container');
const renderedCodeContainer =
  document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById('run-button');
const testCasesContainer = document.getElementById("test-cases");
const testCasesOutputContainer = document.getElementById("output-section");

const breakoutSelect = document.getElementById('ta-room-select');
const buttonMarkCorrect = document.getElementById('mark-correct');
const buttonMarkIncorrect = document.getElementById('mark-incorrect');

const editor = new CodeEditor(
  ROLE.TEACHER,
  {
    codeTextArea,
    codeContainer,
    renderedCodeContainer,
    outputDiv,
    studentButtonContainer,
    remoteEditNotificationText: null,
    testCasesContainer,
    testCasesOutputContainer,
    samplesContainer,
    activitiesContainer,
    outputSection,
    codeSection
  });

// Get a list of breakout rooms
function loadBreakoutRooms() {
  // Add an option to see all students from all rooms
  const rooms = ['(all rooms)', ...BREAKOUT_ROOMS]

  // Remove all existing options and add from the new list
  while (breakoutSelect.firstChild) {
    breakoutSelect.removeChild(breakoutSelect.firstChild);
  }
  for (const room of rooms) {
    const option = document.createElement('option');
    option.innerHTML = room;
    breakoutSelect.appendChild(option);
  }
}

// Add a button on the teacher-only site that can adjust the clients' refresh
// rate if the server is getting overloaded
document.getElementById('anti-ddos').addEventListener('click', () => {
  const newVal = parseFloat(prompt(
    'IF YOU DON\'T KNOW WHAT THIS IS, CLICK CANCEL NOW.\nOr, enter the new emergency client refresh rate multiplier:'));
  const body = { multiplier: newVal };
  if (newVal >= 0.5 && newVal <= 10) {
    // Send post request to server updating the anti-DDOS multiplier
    const xhr = new XMLHttpRequest();
    xhr.open('POST', SERVER_URL + '/ddos', true);

    // Send the proper header information along with the request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Call a function when the state changes.
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log('Updated server anti-DDOS multiplier');
      }
    };

    // Send the request
    xhr.send(JSON.stringify(body));
  }
})

/* -------------------
---  Script start  ---
-------------------- */

loadBreakoutRooms();

outputSection.style.display = "none";

// When the teacher changes what breakout room they have selected, render only
// students in that room
breakoutSelect.addEventListener('change', editor.renderStudentButtons);

buttonMarkCorrect.addEventListener('click', () => editor.markQuestionWithStatus(STATUS_CORRECT));
buttonMarkIncorrect.addEventListener('click', () => editor.markQuestionWithStatus(STATUS_INCORRECT));

editor.onSessionStart();