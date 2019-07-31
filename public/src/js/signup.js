
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  
  var signupButton = document.getElementById('btnSignup');


  //add login event 
//   btnLogin.addEventListener('click', event => {
//       event.preventDefault();
//       var txtEmail = email.value;
//       var txtPassword = password.value;
//       const auth = firebase.auth();

//       const promise = auth.signInWithEmailAndPassword(txtEmail,txtPassword);
//       promise.catch(err => console.log(err));


//   })



  signupButton.addEventListener('click',e => {
      
    e.preventDefault();
    loadingState(btnSignup);
    var txtName = name.value;
    var txtEmail = email.value;
    var txtPassword = password.value;
    console.log(txtName)
    fetch('/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: txtName,
            password: txtPassword
        })
    })
    .then(response => {
        response.json()
        .then(res => {
            if(res._id) {
                window.location.href = '/myAccount/' + res.username;
            }
            else {
                console.log(res)
            }
        })
    })
  });
  
  
  
function loadingState(el) {
    el.style.opacity = '0.5';
}
function notLoadingState(el) {
    el.style.opacity = '1.0';
}