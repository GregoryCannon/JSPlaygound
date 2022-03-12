
/** Uses the Prism library to render code with syntax highlighting */
function renderCodeWithSyntaxHighlighting(codeText, parentElt) {
  /* Create pre code */
  let code = document.createElement("code");
  code.className = "language-javascript";

  codeText = codeText.replace(/(?:\r\n|\r|\n)/g, '\r\n');
  code.innerHTML = codeText;
  
  let pre = document.createElement("pre");
  pre.setAttribute("aria-hidden", "true"); // Hide for screen readers
  pre.style.background = "transparent";
  pre.append(code);

  while (parentElt.firstChild) {
    parentElt.removeChild(parentElt.firstChild);    
  }
  parentElt.appendChild(pre);
  Prism.highlightElement(code);
}