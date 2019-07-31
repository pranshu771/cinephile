
  var name = document.getElementById('username');
  var password = document.getElementById('password');
  var loginButton = document.getElementById('btnLogin');
  loginButton.addEventListener('click',e => {
    
    e.preventDefault();
    loadingState(loginButton)
    var txtName = name.value;
    var txtPassword = password.value;
    fetch('/login',{
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
    if(response.ok) {
      response.json()
      .then(res => {
        if(res._id) {
          window.history.back();
        }
        else {
          console.log(res)
        }
      })
    }
  })
  
})

function loadingState(el) {
    el.style.opacity = '0.5';
}
function notLoadingState(el) {
    el.style.opacity = '1.0';
 
}