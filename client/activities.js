const Titles = {
  FOR_LOOP: "ForLoops",
  FUNCTIONS: "Functions",
  UNIT_TESTING: "UnitTests",
  ADVANCED_UNIT_TESTING: "AdvUnitTests",
  ARRAYS: "Arrays",
  MAPS: "Maps"
}

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
    Unit Testing activity (July 2022)
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
    code: '// Doubles a number\nfunction double(number) {\n\treturn number * 2\n}'
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
    code: 'function orderDrink (drinkName, moneyInserted) {\n\t// ?\n}\n\n// Side Note 1: to create a variable, do the following:\n//		var myAge = 10    \n\n// Side Note 2: to combine a number and a string, use ' + '\n//		return "My age is: " + myAge'
      + DELIM + 'orderDrink("oi ocha", 150)' + DELIM + 'Not enough money'
      + DELIM + 'orderDrink("oi ocha", 180)' + DELIM + 'Your change: 20'
      + DELIM + 'orderDrink("pepsi", 180)' + DELIM + 'Out of stock'
      + DELIM + 'orderDrink("calpico", 140)' + DELIM + 'Out of stock'
      + DELIM + 'orderDrink("oi ocha", 2000)' + DELIM + 'We only accept bills of 1000 or lower'
  },
];

/* --------------------
Unit Testing 2 activity (Sept 2022)
------------------- */

const LOCK_MARKER = "(l)"

const SAMPLES_ADVANCED_UNIT_TESTING = [
  {
    title: 'Simple Tests',
    instructions: 'This example shows how we can unit test an addition function',
    code:
      '// Adds one to a number\nfunction addTwo(number) {\n\treturn number + 2\n}'
      + DELIM + 'addTwo(5)' + DELIM + '7'
      + DELIM + 'addTwo(0)' + DELIM + '2'
      + DELIM + 'addTwo(-10)' + DELIM + '-8'
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
    title: 'Testing with Exceptions',
    instructions: 'This example shows how we can test a function that might throw an exception.',
    code:
      '// Gets the next month\nfunction getNextMonth(monthNumber) {\n\tif (monthNumber < 1) {\n\t\tthrow("Month cannot be less than 1")\n\t}\n\tif (monthNumber > 12) {\n\t\tthrow("Month cannot be higher than 12")\n\t}\n\t// Don\'t worry about this math\n\treturn (monthNumber + 1) % 12\n}'
      + DELIM + 'getNextMonth(7)' + DELIM + '8'
      + DELIM + 'getNextMonth(12)' + DELIM + '1'
      + DELIM + 'getNextMonth(-4)' + DELIM + 'Exception'
      + DELIM + 'getNextMonth(18)' + DELIM + 'Exception'
  },
  {
    title: 'Built-in Exceptions',
    instructions: 'Sometimes we run into exceptions that we don\'t throw ourselves! If something goes wrong in the system, it will also throw an Exception.',
    code:
      '// Divides two numbers\nfunction divide(firstNum, secondNum) {\n\treturn firstNum / secondNum\n}'
      + DELIM + 'divide(10, 2)' + DELIM + '5'
      + DELIM + 'divide(5, 0)' + DELIM + 'Exception'
  }
];

