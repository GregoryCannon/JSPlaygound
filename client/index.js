const outputDiv = document.getElementById('output-div');
const outputSection = document.getElementById('output-section');
const codeSection = document.getElementById('code-section');
const codeTextArea = document.getElementById('code-area');

const codeContainer = document.getElementById('code-container');
const renderedCodeContainer =
  document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById('run-button');
const samplesContainer = document.getElementById('samples');
const activitiesContainer = document.getElementById('activities');
const teacherEditNotification =
  document.getElementById('teacher-edit-notification');
const testCasesContainer = document.getElementById("test-cases");
const testCasesOutputContainer = document.getElementById("output-section");

const breakoutSelect = document.getElementById('room-select');
const nameInput = document.getElementById('name-select');
const lessonPicker = document.getElementById('lesson-picker');
const loggedInView = document.getElementById('logged-in-view');
const loginForm = document.getElementById('login-form')

function loadBreakoutRooms() {
  // Remove all breakout room options
  while (breakoutSelect.firstChild) {
    breakoutSelect.removeChild(breakoutSelect.firstChild);
  }
  // Add the appropriate options
  for (const room of BREAKOUT_ROOMS) {
    const option = document.createElement('option');
    option.innerHTML = room;
    breakoutSelect.appendChild(option);
  }
}
loadBreakoutRooms();

function login() {
  if (breakoutSelect.value && nameInput.value || false) {
    const userName = breakoutSelect.value + ' | ' + nameInput.value;
    document.getElementById('user-name').innerHTML = userName;
    editor.setUserName(userName);

    loggedInView.style.display = 'inline';
    loginForm.style.display = 'none';

    editor.onSessionStart();
  } else {
    alert('Breakout room or name missing.')
  }
}

function loginForReview() {
  editor.setUserName("LOCAL-REVIEW");
  loggedInView.style.display = 'inline';
  loginForm.style.display = 'none';

  // Load the lesson indicated in the picker
  GlobalState.currentLesson = lessonPicker.value;
  GlobalState.isUnitTestSetup = lessonPicker.value === Titles.UNIT_TESTING || lessonPicker.value == Titles.ADVANCED_UNIT_TESTING;
  console.log(GlobalState);
  editor.onSessionStart();
}

/* ------------------
    Script start
  ----------------- */

document.getElementById('login-button').addEventListener('click', login);
document.getElementById('review-login-button').addEventListener('click', loginForReview);

const editor = new CodeEditor(
  ROLE.STUDENT,
  {
    codeTextArea,
    codeContainer,
    renderedCodeContainer,
    outputDiv,
    studentButtonContainer: null,
    studentCodeTitle: null,
    remoteEditNotificationText: teacherEditNotification,
    testCasesContainer,
    testCasesOutputContainer,
    samplesContainer,
    activitiesContainer,
    outputSection,
    codeSection
  });

// setTimeout(promptForUserName, 10);
// login();