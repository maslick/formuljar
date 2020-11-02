#!/bin/bash

: "${API_URL:="https://formuljar-api.maslick.ru"}"
: "${PUBLIC_KEY:="6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo"}"

mkdir -p dist
cp ./templates/index.html dist
rm -f dist/index.html

template=$(<templates/index.html)
result="${template//%API_URL%/$API_URL}"
result="${result//%PUBLIC_KEY%/$PUBLIC_KEY}"
cat <<< "$result" > dist/index.html

aws s3 sync ./dist s3://formuljar-dev
aws cloudfront create-invalidation --distribution-id E2AODUM7T4OB8O --paths "/index.html"