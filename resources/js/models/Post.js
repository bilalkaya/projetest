export default class Post {
    constructor() {
        this.postList = null;
        this.post = null;
        this.user = null;
    }

    async getPosts() {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await res.json();
            this.postList = data;
            return true;
        } catch (error) {
            console.log(`Error when connecting to API Server: ${error}`);
            return false;
        }
    }

    async getPost(id) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const data = await res.json();
            this.post = data;
            return true;
        } catch (error) {
            console.log(`Error when connecting to API Server: ${error}`);
            return false;
        }
    }

    async getUser(id) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await res.json();
            this.user = data;
            return true;
        } catch (error) {
            console.log(`Error when connecting to API Server: ${error}`);
            return false;
        }
    }

    async updatePost(id, title, body) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: title,
                    body: body,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const response = await res.json();
            return true;
        } catch (error) {
            console.log(`Error while updating Post data: ${error}`);
            return false;
        }
    }

    async deletePost(id) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });
            const response = await res.json();
            return true;
        } catch (error) {
            console.log(`Error when connecting to API Server: ${error}`);
            return false;
        }
    }
}