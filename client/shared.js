
/** Uses the Prism library to render code with syntax highlighting */
function renderCodeWithSyntaxHighlighting(codeText, parentElt) {
  /* Create pre code */
  let code = document.createElement('code');
  code.className = 'language-javascript';

  codeText = codeText.replace(/(?:\r\n|\r|\n)/g, '\r\n');
  code.innerHTML = codeText;

  let pre = document.createElement('pre');
  pre.setAttribute('aria-hidden', 'true');  // Hide for screen readers
  pre.style.background = 'transparent';
  pre.append(code);

  while (parentElt.firstChild) {
    parentElt.removeChild(parentElt.firstChild);
  }
  parentElt.appendChild(pre);
  Prism.highlightElement(code);
}

function recompileCode(code) {
  let newString = 'let output = "";\n'

  // Replace 'int' with 'let'
  code = code.replace(/int[ A-Za-z0-9_-]*=/g, function(match) {
    return match.replace('int', 'let');
  });

  // Replace console.log
  code = code.replace(/console\.log/g, 'output += "<br/>" + ')
  // Replace print statements
  code = code.replace(/print/g, 'output += "<br/>" + ');

  newString += code;
  newString += ';showOutput(output)';
  return newString;
}

function runCode() {
  // Clear old output
  outputDiv.innerHTML = '';

  setTimeout(() => {
    const code = codeTextArea.value;
    console.log(code);
    const newCode = recompileCode(code);
    console.log(newCode);

    try {
      eval(newCode);
    } catch (error) {
      showOutput('There was an error: ' + error.message);
    }
  }, 300);
}