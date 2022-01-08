const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what is your name? (required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "what is your github username? (required)",
      validate: (githubUsername) => {
        if (githubUsername) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "provide some information about yourself",
      when: ({ confirmAbout }) => confirmAbout,
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
        message: "what is the name of your project? (required)",
        validate: (githubProjectName) => {
          if (githubProjectName) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "provide a description of the project (required)",
        validate: (githubProjectDesc) => {
          if (githubProjectDesc) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
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
        validate: (githubProjectLink) => {
          if (githubProjectLink) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
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
