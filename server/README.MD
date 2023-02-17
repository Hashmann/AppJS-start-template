<h1 align="center">Express server template for a quick start of development</h1>

<p align="center">
  <img src="express.webp"  alt="Express">
</p>

<p align="center">
   <img src="https://img.shields.io/badge/Express-4-green" alt="Express Version">
   <img src="https://img.shields.io/badge/MongoDB-green" alt="MongoDB">
   <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

***

<div align="center"><h2>About</h2></div>
About Text Here.

API documentation is available at `http://localhost:5000/api/docs` after starting server in **dev mode**.
You can also read the documentation `/server/docs/api-documentation.pdf`

***
<div align="center"><h2>Features</h2></div>

<ul>
<li>Login, register, email verification and password reset</li>
<li>Authentication with JWT</li>
<li>Roles and permissions user</li>
<li>Swagger is used for API documentation</li>
<li>For unit testing, jest is used</li>
</ul>

***
<div align="center"><h2>Installation</h2></div>

```
composer create-project --prefer-dist laravel-vue-spa
```
<ul>
<li><code>composer create-project --prefer-dist laravel-vue-spa</code></li>
<li>Edit <code>.env.production</code> and <code>.env.development</code> and set your database connection details and other settings</li>
<li><code>npm install</code></li>
</ul>

***
<div align="center"><h2>Usage</h2></div>

<details>
  <summary>Testing</summary>

Edit <code>.env.test</code> and set your test database connection details and other settings.

<code>npm run test</code>
</details>

<details>
  <summary>Development</summary>

<code>npm run start:dev</code>
</details>

<details>
  <summary>Production</summary>

<code>npm run start</code>
</details>

***
<div align="center"><h2>Dependencies</h2></div>

<details>
  <summary>Production</summary>

- [Express](https://expressjs.com/) ^4.18.2
- [Cors (npm)](https://www.npmjs.com/package/cors) ^2.8.5
- [Cookie-parser (npm)](https://www.npmjs.com/package/cookie-parser) ^1.4.6
- [Dotenv (npm)](https://www.npmjs.com/package/dotenv) ^16.0.3
- [MongoDB (npm)](https://www.npmjs.com/package/mongodb) ^4.13.0
- [Mongoose (npm)](https://www.npmjs.com/package/mongoose) ^6.9.0
</details>

<details>
  <summary>Development</summary>

- [Nodemon](https://www.npmjs.com/package/nodemon) ^2.0.20
</details>

***
<div align="center"><h2>Developer</h2></div>

[Yarkov Vyacheslav](https://github.com/Hashmann)

***
<div align="center"><h2>License</h2></div>

[MIT license](https://opensource.org/licenses/MIT)

***
<p align="center">2023</p>