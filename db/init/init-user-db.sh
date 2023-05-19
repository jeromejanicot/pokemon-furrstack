#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE TABLE "pokemons"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "types" VARCHAR,
    "weight" INTEGER
  );
EOSQL
