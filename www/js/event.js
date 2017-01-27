myApp.onPageInit('add-event', function (page) {
    $$('#btn-add-event').click(function () {
        var formData = myApp.formToJSON('#add-event-form');
        console.log(JSON.stringify(formData));
        if(valid_event(formData)){
        $Ajax(formData, 'addEvent', 'addEventSuccess');
        }
    });
    $$('#event-img-prev, #event-img').click(function () {
        selectImage($$('#hdn-event-img'), $$('#event-img-prev'));
    });
    $$('#event-imgs-prev, #event-imgs').click(function () {
        selectImage($$('#hdn-event-imgs'), $$('#event-imgs-prev'));
    });

});

function selectImage(input, img) {
    var options = {
        quality: 50,
        //allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        //correctOrientation: true,
    };

    var camera = navigator.camera.getPicture(function (url) {
        img.attr('src', 'data:image/jpeg;base64,' + url);
        input.val(url);
    }, function () {}, options);
}

function addEventSuccess(data) {
    data = JSON.parse(data);
     //console.log(data);
    if (data.error) {
        myApp.alert(data.message, '');
    } else {
        myApp.alert(data.message, '');
    }
}
