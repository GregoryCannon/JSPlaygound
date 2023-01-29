// Enums and data values
const ROLE = Object.freeze({ STUDENT: 0, TEACHER: 1 });
const NEWLINE = '<br/>';
const NO_QUESTION = "noquestion";
const STATUS_UNGRADED = 0;
const STATUS_CORRECT = 1;
const STATUS_INCORRECT = 2;

// Config variables
const NUM_TEST_CASES = 5;
const IS_PROD = true;
const SERVER_URL =
  IS_PROD ? 'https://csinenglish.herokuapp.com' : 'http://localhost:3000';

// Every time the student edits, the version is incremented by 1
const STUDENT_VERSION_INCREMENT = 1;
// The version is rounded before incrementing so the .1 exists as a
// marker that a teacher was the last editor.
const TEACHER_VERSION_INCREMENT = 100.1;
// Every time a code sample is loaded, the version increments to a round
// multiple of this increment
const LOAD_SAMPLE_CODE_INCREMENT = 1000;

// How often students and teachers should pull from the server. Can be
// configured to match the server's capacity.
const STUDENT_SYNC_INTERVAL_MS = 2500;
const TEACHER_SYNC_INTERVAL_MS = 1000;
// Multiplier for sync intervals that can be edited in real-time if the server
// is under heavy load
let antiDdosMultiplier = 15.0;
// The delay between the last keystroke and pushing to the server
const EDIT_TO_PUSH_DELAY_MS = 500;
// How ofton to check if a sync with the server is needed
const TICK_MS = 100;
// Counter in ticks until the page should collect metrics on server connectivity
const SERVER_LAG_MONITORING_PERIOD_TICKS = 100;

const DISABLED_TEXT_AREA_COLOR = "#efefef";
const ENABLED_TEXT_AREA_COLOR = "#fff";

const BREAKOUT_ROOMS = [
  "L1-1", "L1-2", "L1-3",
  "L2-1", "L2-2", "L2-3",
  "L3-1", "L3-2", "L3-3", "L3-4",
  "L4-1", "L4-2", "L4-3", "L4-4", "L4-5", "L4-6", "L4-7", "L4-8"
]
// BREAKOUT_ROOMS.sort((a, b) => {
//   const [a_, a1, a2] = a.split(/-|L/g);
//   const [b_, b1, b2] = b.split(/-|L/g);
//   return (a1 * 100 + a2) - (b1 * 100 + b2);
// });

const GlobalState = {
  currentLesson: Titles.MAPS, // Currently unused
  isUnitTestSetup: false  
}