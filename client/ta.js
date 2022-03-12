const studentButtonContainer = document.getElementById('students-container');
const renderedCodeContainer = document.getElementById('rendered-code-ta');
const studentCodeTitle = document.getElementById('student-code-title');

let codeMap = {};
let currentStudent = "";

function renderButtons() {
  // Clear existing buttons
  while (studentButtonContainer.firstChild) {
    studentButtonContainer.removeChild(studentButtonContainer.firstChild);
  }
  
  console.log("Rendering buttons...", codeMap);
  for (const student of Object.keys(codeMap).sort()) {
    console.log("Button for", student);
    const code = codeMap[student];
    const button = document.createElement("button");
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
    studentCodeTitle.innerHTML = `${currentStudent}'s Code:`;
    renderCodeWithSyntaxHighlighting(codeMap[currentStudent], renderedCodeContainer);
  }
}

function refresh() {
  console.log("refreshing...");
  fetch('http://csinenglish.herokuapp.com/data')
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      codeMap = data;

      // Refresh UI
      renderButtons();
      refreshCode();
    });
  
  setTimeout(refresh, 3000);
}

refresh();