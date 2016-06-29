import angular from 'angular';
import 'angular-mocks';

angular.module('app-mock', ['ngMockE2E'])
    .run(($httpBackend) => {
        let data = [
            {
                "id": 0,
                "text": "Silence ensued. The countess looked at her callers, smiling affably, but not concealing the fact that she would not be distressed if they now rose and took their leave. The visitor's daughter was already smoothing down her dress with an inquiring look at her mother, when suddenly from the next room were heard the footsteps of boys and girls running to the door and the noise of a chair falling over, and a girl of thirteen, hiding something in the folds of her short muslin frock, darted in and stopped short in the middle of the room. It was evident that she had not intended her flight to bring her so far. Behind her in the doorway appeared a student with a crimson coat collar, an officer of the Guards, a girl of fifteen, and a plump rosy-faced boy in a short jacket."
            },
            {
                "id": 1,
                "text": "The two young men, the student and the officer, friends from childhood, were of the same age and both handsome fellows, though not alike. Bor?s was tall and fair, and his calm and handsome face had regular, delicate features. Nicholas was short with curly hair and an open expression. Dark hairs were already showing on his upper lip, and his whole face expressed impetuosity and enthusiasm. Nicholas blushed when he entered the drawing room. He evidently tried to find something to say, but failed. Bor?s on the contrary at once found his footing, and related quietly and humorously how he had known that doll Mimi when she was still quite a young lady, before her nose was broken; how she had aged during the five years he had known her, and how her head had cracked right across the skull. Having said this he glanced at Nat?sha. She turned away from him and glanced at her younger brother, who was screwing up his eyes and shaking with suppressed laughter, and unable to control herself any longer, she jumped up and rushed from the room as fast as her nimble little feet would carry her. Bor?s did not laugh."
            },
            {
                "id": 2,
                "text": "The two young men, the student and the officer, friends from childhood, were of the same age and both handsome fellows, though not alike. Bor?s was tall and fair, and his calm and handsome face had regular, delicate features. Nicholas was short with curly hair and an open expression. Dark hairs were already showing on his upper lip, and his whole face expressed impetuosity and enthusiasm. Nicholas blushed when he entered the drawing room. He evidently tried to find something to say, but failed. Bor?s on the contrary at once found his footing, and related quietly and humorously how he had known that doll Mimi when she was still quite a young lady, before her nose was broken; how she had aged during the five years he had known her, and how her head had cracked right across the skull. Having said this he glanced at Nat?sha. She turned away from him and glanced at her younger brother, who was screwing up his eyes and shaking with suppressed laughter, and unable to control herself any longer, she jumped up and rushed from the room as fast as her nimble little feet would carry her. Bor?s did not laugh."
            },
            {
                "id": 3,
                "text": "Meanwhile the younger generation: Bor?s, the officer, Anna Mikh?ylovna's son; Nicholas, the undergraduate, the count's eldest son; S?nya, the count's fifteen-year-old niece, and little P?tya, his youngest boy, had all settled down in the drawing room and were obviously trying to restrain within the bounds of decorum the excitement and mirth that shone in all their faces. Evidently in the back rooms, from which they had dashed out so impetuously, the conversation had been more amusing than the drawing room talk of society scandals, the weather, and Countess Apr?ksina. Now and then they glanced at one another, hardly able to suppress their laughter.\n  The two young men, the student and the officer, friends from childhood, were of the same age and both handsome fellows, though not alike. Bor?s was tall and fair, and his calm and handsome face had regular, delicate features. Nicholas was short with curly hair and an open expression. Dark hairs were already showing on his upper lip, and his whole face expressed impetuosity and enthusiasm. Nicholas blushed when he entered the drawing room. He evidently tried to find something to say, but failed. Bor?s on the contrary at once found his footing, and related quietly and humorously how he had known that doll Mimi when she was still quite a young lady, before her nose was broken; how she had aged during the five years he had known her, and how her head had cracked right across the skull. Having said this he glanced at Nat?sha. She turned away from him and glanced at her younger brother, who was screwing up his eyes and shaking with suppressed laughter, and unable to control herself any longer, she jumped up and rushed from the room as fast as her nimble little feet would carry her. Bor?s did not laugh."
            },
            {
                "id": 4,
                "text": "This black-eyed, wide-mouthed girl, not pretty but full of life—with childish bare shoulders which after her run heaved and shook her bodice, with black curls tossed backward, thin bare arms, little legs in lace-frilled drawers, and feet in low slippers—was just at that charming age when a girl is no longer a child, though the child is not yet a young woman. Escaping from her father she ran to hide her flushed face in the lace of her mother's mantilla—not paying the least attention to her severe remark—and began to laugh. She laughed, and in fragmentary sentences tried to explain about a doll which she produced from the folds of her frock."
            },
            {
                "id": 5,
                "text": "The only young people remaining in the drawing room, not counting the young lady visitor and the countess' eldest daughter (who was four years older than her sister and behaved already like a grown-up person), were Nicholas and S?nya, the niece. S?nya was a slender little brunette with a tender look in her eyes which were veiled by long lashes, thick black plaits coiling twice round her head, and a tawny tint in her complexion and especially in the color of her slender but graceful and muscular arms and neck. By the grace of her movements, by the softness and flexibility of her small limbs, and by a certain coyness and reserve of manner, she reminded one of a pretty, half-grown kitten which promises to become a beautiful little cat. She evidently considered it proper to show an interest in the general conversation by smiling, but in spite of herself her eyes under their thick long lashes watched her cousin who was going to join the army, with such passionate girlish adoration that her smile could not for a single instant impose upon anyone, and it was clear that the kitten had settled down only to spring up with more energy and again play with her cousin as soon as they too could, like Nat?sha and Bor?s, escape from the drawing room."
            }
        ];
        $httpBackend.whenGET(/\.html/).passThrough();
        $httpBackend.whenGET(/\.json/).passThrough();

        $httpBackend.whenGET('/data').respond(data);
        $httpBackend.whenGET(/data\/\w+$/).respond(function(method, url, params) {
            var id = url.match(/[^\/]+$/g)[0];
            var result = data[id];
            return [200, result];
        });

    })


angular.module('app').requires.push('app-mock');

