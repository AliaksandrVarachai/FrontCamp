import angular from 'angular';
import 'angular-mocks';

angular.module('app-mock', ['ngMockE2E'])
    .run(($httpBackend) => {
        let data = [
            {
                "id": 1,
                "text": "Some text 111-111"
            },
            {
                "id": 2,
                "text": "Some text 2"
            },
            {
                "id": 3,
                "text": "Some text 3aaaaa"
            }
        ];
        $httpBackend.whenGET(/\.html/).passThrough();
        $httpBackend.whenGET(/\.json/).passThrough();

        $httpBackend.whenGET('/data').respond(data);
        $httpBackend.whenGET(/data\/\w+$/).respond(function(method, url, params) {
            console.dir(method);
            console.dir(url);
            console.dir(params);
            var result = data[0]; //TODO: params.id
            return [200, result];
        });

        //$httpBackend.whenGET(/data\/\w+$/).respond(function (method, url, params) {
        //    var result = data[0];
        //    return [200, result];
        //});

    })


angular.module('app').requires.push('app-mock');

