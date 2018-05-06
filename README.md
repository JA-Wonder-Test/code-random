# Chat Random (Wonder code test)

## Getting started

Client side startup: `cd client && yarn start`

Server side startup: `cd server && yarn start`

## Decisions and Process

Diving a litle bit into my thought process may provide some clarity. 
The first thing I did was get a baseline expectation of the user experience.
I imagined the following flow:

1. User is prompted for nickname
2. User enters nickname and is matched (or is waiting for a match)
3. User types and recieves messages
4. User disconnects and is re-matched

Next up, with these features in mind, I could draft the API layer.
After playing with an approach that included both a REST API and websockets,
I eventually simplified to only using websockets.

For the frontend, I used create-react-app to give me a project skeleton
with a test, build, and deploy pipeline included out of the box.
From there, I added redux and redux-thunk.

Additional considerations I had made:

* Data layer for the Node backend
    * Setting up a real database may take a good chunk of time, so I stubbed this for now.
    * A simple MongoDB structure would work fine as a next step?
      This would improve scalability over multiple server instances.
* Project structure
    * Separating the client and server side code may be helpful here.
    * This creates testability through easy mocking.
    * Deployments are also easier this way, making it easy to cache just the frontend on a CDN.
* Code style
    * Since the project is entirely JS-based, Prettier can handle the formatting automatically.

Things I wanted to do but ran out of time:

* Fix bugs with `/hop` command
    * Multiple users hopping can create three-way chats
    * User should see visual indication that they've been hopped
* Create a mock websocket server/client for testing
* Fix UI issues
    * Chat shouldn't scroll below the message input
    * App window should be vertically fullscreen
    * Users with the same name should show as diffreent colors
    * UI design / font stack shouldn't look like a 1990's web 1.0 site
* Add messages/notifications from system
    * This would greatly improve UX around incorrect command syntax and joining/disconnecting
* Handle multiline and other input formatting
* Handle disconnects, whether voluntary or involuntary
* Security!
    * Validate source of message to prevent hijacking
    * Test for cross-site scripting issues
* Remove localhost hardcode and test on separate servers
* Server-side logging