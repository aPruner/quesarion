# Quesarion

## Run the app in a dev environment:

### Backend

1. From the root directory, run `npm install`. This will install all the required dependencies!
2. Ensure you have a local postgres database set up. Create a `.env` file from the `template.env` template, and add your `DATABASE_URL` to it.
3. From the root directory, run `npm run migrate-up`. This will run the knex/postgres migrations assuming you have set up the database correctly!
4. Run `node app.js` and voila! Your app should be running at `localhost:3001` unless you set the port value in your `.env` file!
