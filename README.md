# NEST-JSON: Blogging for Humans

This repository holds a variant of [NEST](https://github.com/hamzeen/nest) (a blogging platform) which uses flat JSON files as its building blocks. 

NEST was built purely with simplicity in mind. Simplicity in its architecture, simplicity in every step of the way till you finally spin up your blog. Yet, it doesn't compromise on scalability as your content grows over time. The first proof of concept for NEST came to life in April 2018.

## Requirements

* [Node.js](http://nodejs.org/)

## Getting Started (Beginners on Windows)

**if you have run this once, ignore step 5**
1. Make sure you are on a desktop PC when you follow this, can not do follow it on a phone!
2. Click the 'Green Download' button above on the top-right corner & choose 'Download as Zip'
3. Once you download: extract the .zip file & delete nooraniya-master.zip
4. [Can be ignored but advisible] Rename the extracted folder to "noornaiya" instead of "nooraniya-master"
5. [Can be Ignored if you have Node.js] Make sure you have Node.js installed.
6. Go inside this folder from command promt(CMD)& type `npm install` & press enter
7. Once the above step is complete, type `npm run launch` & press enter
8. Open your browser & visit http://localhost:3000 to see the magic!

## Installation Steps (for admins)

1. Clone repo
2. Run `npm install`
3. Run `npm run start`
4. Visit http://localhost:3000


## Deploy to Heroku (for admins)

1. `git init`
2. `npm install`
3. `npm run build && npm start`
4. Ctl + C

5. `heroku login`
5. `heroku apps:create nest_json_hamzeen`
6. `git add . && git commit -m "commit message"`
8. `git push heroku master`
9. `heroku open && heroku logs —tail`

## Rename a Deployed App (for admins)
1. heroku apps:rename new --app old name


## License

The MIT License (MIT)

Copyright (c) 2018 Hamzeen. H.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
