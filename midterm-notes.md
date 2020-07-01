# MID TERM APP

#### Samantha Gadet, Jessica Seo, Kevin Kim

## OPTION 8 : BUY / SELL

### FURNITURE : Multi-Page App

# Pages

## Home page

- featured items
- menu bar (top of page)
- will change menu items on login/logout
- search button
- login button

## Search page

- type
- price range

## User's page

- for all users
- shows their favorites
- show their items for sale
- post new items button
- inactive items
- inbox button

## Messages

- chat

## Post Items Page

- title
- type
- price
- description

## Item Page

- hero image
- title, type, price
- description

# USER STORIES

## BUYER

- As a buyer I want to be able to view a feed of FEATURED ITEMS, because they are most popular items
- As a buyer I want to be able to filter items by price, so i can stay within my budget
- As a buyer I want to be able to favorite items to check up on it later
- As a buyer I would like to be able to message the seller to get more details about the item

## SELLER

- As a seller I want to be able to post items for sale
- As a seller I want to be able to remove items from my list
- As a seller I want to be able to mark items as SOLD
- As a seller I would like to be able to send and receive messages to potential buyers because we can negotiate

# FEATURES

## BUYERS

- users can see featured items on a main feed
- users can filter items by price,
- users can favourite items to check up on them later
- users can send messages to the user that is listing the item

## SELLERS

- post items, which can be seen by others
- remove items from the site
- mark items as SOLD!
- send a message via app, email, or text back on negotiations in buying the said item

# DATA

## ERD

!["comment"](https://)

### users

id
username

### items

id
seller_id
title
price
photo
description
type
is_active
is_sold

### favourites

id
user_id
item_id

### messages

id
sender_id
receiver_id
message
timestamp

# STACK CHOICES

## Multi Page App

### FRONT END

- HTML
- CSS, SASS
- Bootstrap
- JS/EJS

### BACK END

- NODE JS
- Express
- PostgreSQL

# TASKS

- create routes
- test routes
- create front end pages
- connect databases to each route/CRUD
- front end styling

## nav bar (partial)

### logged in versions

- username, search, messages, post, logout - links

### logged out versions

- login, search (without search in search page)

# home page

- include navbar partial link

### header

- name, tagline

### main body

- featured items

# search page

- include navbar partial link

### form, includes:

- search bar
- type, drop-down menu
- price range, min and max price
- search button

# messages

- include navbar partial link

### form, at the bottom:

- send button
- messages

# post items page

- include navbar partial link

### form, includes:

- title input
- type drop-down menu
- price input
- pic url
- description textarea
- featured checkbox
- post button

# user's page

- include navbar partial link
- items tables, includes:
- favourites and my items
- if NOT logged in: alert to login
- if BUYER: un/favourite button
- if SELLER: mark as sold/in-active/delete buttons

# item page

- include navbar partial link
- item title
- item pic
- description
- type
- price
- if NOT logged in: alert to login
- if BUYER: buy/un/favourite button, and Message Seller button

# REST ROUTES

## Home page (homepage.js)

- HTTP method: GET - URL pattern: / - USE: display the home page with a listing of the featured items;

## Search page (search.js)

- HTTP method: GET - URL pattern: /search - USE: display the search form and search bar;
- HTTP method: POST - URL pattern: /search - USE: query the database;
- HTTP method: GET - URL pattern: /search - USE: display filtered data;

## Messages(messages.js)

- HTTP method: GET - URL pattern: /messages - USE: display all the messages;
- HTTP method: POST - URL pattern: /messages - USE: adding the message to the database;

## Post new item(postItem.js)

- HTTP method: GET - URL pattern: /posts/new - USE: display the post form
- HTTP method: POST - URL pattern: /posts - USE: adding the item to the database and redirect to /item

## User's page(users.js)

- HTTP method: GET - URL pattern: /user - USE: display the favorited items and the items on sale for the user;
- HTTP method: POST - URL pattern: /user - USE: redirect to item page redirect to /items/:id;

- HTTP method: POST - URL pattern: /user/:id/delete - USE: delete the item from the database, redirect to /users/;
- HTTP method: POST - URL pattern: /user/:id/sold - USE: alter the item in database with item_id - change the attribute is_sold TRUE, redirect to /user/;
- HTTP method: POST - URL pattern: /user/:id/active - USE: alter the item in database with item_id - change the attribute is_active FALSE, redirect to /user/;
- HTTP method: POST - URL pattern: /user/:id/favourite - USE: alter the item in favourites database with item_id and user_id, redirect to /user/;

## Item page (item.js)

- HTTP method: GET - URL pattern: /items/:id - USE: display the details of the item;
- HTTP method: POST - URL pattern: /items/:id - USE: redirects to /messages;
- HTTP method: POST - URL pattern: /items/:id/favourite- USE: alter the item in favourites database with item_id and user_id, redirect to /items/:id;
