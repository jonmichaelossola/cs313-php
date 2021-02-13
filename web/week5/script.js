function getUserInformation(e) {
  const username = document.getElementById("Username").value;
  const password = document.getElementById("Password").value;

  let request = new XMLHttpRequest();
  request.open("POST", "./eventsHandler.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText !== "failed") {
        window.location.href = "./home.php";
      }
    }
  };

  request.send(`username=${username}&password=${password}`);
}

function test() {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?test=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };

  request.send();
}

function submitRegistrationInformation(e) {
  // to make when we can update and create data
}

function getPosts(e) {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?posts=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const posts = JSON.parse(this.responseText);
      let str = `<ul class="plansList">`;
      posts.forEach(function(arr) {
        str += `<li class="plansListIndividual"><div><p class="location">Location: ${
          arr[2]
        }</p><p class="date">Time: ${
          Number(arr[3].split(":")[0]) > 12
            ? (Number(arr[3].split(":")[0]) - 12).toString()
            : arr[3].split(":")[0]
        }:${arr[3].split(":")[1]} ${
          Number(arr[3].split(":")[0]) > 11 ? "PM" : "AM"
        }</p><p class="description">${arr[0]}</p></div></li>`;
      });
      str += "</ul>";
      document.getElementById("PostsContainer").innerHTML = str;
    }
  };

  request.send();
}

function getSelfInformation() {
  getSelfPosts();
  getSelfInfo();
}

function getSelfPosts() {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?selfposts=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const posts = JSON.parse(this.responseText);
      let str = `<ul class="plansList">`;
      posts.forEach(function(arr) {
        str += `<li class="plansListIndividual"><div><p class="location">Location: ${
          arr[2]
        }</p><p class="date">Time: ${
          Number(arr[3].split(":")[0]) > 12
            ? (Number(arr[3].split(":")[0]) - 12).toString()
            : arr[3].split(":")[0]
        }:${arr[3].split(":")[1]} ${
          Number(arr[3].split(":")[0]) > 11 ? "PM" : "AM"
        }</p><p class="description">${arr[0]}</p></div></li>`;
      });
      str += "</ul>";
      document.getElementById("yourPostsWrapper").innerHTML = str;
    }
  };

  request.send();
}

function getSelfInfo() {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?self=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const info = JSON.parse(this.responseText);
      const str = `<h3 class="text-center">Name: ${
        info[0]
      }</h3><p class="text-center">City: ${info[1]}</p>`;
      document.getElementById("selfInfoWrapper").innerHTML = str;
    }
  };

  request.send();
}

function submitRegistrationInformation() {
  const username = document.getElementById("RegisterUsername").value;
  const password = document.getElementById("RegisterPassword").value;
  const city = document.getElementById("City").value;

  console.log(username, password, city);
  let request = new XMLHttpRequest();
  request.open("POST", "./eventsHandler.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText === "registered") {
        window.location.href = "./home.php";
      }
    }
  };

  request.send(
    `createPost=true&username=${username}&password=${password}&city=${city}`
  );
}
