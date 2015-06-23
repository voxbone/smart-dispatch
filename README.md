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

  a. Open a terminal window and start mongodb: mongod --dbpath ~/path-to/smart-dispatcher/sd-api/data
  b. Open another terminal window and start mongo: mongo
  c. In the mongo terminal window, switch to nodetest1 db: use nodetest1
  d. Open another terminal window and cd in the sd-api module directory: cd ~/path-to/smart-dispatcher/sd-api
  e. Start the sd-api module: npm start
  f. Open http://localhost:4000/newuser and create users with the right country codes (segment)
  g. Open a new window and cd into ~/path-to/smart-dispatch
  h. Start Smart dispatch : npm start
