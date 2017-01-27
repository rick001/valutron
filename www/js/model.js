$$('.left-menu-list').on('click', function (e) {
    myApp.closePanel();
});


$(document).ready(function () {
    $('#btn-logout').click(function(){
        mainView.router.reloadPage('login.html');
        localStorage.clear();
        myApp.closePanel();
    });
    $("#profile-pic").click(function(){
        var clickedLink = this;
          var popoverHTML =
              '<div class="popover" style="width:150px;">'+
                  '<div class="popover-inner">'+
                    '<div class="list-block">'+
                      '<ul>'+
                      '<li><a href="#" id="pic-fm-camera" class="item-link list-button">Camera</li>'+
                      '<li><a href="#" id="pic-fm-galery" class="item-link list-button">Galary</li>'+
                      '</ul>'+
                    '</div>'+
                  '</div>'+
                '</div>';
          myApp.popover(popoverHTML, clickedLink);

        $('#pic-fm-camera').click(function(){
            profilePicChaneEvent(Camera.PictureSourceType.CAMERA);

        });
        $('#pic-fm-galery').click(function(){
            profilePicChaneEvent(Camera.PictureSourceType.PHOTOLIBRARY);
        });
    });

    function profilePicChaneEvent(source){
        myApp.closeModal('.popover');
        var options = {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: source,
            correctOrientation:true,
            targetWidth:100,
            targetHeight:100
        };

        var camera = navigator.camera.getPicture(function(url){
            var id = localStorage.getItem('id');
            $Ajax({img:url, id:id}, 'changeProfilePic', 'profilePicChageSuccess');
        }, function(){}, options);
    }

    $('#profile-name').click(function(){
       myApp.prompt('Enter Display Name', '',
          function (name) {
           if(String(name).trim()!= ''){
               var id = localStorage.getItem('id');
               $Ajax({name:name, id:id}, 'changeProfileName', 'profileNameChageSuccess');
           }
          },
          function (value) {
            //myApp.alert('Your name is "' + value);
          }
        );
     });
});
$$(document).on('pageInit', function (e) {
    $$('.pull-to-refresh-content').on('refresh', function (e) {
        callForFiendList();
    });
});
function setSession(data){
    localStorage.setItem('id', data.id);
    localStorage.setItem('email', data.email);
    localStorage.setItem('name', data.name);
    localStorage.setItem('mobile', data.mobile);
    localStorage.setItem('img', data.img);
    localStorage.setItem('role', data.role);
    setProfile();
}

function setProfile(){
    var img  = localStorage.getItem('img');
    if(img!=null && img!='null' && String(img).trim() !=''){
        document.getElementById('profile-pic').src = img;
    }else{
        document.getElementById('profile-pic').src = 'img/profile-pic.png';
    }
    $$('#profile-name').html(localStorage.getItem('name'));
}

myApp.onPageInit('login', function (page) {
    $$('#login').on('click', function () {
        var formData = myApp.formToJSON('#login-form');
        if(valid_login(formData)){
            $Ajax(formData, 'login', '$login_success');
        }
    });
});

myApp.onPageInit('signup', function (page) {
    $$('#signup').on('click', function () {
        var formData = myApp.formToJSON('#signup-form');
        if(valid_signup(formData)){
            $Ajax(formData, 'registration', '$signup_success');
        }
    });
});

myApp.onPageInit('friend-list', function (page) {
    callForFiendList();
//    navigator.contacts.pickContact(function(contact){
//        console.log('The following contact has been selected:' + JSON.stringify(contact));
//        myApp.alert(contact.phoneNumbers[0].value);
//    },function(err){
//        console.log('Error: ' + err);
//    });
});

myApp.onPageInit('add-group', function (page) {
    $$('#ag-upload-btn-1').on('click', function () {
        navigator.camera.getPicture(onSuccessUpload, onFail, {
            quality: 50,
        });
    });
});

myApp.onPageInit('payment', function (page) {
    $$('#buyNowBtn').click(function(){
       PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
    });

//    var height = $('.views').innerHeight();
//    var width = $('.views').innerWidth()-20;
//    $$("iframe").attr('src', 'http://vaultron.streaklink.com/index.php').css({height:height+'px', width:width+'px', 'overflow-y':'hidden'});
});

function onSuccessUpload(imageURI) {
    var image = document.getElementById('ag-img-1');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
function callForFiendList(){
   $Ajax({}, 'getFriendList', 'friend_list');
}

function $login_success(data){
//    console.log(data);
    data = JSON.parse(data);
    if (data.error) {
       myApp.alert(data.message, '');
    } else {
        mainView.router.loadPage('home.html');
        setSession(data);
    }
}

function $signup_success(data){
    data = JSON.parse(data);
    if (data.error) {
       myApp.alert(data.message, '');
    } else {
        mainView.router.loadPage('home.html');
        setSession(data);
//        myApp.alert(data.message, '');
    }
}

function profilePicChageSuccess(data){
    data = JSON.parse(data);
    if (data.error) {
        myApp.alert(data.message, '');
    } else {
        localStorage.setItem('img', data.img);
        document.getElementById('profile-pic').src = data.img;
    }
}

function profileNameChageSuccess(data){
    data = JSON.parse(data);
    if (data.error) {
        myApp.alert(data.message, '');
    } else {
        localStorage.setItem('name', data.name);
        document.getElementById('profile-name').innerText = data.name;
    }
}

function onSuccess(contacts) {
    //myApp.alert( contacts.length);
    for (var i = 0; i < 3; i++) {
        myApp.alert(contacts[i].phoneNumbers[0].value, '');
    }
    myApp.hideIndicator();
}

function onError(contactError) {
    alert('onError!');
}

function readContacts(){
    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    //options.filter   = "Bob";
    options.multiple = true;
    //options.desiredFields = [navigator.contacts.fieldType.id];
    options.hasPhoneNumber = true;
    var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    navigator.contacts.find(fields, function(contacts){
        console.log(contacts);
//        myFriendList = myApp.virtualList('#friend-list',{
//        items: contacts,
//        // Custom render function to render item's HTML
//        renderItem: function (index, item) {
//            return '<li class="swipeout">'+
//                        '<div class="swipeout-content item-content">'+
//                            '<div class="item-media">'+
//                                   '<img src="' + item.photos + '" style="width:40px; height:30px; border-radius:50%" />'+
//                            '</div>'+
//                            '<div class="item-inner">'+
//                           ' <span>' + item.displayName + '</span>'+
//                           ' </div>'+
//                        '</div>'+
//                       ' <div class="swipeout-actions-right">'+
//                         '   <a href="#" class="swipeout-delete"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a>'+
//                      '  </div>'+
//                   ' </li>';
//        }
//    });
//        myApp.alert('Found ' + contacts.length + ' contacts.');
    }, function(){}, options);
}
function friend_list(data){
    myFriendList = myApp.virtualList('#friend-list',{
        items: JSON.parse(data),
        // Custom render function to render item's HTML
        renderItem: function (index, item) {
            return '<li class="swipeout">'+
                        '<div class="swipeout-content item-content">'+
                            '<div class="item-media">'+
                                   '<img src="' + item.img + '" style="width:40px; height:30px; border-radius:5%" />'+
                            '</div>'+
                            '<div class="item-inner">'+
                           ' <span>' + item.name + '</span>'+
                           ' </div>'+
                        '</div>'+
                       ' <div class="swipeout-actions-right">'+
                         '   <a href="#" class="swipeout-delete"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a>'+
                      '  </div>'+
                   ' </li>';
        }
    });
    myApp.pullToRefreshDone();
//    readContacts();
}

