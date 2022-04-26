## Routes
- **User**
    - [GET] /users -> Get all users
    - [POST] /users -> Create a new user
    
    - [GET] /users/:UUID -> Get a user by UUID
    - [PUT] /users/:UUID -> Update a user by UUID
    - [DELETE] /users/:UUID -> Delete a user by UUID

    - [GET] /users/:UUID/lists -> Get all lists UUID's of a user by UUID
    - [GET] /users/:UUID/subscription -> Get the subscription UUID of a user by UUID

- **List**
    - [GET] /lists/:userUUID -> Get all lists of a user by UUID
    - [POST] /lists/:userUUID -> Create a new list for a user by UUID

    - [GET] /lists/:listUUID/:userUUID -> Get a list by UUID and user UUID to check if the user has permission to access the list

    - [PUT] /lists/:listUUID -> Update a list by UUID
    - [DELETE] /lists/:listUUID -> Delete a list by UUID

- **Movie**
    - [GET] /movies -> Get all movies from the database
    - [POST] /movies -> Create a new movie in the database
    - [GET] /movies/search -> Search for a movie using the API
    - [GET] /movies/details/:cuevanaUUID -> Get the details of a movie using the API
    - [GET] /movies/movie/:movieUUID -> Get a movie by UUID
    - [PUT] /movies/movie/:movieUUID -> Update a movie by UUID
    - [DELETE] /movies/movie/:movieUUID -> Delete a movie by UUID

- **Subscription**
    - [GET] /subscription/:subscriptionUUID -> Get a subscription by UUID
    - [DELETE] /subscription/:subscriptionUUID -> Delete a subscription by UUID
    - [PUT] /subscription/:subscriptionUUID -> Update a subscription by UUID
    - [POST] /subscription/:userUUID -> Create a new subscription for a user by UUID

- **Comment**
    - [GET] /comments/:movieUUID -> Get all comments of a movie by UUID
    - [POST] /comments/:movieUUID -> Create a new comment for a movie by UUID

    - [PUT] /comments/:commentUUID/:userUUID -> Update a comment by UUID and user UUID to check if the user has permission to access the comment
    - [DELETE] /comments/:commentUUID/:userUUID -> Delete a comment by UUID and user UUID to check if the user has permission to access the comment

- **Tags**
    - [GET] /tags -> Get all tags from the database
    - [POST] /tags -> Create a new tag in the database

    - [GET] /tags/:tagUUID -> Get a tag by UUID
    - [PUT] /tags/:tagUUID -> Update a tag by UUID
    - [DELETE] /tags/:tagUUID -> Delete a tag by UUID