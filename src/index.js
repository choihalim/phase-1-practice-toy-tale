let addToy = false;

let baseUrl = "http://localhost:3000";


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  renderToys();
});

function renderToys() {
  const toysUrl = baseUrl + "/toys";
  const toyCollection = document.getElementById("toy-collection");

  fetch(toysUrl)
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach(toy => {
        const card = document.createElement("div");
        card.className = "card";

        const toyName = document.createElement("h2");
        toyName.textContent = toy.name;
        card.appendChild(toyName);

        const image = document.createElement("img");
        image.src = toy.image;
        image.className = "toy-avatar";
        card.appendChild(image);

        const numLikes = document.createElement("p");
        numLikes.id = "numOfLikes";
        numLikes.textContent = `${toy.likes} Likes`;
        card.appendChild(numLikes);

        const likeBtn = document.createElement("button");
        likeBtn.textContent = "Like ❤️";
        likeBtn.id = toy.id;
        likeBtn.addEventListener("click", ()=>addLikes(toy)); //(toy.likes, toy.id)
        card.appendChild(likeBtn);
        

        toyCollection.appendChild(card);
      })
    });
}

const toyForm = document.querySelector(".add-toy-form");
toyForm.addEventListener("submit", addNewToy);

function addNewToy() {
  const toysUrl = baseUrl + "/toys";
  let newToyName = document.getElementById("toy-name").value;
  let newToyImg = document.getElementById("img-url").value;

  fetch(toysUrl, {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": newToyName,
      "image": newToyImg,
      "likes": 0
    })
  })
    .then((response) => response.json())
    .then((data => console.log(data)))
}

function addLikes(toy) {
  const toysUrl = baseUrl + "/toys" + `/${toy.id}`;
  const likeCount = document.getElementById("numOfLikes");
  const newNumberOfLikes = Number(toy.likes) + 1;

    fetch(toysUrl, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
      .then(response => {
        if (response.ok) {
          likeCount.value = newNumberOfLikes;
        }
      })
}