Smart Dispatch
===============


1. Download the repo
2. Install the dependencies:

  cd sd-api
  npm install
  
  cd smart-dispatch
  npm install

3. Add your credentials

  In /smart-dispatch/configuration.js add your Voxbone WebRTC username/password
  In /smart-dispatch/index.js add your LinkedIn API and Secret keys

4. Launch App:

  *   Open a terminal window and start mongodb: mongod --dbpath ~/path-to/smart-dispatch/sd-api/data
  *   Open another terminal window and start mongo: mongo
  *   In the mongo terminal window, switch to nodetest1 db: use nodetest1
  *   Open another terminal window and cd in the sd-api module directory: cd ~/path-to/smart-dispatch/sd-api
  *   Start the sd-api module: npm start
  *   Open http://localhost:4000/newuser and create users with the right country codes (segment)
  *   Open a new window and cd into ~/path-to/smart-dispatch/smart-dispatch
  *   Start Smart dispatch : npm start
