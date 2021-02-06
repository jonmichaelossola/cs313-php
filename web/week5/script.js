function getUserInformation(e) {
  console.log("hello");
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
      console.log(this.responseText);
      const posts = JSON.parse(this.responseText);
      let str = "<ul>";
      posts.forEach(function(arr) {
        str += `<li><div><p class="location">${arr[2]}</p><p class="date">${
          arr[3]
        }</p><p class="description">${arr[0]}</p></div></li>`;
      });
      str += "</ul>";
      document.getElementById("PostsContainer").innerHTML = str;
    }
  };

  request.send();
}
