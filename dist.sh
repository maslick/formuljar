#!/bin/bash

: "${API_URL:="https://formuljar-api.maslick.ru"}"
: "${CAPTCHA_PUBLIC:="6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo"}"

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
