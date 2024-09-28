# @hardillb/node-red-node-geolib

A group of Node-RED nodes exposing the geolib functions

All nodes read the input location from the `msg` object in this order

 - `msg.location.lat` & `msg.location.lon`
 - `msg.lat` & `msg.lon`
 - `msg.payload.lat` & `msg.payload.lon`

 Starting point can be set in the config node or using the TypedInput to select 

  - Environment Variables
  - flow context
  - global context
  - msg properties

Currently exposing 2 functions

## Distance

This uses `geolib.getDistance()`

## Bearing

This uses `geolib.getRhumbLineBearing()`