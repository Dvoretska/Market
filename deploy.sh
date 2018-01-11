npm run build
cp -r ./dist ./heroku
git add --all
git commit -m'Heroku deployment...'
git push heroku master -f
git reset HEAD~1
rm -r ./heroku
