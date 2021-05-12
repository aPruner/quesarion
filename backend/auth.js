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
      { passReqToCallback: true },
      (req, email, password, done) => {
        const loginAttempt = async () => {
          try {
            await beginTransaction(dbClient);
            const accountDataQueryRes = await dbClient.raw(
              'SELECT id, "firstName", "email", "password" FROM "users" WHERE "email"=$1',
              [email]
            );
            if (
              accountDataQueryRes.rows.length === 0 ||
              !accountDataQueryRes.rows[0]
            ) {
              console.log('EMAIL DOESNT EXIST');
              return done(null, false, {
                message: 'Incorrect email or password'
              });
            } else {
              const hashedPasswordFromDb = accountDataQueryRes.rows[0].password;
              if (await comparePassword(password, hashedPasswordFromDb)) {
                return done(null, [
                  {
                    email: accountDataQueryRes.rows[0].email,
                    username: accountDataQueryRes.rows[0].username
                  }
                ]);
              } else {
                console.log('PASSWORD DOESNT EXIST');
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
};

module.exports = {
  hashPassword,
  usePassportLocalStrategy
};
