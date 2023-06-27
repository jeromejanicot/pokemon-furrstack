#!/bin/sh
set -e

echo "connecting to mongo with root cred"
echo "${MONGO_INITDB_ROOT_USERNAME}"
echo "${MONGO_INITDB_ROOT_PASSWORD}"
echo "${MONGO_INITDB_DATABASE}"
echo "${MONGO_USERNAME}"
echo "${MONGO_PASSWORD}"
echo (command -v mongosh)
mongosh "mongodb://${MONGO_INITDB_ROOT_PASSWORD}:${MONGO_INITDB_ROOT_PASSWORD}@mongo/${MONGO_INITDB_DATABASE}?sourceAuth=admin" <<EOF
    use "${MONGO_INITDB_DATABASE}";
    db.createUser({
        user: "${MONGO_USER}",
        pwd: "${MONGO_PASSWORD}",
        roles: ["readWrite", "${MONGO_INITDB_DATABASE}"],
    });
    db.createCollection('pokemon_list', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          name: "Pokemon Object Validation",
          required: ["name"],
          properties: {
            name: {
              bsonType: "string",
            },
          },
        },
      },
    })"
EOF
