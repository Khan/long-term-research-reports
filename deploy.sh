#!/bin/bash

set -e
set -x

rimraf deploy
yarn run build
mkdir -p deploy/static/long-term-research-reports
cp -R dist/* deploy/static/long-term-research-reports
rimraf free-response-report/build
(cd free-response-report; yarn run build)
cp index.html deploy/
mkdir -p deploy/open-ended
cp -R free-response-report/build/* deploy/open-ended/
mkdir -p deploy/cantor
mkdir -p deploy/early-math
cp cantor-index.html deploy/cantor/index.html
sed -i '' 's/dev-bundle/cantor-bundle/g' deploy/cantor/index.html
cp early-math-index.html deploy/early-math/index.html
sed -i '' 's/dev-bundle/early-math-bundle/g' deploy/early-math/index.html
mkdir -p deploy/images/long-term-research/reports
cp -R images/* deploy/images/long-term-research/reports
mkdir -p deploy/sounds/long-term-research/reports
cp -R sounds/* deploy/sounds/long-term-research/reports
mkdir -p deploy/videos/long-term-research/reports
cp -R videos/* deploy/videos/long-term-research/reports
mkdir -p deploy/styles
cp -R styles/* deploy/styles


rm -rf /tmp/publish
git clone --branch gh-pages https://github.com/Khan/long-term-research-reports.git /tmp/publish
mkdir -p /tmp/publish
rsync -rv --exclude=.git ./build/ /tmp/publish/open-ended

cd /tmp/publish

git add -f .
git commit --allow-empty -m "Publish"
git push origin gh-pages
