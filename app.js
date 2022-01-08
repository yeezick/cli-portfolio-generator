const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "what is your name?",
    },
  ])
  .then((answers) => console.log(answers));
// const fs = require("fs");

// const generatePage = require("./src/page-template.js");

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// fs.writeFile("index.html", generatePage(name, github), (err) => {
//   if (err) throw err;
//   console.log("Potfolio complete! Check out index.html to see the output");
// });
