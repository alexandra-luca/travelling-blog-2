let modalDisplayed = false;

function toggleModal() {
    const modal = document.getElementById("modal-container");

    if (modalDisplayed == false) {
        modal.setAttribute("style", "display: block");
        modalDisplayed = true;
    } else {
        modal.setAttribute("style", "display: none");
        modalDisplayed = false;
    }
}

document.addEventListener("DOMContentLoaded", onLoad);

async function onLoad() {
    let authors = await getAuthors();

    let select = document.getElementById("select_author");
    for (let i = 0; i < authors.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", authors[i].name);
        option.innerHTML = authors[i].name;

        select.append(option);
    }

    let filter = document.getElementById("filter_author");
    for (let i = 0; i < authors.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", authors[i].name);
        option.innerHTML = authors[i].name;

        filter.append(option);
    }
}

async function getAuthors() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
}
