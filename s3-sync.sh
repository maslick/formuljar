#!/bin/bash

: "${API_URL:="https://formuljar-api.maslick.ru"}"
: "${CAPTCHA_PUBLIC:="6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo"}"
: "${CLOUFRONT_ID:="E2AODUM7T4OB8O"}"
: "${S3_BUCKET:="formuljar-dev"}"

mkdir -p dist
cp ./templates/index.html dist
rm -f dist/index.html

template=$(<templates/index.html)
result="${template//%API_URL%/$API_URL}"
result="${result//%PUBLIC_KEY%/$CAPTCHA_PUBLIC}"
cat <<< "$result" > dist/index.html

aws s3 sync ./dist s3://$S3_BUCKET
aws cloudfront create-invalidation --distribution-id $CLOUFRONT_ID --paths "/index.html"