## Crisinus Client (Frontend) Web app

Crisinus is e-commerce type single page reactive application built with React.js. It is built in two segments. One is public, for browsing, while second is private for admin, database changes and image uploads.

## Public

Public consists of homepage, separate pages for products, and product related information, company related info and contact. 

Segment is wrapped in few layers of React Context, to keep separated cart information, from languages, rendered items, currency and more with the goal of cleaner code. Each context consists of 3 files (context, reducer and action). Separation of elements as in files, and groups is made with a goal of cleaner code. While context files contain initial state and functions with API calls, and local information provision, reducers contain all state changes, with actions containing dispatch action types as constants to avoid typos.
All of API calls point toward Crisinus-Server, and are provided with unique client token recieved from Server, to minimize third party access without Client. 

All basic data is loaded on initial start of the application. Which brought some headaches because of collisions with Server before saving the mentioned token. Issue was fixed with setting a condition based on token state on API calls.

## Private

Private segment (admin) consists of few pages grouped by type of their items. Mostly structure is list of items, add and edit each item, with some added modification due to client's request on books and giftshop. Admin can also change content on pages like "disclaimer" or "about us", to keep user as free as possible from requiring developer for those changes.

Each set of pages is wrapped in their own context, in order to minimize code cluttering in components, while components still contain some of functionality. (Goal is to clean them from all code except UI) All API calls for administrative puropses are signed with logged in admin's credentials.
Books and giftshop have additionally added dimnesions and properties (books only).

## Some details

Application contains some custom hooks, of which some were inspired by other existing hooks, and modified to own need, or translated from Vanilla JS to React, with shortened code, or different element selection from document.querySelector. Hooks are contained in own group.
Besides hook, some utils are used, and separated from code (more are to be separated). Which were not an actual part for any context, or were used within more contexts, to avoid context calls within themselves. 

The most clutered and in need of rearangement group is Components, where they are mainly separated into admin and public (without separate public group), and roughly grouped by their purposes or appearance. Most of them still need separation of styling created with styled-components node package, into separate files for better reusage.

Some of the issues are being set aside, or slowly fixed (I know there are many, as it is my actual first live application) as my main interest is pointed towards iOS development in Swift.
