$(document).ready(initializeApp);
function initializeApp() {
    $('#sendData').on("click", sendClicked);
   
}
function sendClicked() {
   var modalNo = $('#modalNo').val();
   console.log(modalNo);
   $.ajax({
    
    url: 'data.php',
    method: 'POST',
    dataType: "json",
    data: {
          modalNo: modalNo
    },
    success: function(response) {
          console.log('response: ', response);
        
    }
});

}

