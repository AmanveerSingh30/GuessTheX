#Amanveer Singh

# GuessTheX

My program will allow for the user and the computer to engage in a game to guess what number the computer is thinking of. The number will be randomized between the parameter numbers 1-10, 1-50, 1-100. The user will have the choice to choose the level. The user will be able to guess as many times as they like until they enter a 0, however the number being guessed will be different each time. The program records how many successful guesses the user has had in a row and stores a high score, the most guessed correctly in a row, along with displaying a congratulatory message. The points associated with the user guessing the number correctly will be dependent upon how hard the guessing was. For level 1, 1-10 for each correct guess in a row would be 5 points. For level 2, 1-50, it would be 25 points and for level 3, 1-100, it would be 50 points.

Functional requirements:

1.Welcome page loads with correct layout and design

a.Title of the game

b.Six buttons

i.Introduction and rules

ii.Enter a nickname or continue as a guest

iii.High scores

iv.Select a level - there are three levels; level 1, 2 and 3

v.Start

vi.Exit - exit button appears on each phase of the game (e.g while viewing rules on introductions page or in between the game)  
2.The user will be prompted to choose a level of their choice and start the game.

3.Once they start the game, the program randomizes a number.

4.The user is required to enter ONLY numbers.

5.If the user inputs anything other than numbers, an alert message will pop and state: “invalid input, please enter an integer”

6.A function randomizes another number within the given parameters and repeats this everytime the user guesses a number (regardless of whether the number guessed is true or false)

7.A function tracks the amount of inputs in a row that matched the randomized number (correctly guessed) and updates the high score accordingly

8.A function outputs the numbers guessed correctly, score, and congratulatory message when a 0 is entered

9.User is directed to homepage after finishing the game or they can exit the game

10.Welcome page of the website contains multiple buttons as mentioned in (1).

11.Once the user exits the game and opens it again the restored data under their username will no longer be available.
