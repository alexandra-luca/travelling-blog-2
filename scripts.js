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

let authors;
let all_posts;
let all_comments;

async function onLoad() {
    authors = await getAuthors();
    all_posts = await getPosts();
    all_comments = await getComments();

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
        option.setAttribute("value", i);
        option.innerHTML = authors[i].name;

        filter.append(option);
    }

    fillPosts(all_posts);
}

function fillPosts(posts) {
    let container = document.getElementById("container");
    container.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "post");

        let h2 = document.createElement("h2");
        h2.innerHTML = posts[i].title;

        let contents = document.createElement("div");
        contents.innerHTML = posts[i].body;

        let comments = document.createElement("div");
        for (let j = 0; j < all_comments.length; j++) {
            if (all_comments[i].postId === posts[i].id) {
                let comment = document.createElement("div");
                comment.setAttribute("class", "comment");

                let name = document.createElement("div");
                name.setAttribute("class", "name");
                name.innerHTML = all_comments[j].name;

                let email = document.createElement("div");
                email.setAttribute("class", "email");
                email.innerHTML = all_comments[j].email;

                let body = document.createElement("div");
                body.setAttribute("class", "body");
                body.innerHTML = all_comments[j].body;

                comment.appendChild(email);
                comment.appendChild(name);
                comment.appendChild(body);

                comments.appendChild(comment);
            }
        }

        div.appendChild(h2);
        div.appendChild(contents);
        div.appendChild(comments);

        container.appendChild(div);
    }
}

function onFilterChanged() {
    const filter = document.getElementById("filter_author");
    const author = filter.value;

    fillPosts(all_posts.filter((p) => p.userId == parseInt(author)+1));
}

async function getAuthors() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
}

async function getPosts() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();  
}

async function getComments() {
    let response = await fetch("https://jsonplaceholder.typicode.com/comments");
    return response.json();
}
