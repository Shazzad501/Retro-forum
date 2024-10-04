// input filed value reciver function and pass argument value in loadAllposts function
const handleSearchByCategory = () => {
  const searchInput = document.getElementById("searchPosts").value;
  document.getElementById("searchPosts").value = '';

  // loadAllPost function call and argument pass

    loadAllPosts(searchInput);

};


// all posts api dainamically loader function
const loadAllPosts = async (category) => {
  document.getElementById("post-container").innerHTML = "";

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const data = await res.json();
  // displayAllPosts function call and argument pass
  displayAllPosts(data.posts);
};

// display post dainamiclley in UI this function
const displayAllPosts = (posts) => {
  const postContainer = document.getElementById("post-container");
  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
    <div
            class="p-6 lg:p-12 flex flex-col lg:flex-row gap-6 items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
          >
            <div class="indicator">
              <span
                class="indicator-item badge ${
                  post.isActive ? "bg-green-600" : "bg-red-600"
                }"
              ></span>
              <div class="avatar">
                <div class="w-24 rounded-xl">
                  <img src="${post.image}" alt="" />
                </div>
              </div>
            </div>
            <div class="space-y-4 w-full">
              <div class="flex gap-4 *:opacity-60">
                <p># ${post.category}</p>
                <p>Author: ${post.author.name}</p>
              </div>
              <h3 class="text-2xl font-bold opacity-70">${post.title}</h3>
              <p class="opacity-40">${post.description}</p>
              <hr class="border border-dashed border-gray-300" />
              <div
                class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45"
              >
                <div class="flex gap-4">
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-comment-dots"></i>
                    <p>${post.comment_count}</p>
                  </div>
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-eye"></i>
                    <p>${post.view_count}</p>
                  </div>
                  <div class="space-x-2 flex items-center">
                    <i class="fa-regular fa-clock"></i>
                    <p>${post.posted_time}min</p>
                  </div>
                </div>

                <div class="opacity-100">
                  <button
                    id="addToList"
                    onclick="markAsRead('${post.description}','${post.view_count}')"
                    data-post="${JSON.stringify(post)}"
                    class="addToList bg-green-500 btn btn-circle btn-sm"
                  >
                    <i class="fa-solid fa-envelope-open text-white"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
    `;
    postContainer.appendChild(postDiv);
  }); 
};


// markAsRead function and count read

const markAsRead = (description, view_count)=>{
  const markAsReadContainer = document.getElementById('markAsReadContainer');
  const div = document.createElement('div');
  div.innerHTML=`
            <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
            <div class="w-11/12 lg:w-4/5">
              <p>
                ${description}
              </p>
            </div>
            <div class="lg:w-1/5 w-4/12 flex justify-end">
              <p><i class="fa-regular fa-eye"></i>${view_count}</p>
            </div>
          </div>
  `
  markAsReadContainer.appendChild(div);
  // newCount function call
  newCount()

}

// markAsRead counter function start

const newCount = ()=>{
  const markAsReadCounter = parseInt(document.getElementById('markAsReadCounter').innerText);
  const markAsReadCounterNewValue = markAsReadCounter + 1;
  document.getElementById('markAsReadCounter').innerText = markAsReadCounterNewValue;
}



// leatest post fetch function 

const loadLeatestPost = async()=>{
  const respons = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await respons.json();
  displayLeatestPosts(data);
}

// display leatest post fuction 
const displayLeatestPosts = (leatestposts)=>{
  const latestPostContainer = document.getElementById("latest-post-container");
  leatestposts.forEach(leatestpost => {
    const div = document.createElement('div');
    div.innerHTML= `
       <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${leatestpost.cover_image}
                  alt="Cover Image"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i> ${leatestpost.author.posted_date ?
                    `${leatestpost.author.posted_date}` : 'No Publish Date'}
              </p>
              <h2 class="card-title text-start">${leatestpost.title}</h2>
              <p class="text-start">
                  ${leatestpost.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${leatestpost.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${leatestpost.author.name}</h3>
              <p class="text-start opacity-60">${leatestpost.author.designation ? `${leatestpost.author.designation}` : 'Uknown'}</p>
          </div>
    `
    latestPostContainer.appendChild(div);
  });
}

// leatest post fetch function 
loadLeatestPost()

// loadAllpost function caller
loadAllPosts();