const ACTIVITIES_ADVANCED_UNIT_TESTING = [
  {
    title: 'Warm-Up Activity',
    instructions: 'Can you add tests to this function to make sure it throws exceptions for bad input? (e.g. strings, booleans)',
    code: LOCK_MARKER + '// Doubles a number\nfunction double(userInput) {\n\tif (typeof(userInput) != "number") {\n\t\tthrow("Input must be a number")\n\t}\n\treturn userInput * 2\n}'
      + DELIM + LOCK_MARKER + 'double(5)' + DELIM + LOCK_MARKER + '10'
      + DELIM + LOCK_MARKER + 'double(0)' + DELIM + LOCK_MARKER + '0'
  },
  {
    title: 'Can you Vote?',
    instructions: 'Can you add more tests for this canVote() function? Look for edge cases!',
    code:
      LOCK_MARKER + '// Checks if you are old enough to vote\nfunction canVote(age) {\n\tif (typeof(age) != \"number\") {\n\t\tthrow("Input must be a number")\n\t}\n\tif (age >= 18) {\n\t\treturn true  // Can vote!\n\t} else {\n\t\treturn false   // Not old enough\n\t}\n}'
      + DELIM + LOCK_MARKER + 'canVote(24)' + DELIM + LOCK_MARKER + 'true'
  },
  {
    title: 'Fixing Tests',
    instructions:
      'Some of these tests aren\'t correct! Can you fix them?',
    code:
      LOCK_MARKER + '// Reverses a string\nfunction reverse(inputString) {\n\tif (typeof(inputString) != \"string\") {\n\t\tthrow("Input must be a string")\n\t}\n\t// Don\'t worry about how this works\n\treturn inputString.split(\'\').reverse().join(\'\')\n}'
      + DELIM + 'reverse("abcde")' + DELIM + 'edcba'
      + DELIM + 'reverse("cow")' + DELIM + 'wo'
      + DELIM + 'reverse(100)' + DELIM + '001'
      + DELIM + 'reverse(reverse("123"))' + DELIM + '321'
      + DELIM + 'revrers("hello")' + DELIM + 'olleh'
  },
  {
    title: 'Fixing the Function',
    instructions:
      'This function isn\'t quite right, can you fix it so that all the tests pass?',
    code:
      '// Checks if the library has a book\nfunction checkForBook(title) {\n\tif (typeof(title) != "string") {\n\t\treturn false\n\t}\n\tif (title == "harry potter") {\n\t\treturn true\n\t} else if (title == "hunger games") {\n\t\treturn true\n\t} else {\n\t\treturn false\n\t}\n}'
      + DELIM + LOCK_MARKER + 'checkForBook("Harry Potter")' + DELIM + LOCK_MARKER + 'true'
      + DELIM + LOCK_MARKER + 'checkForBook(12)' + DELIM + LOCK_MARKER + 'Exception'
      + DELIM + LOCK_MARKER + 'checkForBook("Twilight")' + DELIM + LOCK_MARKER + 'false'
      + DELIM + LOCK_MARKER + 'checkForBook("Attack on Titan")' + DELIM + LOCK_MARKER + 'true'
      + DELIM + LOCK_MARKER + '' + DELIM + LOCK_MARKER + ''
  },
  'newline',
  {
    title: 'Challenge: Coding Interview',
    instructions:
      'Can you code a function that will pass all of the given unit tests?',
    code: 'function buyBook (title, moneyYouHave) {\n\t// ?\n}'
      + DELIM + LOCK_MARKER + 'buyBook("Doraemon", 100)' + DELIM + LOCK_MARKER + 'Not enough money'
      + DELIM + LOCK_MARKER + 'buyBook("Code Geass", 800)' + DELIM + LOCK_MARKER + 'Your change: 200'
      + DELIM + LOCK_MARKER + 'buyBook("Doraemon", 500)' + DELIM + LOCK_MARKER + 'Your change: 0'
      + DELIM + LOCK_MARKER + 'buyBook(100, "Hunter x Hunter")' + DELIM + LOCK_MARKER + 'Exception'
      + DELIM + LOCK_MARKER + 'buyBook("Hunter x Hunter", "Doraemon")' + DELIM + LOCK_MARKER + 'Exception'
  },
];

/* --------------------
Arrays activity (Nov 2022)
------------------- */

