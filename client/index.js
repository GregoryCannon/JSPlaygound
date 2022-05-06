const outputDiv = document.getElementById('output-div');
const codeTextArea = document.getElementById('code-area');

const codeContainer = document.getElementById('code-container');
const renderedCodeContainer =
    document.getElementById('rendered-code-container');
const runCodeButton = document.getElementById('run-button');
const presetsContainer = document.getElementById('presets');
const activitiesContainer = document.getElementById('activities');
const teacherEditNotification =
    document.getElementById('teacher-edit-notification');


const SAMPLES = [
  {
    title: 'Using print()',
    instructions: 'This example shows how to use the print statement.',
    code:
        '// Printing text\nprint("I love Javascript!")\n\n// Printing numbers\nprint(12)\n\n// Using \'+\' to print sentences\nprint("My age is " + 12)'
  },
  {
    title: 'Creating Variables',
    instructions:
        'This example shows how to create number and string variables.',
    code:
        '// Create a number variable\nvar myMoney = 100\nprint(myMoney)\n\n// Create a string variable\nvar nickname = "CodingChampion"\nprint(nickname)'
  },
  {
    title: 'Changing Variables',
    instructions: 'This example shows how to use variables.',
    code:
        '// Create a variable\nvar myMoney = 100\nprint(myMoney)\n\n// Change the value\nmyMoney = myMoney + 5\nprint(myMoney)'
  },
  {
    title: 'Functions',
    instructions: 'This is an example of a function that adds one to a number.',
    code:
        '// Create a function\nfunction addOne(myNumber) {\n\treturn myNumber + 1\n}\n\n// Use the function\nvar result = addOne(5)\nprint(result)'
  },

];

const ACTIVITIES = [
  {
    title: 'Warm-Up Activity 1',
    instructions: 'Can you print the number 18?',
    code: 'print()'
  },
  {
    title: 'Warm-Up Activity 2',
    instructions:
        'Can you set the value of the variable \'myName\', then print it in a sentence?',
    code: 'var myName = \'\'\nprint("My name is " + )'
  },
  'newline',
  {
    title: 'Functions Activity 1',
    instructions:
        'Can you call the function addTwo() with an input of 5, and print the result?',
    code:
        'function addTwo(number) {\n\treturn number + 2\n}\n\nvar result = // ??\nprint(result)'
  },
  {
    title: 'Functions Activity 2',
    instructions:
        'Can you create the function triple() that multiplies a number by 3?',
    code:
        'function triple(number) {\n\t// ??\n}\n\nvar result = triple(3)\nprint(result)'
  },
  {
    title: 'Functions Activity 3',
    instructions:
        'Can you create a greet() function that takes someone\'s name and says \'Hello\' to them?',
    code:
        'function greet(name) {\n\tprint("Hello, " + )\n}\n\ngreet("Greg")\ngreet("Kenji")'
  },
  'newline',
  {
    title: 'Debugging a Function',
    instructions:
        'Can you fix this function so that it correctly subtracts 5 from a number?',
    code:
        'function subtractFive number) {\n\tnumber - 5 return\n}\n\nvar result = subtractFive(8)\nprint(result)'
  },
  {
    title: 'Challenge Activity',
    instructions:
        'Can you make this function multiply its two parameters together?',
    code:
        'function multiply (firstNumber, secondNumber) {\n\t// ?\n}\n\nvar result = multiply(3, 5)\nprint(result)  // Should print 15'
  },
];

function loadSample(i) {
  document.getElementById('instructions').innerHTML =
      SAMPLES[i].instructions || '';
  editor.loadSampleCode(SAMPLES[i].code);
}

function loadActivity(i) {
  document.getElementById('instructions').innerHTML =
      ACTIVITIES[i].instructions || '';
  editor.loadSampleCode(ACTIVITIES[i].code);
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

/* ------------------
    Script start
  ----------------- */

SAMPLES.forEach((sample, i) => {
  if (sample === 'newline') {
    presetsContainer.appendChild(document.createElement('br'));
    return;
  }
  const button = document.createElement('button');
  button.innerHTML = sample.title;
  button.onclick = () => loadSample(i);
  presetsContainer.appendChild(button);
})

ACTIVITIES.forEach((sample, i) => {
  if (sample === 'newline') {
    activitiesContainer.appendChild(document.createElement('br'));
    return;
  }
  const button = document.createElement('button');
  button.innerHTML = sample.title;
  button.onclick = () => loadActivity(i);
  activitiesContainer.appendChild(button);
})

const editor = new CodeEditor(
    ROLE.STUDENT, codeTextArea, codeContainer, renderedCodeContainer, outputDiv,
    /* studentButtonContainer= */ null, /* studentCodeTitle= */ null,
    teacherEditNotification);

setTimeout(promptForUserName, 10);