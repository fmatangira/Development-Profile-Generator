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
        const githubUrl = `https://www.github.com/${username}`

        axios.get(queryUrl).then(function (data) {

            var profile = data.data
            var githubDetails = [profile.avatar_url,profile.name,profile.company,profile.location,githubUrl,profile.blog,profile.bio,profile.public_repos,profile.followers,profile.public_gists,profile.following];
            var [profilePic,userName,company,userLocal,githubProfile,userBlog,userBio,publicRepos,followers,userStars,following] = githubDetails;
            console.log(profilePic,userName,company,userLocal,githubProfile,userBlog,userBio,publicRepos,followers,userStars,following);
            console.log(profile);

        });

    })

    // console.log(username);

}