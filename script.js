const userName = document.getElementById("userName");
const form = document.getElementById("searchForm");
const container = document.getElementById("container");
const API = "https://api.github.com/users/";

form.addEventListener("submit", e => {
    e.preventDefault();
    controller(userName.value)
        .then(data => renderCard(data))
        .catch(err => console.log(err))
})

const controller = async userName => {
    const response = await fetch(API + userName);
    if(response.status > 399) {
        throw new Error(alert(`User with ${userName} login not found`))
    } else {
        return response.json();
    }
}

function renderCard(data) {
    const card = document.createElement("div");
    const avatar = document.createElement("img");
    const userName = document.createElement("span");
    const follow = document.createElement("p")
    const repositories = document.createElement("p")

    card.classList.add("card");

    card.append(avatar);
    card.append(userName);
    card.append(follow);
    card.append(repositories);
    container.append(card)

    avatar.src = data.avatar_url;
    userName.textContent = data.login;
    follow.textContent = `${data.followers} followers · ${data.following} following`
    repositories.textContent = `Repositories: ${data.public_repos}`
}