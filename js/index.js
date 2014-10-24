function validate() {
    if(document.login.username.value === '') {
        alert( "Please provide your name!" );
        document.myForm.Name.focus() ;
        return false;
    }
    if(document.login.password.value === '') {
        alert( "Please enter your password!" );
        document.myForm.Name.focus() ;
        return false;
    }
    if(document.login.password.value.length < 6 ) {
        alert("Error: Password must contain at least six characters!");
        document.myForm.Name.focus() ;
        return false;
    }
    if(document.login.username.value == 'admin' && document.login.password.value == "adminn" && document.login.password.value.length <= 6) {
        window.location.href = "feed.html";
        return false;
    } else {
        alert( "Please enter your valid username and password.." );
    }
}
