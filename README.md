# Node Glacier Delete

[![N|Solid](http://static1.squarespace.com/static/542eabb7e4b09a6d22983ddf/t/542ead21e4b018017d102f44/1533214328199/?format=1500w)][s2]

Node Glacier Delete (NDG) is a NodeJS console application to delete old Glazier backups.

  - Removes archived backups, older than 91 days, to avoid Glazier early-delete penalty fees
  - Lightweight and modifiable
  - Used as a scheduled task script

# Collaborators

  - [Blake][blake]
  - [Sacha][sacha]
  - [Melissa][melissa]


Node Glacier Delete is meant to help others keep their AWS Glacier costs low, with minimal SysAdmin.  As [Melissa][melissa] of Sightsource explains:

> The goal of Node Glacier Delete
> is to create a quick and easy tool
> to clean up database backups while
> retaining log file data. Run as a
> simple NodeJS application for scheduled
> tasks, database maintenance has never 
> been so easy.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [node.js] - evented I/O for the backend

And of course NGD itself is open source with a [public repository][git-repo-url] on GitHub.

### Execution

NDG requires [Node.js] v8+ to run.

Install the dependencies.

```sh
$ cd YOURPROJECTFOLDERNAMEHERE
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```

### Dependencies

NGD was written using the following Node packages:

| Package | Version |
| ------ | ------ |
| [jsonfile][jsonfile] | ^4.0.0 |
| [MomentJS][moment] | ^2.22.2 |
| [parse-filepath][pfp] | ^1.0.2 |


### Known use concerns

If you have a large volume of backlog files to delete, please use with caution as this might 

The first time we used this script, we used a much larger date age to determine which files we would delete first and then incremented it down to 91 in small batches. For instance:

```sh
var ageLimit = 91
......we set ageLimit to 1000, then 950, then 900, etc., until our ideal 91 limit.
if(duration >= ageLimit)
```

By doing this, we are aiming to keep from overloading the AWS server. The more often that you schedule to run this script, the less of a risk this will be for you.


### Todos

 - Catch 0 MB files
 - Success/Error messaging

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [s2]: <http://www.sightsource.net/>
   [blake]: <https://github.com/BlakeS2>
   [sacha]: <https://github.com/SachaGordon>
   [melissa]: <https://github.com/melissight>
   [moment]: <http://momentjs.com/>
   [jsonfile]: <https://www.npmjs.com/package/jsonfile>
   [pfp]: <https://www.npmjs.com/package/parse-filepath>
   [git-repo-url]: <https://github.com/BlakeS2/node-glacier-delete>
   [node.js]: <http://nodejs.org>

