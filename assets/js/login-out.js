$(document).ready(init);
function init() {
    // addClickHandlersToElements();
    $("#loginFormButton").on('click', loginUser);
    $("#logoutButton").on('click', logoutUser);

}
// function addClickHandlersToElements() {
//     debugger;
//     $("#loginButton").on('click', loginUser);
//     $("#logoutButton").on('click', logoutUser);
// }
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
           
            //success: true, errors: Array(0), user: {…query selected column namne}
            if(response.success) {
                $('#myModal').modal('hide');
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
}