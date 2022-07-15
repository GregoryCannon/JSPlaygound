/* --------------------
    For Loops activity (March 2022)
    ------------------- */

const SAMPLES_FOR_LOOP = [
  {
    title: 'Simple For Loop',
    instructions: 'This is an example of a for loop that counts to 10.',
    code: 'for (int i = 1; i <= 10; i++) {\n\tprint(i)\n}'
  },
  {
    title: 'Adding Up Numbers',
    instructions: 'This for loop adds up all the numbers from 1 to 10.',
    code:
      'int total = 0\nfor (int i = 1; i <= 10; i++) {\n\ttotal = total + i\n}\nprint("Total: " + total)'
  },
];

const ACTIVITIES_FOR_LOOP = [
  {
    title: 'Warm-Up Activity',
    instructions: 'Can you make the program print \'Hello\' 10 times?',
    code:
      'print("Welcome to CS in English!")\nfor (int i = 1; i <= 10; i++) {\n\t// ???\n}'
  },
  {
    title: 'Stars Activity 1',
    instructions:
      'Can you print a square out of stars?<br><br>********<br>********<br>********<br>********<br>********',
    code:
      'print("Welcome to CS in English!")\nfor (int i = 1; i <= 5; i++) {\n\tvar stars = "********"\n\t// ???\n}'
  },
  {
    title: 'Stars Activity 2',
    instructions:
      'Can you print a triangle out of stars?<br><br>*<br>**<br>***<br>****<br>*****<br>******<br>*******<br>********',
    code:
      'var stars = ""\nfor (int i = 1; i <= 8; i++) {\n\tstars = ??\n\tprint(stars)\n}'
  },
  {
    title: 'Challenge Activity',
    instructions:
      'Can you multiply together all these numbers? <br><br>3 x 4 x 5 x 6 x 7',
    code: 'var product = 1\nfor (   ??   ) {\n\t// ??\n}\nprint(product)'
  },
];

/* --------------------
    Functions activity (May 2022)
    ------------------- */

