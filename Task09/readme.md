# Task 9

1) Add Angular into the project
- create index.html page to show list of posts
- create app module and controller to receive data from the service and push it to scope

2) Use every angular component (service, directive, component, controller, filter)
- create PostList, Post components
- create Post service
- create controller for addition post form
- create directive that allows the save button to be clicked whenever the enter key is pressed on the add post form page
- create filter to show first 10 letters of post text

3) Split logic correctly between components (data to services,  directive universal and reusable)

4) Create SPA 
- Post List page
- Post page or create section that appear on Post List page
- Add post page

5) Advanced:
a) add test to every component
- Post service
- Post List component
- Key-Pressed directive
- Add Post controller
- Text Minification filter
b) use interceptor (check that user is logged in before to show posts)
- add authentination service
- redirect to add post form page if 401 or 403 code come form backend