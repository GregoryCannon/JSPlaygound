const outputDiv = document.getElementById("output-div");
const codeTextArea = document.getElementById("code-area");

const codeContainer = document.getElementById('code-container');
const renderedCodeContainer = document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById("run-button");
const presetsContainer = document.getElementById("presets");
const activitiesContainer = document.getElementById("activities");

const IS_PROD = true;
const SERVER_URL = IS_PROD ? "http://csinenglish.herokuapp.com" : "http://127.0.0.1:3000";
let hasChangedCode = false;

const NEWLINE = "<br/>";


const SAMPLES = [
  {
    title: "Simple For Loop",
    instructions: "This is an example of a for loop that counts to 10.",
    code: "for (int i = 1; i <= 10; i++) {\n\tprint(i)\n}"
  },
  {
    title: "Adding Up Numbers",
    instructions: "This for loop adds up all the numbers from 1 to 10.",
    code: "int total = 0\nfor (int i = 1; i <= 10; i++) {\n\ttotal = total + i\n}\nprint(\"Total: \" + total)"
  },
]

const ACTIVITIES = [
  {
    title: "Warm-Up Activity",
    instructions: "Can you make the program print 'Hello' 10 times?",
    code: "print(\"Welcome to CS in English!\")\nfor (int i = 1; i <= 10; i++) {\n\t// ???\n}"
  },
  {
    title: "Stars Activity 1",
    instructions: "Can you print a square out of stars?<br><br>********<br>********<br>********<br>********<br>********",
    code: "print(\"Welcome to CS in English!\")\nfor (int i = 1; i <= 5; i++) {\n\tvar stars = \"********\"\n\t// ???\n}"
  },
  {
    title: "Stars Activity 2",
    instructions: "Can you print a triangle out of stars?<br><br>*<br>**<br>***<br>****<br>*****<br>******<br>*******<br>********",
    code: "var stars = \"\"\nfor (int i = 1; i <= 8; i++) {\n\tstars = ??\n\tprint(stars)\n}"
  },
  {
    title: "Challenge Activity",
    instructions: "Can you multiply together all these numbers? <br><br>3 x 4 x 5 x 6 x 7",
    code: "var product = 1\nfor (   ??   ) {\n\t// ??\n}\nprint(product)"
  },
]


// function WriteCookie(newVal) {
//   document.cookie = "code=" + "bb";
//   console.log("wrote cookie");
// }

// function ReadCookie() {
//   var allcookies = document.cookie;
//   console.log("full coookie:", allcookies);
  
//   // Get all the cookies pairs in an array
//   cookiearray = allcookies.split(';');
  
//   // Now take key value pair out of this array
//   for(var i=0; i<cookiearray.length; i++) {
//     const name = cookiearray[i].split('=')[0];
//     const value = cookiearray[i].split('=')[1];
//     console.log("Cookie found: ", name, value);
//     if (name == "code") {
//       codeTextArea.value = value;
//       onCodeChanged();
//     }
//   }
// }





function showOutput(outputStr) {
  if (outputStr.indexOf(NEWLINE) == 0) {
    outputStr = outputStr.replace(NEWLINE, "");
  }
  if (outputStr && outputStr.length > 0) {
    outputDiv.innerHTML = outputStr;
  } else {
    outputDiv.innerHTML = "(Finished running. There was no output.)";
  }
}

function recompileCode(code) {
  let newString = "let output = \"\";\n"

  // Replace 'int' with 'let'
  code = code.replace(/int[ A-Za-z0-9_-]*=/g, function (match) {
    return match.replace("int", "let");
  });

  // Replace console.log
  code = code.replace(/console\.log/g, "output += \"<br/>\" + ")
  // Replace print statements
  code = code.replace(/print/g, "output += \"<br/>\" + ");

  newString += code;
  newString += ";showOutput(output)";
  return newString;
}

function runCode() {
    // Clear old output
  outputDiv.innerHTML = "";

  setTimeout(() => {
    const code = codeTextArea.value;
    console.log(code);
    const newCode = recompileCode(code);
    console.log(newCode);

    try {
      eval(newCode);
    } catch (error) {
      showOutput("There was an error: " + error.message);
    }
  }, 300);
}

// Allow tabbing in the code editor
codeTextArea.addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
    
    onCodeChanged();
  }
});

function textAreaAdjust(element, syncedElements) {
  element.style.height = "1px";
  element.style.width = "1px";
  const newHeight = (25 + element.scrollHeight) + "px";
  const newWidth = (25 + element.scrollWidth) + "px";
  for (const elt of [element, ...syncedElements]) {
    elt.style.height = newHeight;
    elt.style.width = newWidth;
  }
}

function onCodeChanged() {
  hasChangedCode = true;

  /* Create pre code */
  let code = document.createElement("code");
  code.className = "language-javascript";

  let codeText = codeTextArea.value;
  codeText = codeText.replace(/(?:\r\n|\r|\n)/g, '\r\n');
  code.innerHTML = codeText;
  
  let pre = document.createElement("pre");
  pre.setAttribute("aria-hidden", "true"); // Hide for screen readers
  pre.style.background = "transparent";
  pre.append(code);

  while (renderedCodeContainer.firstChild) {
    renderedCodeContainer.removeChild(renderedCodeContainer.firstChild);    
  }
  renderedCodeContainer.appendChild(pre);
  Prism.highlightElement(code);

  // WriteCookie(codeText);
  textAreaAdjust(codeTextArea, [codeContainer, renderedCodeContainer]);
}

runCodeButton.addEventListener("click", runCode);


function loadSample(i) {
  codeTextArea.value = SAMPLES[i].code;
  document.getElementById("instructions").innerHTML = SAMPLES[i].instructions || "";
  onCodeChanged();
  outputDiv.innerHTML = "";
}

function loadActivity(i) {
  codeTextArea.value = ACTIVITIES[i].code;
  document.getElementById("instructions").innerHTML = ACTIVITIES[i].instructions || "";
  onCodeChanged();
  outputDiv.innerHTML = "";
}

SAMPLES.forEach((sample, i) => {
  const button = document.createElement("button");
  button.innerHTML = sample.title;
  button.onclick = () => loadSample(i);
  presetsContainer.appendChild(button);
})

ACTIVITIES.forEach((sample, i) => {
  const button = document.createElement("button");
  button.innerHTML = sample.title;
  button.onclick = () => loadActivity(i);
  activitiesContainer.appendChild(button);
})


function getUserName() {
  // Get name from alert
  let userName = "";
  while (!userName) {
    userName = prompt("Please enter your name");
  }
  document.getElementById("user-name").innerHTML = userName;
}


function postToServer() {
  if (hasChangedCode) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", SERVER_URL, true);
  
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    }
    xhr.send(JSON.stringify({ name: userName, code: codeTextArea.value }));
    hasChangedCode = false;
  }

  // Repeatedly update the server
  setTimeout(postToServer, 3000);
}

setTimeout(getUserName, 10);
setTimeout(postToServer, 3000);