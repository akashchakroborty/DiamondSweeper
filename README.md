# Diamond Sweeper

## Problem Statement

The goal of this exercise is to build a game.

The rules of the game are as follows:

* The game board has 8x8 squares (initially, all represented by question marks)
* There are 8 diamonds hidden on the board, each diamond behind one of the squares
* When the user clicks on a square
    * If the square was hiding a diamond, the diamond appears
    * Otherwise, the square is opened, and blank
* The game ends when all diamonds are found. The user's score is the number of squares still left unturned.

## Advanced: Adding Hints

Part II of this problem adds the ability to add hints to empty squares

* When the user clicks on a square
    * If the square was not a diamond, then an arrow appears, pointing towards the nearest diamond
    * Any arrows that were previously show become hidden

## Requirements:

* Angular CLI (the app was built against version 6.1.5).
* node.js (the app was built against v8.9.4, but any version of node > 8.9 or higher should work).
* npm ( the app was built against v6.4.1, but any version of npm > 5.5.1 or higher should work).


## To start the Application:
* Download the project and enter the root directory.
* Install the dependencies (via `npm install`).
* Start the webserver: `ng serve --open`.
* Visit `http://localhost:4200` to see the application.
