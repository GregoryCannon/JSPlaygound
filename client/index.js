const outputDiv = document.getElementById('output-div');
const outputSection = document.getElementById('output-section');
const codeTextArea = document.getElementById('code-area');

const codeContainer = document.getElementById('code-container');
const renderedCodeContainer =
  document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById('run-button');
const presetsContainer = document.getElementById('presets');
const activitiesContainer = document.getElementById('activities');
const teacherEditNotification =
  document.getElementById('teacher-edit-notification');
const testCasesContainer = document.getElementById("test-cases");
const testCasesOutputContainer = document.getElementById("output-section");

const breakoutSelect = document.getElementById('room-select');
const nameInput = document.getElementById('name-select');

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

function loadSample(i) {
  document.getElementById('instructions').innerHTML =
    getSamples()[i].instructions || '';
  editor.loadSampleCode(getSamples()[i].code);
}

function loadActivity(i) {
  document.getElementById('instructions').innerHTML =
    getActivities()[i].instructions || '';
  editor.loadSampleCode(getActivities()[i].code);
}

function promptForUserName() {
  // Get name from alert
  let userName;
  while (!userName) {
    userName = prompt('Please enter your name');
  }
  document.getElementById('user-name').innerHTML = userName;
  editor.setUserName(userName);
}

function login() {
  if (breakoutSelect.value && nameInput.value || false) {
    const userName = breakoutSelect.value + ' | ' + nameInput.value;
    document.getElementById('user-name').innerHTML = userName;
    editor.setUserName(userName);

    document.getElementById('logged-in-view').style.display = 'inline';
    document.getElementById('login-form').style.display = 'none';

    GlobalState.isUnitTestSetup = true;

    loadSamplesAndAcitivies();
    outputSection.style.display = "none";
  } else {
    // alert('Breakout room or name missing.')
  }
}

function loginForReview() {
  editor.setUserName("LOCAL-REVIEW");
  document.getElementById('logged-in-view').style.display = 'inline';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('test-cases').style.display = 'none';
  GlobalState.isUnitTestSetup = false;

  loadSamplesAndAcitivies();
}

function loadSamplesAndAcitivies(){
  getSamples().forEach((sample, i) => {
    if (sample === 'newline') {
      presetsContainer.appendChild(document.createElement('br'));
      return;
    }
    const button = document.createElement('button');
    button.innerHTML = sample.title;
    button.onclick = () => loadSample(i);
    presetsContainer.appendChild(button);
  })
  
  getActivities().forEach((sample, i) => {
    if (sample === 'newline') {
      activitiesContainer.appendChild(document.createElement('br'));
      return;
    }
    const button = document.createElement('button');
    button.innerHTML = sample.title;
    button.onclick = () => loadActivity(i);
    activitiesContainer.appendChild(button);
  })
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
    testCasesOutputContainer
  });

// setTimeout(promptForUserName, 10);
// login();