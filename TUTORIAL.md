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

- Run `npm init` to initialize your project. Fill everything in (or let npm do it for you). You will end up with a package.json that will be used to save the modules we'll be using in this project.

#### 1. Setting up the Express server ####

Express is a fairly minimalistic framework that will easily let you setup a server that runs with Node.js. In this tutorial it will be used to handle requests.

- Run `npm install --save express` to install express and save express to your dependencies list (package.json)
- We can now start and build the server. So create a new file in the root of your project, call it `server.js` and open it with your favorite editor. Here is the code we're going to paste in:

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

#### 2. Setup Gulp tasks ####

Before we will start to write the React components of the app we need to setup tasks. They will help convert the JSX syntax used by React to plain Javascript and build a `bundle.js` that the client will use. Gulp is a good system to do this: it's designed to automate tasks, such as minifying, copying and bundling JavaScript files.

Let's start by adding Gulp to our project by typing `npm install --save gulp` in the command line. This will add Gulp to our dependencies list.

We can now start building a gulpfile.js that will contain a task that copies our source code into a `bundle.js`. So we create a new file named 'gulpfile.js and start working from there.

```
var gulp = require('gulp');
```

Let's create our first task and call it 'build':

```
gulp.task('build', function() {
  //task will be described here
});
```

There are a few things we need to do in order to make this work. First we need to use something that will help is include all the required node modules for our project, such as React and Fluxbile. Browserify is a handy tool to do this. It lets you require('modules') in the browser by bundling up all your dependencies.

Run `npm install --save browserify` to install it and add it to your gulpfile:

```
var browserify = require('browserify');
```

Next up is Reactify. A tool used to transform React's JSX syntax into plain old JavaScript.

Run `npm install --save reactify` to install and then add it to your gulpfile:

```
var reactify = require('reactify');
```

Last but not least we need Vinyl-Source-Stream. It's used to convert the bundle.js into the type of stream Gulp is expecting. Run `npm install --save vinyl-source-stream` and add:

```
var source = require('vinyl-source-stream');
```

Now define a config variable with some settings we'll use in the tasks. These folders and files are not there yet, but don't worry, we'll add them later!

```
var config = {
  entry_file: './source/client.js',
  destination_folder: './build/',
  destination_file: 'bundle.js'
}
```

We're ready to complete our task now. It will bundle all our dependencies, transform JSX into JS and bundle everything into a bundle.js inside our build folder.

```
gulp.task('build', function() {
  browserify(config.entry_file)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source(config.destination_file))
    .pipe(gulp.dest(config.destination_folder));
});
```

Before we can test, let's create a client.js that will import a simple React component(main.jsx), so we can check if this actually works.

Place inside app/main.jsx:

```
var React = require('react');

var Main = React.createClass({
render: function() {
  return (
    <html>
      <head>
      </head>
      <body>
        <div>
          <h1>This will be our React component</h1>
        </div>
      </body>
    </html>
  )
}

});

module.exports = Main;
```

Place inside client.js:

```
var app = require('./app/main.jsx');
```

So, let's try this task out. Type `gulp build` to run the task. It will create a build folder, with a 'bundle.js' inside. Near the top of the file we will find back the pieces of the React component we've build:

```
var Main = React.createClass({displayName: "Main",
render: function() {
  return (
    React.createElement("div", null,
      React.createElement("h1", null, "This will be our React component")
    )
  )
}

});

module.exports = Main;
```

As you can see the html markup from the component has been correctly transpiled to plain JavaScript, also our React module has been imported. Because we don't want to bother you with running this code now, just assume that it's working. We'll use this code later to actually build the page on the server, return the html to the client and then let the client take over the application.

#### 3. Building Server Rendered Content ####

So, let's try building a React component that is rendered on the server and will return plain HTML when someone does a request. In the previous chapter ****TODO**** ...., so we need to make sure our server knows how to handle the React JSX syntax.


This is fairly simple, because we just need to import our main.jsx into the server.js and make sure that any request will return the html markup that has been rendered by this component.

First import main.jsx:

```
var Main = React.createFactory(require('./app/main.jsx'));
```

Then import react-dom/server, which has all the methods needed to generate markup on the server:

```
var ReactDOMServer = require('react-dom/server');
```

ReactDOMServer has a special method that will generate html markup and render it to a string:

```
var html = ReactDOMServer.renderToString(Main({}));
```

Now instead of sending "hello world" to the client, we send the html markup to the client. Meaning we can actually see our first React component that's been rendered server side!

```
res.send('<!DOCTYPE html>\n' + html);
```

Try visiting `localhost:3000` in your browser, it should show your first React Component rendered server side.

#### 4. Letting Client Take Over ####

So we've got a completely static website now. On each request a html page is send to the client, resulting in a display of our text. Next up is making sure the client also instantiates it's own app, so we can make a really cool page with loads of interactions that behaves like a Single Page Application once the initial render has been done by the server.
