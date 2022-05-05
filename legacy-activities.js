/* --------------------
    For Loops activity (March 2022)
    ------------------- */

const SAMPLES = [
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

const ACTIVITIES = [
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