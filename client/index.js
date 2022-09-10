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

const breakoutSelect = document.getElementById('room-select');
const nameSelect = document.getElementById('name-select');

let isUnitTestSetup = false;

function loadBreakoutRooms() {
  const rooms = Object.keys(roomStudentLookup);
  rooms.sort((a, b) => {
    const [a_, a1, a2] = a.split(/-|L/g);
    const [b_, b1, b2] = b.split(/-|L/g);
    return (a1 * 100 + a2) - (b1 * 100 + b2);
  });
  // Remove all student options
  while (breakoutSelect.firstChild) {
    breakoutSelect.removeChild(breakoutSelect.firstChild);
  }
  // Add the appropriate options
  for (const room of rooms) {
    const option = document.createElement('option');
    option.innerHTML = room;
    breakoutSelect.appendChild(option);
  }
}
loadBreakoutRooms();

function onSelectBreakoutRoom() {
  const curRoom = breakoutSelect.value;
  const students = roomStudentLookup[curRoom];
  // Remove all student options
  while (nameSelect.firstChild) {
    nameSelect.removeChild(nameSelect.firstChild);
  }
  const nullOption = document.createElement('option');
  nullOption.disabled = true;
  nullOption.innerHTML = '(select)'
  nullOption.selected = true;
  nameSelect.appendChild(nullOption);
  // Add the appropriate options
  for (const student of students) {
    const option = document.createElement('option');
    option.innerHTML = student;
    nameSelect.appendChild(option);
  }
  const otherOption = document.createElement('option');
  otherOption.innerHTML = 'Other';
  otherOption.id = 'otherOption'
  nameSelect.appendChild(otherOption);
}

function onSelectName() {
  if (nameSelect.id == 'otherOption') {
    const newName = prompt('Enter your name');
    if (newName) {
      document.getElementById('otherOption').innerHTML = newName;
    }
  }
}

// breakoutSelect.addEventListener('change', onSelectBreakoutRoom);
// nameSelect.addEventListener('change', onSelectName);
// onSelectBreakoutRoom();

function loadSample(i) {
  const samples = isUnitTestSetup ? SAMPLES_ADVANCED_UNIT_TESTING : SAMPLES_FUNCTIONS;
  document.getElementById('instructions').innerHTML =
    samples[i].instructions || '';
  editor.loadSampleCode(samples[i].code);
}

function loadActivity(i) {
  const activities = isUnitTestSetup ? ACTIVITIES_ADVANCED_UNIT_TESTING : ACTIVITIES_FUNCTIONS;
  document.getElementById('instructions').innerHTML =
    activities[i].instructions || '';
  editor.loadSampleCode(activities[i].code);
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
  if (breakoutSelect.value && nameSelect.value || false) {
    const userName = breakoutSelect.value + ' | ' + nameSelect.value;
    document.getElementById('user-name').innerHTML = userName;
    editor.setUserName(userName);

    document.getElementById('logged-in-view').style.display = 'inline';
    document.getElementById('login-form').style.display = 'none';

    isUnitTestSetup = true;

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
  isUnitTestSetup = false;

  loadSamplesAndAcitivies();
}

function loadSamplesAndAcitivies(){
  const samples = isUnitTestSetup ? SAMPLES_ADVANCED_UNIT_TESTING : SAMPLES_FUNCTIONS;
  samples.forEach((sample, i) => {
    if (sample === 'newline') {
      presetsContainer.appendChild(document.createElement('br'));
      return;
    }
    const button = document.createElement('button');
    button.innerHTML = sample.title;
    button.onclick = () => loadSample(i);
    presetsContainer.appendChild(button);
  })
  
  const activities = isUnitTestSetup ? ACTIVITIES_ADVANCED_UNIT_TESTING : ACTIVITIES_FUNCTIONS;
  activities.forEach((sample, i) => {
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

// Function to let the code editor see the live value of this variable
function getIsUnitTest() {
  return isUnitTestSetup;
}

const editor = new CodeEditor(
  ROLE.STUDENT, codeTextArea, codeContainer, renderedCodeContainer, outputDiv,
    /* studentButtonContainer= */ null, /* studentCodeTitle= */ null,
  teacherEditNotification, getIsUnitTest);

// setTimeout(promptForUserName, 10);
// login();