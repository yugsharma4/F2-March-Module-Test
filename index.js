let posts = [];

const newPostButton = document.querySelector("#create_new_post");

const public_post = document.querySelector("#modal_public_post");

public_post.addEventListener("click", () => {
  const modal_heading = document.querySelector("#modal_heading").value;
  const modal_text_area = document.querySelector("#modal_text_area").value;
  const length = posts.length;
  const newPost = {
    id: length + 1,
    modal_heading,
    modal_text_area,
  };
  posts.push(newPost);
  createNewPost(newPost.id, newPost.modal_heading, newPost.modal_text_area);
});

function displayPosts() {
  for (let i = 0; i < posts.length; i++) {
    const id = posts[i].id;
    const heading = posts[i].modal_heading;
    const textArea = posts[i].modal_text_area;
    createNewPost(id, heading, textArea);
  }
}
// displayPosts();
//Create New Post
function createNewPost(id, modal_heading, modal_text_area) {
  //Parent node
  const nodeLists = document.querySelector(".post_container");

  //Modal details
  const root = document.createElement("div");
  root.classList.add("post");
  root.setAttribute("id", id);
  //Dynamic creation

  //Post Heading
  const h1 = document.createElement("h1");
  const h1Text = document.createTextNode(modal_heading);
  h1.appendChild(h1Text);
  root.appendChild(h1);

  //Post Description
  const p = document.createElement("p");
  p.classList.add("post__description");
  const pText = document.createTextNode(modal_text_area);
  p.appendChild(pText);
  root.appendChild(p);

  //Edit Post
  const editButton = document.createElement("button");
  editButton.setAttribute("id", "post__edit_button");
  editButton.setAttribute("type", "button");
  editButton.classList.add("btn", "btn-dark");
  editButton.setAttribute("data-bs-toggle", "modal");
  editButton.setAttribute("data-bs-target", "#editPost");
  editButton.setAttribute("style", "margin-right:5px");

  editButton.onclick = function (e) {
    editablePost(e);
  };

  const editTextNode = document.createTextNode("Edit Post");
  editButton.appendChild(editTextNode);
  root.appendChild(editButton);

  //Delete Post
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "post__delete_button");
  deleteButton.setAttribute("type", "button");

  deleteButton.classList.add("btn", "btn-dark");
  deleteButton.onclick = function (e) {
    deletePost(e);
  };

  const dltTextNode = document.createTextNode("Delete Post");
  deleteButton.appendChild(dltTextNode);
  root.appendChild(deleteButton);

  //Posted on

  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const minutes = min.length === 1 ? "0" + min : min;
  const amPM = hour < 12 ? "AM" : "PM";

  const postedTime = `${day}/${month + 1}/${year} at ${hour}:${minutes}${amPM}`;

  const postedP = document.createElement("p");
  postedP.setAttribute("style", "float:right");
  const postedText = document.createTextNode(`Created At: ${postedTime}`);
  postedP.appendChild(postedText);
  root.appendChild(postedP);

  nodeLists.appendChild(root);

  document.querySelector("#edit_heading").value = "";
  document.querySelector("#edit_text_area").value = "";
}

function editablePost(e) {
  const selectedPost = e.target.parentElement;
  const id = Number(selectedPost.getAttribute("id"));
  console.log(id);
  const nodeLists = selectedPost.childNodes;
  const selectedHeading = nodeLists[0].innerHTML;
  const selectedPostDesc = nodeLists[1].innerHTML;

  document.querySelector("#edit_heading").value = selectedHeading;
  document.querySelector("#edit_text_area").value = selectedPostDesc;

  //Save Post
  const savePostButton = document.querySelector("#modal_save_post");
  savePostButton.addEventListener("click", () => {
    nodeLists[0].innerHTML = document.querySelector("#edit_heading").value;
    nodeLists[1].innerHTML = document.querySelector("#edit_text_area").value;
  });

  const deleteButton = document
    .querySelector("#modal_delete_post")
    .addEventListener("click", deletePost);

  console.log(nodeLists);
}

function deletePost(e) {
  const parent = e.target.parentElement.parentElement;
  const allPostsArray = parent.children;

  const selectedPost = e.target.parentElement;
  const id = Number(selectedPost.getAttribute("id")) - 1;

  parent.removeChild(allPostsArray[id]);
}
