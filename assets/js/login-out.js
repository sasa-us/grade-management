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
            console.log( 'response is ', response);
        },
        error: function(response) {
            console.log(JSON.stringify(response));
        }
        

    });
}
function logoutUser() {
    alert('bye');
}