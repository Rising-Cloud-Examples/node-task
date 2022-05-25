# node-task
A Node app that multiplies a number by 10.This guide will walk you through the simple steps needed to build and run a Node app on Rising Cloud.

# 1. Install the Rising Cloud Command Line Interface (CLI)
In order to run the Rising Cloud commands in this guide, you will need to [install](https://risingcloud.com/docs/install) the Rising Cloud Command Line Interface. This program provides you with the utilities to setup your Rising Cloud Task or Web Service, upload your application to Rising Cloud, setup authentication, and more.

# 2. Login to Rising Cloud Using the CLI
Using a command line console (called terminal on Mac OS X and command prompt on Windows) run the Rising Cloud login command. The interface will request your Rising Cloud email address and password.

```risingcloud login```

# 3. Initialize Your Rising Cloud Task
Create a new directory to place your project files in, then open this directory with your command line.

Using the command line in your project directory, run the following command replacing $TASK with your unique task name.

Your unique task name must be at least 12 characters long and consist of only alphanumeric characters and hyphens (-). This task name is unique to all tasks on Rising Cloud. A unique URL will be provided to you for sending jobs to your task.

If a task name is not available, the CLI will return with an error so you can try again.

```risingcloud init -s $TASK```

This creates a risingcloud.yaml file in your project directory. This file can be used to configure the build script.

# 4. Create Your Node App

Create your echo script

In your project directory, create a app.js with the following code:

```
const fs = require('fs');

let rawdata = fs.readFileSync('./request.json');
let input = JSON.parse(rawdata);
input.number = input.number * 10;

console.log(input);

let data = JSON.stringify(input);
fs.writeFileSync('./response.json', data);
```

This app opens the request.json file which is the input of a Rising Cloud Job, creates a response.json and writes it under the “echo” field in a new JSON object in the response.json, which is the output of a Rising Cloud job.

**Configure your risingcloud.yaml**

When you ran Rising Cloud init, a risingcloud.yaml should have generated in your project directory.  In the deps stage, we need to install node. Change the deps step to:

```
deps: 
- apt-get update
- apt-get -y upgrade
- apt-get install -y nodejs
```
Now, change the run step to

```run: node app.js```

# 5. Build and Deploy Your Rising Cloud Task

Use the push command to push your updated risingcloud.yaml to your Task on Rising Cloud.

```risingcloud push```

Use the build command to zip, upload, and build your app on Rising Cloud.

```risingcloud build```

Use the deploy command to deploy your app as soon as the build is complete.  Change $TASK to your unique task name.

```risingcloud deploy $TASK```

Alternatively, you could also use a combination to push, build and deploy all at once.

```risingcloud build -r -d```

Rising Cloud will now build out the infrastructure necessary to run and scale your application including networking, load balancing and DNS.  Allow DNS a few minutes to propogate and then your app will be ready and available to use!

# 6. Queue Jobs for your Rising Cloud Task

**Send jobs to your new app in the Portal**

- Log into your Rising Cloud Team: <u>[https://my.risingcloud.com/](https://my.risingcloud.com/)</u>
- Select your task from the Dashboard.
- Click on Jobs in the left menu.
- Click New Job Request.  
- Send the following request to your task, leave the curly brackets.

```{ "number": 10 }```

Rising Cloud may will take a few moments to spin-up your and proces your request.  In the future it will learn from the apps usage patterns to anticipate usage, making instances available in advance of need, while also spinning down instances when not needed.  

Click the twisty to open up your Job, and then click Argument to see both your input 10 and the output 100!

Congratulations! You’ve successfully created and used Node on Rising Cloud!