const SAMPLES_ARRAYS = [
  {
    title: 'Creating Arrays',
    instructions: 'This sample shows how to create arrays of numbers and strings.',
    code: 'var toys = ["train", "headphones", "toy car"]\n\nvar prices = [1000, 1500, 5000]'
  },
  {
    title: 'Looping through Arrays',
    instructions: 'This sample shows how to print every item in an array',
    code: 'var toyList = ["train", "headphones", "toy car"]\n\nfor (var toy of toyList) {\n\tprint(toy)\n}'
  },
  {
    title: 'List Operations',
    instructions: 'This sample shows how to use list operations (push, length, and sort)',
    code: 'var toys = ["train", "headphones", "toy car"]\n\n// Add an element using push()\ntoys.push("hat")\n\n// Sort the list\ntoys.sort()\n\n// Get the length\nprint(toys.length)'
  },
];
const ACTIVITIES_ARRAYS = [
  {
    title: 'Warm-up Activity',
    instructions: 'Can you print the length of this list?',
    code: 'var toys = ["train", "headphones", "toy car"]\n\nprint() // ?'
  },
  {
    title: 'Using Index',
    instructions: 'Can you print the element at index 2 in this list?',
    code: 'var toys = ["train", "headphones", "toy car"]\n\nprint() // ?'
  },
  // {
  //   title: 'Sorting a List',
  //   instructions: 'Can you sort this list alphabetically?',
  //   code: 'var studentNames = ["Xiyi", "Taroko", "Zeus", "Amy"]\n\n// ...?\n\nprint(studentNames)'
  // },
  {
    title: 'Gift Budget',
    instructions: 'Can you add up how much the total cost of these gifts is? (Remember, we can use "+=" to add to a variable).',
    code: 'var giftPrices = [10, 35, 21, 6]\n\nvar total = 0\nfor (      ) {\n\t// ...?\n}\n\nprint(total)'
  },
  "newline",
  {
    title: 'Combining Lists',
    instructions: 'Sam has her Christmas list already, but she has a second list of new ideas. Can you add all of them to her main list?',
    code: 'var christmasList = ["Phone case", "Airpods", "Action figure"]\nvar newIdeas = ["Seltzer machine", "Manga"]\n\n// ?\n\nprint(christmasList)',
  },
  {
    title: 'Do they want it?',
    instructions: 'Can you make a function that takes a gift and checks if it\'s on someone\'s Christmas list?',
    code: 'var list = ["Mario Kart game", "Lego set", "Friendship bracelet"]\n\nfunction isInList(giftIdea) {\n\t// ...?\n}\n\nprint("Lego set: " + isInList("Lego set"))\nprint("Guitar: " + isInList("Guitar"))'
  },
  // {
  //   title: 'Naughty or Nice?',
  //   instructions: 'We have two lists: one for "naughty" kids and one for "nice" kids. Can you make a function that checks which list a kid is on?',
  //   code: 'var naughtyList = ["Braidon", "Emilia", "Tomo", "Greg"]\nvar niceList = ["Kenji", "Kokoro", "Ai", "Adam"]\n\nfunction naughtyOrNice(name) {\n\t// ...?\n}\n\nprint("Kokoro: " + naughtyOrNice("Kokoro"))\nprint("Emilia: " + naughtyOrNice("Emilia"))'
  // },
  {
    title: 'Challenge Problem',
    instructions: 'One thing you can do with lists is use lists of lists! Can you make a function that finds the most expensive gift in a list?',
    code: 'var sampleList = [\n\t["Guitar stand", 20], \n\t["Song book", 12], \n\t["Nintendo Switch", 300], \n\t["Headphones", 50]\n]\n// For example, sampleList[2][0] = "Nintendo Switch"\n\nfunction findMostExpensive(giftsWithPrices) {\n\tvar highestPrice = 0\n\tvar highestPriceItem = "none"\n\n\t// ...?\n\n\tprint(highestPriceItem + ": " + highestPrice)\n}\n\nfindMostExpensive(sampleList)',
  }
];

/* --------------------
Maps activity (Jan 2023)
------------------- */

