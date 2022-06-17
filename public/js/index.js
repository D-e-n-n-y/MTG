const { postForm } = document.forms;
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
        postWrapper?.insertAdjacentHTML('afterbegin', newPost(dataFromBack.newPost));
        window.location.replace('/');
      }
    }
  });