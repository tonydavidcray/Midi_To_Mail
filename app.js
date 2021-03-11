// Dependencies
// You need to install the following npm packages.
// https://www.npmjs.com/package/midi
// npm install midi -save
//
// npm install gmail-send -save

const midi = require("midi");

let minTimeBetweenMailMessages = 60000; // 60 seconds
let timer;
let allowedToSendMail = true;

// - - - - - - - -
process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {
  if (options.cleanup) console.log("clean");
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) {
    input.closePort();
    process.exit();
  }
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

// - - - - - - -

// Set up a new input.
const input = new midi.Input();

// Configure a callback.
input.on("message", (deltaTime, message) => {
  if (message[0] == 144) {
    if (allowedToSendMail == true) {
      sendGmail(
        {
          subject: "Dropout Detected",
          text: "Dropout at " + Date(),
        },
        (error, result, fullResult) => {
          if (error) console.error(error);
          console.log(result);
        }
      );
      console.log("Sent Email");
    }
    // Clear the timer.
    clearTimeout(timer);
    allowedToSendMail = false;

    // Set up a timer to check if the heartbeat has arrived
    timer = setTimeout(() => {
      allowedToSendMail = true;
    }, minTimeBetweenMailMessages);
  }
  console.log(`m: ${message} d: ${deltaTime}`);
});

// Create a virtual input port.
input.openVirtualPort("Midi To Mail");

// A midi device "Test Input" is now available for other
// software to send messages to.

// ... receive MIDI messages ...

// Close the port when done.
//input.closePort();

// - - - - - - - - - - - -

// Send mail to Gmail
const sendGmail = require("gmail-send")({
  user: "***@***", // Add your GMail User Name here.
  pass: "***", // Add your Gmail password here
  to: "***@***", // add the recipient email here
  subject: "subject",   // Add an email subject here - but it can be overwritten in the above function call.
});