const SAMPLES_MAPS = [
  {
    title: 'Creating Maps',
    instructions: 'This sample shows how to create a map.',
    code: '// Create a map\nvar menu = new Map()\n\n// Add keys (menu items) and values (prices)\nmenu.set("Coffee", 300)\nmenu.set("Bagel", 600)'
  },
  {
    title: 'Using "Get"',
    instructions: 'This sample shows how to look up values in a map.',
    code: 'var menu = new Map()\nmenu.set("Coffee", 300)\nmenu.set("Bagel", 600)\n\n// Look up the price of a bagel\nvar bagelPrice = menu.get("Bagel")\nprint(bagelPrice)'
  },
  {
    title: 'Changing values',
    instructions: 'This sample shows how to change existing values in a map',
    code: 'var menu = new Map()\nmenu.set("Coffee", 300)\nmenu.set("Bagel", 600)\n\n// Offer a discount on bagels!\nmenu.set("Bagel", 500)\n\nprint(menu.get("Bagel"))'
  },
  {
    title: 'Looping through a map',
    instructions: 'This sample shows how to loop through all the keys in a map.',
    code: 'var menu = new Map()\nmenu.set("Coffee", 300)\nmenu.set("Bagel", 600)\n\n// Print the menu items\nfor (var item of menu.keys()) {\n\tvar price = menu.get(item)\n\tprint(item + " costs " + price)\n}'
  }
];
const ACTIVITIES_MAPS = [
  {
    title: 'Warm-up Activity',
    instructions: 'Can you print the price of a donut?',
    code: 'var prices = new Map()\nprices.set("Donut", 300)\nprices.set("Frosted donut", 350)\n\nvar donutPrice = prices.get(  )   // ?\nprint(donutPrice)'
  },
  {
    title: 'Adding an item',
    instructions: 'Can you add a new type of donut, "donut hole", that costs 100?',
    code: 'var prices = new Map()\nprices.set("Donut", 300)\nprices.set("Frosted donut", 350)\n\n// ?\n\nprint(prices.get("Donut hole"))'
  },
  {
    title: 'Donut Day',
    instructions: 'On this special day, everything on the menu costs 100 yen. Can you loop through and set all the prices?',
    code: 'var prices = new Map()\nprices.set("Donut", 300)\nprices.set("Frosted donut", 350)\nprices.set("Matcha", 400)\nprices.set("Coffee", 300)\n\n// ?\nfor (   ) {\n\n}'
  },
  "newline",
  {
    title: 'Buying everything',
    instructions: 'Can you calculate how much it would cost to buy everything on the menu? Hint: use a for loop!',
    code: 'var prices = new Map()\nprices.set("Donut", 300)\nprices.set("Frosted donut", 350)\nprices.set("Matcha", 400)\nprices.set("Coffee", 300)\n\nvar totalCost = 0\n// ?'
  },
  {
    title: 'Challenge problem',
    instructions: 'Can you create a second map called discountedPrices that applies a 20% discount to all items on the menu? Hint: use a for loop!',
    code: 'var prices = new Map()\nprices.set("Donut", 300)\nprices.set("Frosted donut", 350)\nprices.set("Matcha", 400)\nprices.set("Coffee", 300)\n\nvar discountedPrices = new Map()\n// ?'
  },
];

let ACTIVITIES_LISTS = {};
ACTIVITIES_LISTS[Titles.FOR_LOOP] = ACTIVITIES_FOR_LOOP;
ACTIVITIES_LISTS[Titles.FUNCTIONS] = ACTIVITIES_FUNCTIONS;
ACTIVITIES_LISTS[Titles.UNIT_TESTING] = ACTIVITIES_UNIT_TESTING;
ACTIVITIES_LISTS[Titles.ADVANCED_UNIT_TESTING] = ACTIVITIES_ADVANCED_UNIT_TESTING;
ACTIVITIES_LISTS[Titles.ARRAYS] = ACTIVITIES_ARRAYS;
ACTIVITIES_LISTS[Titles.MAPS] = ACTIVITIES_MAPS;

let SAMPLES_LISTS = {};
SAMPLES_LISTS[Titles.FOR_LOOP] = SAMPLES_FOR_LOOP;
SAMPLES_LISTS[Titles.FUNCTIONS] = SAMPLES_FUNCTIONS;
SAMPLES_LISTS[Titles.UNIT_TESTING] = SAMPLES_UNIT_TESTING;
SAMPLES_LISTS[Titles.ADVANCED_UNIT_TESTING] = SAMPLES_ADVANCED_UNIT_TESTING;
SAMPLES_LISTS[Titles.ARRAYS] = SAMPLES_ARRAYS;
SAMPLES_LISTS[Titles.MAPS] = SAMPLES_MAPS;