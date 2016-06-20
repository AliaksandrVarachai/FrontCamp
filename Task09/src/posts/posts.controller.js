let $state;

class PostsController {
    constructor(postsService, $injector) {
        $state = $injector.get('$state');
        this.text = 'Hello World';
        //this.list = [{
        //    text: 'Some text 1'
        //}, {
        //    text: 'Some text 2'
        //}];
        this.list = postsService.getData()
        //postsService.getData().then((data)=> {
        //    this.list = post;
        //});
    }

    selectPost(post) {
        $state.go('postdetailed', {id: post.id});
        //this.post = post;
    }
    increaseClicks(post) {
        post.click = (post.click + 1) || 1;
    }
}



export default PostsController;
