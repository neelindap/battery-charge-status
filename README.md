# battery-charge-status

A lightweight tray application running in the background monitoring the battery charge percent and notifying the user on reaching the threshold. 

The life of Li-ion batteries can be extended by keeping it between 40-80% charge, and not letting it fully charge or discharge.
The application sits in the background and checks for the battery percentage (only if charging), every 10 minutes and displays a notification if the current battery percentage exceeds the defined threshold(currently set to 80). (Threshold set to 20 for video, and polling every 10 seconds)

Libraries used:
- electron-notify
- battery-level
- is-charging
- electron-packager

Future scope:
- UI to set the threshold value and polling time
- Ability to set a lower threshold value, to remind user to plug in the charger
