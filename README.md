# Calendar Application

## Installation Instructions (must have postgres installed and on default settings)
- ** IN TERMINAL (commands)**
- git clone https://github.com/jcheungwo/calendarApplication
- cd calendarApplication
- npm install
- createdb calendarapp
- npm run seed      //optional, populates db with events
- npm run start-dev
- ** IN BROWSER **
- navigate to localhost:8080

## Features
- Show all events the user has on their calendar
- Click on specific day shows all the day's events as well as allows user to add/remove/update event of that day
- All dates correctly positioned with dynamiclly populated rows (4-6) depending on number of days and the day of the week the month starts on
- Next and Previous Buttons allows the calendar to show the events of the the respective newly update months
- Add/Update Event Forms are closed after they are submitted
- Backend routes to get all events and to remove, update, and add events
