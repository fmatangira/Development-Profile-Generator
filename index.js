const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
const pdf = require('html-pdf');
var html = fs.readFileSync('index.html', 'utf8');
const writeFileAsync = util.promisify(fs.writeFile);
var options = { 
    format: 'Letter',
    zoomFactor: 5
};


getProfile();

async function getProfile() {
    try {
        // PROMPT USER FOR GITHUB USERNAME
        await inquirer.prompt({
            type: 'input',
            name: 'username',
            message: 'What is your Github username?'
        }).then(function ({
            username
        }) {
            const queryUrl = `https://api.github.com/users/${username}`;
            const githubUrl = `https://www.github.com/${username}`

            // CONNECT TO GITHUB API
            axios.get(queryUrl).then(function (data) {

                var profile = data.data
                var githubDetails = [profile.avatar_url, profile.name, profile.company, profile.location, githubUrl, profile.blog, profile.bio, profile.public_repos, profile.followers, profile.public_gists, profile.following];

                // DECONSTRUCT githubDetails
                var [profilePic, userName, company, userLocal, githubProfile, userBlog, userBio, publicRepos, followers, userStars, following] = githubDetails;
                console.log(profilePic, userName, company, userLocal, githubProfile, userBlog, userBio, publicRepos, followers, userStars, following);
                // console.log(profile);

                // APP HTML
                function generateHtml() {
                    const html = `
                        <!DOCTYPE html>
                        <html lang="en">
                        
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            <title>Developer Profile</title>
                        
                            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                            <link href="https://fonts.googleapis.com/css?family=Fjalla+One&display=swap" rel="stylesheet">
                            <script src="https://kit.fontawesome.com/96ca6c3009.js" crossorigin="anonymous"></script>
                        </head>
                        
                        <body>
                            <div class="container topCont">
                                <div class="row">
                                    <div class="col-lg-3 d-flex justify-content-center picCont">
                                        <img src="${profilePic}" alt="github avatar" id="avatar">
                                    </div>
                                    <div class="col-lg-9 introCont">
                                        <div class="introContent">
                                            <h2>HI!</h2>
                                            <h2>My name is ${userName}</h2>
                                            <p>Currently @ ${company}</p>
                                            <a href="https://www.google.com/maps/place/${userLocal}"><i class="fas fa-location-arrow"></i> ${userLocal}</a>
                                            <a href="${githubProfile}" id="buffer"><i class="fab fa-github"></i> Github</a>
                                            <a href="${userBlog}"><i class="fas fa-rss"></i> Blog</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="container middleCont">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="bio">
                                                <p>${userBio}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container bottomCont">
                                    <div class="row statRow1">
                                        <div class="col-lg-6">
                                            <div class="statsCont1">
                                                <h4>Public Repositories</h4>
                                                <p>${publicRepos}</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="statsCont2">
                                                <h4>Followers</h4>
                                                <p>${followers}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row statRow2">
                                        <div class="col-lg-6">
                                            <div class="statsCont1">
                                                <h4>GitHub Stars</h4>
                                                <p>${userStars}</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="statsCont2">
                                                <h4>Following</h4>
                                                <p>${following}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                                ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CSS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                                ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
                        
                            <style>
                                body {
                                    background-color: black;
                                    font-family: 'Fjalla One', sans-serif;
                                }
                        
                                a {
                                    color: #3a3535;
                                    text-decoration: none;
                                }
                        
                                #buffer {
                                    padding: 0 20px;
                                }
                        
                                .topCont {
                                    margin-top: 80px;
                                }
                        
                                .introCont {
                                    background-color: #ff7315;
                                    text-align: center;
                                    color: white;
                                    border-radius: 30px;
                                }
                        
                                .introContent {
                                    padding-top: 20px;
                                }
                        
                                #avatar {
                                    border-radius: 30%;
                                    border: 5px solid #ff7315;
                                    width: 200px;
                                }

                                .middleCont {
                                    margin-top: 50px;
                                }
                                
                                .bio {
                                    color: white;
                                    text-align: center;
                                    /* background-color: red; */
                                    font-size: 25px;
                                    border: 10px dotted #3a3535;
                                    padding-top: 15px;
                                }
                        
                                .bottomCont {
                                    color: #ff7315;
                                    margin-top: 40px;
                                    text-align: center;
                                    /* background-color: green; */
                                }
                        
                                .statRow2 {
                                    margin-top: 50px;
                                }
                        
                                .statsCont1,
                                .statsCont2 {
                                    background-color: #3a3535;
                                    /* margin: 0 30px; */
                                    /* vertical-align: middle; */
                                    padding: 20px;
                                    margin: 30px 40px 0;
                                    border-radius: 30px;
                                }
                        
                                .statsCont1 h4, .statsCont2 h4 {
                                    padding-top: 18px;
                                }
                            </style>
                        </body>
                        
                        </html>`

                    return html
                }

                // WRITE generateHtml() TO index.html
                writeFileAsync('index.html', generateHtml());
                console.log('The index.html has been written.');
                // console.log(generateHtml());
            });
        })
        
        // pdf.convertHTMLFile('index.html', 'index.pdf');
        pdf.create(html, options).toFile('index.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res)
        });

    } catch (err) {
        console.log('ERROR: ', err);
    }

}