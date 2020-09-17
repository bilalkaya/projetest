import domElements from './domElements.js';
import elements from './domElements.js';

export const renderPosts = (posts, page = 1) => {
    let html = '';
    const total = posts.length;
    posts = posts.slice((page - 1) * 5, (page * 5));
    posts.forEach(post => {
        html += `
            <div class="item">
                 <div class="post-title">
                    <span class="count">${post.id}</span>
                    <p>${post.title}</p>    
                </div>
                <button class="button detail-btn" data-id=${post.id}>Detay</button>
                <button class="button edit-btn" data-id=${post.id}>Düzenle</button>
                <button class="button delete-btn" data-id=${post.id}>SİL</button>
            </div>
        `;
    });
    clearContainer();
    elements.main.insertAdjacentHTML('beforeend', html);
    renderPagination(page, total);
}

export const renderPost = (post, user) => {
    const html = `
        <div class="post">
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            <h2>Posted by <a href="#" class='user' data-userId=${user.id}>${user.name}</h2>
        </div>
    `;
    clearContainer();
    elements.main.insertAdjacentHTML('afterbegin', html);
}

export const renderEditPost = post => {
    const html = `
            <div class="modal-header">
                <h4>Düzenle</h4>
                <span class="close" id="close">&times;</span>
            </div>
            <div class="modal-body">
                <h5>Title</h5>
                <input type="text" name="title" id="post-title" value="${post.title}">
                <h5>Body</h5>
                <textarea name="body" id="post-body" cols="30" rows="5">${post.body}</textarea>
            </div>
            <div id="message"></div>
            <button id="update" class="update" data-postid="${post.id}">Güncelle</button>
    `;
    domElements.modalContent.innerHTML = html;
    domElements.modalContainer.classList.remove('hidden');
}

export const renderUserDetail = user => {
    let html = `
        <div class="detail">
            <div class="detail-upper">
                <div class="detail-info">
                    <h1>${user.name}</h1>
                    <h2>${user.address.city}</h2>
                    <div class="detail-user">
                        <h3>Username</h3>
                        <p class="user-info">${user.username}</p>
                    </div>
                    <div class="detail-user">
                        <h3>Email</h3>
                        <p class="user-info">${user.email}</p>
                    </div>
                    <div class="detail-user">
                        <h3>Phone</h3>
                        <p class="user-info">${user.phone}</p>
                    </div>
                    <div class="detail-user">
                        <h3>Website</h3>
                        <p class="user-info website">${user.website}</p>
                    </div>
                    <div class="detail-user">
                        <h3>Company</h3>
                        <p class="user-info">${user.company.name}</p>
                    </div>
                </div>
                <div class="detail-map" id="map">
                </div>
            </div>
            <div class="detail-lower">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, rerum illo cumque minima
                    aperiam animi ut repudiandae exercitationem, voluptate vitae expedita corporis deleniti beatae
                    deserunt? Doloremque autem id distinctio eligendi?</p>
                <a href="#">Show more</a>
            </div>
        </div>
    `;
    clearContainer();
    elements.main.insertAdjacentHTML('afterbegin', html);
}


export const renderError = () => {
    const html = 'Error when getting data from API';
    clearContainer();
    elements.main.insertAdjacentHTML('afterbegin', html);
}

export const renderUpdateMessage = (message) => {
    const html = message === true ? 'Update Success: The post was successfully updated' : 'Update Failure: The post could not be updated';
    const type = message === true ? 'success' : 'failure';
    document.getElementById('message').classList.add(type);
    document.getElementById('message').innerText = html;
}

export const hideModal = () => {
    document.getElementById('message').innerText = '';
    document.getElementById('message').classList.remove('success');
    document.getElementById('message').classList.remove('failure');
    elements.modalContainer.classList.add('hidden');
}

export const confirmDelete = postId => {
    const html = `
            <div class="confirm">
                <p>Are you sure to delete post ${postId}?</p>
                <div>
                    <button class="yes" data-id="${postId}">Yes</button>
                    <button class="danger no">No</button>
                </div>
            </div>
            `;
    elements.modalContainer.classList.remove('hidden');
    elements.modalContent.innerHTML = html;
}

export const renderSuccess = () => {
    const html = `
            <div class="modal-header success-message">
                <span class="close" id="close">&times;</span>
                <div class="success-message" id="message">
                    <p>Post deleted successfully.</p>               
                </div>
            </div>
            
            `;
    elements.modalContainer.classList.remove('hidden');
    elements.modalContent.innerHTML = html;
}

const renderPagination = (page, total) => {
    const last = page * 5 >= total ? true : false;
    const first = page === 1 ? true : false;
    const p = last === true ? page - 1 : first === true ? page + 1 : page;

    let html = `
    <div class="pagination">
        <ul>
            <li class="page-item ${first === true ? ' disabled':null}" ${first === true ? 'disabled':null}><a href="#" data-page="${last === true ? p:p-1}" class="link">Önceki</a></li>
            <li class="page-item ${first === true ? ' active':null}"><a href="#" data-page="${p-1}" class="link">${p-1}</a></li>
            <li class="page-item ${first !== true && last !== true ? ' active':null}"><a href="#" data-page="${p}" class="link">${p}</a></li>
            <li class="page-item ${last === true ? ' active':null}"><a href="#" data-page="${p+1}" class="link">${p+1}</a></li>
            <li class="page-item ${last === true ? ' disabled':null}" ${last === true ? ' disabled':null}><a href="#" data-page="${first === true ? p:p+1}" class="link">Sonraki</a></li>
        </ul>
    </div>
    `;
    elements.main.insertAdjacentHTML('beforeend', html);
}

const clearContainer = () => {
    elements.main.innerHTML = '';
}