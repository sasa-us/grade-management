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
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();
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
            console.log( 'LOGIN response is ', response);
            //success: true, errors: Array(0), user: {…query selected column namne}
            if(response.success) {
                $('#myModal').modal('hide');
                showWelcome(response.user);
            }
                // else {
            //     showRegiterInfo(response.error);
            //     activeRegister();
            // }
        },
        error: function(response) {
            // console.log('server not work');
            console.log(JSON.stringify(response));

        }
    });
}

function showWelcome(userInfo) {
    // console.log("show welcome userinfo", userInfo);
    //{id: "1", email: "aa", name: "aa", password: "aa", rights: "0", …}
    if(userInfo) {
        $('#loginButton').hide();
        $('#logoutButton').show();
        $('#loginUserName').text(userInfo.name);
    }else {
        $('#logoutButton').hide();
        $('#loginButton').show();
        $('#loginUserName').empty();
    }
}
function logoutUser() {
    alert('bye');
}