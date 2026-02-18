# LabelGen

Generate simple multiline labels to be taped over effortlessly.


## Getting Started
LabelGen can be run in multiple ways

- [Docker-dockerhub](#dockerhub)
- [Docker-selfbuilt](#dockerbuild)
- [webserver](#nginx)
- [npm](#devserver)
- [vercel](#vercel)


## Docker-dockerhub <a name="dockerhub"></a>
labelgen is available as a DockerHub image; you can use it inside your compose file:
```
services:
  labelgen:
    image: rjai45/labelgen:latest
    ports:
      - "<wanted port>:80"
```
alternatively as docker run
```
docker run --name labelgen -p "<wanted port>:80" --rm rjai45/labelgen:latest
```
## Docker-selfbuild <a name="dockerbuild"></a>
you can also build the image yourself!\
Clone this repo, run cd into it, and run to build it:
```
docker build -t labelgen .
```
which can be run with:
```
docker run --name labelgen -p "<wanted port>:80" --rm labelgen
```
or using compose:
```
services:
  labelgen:
    image: labelgen
    ports:
      - "<wanted port>:80"
```
[Help, my build failed](#builderrors)

## webserver <a name="nginx"></a>
to host LabelGen on a websever (like nginx)\
Clone the repo, cd into it, and run
```
npm install && npm run build
```
You will get a dist directory, put it into your web server's shared directory.

## npm <a name="devserver"></a>
Like any JS framework, LabelGen can be run using a dev server.
Clone the repo, cd into it, and run:
```
npm install && npm run dev
```
*Of course you can replace npm with a JS package manager of your choice.*

## vercel <a name="vercel"></a>
lastly this project is hosted on Vercel, check it out at https://label-gen-one.vercel.app

#### help, my build failed <a name="builderrors"></a>
make sure the directory contains the following structure

```
📂 LabelGen
├── 📂 src
│   ├── 📄 App.css
│   ├── 📄 App.jsx
│   ├── 📄 Context.jsx
│   ├── 📄 Controlls.css
│   ├── 📄 Controlls.jsx
│   ├── 📄 Index.css
│   ├── 📄 Input.css
│   ├── 📄 List.css
│   ├── 📄 Main.jsx
│   └── 📄 Print.jsx
├── 📄 Dockerfile
├── 📄 index.html
├── 📄 package.json
├── 📄 README.md
└── 📄 vite.config.js
```


