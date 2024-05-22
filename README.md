# My-Blog_project


as we deployed our backend in cloudfare serverless environment .. we will deploy our fronted react or vite server in vercel enviroment .. now for deploying our frontedn in vercel .. first we need our whole project on git hub ..

// STEPS TO PUSH OUR PROJECT ON GIT HUB
1.) do run command "git init" in your main project folder as i have week 13 as main folder 

2.) then add link of your git hub repo to the project folder as in command ->" git remote add origin https://github.com/PriyanshuLakra/My-Blog_project.git"

3.) run command -> "git add ."

4.)run command -> "git commit -m "Initial commit with backend, common, and frontend folders" "

5.) .. then go to your repo main branch by command -> git checkout -b main

6.) then push the project to your repo -> git push -u origin main

7.) then terminal will ask for your username and password .. enter the username of your git hub .. and for password .. we have to generate a repo pass token like -> Since GitHub removed support for password authentication, you need to use a personal access token (PAT) instead of your password. Here's how to generate and use a personal access token for GitHub authentication:

Generating a Personal Access Token
Go to GitHub Settings: Open your web browser and navigate to GitHub Personal Access Tokens.

Generate New Token:

Click on Generate new token.
Provide a descriptive name for the token (e.g., "My Blog Project Access Token").
Select the scopes or permissions you need. For pushing to repositories, you will need the repo scope.
Click Generate token at the bottom of the pag



8.) if the terminal show this error ->  ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/PriyanshuLakra/My-Blog_project.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details
.... it means we have to first pull all the thing or files our repo already have .. to do so run the command -> git pull origin main

9.)then at last run the command for pushing your project to your repo -> push -u origin main


10.) now when you change anything in your code in vs code ,,. then you have to push these changes to git hub also .. by these command -> a) git add .
                                                    b) git commit -m "any message in which you have changed "
                                                    c) git push origin main

after this all the changes you have done in vs code will get pushed to git hub repo also



// now when your code is in git hub ... go to vercel site and deploy your fronted code on vercel


