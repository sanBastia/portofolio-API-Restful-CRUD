$('#loginform').submit(function (e) {
  e.preventDefault()

  $.ajax({
    url: 'http://localhost:3000/user/login',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (data) {
      if (data.token) {
        localStorage.setItem('token', data.token)
        window.location.href = 'http://127.0.0.1:8080/main.html'
      }
      if (data.usernotfound) {
        swal('oops', 'Username or Password is wrong !', 'warning')
      }
      if (data.err) {
        console.log(data.err)
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
})

$('#registerform').submit(function (e) {
  e.preventDefault()

  $.ajax({
    url: 'http://localhost:3000/user/register',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (data) {
      if (data.register) {
        swal('Good job!', 'Successfull registered ! please login now', 'success')
      }
      if (data.err) {
        console.log(data.err)
      }
    },
    error: function (err) {
      console.log(err)
    }

  })
})
