import PostsController from './posts.controller';

class PostsComponent {
    constructor () {
        this.templateUrl = './src/posts/posts.html';
        this.controller = PostsController;
        this.controllerAs = 'posts';
    }
    static createInstance() {
        PostsComponent.instance = new PostsComponent();
        return PostsComponent.instance;
    }
}

export default PostsComponent;
