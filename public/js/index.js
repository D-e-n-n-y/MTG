const  {postForm}  = document.forms;
const postWrapper = document.querySelector('.postWrapper');

function newPost(post) {
    return `
    
    <div id="blockImage">
    <div data-id="${post.id}" class="imagePic">
      <p class="card-title">${post.title}</p>
      <p class="card-title">${post.condition}</p>
      <img src="/img/${post.img}" alt="..." />
      <div class="buyPrice">
        <button>buy</button>
        <button id="del-post" type="button">Delete</button>
        <p1>rate:</p1>
        <p1>$4.99</p1>
      </div>
    </div>
      
      `;
  }





  postForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (e.target.name === 'postForm') {
      const data = new FormData(postForm);
      const response = await fetch('/post', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        const dataFromBack = await response.json();
        // console.log(dataFromBack);
        postWrapper?.insertAdjacentHTML('afterbegin', newPost(dataFromBack.newPost));
        window.location.replace('/');
      }
    }
  });

  postWrapper?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.id === 'del-post') {
      const card = e.target.closest('[data-id]');
      const { id } = card.dataset;
      const response = await fetch(`/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        card.remove();
      }
    } })