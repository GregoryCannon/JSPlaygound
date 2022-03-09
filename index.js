const outputDiv = document.getElementById("output-div");
const codeTextArea = document.getElementById("code-area");

const codeContainer = document.getElementById('code-container');
const renderedCodeContainer = document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById("run-button");
const presetsContainer = document.getElementById("presets");

const NEWLINE = "<br/>";


const SAMPLES = [
  {
      title: "Simple For Loop",
      code: "for (int i = 1; i <= 10; i++) {\n\tprint(i);\n}"
  },
  {
    title: "Adding Up Numbers",
    code: "int total = 0;\nfor (int i = 1; i <= 10; i++) {\n\ttotal = total + i;\n}\nprint(\"Total: \" + total);"
  },
  {
    title: "Stars Activity 1",
    code: "var stars = \"\";\nfor (int i = 1; i <= 10; i++) {\stars = stars + \"*\";\nprint(stars + \" \" + i);\n}"
  }
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
  console.log(SAMPLES[i].code.replace("@", "{}"));
  onCodeChanged();
}

SAMPLES.forEach((sample, i) => {
  const button = document.createElement("button");
  button.innerHTML = sample.title;
  button.onclick = () => loadSample(i);
  presetsContainer.appendChild(button);
})


// ReadCookie();