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
