[![Build Status](https://travis-ci.org/djallas/parcels-api.svg?branch=master)](https://travis-ci.org/djallas/parcels-api)
[![Coverage Status](https://coveralls.io/repos/github/djallas/parcels-api/badge.svg?branch=master)](https://coveralls.io/github/djallas/parcels-api?branch=master)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/djallas/parcels-api)

# Parcel Delivery API

# Guidelines

This document provides guidelines and examples for Parcel Delivery APIs, encouraging consistency, maintainability, and best practices across applications. Parcel Delivery APIs aim to balance a truly RESTful API interface with a positive developer experience.

# HTTP Verbs

Type of methods

GET | POST | PUT

# Endpoints

### Fetch all parcel delivery orders
GET /api/v1/parcles/

### Fetch a specific parcel delivery order
GET /api/v1/parcles/:id

### Fetch all parcel delivery orders by  a specific user
GET /api/v1/users/:id/parcels

### Cancel the specific delivery order
PUT /api/v1/parcels/:id/cancel

### Create a parcel delivery order
POST /api/v1/parcels/


