
import moon from './assets/icon-moon.svg';
import sun from './assets/icon-sun.svg';


document.addEventListener("DOMContentLoaded", function(){

  // Theme Switcher Logic
  const themeSwitcher = document.getElementById("themeButton");
  const themeText = document.getElementById("theme");
  const themeIcon = document.getElementById("themeIcon");
  
  // DEFAULT PREFERS COLOR 
  if(window.matchMedia("(prefers-color-scheme: light)")){
    // Change to Light
    themeText.textContent = "DARK";
    themeText.style.color = "black";
    themeIcon.src = moon;

    const darkItems = document.querySelectorAll(".dark");
    darkItems.forEach((item) => {
      item.classList.replace('dark', 'light');
    });
  }
  
  themeSwitcher.addEventListener("click", function(){

    if(themeText.textContent == "LIGHT"){
      // Change to Light
      themeText.textContent = "DARK";
      themeText.style.color = "black";
      themeIcon.src = moon;

      const darkItems = document.querySelectorAll(".dark");
      darkItems.forEach((item) => {
        item.classList.replace('dark', 'light');
      });

    }else{
      // Change to Dark
      themeText.textContent = "LIGHT";
      themeText.style.color = "white";
      themeIcon.src = sun;

      const lightItems = document.querySelectorAll(".light");
      lightItems.forEach((item) => {
        item.classList.replace('light', 'dark');
      });

    }
  });
  
  const input = document.getElementById("username");
  const button = document.getElementById("search");

  const name = document.getElementById("name");
  const avatar = document.getElementById("avatar")
  const gitUserName = document.getElementById("gitUsername");

  const joinedDate = document.getElementById("joined");
  const bio = document.getElementById("bio");
  const repo = document.getElementById("repo");
  const followers = document.getElementById("followers");
  const followings = document.getElementById("following");
  const location = document.getElementById("location");
  const blog = document.getElementById("blog");
  const twitter = document.getElementById("twitter");
  const company = document.getElementById("company");

  var username;

  input.addEventListener("click", function(){

    input.value = "";

    if(themeText.textContent == 'LIGHT'){
      input.style.color = "white";
    }else{
      input.style.color = "gray";
    }

    input.style.textAlign = "left";
  });
  
  input.addEventListener("input", function(){
    username = input.value;
  });

  button.addEventListener("click", () => {
    fetchUser(username);
  });
  
  async function fetchUser(username){
    fetch(`https://api.github.com/users/${username}`)
    .then((response) => {

      if (response.ok) {
        return response.json(); // Parse the JSON response
      } else {
        input.value = "No Results";
        input.style.color = "red";
        input.style.textAlign = "center";
        throw new Error('Failed to fetch data');
      }
    })
    .then((userData) => {
      
      name.textContent = userData.name;
      gitUserName.textContent = `@${userData.login}`;
      avatar.src = userData.avatar_url;

      if(userData.bio == null){
        bio.textContent = "This Profile has no bio";
        bio.style.color = "grey"
      }else{
        bio.textContent = userData.bio;
      }
      
      joinedDate.textContent =`Joined ${userData.created_at.split("T")[0]}`;
      
      repo.textContent = userData.public_repos;
      followers.textContent = userData.followers;
      followings.textContent = userData.following;

      if(userData.location == null){
        location.textContent = "Not Available";
        location.style.color = "grey";
      } else{
        location.textContent = userData.location;
      }


      if(userData.blog == ""){
        blog.textContent = "Not Available";
        blog.style.color = "grey";
      } else{
        blog.textContent = userData.login; 
        blog.href = userData.blog;
      }

      if(userData.twitter_username == null){
        twitter.textContent = "Not Available";
        twitter.style.color = "grey";
      } else{
        twitter.textContent = userData.twitter_username; 
        twitter.href = `https://www.twitter.com/${userData.twitter_username}`;
      }

      if(userData.company == null){
        company.textContent = "Not Available";
        company.style.color = "grey";
      }else{
        company.textContent = userData.company; 
      }

      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }
});
