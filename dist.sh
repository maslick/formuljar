#!/bin/bash

: "${API_URL:="https://7qz8gruyy5.execute-api.eu-central-1.amazonaws.com"}"
: "${CAPTCHA_PUBLIC:="6LfajOQZAAAAAPMckEiVO9u57fOEbc76r51UNWlX"}"

function substitute() {
    input_file=$1
    template=$(<"$input_file")
    result="${template//%API_URL%/$API_URL}"
    result="${result//%PUBLIC_KEY%/$CAPTCHA_PUBLIC}"
    cat <<< "$result" > $input_file
}

cp -a static/. dist
substitute "dist/index.html"
substitute "dist/app.js"