const SAMPLES_FUNCTIONS = [
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

const ACTIVITIES_FUNCTIONS = [
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

/* --------------------
    Unit Testing activity (March 2022)
    ------------------- */

const TEST_CONCAT_DELIM = "~`";
const DELIM = TEST_CONCAT_DELIM;

const SAMPLES_UNIT_TESTING = [
  {
    title: 'Simple Tests',
    instructions: 'This example shows how we can unit test an addition function',
    code:
      '// Adds one to a number\nfunction addOne(number) {\n\treturn number + 1\n}'
      + DELIM + 'addOne(5)' + DELIM + '6'
      + DELIM + 'addOne(0)' + DELIM + '1'
      + DELIM + 'addOne(-10)' + DELIM + '-9'
  },
  {
    title: 'Using an If Statement',
    instructions:
      'This example shows how we can use an if statement to check if something is true!',
    code:
      '// Checks if you have enough money to buy something\nfunction canAfford(yourMoney, cost) {\n\tif (cost > yourMoney) {\n\t\treturn false  // Too expensive!\n\t} else {\n\t\treturn true   // Can afford!\n\t}\n}'
      + DELIM + 'canAfford(1000, 20)' + DELIM + 'true'
      + DELIM + 'canAfford(100, 101)' + DELIM + 'false'
      + DELIM + 'canAfford(100, 100)' + DELIM + 'true'
      + DELIM + 'canAfford(-5, 1)' + DELIM + 'false'
      + DELIM + 'canAfford(99999, 50)' + DELIM + 'true'
  },
  {
    title: 'Testing a Complex Function',
    instructions: 'This example shows how we can test a more complicated function that includes if statements.',
    code:
      '// Calculates how much change you\'ll get from a vending machine\nfunction getChange(yourMoney, cost) {\n\tif (cost > yourMoney) {\n\t\treturn "Not enough money"\n\t} else {\n\t\t// Use subtraction to calculate the change\n\t\treturn yourMoney - cost\n\t}\n}'
      + DELIM + 'getChange(100, 60)' + DELIM + '40'
      + DELIM + 'getChange(100, 100)' + DELIM + '0'
      + DELIM + 'getChange(100, 150)' + DELIM + 'Not enough money'
      + DELIM + 'getChange(-10, 50)' + DELIM + 'Not enough money'
      + DELIM + 'getChange(50.5, 40)' + DELIM + '10.5'
  }
];

const ACTIVITIES_UNIT_TESTING = [
  {
    title: 'Warm-Up Activity',
    instructions: 'Can you add more tests for this double() function?',
    code: '// Adds one to a number\nfunction double(number) {\n\treturn number * 2\n}'
    + DELIM + 'double(5)' + DELIM + '10'
    + DELIM + 'double(0)' + DELIM + '0'
  },
  {
    title: 'Can You Afford?',
    instructions: 'Can you add more tests for this canAfford() function? Look for edge cases!',
    code: 
    '// Checks if you have enough money to buy something\nfunction canAfford(yourMoney, cost) {\n\tif (cost > yourMoney) {\n\t\treturn false  // Too expensive!\n\t} else {\n\t\treturn true   // Can afford!\n\t}\n}'
    + DELIM + 'canAfford(200, 100)' + DELIM + 'true'
  },
  {
    title: 'Fixing Tests',
    instructions:
      'Some of these tests aren\'t correct! Can you fix them?',
    code:
    '// Calculates how much change you\'ll get from a vending machine\nfunction getChange(yourMoney, cost) {\n\tif (cost > yourMoney) {\n\t\treturn "Not enough money"\n\t} else {\n\t\t// Use subtraction to calculate the change\n\t\treturn yourMoney - cost\n\t}\n}'
    + DELIM + 'getChange(200, 100)' + DELIM + '60'
    + DELIM + 'getChange("cow", 10)' + DELIM + '50'
    + DELIM + 'getChange(40, 30)' + DELIM + '10'
    + DELIM + 'getChange(25, 100)' + DELIM + '75'
    + DELIM + 'getChange(500, 100)' + DELIM + 'Not enough money'
  },
  {
    title: 'Fixing the Function',
    instructions:
      'Something isn\'t quite right about this function. Can you use the tests to figure out what it is?',
    code:
    '// Checks the price of items\nfunction getCost(drinkName) {\n\tif (drinkName == "calpico") {\n\t\treturn 140\n\t}\n\tif (drinkName == "oi ocha") {\n\t\treturn 200\n\t}\n\tif (drinkName == "pepso") {\n\t\treturn 180\n\t}\n}'
    + DELIM + 'getCost("calpico")' + DELIM + '140'
    + DELIM + 'getCost("oi ocha")' + DELIM + '160'
    + DELIM + 'getCost("pepsi")' + DELIM + '180'
    + DELIM + 'getCost("seltzer")' + DELIM + '250'
  },
  'newline',
  {
    title: 'Challenge: Coding Interview',
    instructions:
      'Can you code a function that will pass all of the given unit tests?',
    code: 'function orderDrink (drinkName, moneyInserted) {\n\t// ?\n}\n\n// Side Note 1: to create a variable, do the following:\n//		var myAge = 10    \n\n// Side Note 2: to combine a number and a string, use '+'\n//		return "My age is: " + myAge'
    + DELIM + 'orderDrink("oi ocha", 150)' + DELIM + 'Not enough money'
    + DELIM + 'orderDrink("oi ocha", 180)' + DELIM + 'Your change: 20'
    + DELIM + 'orderDrink("pepsi", 180)' + DELIM + 'Out of stock'
    + DELIM + 'orderDrink("calpico", 140)' + DELIM + 'Out of stock'
    + DELIM + 'orderDrink("oi ocha", 2000)' + DELIM + 'We only accept bills of 1000 or lower'
  },
];