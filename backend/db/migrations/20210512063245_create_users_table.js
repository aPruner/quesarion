exports.up = function (knex) {
  return knex.raw(`CREATE TABLE public.users (
    id UUID NOT NULL,
    username VARCHAR(128),
    email VARCHAR(128),
    password VARCHAR(128),
    CONSTRAINT users_pkey PRIMARY KEY(id)
   ) 
   WITH (oids = false);`);
};

exports.down = function (knex) {
  return knex.raw(`DROP TABLE public.users;`);
};
