# featureflagservice
# init script
git clone https://github.com/vromanenko2/featureflagservice.git 
cd featureflagservice/backend 
npm install 
# generate database client
npx prisma generate --schema ./data/prisma/schema.prisma
# create database
npx prisma db push --preview-feature --schema ./data/prisma/schema.prisma
