const studentButtonContainer = document.getElementById('students-container');
const studentCodeTitle = document.getElementById('student-code-title');

const outputDiv = document.getElementById('output-div');
const codeTextArea = document.getElementById('code-area');
const codeContainer = document.getElementById('code-container');
const renderedCodeContainer =
    document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById('run-button');

const breakoutSelect = document.getElementById('ta-room-select');

const editor = new CodeEditor(
    ROLE.TEACHER, codeTextArea, codeContainer, renderedCodeContainer, outputDiv,
    studentButtonContainer, studentCodeTitle);

function loadBreakoutRooms() {
    const rooms = Object.keys(roomStudentLookup);
    rooms.sort((a, b) => {
        const [a_, a1, a2] = a.split(/-|L/g);
        const [b_, b1, b2] = b.split(/-|L/g);
        return (a1 * 100 + a2) - (b1 * 100 + b2);
      });
    rooms.unshift("(all rooms)");
    // Remove all student options
    while (breakoutSelect.firstChild) {
        breakoutSelect.removeChild(breakoutSelect.firstChild);
    }
    // Add the appropriate options
    for (const room of rooms) {
        const option = document.createElement("option");
        option.innerHTML = room;
        breakoutSelect.appendChild(option);
    }
}
loadBreakoutRooms();

breakoutSelect.addEventListener("change", editor.renderStudentButtons);


document.getElementById("anti-ddos").addEventListener("click", () => {
    const newVal = parseFloat(prompt("IF YOU DON'T KNOW WHAT THIS IS, CLICK CANCEL NOW.\nEnter new multiplier:"));
    const body = { multiplier: newVal };
    if (newVal > 0.5 && newVal < 10) {
        // Send post request to server updating the anti-DDOS multiplier
        const xhr = new XMLHttpRequest();
        xhr.open('POST', SERVER_URL + "/ddos", true);

        // Send the proper header information along with the request
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Call a function when the state changes.
        xhr.onreadystatechange = function() {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              console.log("Updated server anti-DDOS multiplier");
          }
        };

        // Send the request
        xhr.send(JSON.stringify(body));
    }

})