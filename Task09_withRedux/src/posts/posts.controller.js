let $state, ngRedux;

class PostsController {
    constructor(postsService, $injector) {
        $state = $injector.get('$state');
        this.text = 'Hello World';
        this.list = postsService.getData()
        ngRedux = $injector.get('$ngRedux');
    }

    selectPost(post) {
        $state.go('postdetailed', {id: post.id});
        //this.post = post;
    }
    increaseClicks(post) {
        post.click = (post.click + 1) || 1;
    }
    selectPost2(val) {
        console.log(11111111111)
        ngRedux.dispatch({
            type: 'CHANGE_PAYMENT_TYPE',
            name: val
        })
    }



}



export default PostsController;
