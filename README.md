# featureflagservice
# generate database client
npx prisma generate --schema ./data/prisma/schema.prisma
# create database
npx prisma db push --preview-feature --schema ./data/prisma/schema.prisma
