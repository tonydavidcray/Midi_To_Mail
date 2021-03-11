# Midi To Mail
Reaper and NodeJS tool to send an email when Reaper detects an Audio Dropout. 

In the complex world of digital audio, there are times where thorough testing is required of many interconnected devices to ensure a reliable system has been created. One basic test is a burn-in, where live inputs are recorded to ensure consistent signals are recieved. Effective monitoring of this test is challenging due to the long frame often involved. Here are two simple tools to assist with this task.

1. A Reaper session that records an input and will detect an audio dropout resulting in a full scale tone being emiited / recorded for easy visual indication of the dropout. 

1. An additional utility to send an email when a dropout is detected. 

## Reaper
An input track is created and the desired test audio input is selected. This track is recorded for later analysis. A post fade send of this track is sent to a Detector Track that has a tone generator instansiated and is connected to the Left Aux input of a JS Gate. This gate is configured to be inverted so it opens and allows the tone to come through when the live audio input drops out. The JS Gate plug is set to send a Midi Note out when the gate passes its threshold.

![Reaper SS](https://user-images.githubusercontent.com/44496093/110736698-3b76d380-8280-11eb-95a0-ef50f0d8bcfa.png)


## NodeJS
* Install NodeJS using your OS's download from the NodeJS site. 
* Install npm ( if not done so via the above NodeJS installer
* Install the dependant packages defined in the "app.js" header
* Fill in your GMail account details in the **sendGmail()** function.
* In the terminal, cd to the MidiToMail directory and run "node app.js" (anytime you start or stop the NodeJS Script you will need to "Refresh All Midi Devices" in the Reaper Preferences.

Reaper needs to now have the "Midi To Mail" Midi device enabled in the preferences, then the Detector track needs its Midi Hardware output in teh "I/O" section set to this device. 

The NodeScript has a variable to set the minimum time between mails being sent, its default is 1 minute, as Google limits the amount of mails you can send per 24hr rolling period. I think its 500 per day for a normal Gamil account, or 2000 per day for a workspace account.
