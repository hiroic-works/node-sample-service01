# node-sample-service01

full stack sample form CRUD project (MongoDB Express EJS Node.js)

## server/client

フォームを使ったシンプルなユーザー CRUD 機能

※認証機能などはなし、バリデーションやエラー処理なども最小限

### stack

- Express (Node.js framework)
- Mongoose (MongoDB ODM)
- ejs (template engine)
- multer (file upload)
- dotenv (use env)
- express-session (session)
- nodemon (Node.js live server)

### user model Schema

- name: String, required
- email: String, required
- phone: String, required
- image: String, required (filename を保持)
- createdAt: Date
- updatedAt: Date

### fetch all users

`GET`: `/`

### add user

`POST`: `/add`

### update user

`POST`: `/update/:id`

※update 時、サーバー側でファイル関連の更新比較をするため、クライアント側では form の hidden で「old_image」キーとして現在反映中のファイル名をセットしてサーバーにリクエストさせるようにする。

### delete user

`GET`: `/delete/:id`
