#!/bin/bash
mv ./src/api/index.js ./src/api/index-copy.js
ln -s ../property-rent-ssr-api/src/api/api.js ./src/api/index.js
