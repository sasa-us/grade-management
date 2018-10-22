$(document).ready(init);

function stopSubmit() {
    registUser();
    return false;
}

function init() {
    $('#logoutSection').hide();    
    $("#loginFormButton").on('click', loginUser);
    // $("#logoutButton").on('click', logoutUser);
    $("#logoutButton").on('click', handleLogout);
    // $('#confirmregist').on('click', registUser);
    // $('#confirmregist').on("click", function(e) {
    //     debugger;
    //     e.preventDefault();
    //     e.stopPropagation();
    //     registUser();
    // });
    checkLoginStatus();
}

var user_role = null;
var myemail = null;
var myname = null;
var myid = null;

function checkLoginStatus() {
    $.ajax({
        url: 'data.php',
        data: {
            action: 'checkLogin'
        },
        method: 'post',
        dataType: 'json',
        success: function (response) {
            console.log('check login status user is logged in', response);
            //response is 
            //{ success: true, loginuser : {id: "1", email: "aa", name: "aa", password: "aa", user_role: "student",}
            //console.log(response.loginuser.name);
            //console.log(response.loginuser.user_role);
            if(response.success == false){
                $('#firstopenModal').modal();
                $('.student-list').after('<div class="emptywarning"> <h3>Empty Data.</h3> <h5> Please Login to get fully authority. Non login user <strong>CANNOT \'UPDATE\'</strong> , <strong>\'Calculate Average\'</strong>, and will <strong>LOST data</strong> after click \'calculator\'! </h5></div>');
            }
            else if(response.success) {
                showWelcome(response.loginuser);
                user_role = response.loginuser.user_role;
                myemail = response.loginuser.email;
                myid = response.loginuser.id;
                clearEmptyTableWarning();
                getDB();
            } 
        }
    })
}



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
        success: function (response) {

            //success: true, errors: Array(0), user: {…. query selected column name from students table}
            if (response.success) {
                $('#myModal').modal('hide');
                user_role = response.user['user_role'];
                myemail = response.user['email'];

                myid = response.user['id'];
                myname = response.user['name'];

                // console.log(response.user);
                console.log('db email ', myemail);
                console.log('user role is ', user_role);
                console.log(myid);
                console.log(myname);
                showWelcome(response.user);
                clearEmptyTableWarning();
                getDB();
            } else {
                activeRegister();
            }
        },
        error: function (response) {
            // console.log('server not work');
            console.log(JSON.stringify(response));

        }
    });
}

function activeRegister() {
    $('#myTab li:nth-child(1)').removeClass('active');
    $('#myTab li:nth-child(2)').addClass('active');

    $('div#signup').addClass('active in');
    $('div#signin').removeClass('active in');

}

function activelogin() {
    setTimeout(function () {
        $('#loginAfterRegisterModal').modal();
    }, 3000);

    $('#myTab li:nth-child(2)').removeClass('active');
    $('#myTab li:nth-child(1)').addClass('active');

    $('div#signin').addClass('active in');
    $('div#signup').removeClass('active in');

}

function showWelcome(userInfo) {
    // console.log("show welcome userinfo", userInfo);
    //{id: "1", email: "aa", name: "aa", password: "aa", rights: "0", …}
    if (userInfo) {
        $('#loginSection').hide();
        $('#logoutSection').show();
        $('#loginUserName').text(userInfo.name);
    } else {
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
        success: function (response) {
            console.log('Logout response is ', response);
            if (response.success) {
                window.location.reload(true);
                showWelcome(response.user);
                $("tbody").empty();
                $('.avgGrade').text('');
                $('.student-list').after('<div class="emptywarning"> <h3>Empty Data.</h3> <h5> Please Login to get fully authority. Non login user can only <strong>\'ADD\'</strong> and <strong>\'DELETE\'</strong> </h5></div>');
                // window.localStorage.clear();
            }
        },
        error: function (response) {
            console.log('server not response');
        }

    });
} //end logoutUser()

function handleLogout() {
    
    showLogoutConfirmModal();
        $('#logout-confirm-modalconfirm').on('click', function () {
              $('#deleteModal').modal('hide');
              logoutUser();
        });
}

function showLogoutConfirmModal() {
    $('#logout-confirmModal').modal('show');
}

function registUser(event) {
    
    var registemail = $('#registemail').val();
    var registname = $('#registname').val();
    var registpassword = $('#registpassword').val();
    var reenterpassword = $('#reenterpassword').val();
    
    // var pattern = ".{4,10}"
    // var patternRegex = new RegExp(pattern)
    // if(!patternRegex.test(registpassword)) {
    //      alert('password less than 4');
    //      return;
    // }

    // checkAvailableEmail();
    if (registpassword === reenterpassword) {
        // event.preventDefault();
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
            success: function (response) {
                console.log('register response', response);
                if (response.success) {
                    //modal register success, please login /
                    //let user login again
                    activelogin();
                }

            },
            error: function (response) {
                console.log('server not work');
            }
        });
    } else {
        $('#passwordUnmatchModal').modal();

    }

}//end registUser()

