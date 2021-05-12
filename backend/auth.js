const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const { beginTransaction } = require('./db/queries');

const hashPassword = async (password, saltRounds) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const usePassportLocalStrategy = (passport, dbClient) => {
  passport.use(
    'local',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      (req, email, password, done) => {
        const loginAttempt = async () => {
          try {
            await beginTransaction(dbClient);
            const accountDataQueryRes = await dbClient.raw(
              'SELECT id, "username", "email", "password" FROM "users" WHERE "email"=?',
              [email]
            );
            if (
              accountDataQueryRes.rows.length === 0 ||
              !accountDataQueryRes.rows[0]
            ) {
              console.log('EMAIL IS INCORRECT');
              return done(null, false, {
                message: 'Incorrect email or password'
              });
            } else {
              const hashedPasswordFromDb = accountDataQueryRes.rows[0].password;
              console.log(
                'logging passwords: ',
                hashedPasswordFromDb,
                password
              );
              const passwordIsCorrect = await comparePassword(
                password,
                hashedPasswordFromDb
              );
              console.log('is password correct: ', passwordIsCorrect);
              if (passwordIsCorrect) {
                console.log('PASSWORDS MATCH');
                return done(null, [
                  {
                    email: accountDataQueryRes.rows[0].email,
                    username: accountDataQueryRes.rows[0].username
                  }
                ]);
              } else {
                console.log('PASSWORD IS INCORRECT');
                return done(null, false, {
                  message: 'Incorrect email or password'
                });
              }
            }
          } catch (e) {
            console.log(e);
            return done(e);
          }
        };
        loginAttempt();
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

module.exports = {
  hashPassword,
  usePassportLocalStrategy
};
