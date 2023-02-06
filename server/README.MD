<h1 style="text-align: center;">Express server template for a quick start of development</h1>

<p style="text-align: center;">
  <img src="express.webp"  alt="Express">
</p>

<p style="text-align: center;">
   <img src="https://img.shields.io/badge/Express-4-green" alt="Express Version">
   <img src="https://img.shields.io/badge/MongoDB-green" alt="MongoDB">
   <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

***
<details>
  <summary>Spoiler warning</summary>

Spoiler text. Note that it's important to have a space after the summary tag. You should be able to write any markdown you want inside the `<details>` tag... just make sure you close `<details>` afterward.

  ```javascript
  console.log("I'm a code block!");
  ```
</details>

## About

About Text Here

***
## Features
<ul>
<li>Login, register, email verification and password reset</li>
<li>Authentication with JWT</li>
</ul>

***
## Installation
```
composer create-project --prefer-dist cretueusebiu/laravel-vue-spa
```
<ul>
<li><code>composer create-project --prefer-dist cretueusebiu/laravel-vue-spa</code></li>
<li>Edit <code>.env</code> and set your database connection details</li>
<li>(When installed via git clone or download, run <code>php artisan key:generate</code> and <code>php artisan jwt:secret</code>)</li>
<li><code>php artisan migrate</code></li>
<li><code>npm install</code></li>
</ul>

***
## Usage:
<details>
  <summary>Testing</summary>

<code>npm run test</code>
</details>

<details>
  <summary>Development</summary>

<code>npm run dev</code>
</details>

<details>
  <summary>Production</summary>

<code>npm run build</code>
</details>

***
## Dependencies:
<details>
  <summary>Build</summary>

- [Express](https://expressjs.com/) ^4.18.2
- [Cors (npm)](https://www.npmjs.com/package/cors) ^2.8.5
- [Cookie-parser (npm)](https://www.npmjs.com/package/cookie-parser) ^1.4.6
- [Dotenv (npm)](https://www.npmjs.com/package/dotenv) ^16.0.3
- [MongoDB (npm)](https://www.npmjs.com/package/mongodb) ^4.13.0
- [Mongoose (npm)](https://www.npmjs.com/package/mongoose) ^6.9.0
</details>

<details>
  <summary>Dev</summary>

- [Nodemon](https://www.npmjs.com/package/nodemon) ^2.0.20
</details>

***
## Developer
[Yarkov Vyacheslav](https://github.com/Hashmann)

***
## License
[MIT license](https://opensource.org/licenses/MIT)

***
<p style="text-align: center;">2023</p>