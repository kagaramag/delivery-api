# SENDIT

Welcome to SendIT Delivery Order App API

[![Build Status](https://travis-ci.org/djallas/delivery-api.svg?branch=api)](https://travis-ci.org/djallas/delivery-api)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/djallas/parcels-api)
[![Coverage Status](https://coveralls.io/repos/github/djallas/delivery-api/badge.svg?branch=api)](https://coveralls.io/github/djallas/delivery-api?branch=api)


# Parcel Delivery App

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

# Author: 

### Gilles Kagarama

[Twitter: @kagaramag](https://www.twitter/kagaramag)
[Scotch.io: @kagarama](https://scotch.io/@gilles)



