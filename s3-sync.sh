#!/bin/bash

: "${API_URL:="https://formuljar-api.maslick.ru"}"
: "${CAPTCHA_PUBLIC:="6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo"}"
: "${CLOUDFRONT_ID:="E2AODUM7T4OB8O"}"
: "${S3_BUCKET:="formuljar-dev"}"

template=$(<static/index.html)
result="${template//%API_URL%/$API_URL}"
result="${result//%PUBLIC_KEY%/$CAPTCHA_PUBLIC}"
cat <<< "$result" > static/index.html

aws s3 sync ./static s3://$S3_BUCKET
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"