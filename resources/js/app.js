import Post from './models/Post.js';
import * as postView from './views/postView.js';
import elements from './views/domElements.js';

//Keep object references and datas
const state = {
    postObj: null, // Post Object reference
    postList: null, // Post List
    post: null, // Current Post
    user: null //Post User  
};

const init = async () => {
    const post = new Post();
    const Posts = await post.getPosts();
    if (Posts) {
        state.postObj = post;
        state.postList = post.postList;
        postView.renderPosts(state.postList);
    } else {
        postView.renderError();
    }
}
init();


// Controllers

//Get User Detail
const userDetail = async userId => {
    await state.postObj.getUser(userId);
    state.user = state.postObj.user;
}

//Get Post Detail
const detailPost = async postId => {
    await state.postObj.getPost(postId);
    state.post = state.postObj.post;
    await userDetail(state.post.userId);
    postView.renderPost(state.post, state.user);
}

// Edit existing post
const editPost = async postId => {
    await state.postObj.getPost(postId);
    state.post = state.postObj.post;
    postView.renderEditPost(state.post);
}

// Show delete post confirmation
const deletePostConfirm = async postId => {
    postView.confirmDelete(postId);
}

// Delete a post
const deletePost = async postId => {
    const response = await state.postObj.deletePost(postId);
    response === true ? postView.renderSuccess() : null;
}

//Event Listeners
elements.main.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.closest('.link')) { // Pagination  Buttons
        const btn = e.target.closest('.link');
        postView.renderPosts(state.postList, +btn.dataset.page);
    } else if (e.target.closest('.detail-btn')) { // Detail Button
        const id = e.target.closest('.detail-btn').dataset.id;
        detailPost(id);
    } else if (e.target.closest('.edit-btn')) { // Edit Button
        const id = e.target.closest('.edit-btn').dataset.id;
        editPost(id);
    } else if (e.target.closest('.delete-btn')) { // Delete Button
        const id = e.target.closest('.delete-btn').dataset.id;
        deletePostConfirm(id);
    } else if (e.target.closest('.user')) { // User Detail Button
        postView.renderUserDetail(state.user);
    }
})

//Posts Button
elements.postsBtn.addEventListener('click', e => {
    e.preventDefault();
    postView.renderPosts(state.postList);
})

//Modal Buttons

//Close Modal Button
elements.modalContainer.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.closest('.close')) {
        postView.hideModal();
    }
})

//Update Post Button
elements.modalContainer.addEventListener('click', async e => {
    e.preventDefault();
    if (e.target.closest('.update')) {
        const id = e.target.dataset.postid;
        const response = await state.postObj.updatePost(id, document.getElementById('post-title').value, document.getElementById('post-body').value);
        console.log(response);
        response === true ? postView.renderUpdateMessage(true) : postView.renderUpdateMessage(false);
    }
})

//Confirm Buttons 
elements.modalContent.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.closest('.yes')) { // Pagination  Buttons
        const id = e.target.closest('.yes').dataset.id;
        deletePost(id);
    } else if (e.target.closest('.no')) { // Detail Button
        elements.modalContainer.classList.add('hidden');
    }
})