#!/bin/bash

npx tsc
npx pkg ./outputs/lib/carbon.js --out-dir outputs/dist
# if [ $1 = "-g" ]
# then 
#     chmod +x ./dist/carbon-linux && sudo cp dist/carbon-linux /usr/bin/carbon
# fi