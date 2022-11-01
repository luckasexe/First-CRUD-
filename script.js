// MODEL [CRUD - BACK-END];
const crud = {
    users: [
        {
            username: 'LucasFernandes'
        }
    ],
    posts: [
        {
            id: Date.now(),
            owner: 'Lucas Fernandes',
            content: 'My first post'
        }
    ],

    createPost(data, htmlOnly = false) {
        const InternalId = Date.now();
        if (!htmlOnly) {
            crud.posts.push({
                id: data.id || InternalId,
                owner: data.owner,
                content: data.content
            });
        };
        const $postsList = document.querySelector('.postsList');
        $postsList.insertAdjacentHTML('afterbegin',
            `<li data-id="${InternalId}">
            <button class='btn-delete'>Delete</button>
            <span contenteditable>
            ${data.content}
            </span>
         </li>`)
    },

    readPosts() {
        crud.posts.forEach(({ id, owner, content }) => {
            crud.createPost({ id, owner: owner, content: content }, true)
        });
    },

    updatePostsContent(id, newContent) {
        const postToUpdate = crud.posts.find((post) => {
            return post.id === Number(id);
        });
        postToUpdate.content = newContent;
    },

    deletePosts(id) {
        const NewPostsList = crud.posts.filter((delPost) => {
            return delPost.id !== Number(id);
        });
        crud.posts = NewPostsList;
    },

};

// [CRUD - FRONT-END]
const $formField = document.querySelector('form');

// [CRUD: CREATE]
$formField.addEventListener('submit', function createPostController(eventInfo) {
    eventInfo.preventDefault();

    const $createPostField = document.querySelector('input[name="createPostField"]');
    crud.createPost({ owner: 'Lucas Fernandes', content: $createPostField.value });
    $createPostField.value = ''
    console.log(crud.posts);
});


// [CRUD - DELETE] 
document.querySelector('.postsList').addEventListener('click', function (eventInfo) {
    
    const postToDelete = eventInfo.target;
    const isBtnDeleteClick = eventInfo.target.classList.contains('btn-delete');

    if (isBtnDeleteClick) {
        const id = postToDelete.parentNode.getAttribute('data-id');
        crud.deletePosts(id);
        postToDelete.parentNode.remove();
        console.log(crud.posts);
    }
});

// [CRUD - UPDATE]
document.querySelector('.postsList').addEventListener('input', function (eventInfo) {
    
    const PostToEdit = eventInfo.target;
    const id = PostToEdit.parentNode.getAttribute('data-id');

    crud.updatePostsContent(id, PostToEdit.innerText)
});

crud.readPosts();