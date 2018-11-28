

# Parcel Delivery App 
[![Build Status](https://travis-ci.org/djallas/delivery-api.svg?branch=develop)](https://travis-ci.org/djallas/delivery-api)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/djallas/parcels-api)
[![Coverage Status](https://coveralls.io/repos/github/djallas/delivery-api/badge.svg?branch=develop)](https://coveralls.io/github/djallas/delivery-api?branch=develop)

# Information

This document provides guidelines and examples for Parcel Delivery APIs, encouraging consistency, maintainability, and best practices across applications. Parcel Delivery APIs aim to balance a truly RESTful API interface with a positive developer experience.

# Tools

1. Frontend: Html, CSS, Javascript
2. Backend: NodeJS & ExpressJS
3. Database: PostgreSQL

# How to Install

### Initiate node

```
npm init
```

### Installing dependencies

```
npm install
```
### Run the tests

```
npm run test
```

### Update modules

```
npm update
```

## How to Run App

```
npm start
```

# Table of API Endpoints

## HTTP Verbs

| Methods | Endpoints | Actions |
--- | --- | ---
| GET | api/v1/parcels | Fetch all parcels orders |
| GET | /api/v1/parcles/:parcelId | Fetch a specific parcel delivery order |
| GET | /api/v1/users/:userId/parcels | Fetch all parcel delivery orders by a specific user |
| PUT | /api/v1/parcels/:parcelId/cancel | Cancel the specific delivery order |
| POST | /api/v1/parcels | Create a parcel delivery order |
| PUT | /api/v1/parcels/:parcelId/status | Change the status of specific delivery order |
| PUT | /api/v1/parcels/:parcelId/presentLocation | Change the present location of a specific parcel delivery order |
| POST | /api/v1/auth/signup | Register a user |
| POST | /api/v1/auth/login | Login a user |
| PUT | /api/v1/parcels/:parcelId/destination | Change the location of a specific parcle delivery order |

# UI Screenshots

## Homepage
![Homepage of SendIt](https://github.com/djallas/delivery-api/blob/master/images/home.png "Homepage")

## Login
![Login Page](https://github.com/djallas/delivery-api/blob/master/images/login.png "Login")



## How to use UI Framework?
To get started, you must call your css file in your html page

<link rel="stylesheet" href="css/style.0.1.css">

### Font family used: 

Paragraphs: exo
Heading: Krub

## 1. helpers

Wrap element with max width of 1280px
`.container`

Hide element
`.hide`

Hide element on large screen
`.hide-on-large`

Hide element on medium screen
`.hide-on-medium`

Hide element on small screen
`.hide-on-small`

### Border

Initiate border
`.border`

### Border color
White
`.b-lite`

Grey
`.b-grey`

Red
`.b-red`

Black
`.b-red`

Indigo
`.b-indigo`


### Clearfix
`.clear`

#### Aligment

Center
`.center-align`

Left
`.left-align`

Right
`.right-align`


## 2. Playing with Padding

**-h-** indicate that the property is applied horizontally on a given selector
**-v-** indicate that the property is applied veritically on a given selector

Small padding

`.s-padding`
`.s-h-padding`
`.s-v-padding`

Medium padding

`.m-padding`
`.m-h-padding`
`.m-v-padding`

Large padding

`.l-padding`
`.l-h-padding`
`.l-v-padding`

Extra large padding

`.xl-padding`
`.xl-h-padding`
`.xl-v-padding`

Extra large padding

`.xxl-padding`
`.xxl-h-padding`
`.xxl-v-padding`

## 3. Playing with Margin

**-h-** indicate that the property is applied horizontally on a given selector
**-v-** indicate that the property is applied veritically on a given selector

Small margin

`.s-margin`
`.s-h-margin`
`.s-v-margin`

Medium margin
`.m-margin`
`.m-h-margin`
`.m-v-margin`

Large padding
`.l-margin`
`.l-h-margin`
`.l-v-margin`

Extra large padding
`.xl-margin`
`.xl-h-margin`
`.xl-v-margin`

Extra large padding
`.xxl-margin`
`.xxl-h-margin`
`.xxl-v-margin`

## 4. Typography

Small text
`.s-text`

Medium text
`.m-text`

Large text
`.l-text`

Extra large text
`.xl-text`

Extra-extra large text
`.xxl-text`


## 5. grid

Grid must be wrap in row
`.row`

|  | Small  |  Medium | Large |
| ------- | --- | --- | --- |
| Prefix | `.s` | `.m` | `.l` |

## 6. Color palette

White
`.white`

Black
`.black`

Grey
`.grey`

Indigo
`.indigo`

- Add `text- ` prefix before the defined color class to apply it on text 

- `darken-1` , `darken-2` and `darken-3` gives option to play with strongness of the color 

## 7. form

Input, textarea, radio, checkbox and button must be in `.input-field` `div` or `p`

#### example
```
    <div class="input-field">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="your email">
    </div>
```

## 8. Button

Initiate button
`.btn`


## 9. Managing Image

If your wrap to wrap image to fix the width of a container, you must add `.image` in the parent container of a image


# Author: 

### Gilles Kagarama

[Twitter: @kagaramag](https://www.twitter/kagaramag)
[Scotch.io: @kagarama](https://scotch.io/@gilles)
