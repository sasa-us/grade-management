$(document).ready(init);
function init() {
    // addClickHandlersToElements();
    $("#loginFormButton").on('click', loginUser);
    $("#logoutButton").on('click', logoutUser);
    $('#confirmregist').on('click', registUser);

}
// function addClickHandlersToElements() {
//     debugger;
//     $("#loginButton").on('click', loginUser);
//     $("#logoutButton").on('click', logoutUser);
// }
var user_role = null;
var myemail = null;

function loginUser() {
    var email = $('#email').val();
    var password = $('#password').val();

    logindata = {
        email: email,
        password: password,
        action: 'login'
    }
    $.ajax({
        url: 'data.php',
        data: logindata,
        dataType: 'json',
        method: 'post',
        success: function(response) {
           
            //success: true, errors: Array(0), user: {…. query selected column name from students table}
            if(response.success) {
                $('#myModal').modal('hide');
                user_role = response.user['user_role'];
                myemail = response.user['email'];
                console.log(response.user);
                console.log('db email ', myemail);
                console.log('user role is ', user_role);
                showWelcome(response.user);
            }
            else {
                activeRegister();
            }
        },
        error: function(response) {
            // console.log('server not work');
            console.log(JSON.stringify(response));

        }
    });
}

function activeRegister() {
    alert('need register');
    $('#myTab li:nth-child(1)').removeClass('active');
    $('#myTab li:nth-child(2)').addClass('active');
    
    $('div#signup').addClass('active in');
    $('div#signin').removeClass('active in');
    
}

function activelogin() {
    alert('login again please');
    $('#myTab li:nth-child(2)').removeClass('active');
    $('#myTab li:nth-child(1)').addClass('active');
    
    $('div#signin').addClass('active in');
    $('div#signup').removeClass('active in');
    
}
function showWelcome(userInfo) {
    // console.log("show welcome userinfo", userInfo);
    //{id: "1", email: "aa", name: "aa", password: "aa", rights: "0", …}
    if(userInfo) {
        $('#loginSection').hide();
        $('#logoutSection').show();
        $('#loginUserName').text(userInfo.name);
    }else {
        console.log('bye');
        $('#logoutSection').hide();
        $('#loginSection').show();
        $('#loginUserName').empty();
    }
}
function logoutUser() {
    var logoutData = {
        action: 'logout'
    };
    $.ajax({
        url: 'data.php',
        data: logoutData,
        dataType: 'json',
        method: 'post',
        success: function(response) {
            console.log( 'Logout response is ', response);
            if(response.success) {
                
                showWelcome(response.user);
            }
        },
        error: function(response) {
            console.log('server not response');
        }
    
    });
}//end logoutUser()

function registUser() {
 
    var registemail = $('#registemail').val();
    var registname = $('#registname').val();
    var registpassword = $('#registpassword').val();
    var reenterpassword = $('#reenterpassword').val();

    // checkAvailableEmail();
    if(registpassword === reenterpassword) {
        var registData = {
            email: registemail,
            name: registname,
            password: registpassword,
            action: 'register'
        }

        $.ajax({
            url: 'data.php',
            data: registData,
            method: 'post',
            dataType: 'json',
            success: function(response) {
                console.log('register response',response);
                if(response.success) {
                    //modal register success, please login /
                    //let user login again
                    activelogin(); 
                }

            },
            error: function(response) {
                console.log('server not work');
            }
        });
    } else {
        alert('check psw');
    }
 
    

}
