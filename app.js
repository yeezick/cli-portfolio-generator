const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what is your name?",
    },
    {
      type: "input",
      name: "github",
      message: "what is your github?",
    },
    {
      type: "input",
      name: "about",
      message: "provide some information about yourself",
    },
  ]);
};

const promptProject = (portfolioData) => {
  // since this function would have to be called again to add another project, this if condition stops node from redefining the array at every call
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
  =====================
  Add to a new project!
  =====================`);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "what is the name of your project?",
      },
      {
        type: "input",
        name: "description",
        message: "provide a description of the project (required)",
      },
      {
        type: "checkbox",
        name: "languages",
        message: "what did you make this project with? (check all that apply)",
        choices: [
          "javascript",
          "html",
          "css",
          "es6",
          "jquery",
          "bootstrap",
          "node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "enter the github link for your project. (Required)",
      },
      {
        type: "confirm",
        name: "feature",
        message: "would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => console.log(portfolioData));

// const fs = require("fs");

// const generatePage = require("./src/page-template.js");

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// fs.writeFile("index.html", generatePage(name, github), (err) => {
//   if (err) throw err;
//   console.log("Potfolio complete! Check out index.html to see the output");
// });
