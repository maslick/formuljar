#!/bin/bash

: "${API_URL:="https://formuljar-api.maslick.ru"}"
: "${CAPTCHA_PUBLIC:="6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo"}"
: "${CLOUDFRONT_ID:="E2AODUM7T4OB8O"}"
: "${S3_BUCKET:="formuljar-dev"}"

function substitute() {
    input_file=$1
    template=$(<"$input_file")
    result="${template//%API_URL%/$API_URL}"
    result="${result//%PUBLIC_KEY%/$CAPTCHA_PUBLIC}"
    cat <<< "$result" > $input_file
}

substitute "static/index.html"
substitute "static/app.js"

aws s3 sync ./static s3://$S3_BUCKET
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"