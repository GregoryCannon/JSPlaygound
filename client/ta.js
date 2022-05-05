const studentButtonContainer = document.getElementById('students-container');
const studentCodeTitle = document.getElementById('student-code-title');

const outputDiv = document.getElementById('output-div');
const codeTextArea = document.getElementById('code-area');
const codeContainer = document.getElementById('code-container');
const renderedCodeContainer =
    document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById('run-button');


const editor = new CodeEditor(
    ROLE.TEACHER, codeTextArea, codeContainer, renderedCodeContainer, outputDiv,
    studentButtonContainer, studentCodeTitle);