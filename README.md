## Unit Assignment: Kudos Board

Submitted by: **Nicholas Matias**

Deployed Application (optional): [Kudos Board Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES

- [X] **Home Page**
  - [X] Displays header, banner, search, board grid, and footer.
  - [X] Displays preview of all boards on initial page load.
    - [X] Boards previews should show an image/gif and board title.
  - [X] Users can click on a category (recent, celebration, thank you, inspiration) to filter the boards.
    - [X] Recent displays most recently created boards.
    - [X] Other categories display boards of that type.
  - [X] Users can search for a board by name.
  - [X] Users can click on a board to navigate to a new page containing that board.
  - [X] Users can create a new board.
    - [X] Boards should have a title, category, and author (optional).
  - [X] User can delete boards.
  
- [X] **Board Page**
  - [X] Displays a list of all cards for a board.
    -  [X] Each card features a text message.
    -  [X] Each card features a gif found using the [GIPHY API](https://developers.giphy.com/docs/api/).
    -  [X] Users can optionally sign the card as the author.  
-   [X] Cards can be upvoted.
-   [X] Cards can be deleted.


#### STRETCH FEATURES


- [ ] **User Accounts**
  - [ ] Users should be able to log in with a username and password.
  - [ ] Users should be able to sign up for a new account.
  - [ ]  Boards and cards should be associated with a user.
    - [ ]  Anonymous cards or cards by guest users should still be allowed.
  - [ ] Add a new filter option on the home page to display only the current user's boards.
  - [ ] Allow boards to be deleted only if they are owned by the user.
- [ ] **Deployment**
  - [ ] Website is deployed via Render.
- [ ] **Comments**
  - [ ] Users should be able to comment on cards.


### Walkthrough Video

<div>
    <a href="https://www.loom.com/share/6b121f4d428e42edb448ce7e4834913c">
      <p>Kudos Board Demo - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/6b121f4d428e42edb448ce7e4834913c">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/6b121f4d428e42edb448ce7e4834913c-with-play.gif">
    </a>
  </div>



### Reflection



* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?


        Lab 3 was helpful when I went through it. It was directly related to what we were doing. It helped me understand how to set up the database and connect it to the frontend.     That said, while lab 3 did cover this to an extent, connecting the frontend was still a little hard. Through reading documentation, things became clearer though. In addition to this, understanding how to write the put, patch, get, and delete api calls was hard at first. Lastly, I felt completely unprepared to deploy the website through render. Deploying an application that is purely frontend is simple but doing it with the database in mind is something else entirely. I didn't know how to add in the backend so that the website would work through render. 


* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.


        Given more time, I would finish setting it up on render, add comments for cards, and user authentication.  


* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?


        I didn't demo this week as I went last week. I did appreciate that a couple people had theirs deployed through render which is something I didn't have time to accomplish. 


### Open-source libraries used


    I used the 'react-router-dom' library to set up the routes for the boards. Through using this, I was able to efficiently set up a separate page for each board.


### Shout out


    This week, I did pretty well on my own in terms of trouble shooting. That said, Sammy was able to direct me to the right websites so that I could read the right documentation. 
