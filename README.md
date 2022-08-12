# ajax-project

A web application for hiking enthusiasts who'd like to check California National Parks off their bucket list.

Being both a hiking enthusiast and California native, I'd figure it'd be fun to create this app for anyone looking to check some parks off their bucket list. I know traversing California is a must do bucket list item for many visiting or living here. If only there were an app, that when along a travellers journey --- allows them to keep track of which park they've visited! Well now, there is one!

## Technologies Used

-HTML5
-CSS3
-JavaScript ES5

## Live Demo

Try the application live at [https://bryanvaldovinos.github.io/park-avenue/](https://bryanvaldovinos.github.io/park-avenue/)

## Features 

- Users can view a list of California National Parks
- Users can check a park as 'Been There!'
- Users can view a list of parks visited/marked as 'Been There!'
- Users can search for a park using a search bar
- Users can comment on parks they've visited

## Preview

![User can check a park as visited!](https://github.com/bryanvaldovinos/ajax-project/blob/main/images/checkoff.gif)
![User can comment on visited parks!](https://github.com/bryanvaldovinos/ajax-project/blob/main/images/commentpark.gif)

## Stretch Features 

- Users can update comments.
- Users can filter list of Parks by US State

## System Requirements

- VS Code, Sublime, or other code editor

## Getting STarted

1. Clone the repository.
    ``` shell
    git clone git@github.com:bryanvaldovinos/ajax-project.git
    cd ajax-project
     ```
2. Request Access Key for 3rd party API.

    - Visit this [page](https://www.nps.gov/subjects/developer/get-started.htm) to obtain access
    - Once given key, use key to retrieve data from 'parks' [here](https://www.nps.gov/subjects/developer/api-documentation.htm#/parks/getPark)
    - Provide key, query by stateCode --- in our case, California
    - Execute & retrieve URL to use for project

3. Start the project. 
    - Once started you can view the application by opening the index.html file or by opening http://localhost:3000 in your browser.
    


