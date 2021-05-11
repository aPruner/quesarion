exports.up = function (knex) {
  return knex.raw(`CREATE TABLE public.users (
    id UUID NOT NULL,
    username CHAR(128),
    email CHAR(128),
    password CHAR(68),
    CONSTRAINT users_pkey PRIMARY KEY(id)
   ) 
   WITH (oids = false);`);
};

exports.down = function (knex) {
  return knex.raw(`DROP TABLE public.users;`);
};
