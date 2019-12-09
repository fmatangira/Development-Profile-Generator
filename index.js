const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');

// axios
//     .get('https://api.github.com/users/fmatangira');

// console.log(data);

getProfile();

async function getProfile() {


    await inquirer.prompt({
        type: 'input',
        name: 'username',
        message: 'What is your Github username?'
    }).then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function (data) {

            console.log(data.data);

        });

    })

    // console.log(username);

}