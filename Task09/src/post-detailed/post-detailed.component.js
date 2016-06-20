class PostsDetailedComponent {
    constructor () {
        this.templateUrl = './src/post-detailed/post-detailed.html';
        this.controllerAs = 'postDetailed';
        this.bindings = {
            post: '<',
            postClick: '&'
        };
    }
}

export default PostsDetailedComponent;
