# fluxible-isomorphic-app
Work in progress: this will be a a repo that will show how to build an isomorphic app with fluxible

## Table of Contents ###

1. Intro
2. Isomorphic, what does this mean?
3. Step-by-step tutorial
    - Initialize project
    - Gulp setup
    - Todo

### 1. Intro ###

Creating an isomorphic application can be tough. Especially when starting from scratch with no knowledge and no experience in working with so many different modules (welcome to Javascript! ;)). There are loads of tutorials and boilerplates available to help you in this process, but some of them are hard to wrap your head around. Also because of the amount of tools you need to make this work, it's easy to get lost in which tool does what.

This tutorial will try to explain in the most simplest way how to create an isomorphic app using fluxible. We'll be guiding you through the process and try to keep the code as easy as possible.

### 2. Isomorphic, what does this mean? ###

In web development isomorphic means that the codebase will run on both server and client. This has tremendous upsides for a variety of reasons:

* The first page request will be rendered on the server and return plain HTML. Loading times will be very fast.
* Old browsers can still browse the site, because the server will return HTML.
* Codebase is smaller, because server and client share code.

### 3. Step-by-step tutorial ###

In this chapter we'll explain how to build an isomorphic app step-by-step. Each subchapter has it's own working codebase inside the 'Step-By-Step-Tutorial' folder.

#### Prerequisites ####

Tools installed:

* Node.js
* NPM

#### Initialize project ####

- Run 'npm init' to initialize your project. Fill everything in (or let npm do it for you). You will end up with a package.json that will be used to save the modules we'll be using in this project.

#### Setting up the Express server ####

Express is a fairly minimalistic framework that will easily let you setup a server that runs with Node.js. In this tutorial it will be used to handle requests.

- Run 'npm install --save express' to install express and save express to your dependencies list (package.json)
- We can now start and build the server. So create a new file in the root of your project, call it 'server.js' and open it with your favorite editor. Here is the code we're going to paste in:

Import Express:

```
var express = require('express');
```

Create a new instance of express and assign to variable server:

```
var server = express(); // create new instance of express
```

Generate a response:

```
server.use(function(req, res) {
  res.send('hello world');
});
```

Declare port:

```
var port = 3000;
```

Make the server listen for requests
```
server.listen(port, function() {
  console.log('Listening at port ' + port);
});
```

Try running this script with node.js by typing `node server.js`. Check localhost:3000 in your favorite browser, it should show 'hello world'.
