npx @nestjs/cli new dp_backend_v1 --directory ./sources --package-manager yarn --language TypeScript
rm -rfv ./sources/.git

cd sources
yarn add @nestjs/config
yarn add cross-env
yarn add @nestjs/swagger
yarn add swagger-ui-express
yarn add mysql2
yarn add @nestjs/typeorm
yarn add typeorm # ^0.13.14
yarn add class-validator
yarn add class-transformer
yarn add bcryptjs
yarn add -D @types/bcryptjs
yarn add @nestjs/jwt
yarn add @nestjs-modules/mailer
yarn add nodemailer
yarn add @nestjs/schedule
yarn add uuid
yarn add -D @types/ejs@^3.0.3
yarn add -D @types/pug@2.0.6
yarn add -D ejs@^3.1.2
yarn add -D handlebars@^4.7.6
yarn add -D pug@^3.0.1
yarn add -D express@4.0.0
yarn add -D webpack@^5.0.0
yarn add preview-email
yarn add exceljs
yarn add number-to-words-ru
yarn add crypto-js
yarn add -D @types/cryptojs
yarn add axios
yarn add js2xmlparser


yarn nest g res res/users
yarn dev-migr-gen src/migrations/DP_CTL_Users
yarn dev-migr-run
yarn dev-migr-gen src/migrations/DP_DOC_ActivationAccount
yarn dev-migr-run

yarn nest g res res/sessions
yarn dev-migr-gen src/migrations/DP_DOC_Sessions
yarn dev-migr-run
yarn dev-migr-gen src/migrations/DP_DOC_ChangeEmail
yarn dev-migr-run

yarn nest g res res/item-categories
yarn dev-migr-gen src/migrations/DP_CTL_ItemCategories

yarn nest g res res/item-characteristics
yarn dev-migr-gen src/migrations/DP_CTL_ItemCharacteristics

yarn nest g res res/items
yarn dev-migr-gen src/migrations/DP_CTL_Items

yarn nest g res res/articles
yarn dev-migr-gen src/migrations/DP_DOC_Articles

yarn nest g res res/comminucation-types
yarn dev-migr-gen src/migrations/DP_CTL_CommunicationTypes

yarn nest g res res/helpers
yarn dev-migr-gen src/migrations/DP_CTL_Helpers

yarn nest g res res/item-brands
yarn dev-migr-gen src/migrations/DP_CTL_ItemBrands

yarn nest g res res/roles
yarn dev-migr-gen src/migrations/DP_CTL_Roles

yarn nest g res res/orders
yarn dev-migr-gen src/migrations/DP_DOC_Orders

yarn nest g res res/apk-versions
yarn dev-migr-gen src/migrations/DP_DOC_ApkVersions

yarn nest g res res/manager

yarn nest g res res/order-statuses
yarn dev-migr-gen src/migrations/DP_DOC_OrderStatuses
yarn dev-migr-gen src/migrations/DP_DOC_Orders


yarn nest g res api/v2/languages --no-spec
yarn dev-migr-gen src/migrations/dp_ctl_languages
yarn dev-migr-run
