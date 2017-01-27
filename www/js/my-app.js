//var API_URL = 'http://api.streaklink.com/v1/';
var API_URL='http://api.streaklink.com/v1/';
//var API_URL = 'http://localhost:8080/api/index.php/api/home/';
var myFriendList = null;
// Initialize your app
var myApp = new Framework7({
    pushState: true,
    // ... other parameters
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

function $Ajax(postdata, API, m){
    myApp.showIndicator();
    var api_key=localStorage.getItem("api_key");
    var headers={};
    if((api_key!==null)&&(api_key.trim()!=''))
    {
        headers= {"Authorization":api_key};
    }
    $$.ajax({
           url: API_URL + API,
            headers: headers,
            type: "POST",
            //contentType: "application/json",
            data: postdata,
            //data: JSON.stringify(postdata),
            // if successful response received (http 2xx)
            success: function(data, textStatus ){
             // We have received response and can hide activity indicator
             myApp.hideIndicator();
             window[m](data,postdata);
               data = JSON.parse(data);
               myApp.alert(data['message']);
             if (data['error']) {return}
//
//             var username = data.username;

//             Will pass context with retrieved user name
//             to welcome page. Redirect to welcome page
//            mainView.router.load({
//             template: Template7.templates.welcomeTemplate,
//             context: {
//              name: username
//             }
//           });
            },
            error: function(xhr, textStatus, errorThrown){
                // We have received response and can hide activity indicator
                myApp.hideIndicator();
                console.log(xhr.response);
                //myApp.alert('Some internal problem occured');
                var response = JSON.parse(xhr.response);
                myApp.alert(response['message']);

//              $$('#login-email').val('');
//              $$('#login-password').val('');
            }
        });
}


