let PostResource;

class PostsService {
    constructor($resource) {
        //PostResource = $resource('./data.json');
        PostResource = $resource('/data/:id');
        //$resource('/user/:userId/parent/:parentId', {postId: '@id', parentId: '@'});
    }
    getData() {
        return PostResource.query();
    }
    getOneObject(id) {
        return PostResource.get({id: id});
    }
}

export default PostsService;
