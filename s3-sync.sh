#!/bin/bash

aws s3 sync ./dist s3://formuljar-dev
aws cloudfront create-invalidation --distribution-id E2AODUM7T4OB8O --paths "/index.html"