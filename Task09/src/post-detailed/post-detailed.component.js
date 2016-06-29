class PostsDetailedComponent {
    constructor () {
        this.templateUrl = './src/post-detailed/post-detailed.html';
        this.controllerAs = 'postDetailed';
        this.controller = function() {
            return {
                increaseClicks: function(post) {
                    alert(555)
                    post.click = (post.click + 1) || 1;
                }
            };
        };
        this.bindings = {
            post: '<',
            postClick: '&'
        };
    }
}

export default PostsDetailedComponent;
