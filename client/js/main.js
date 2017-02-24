$(document).ready(function () {
  if (!localStorage.getItem('token')) {
    window.location.href = 'http://127.0.0.1:8080/index.html'
  }
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal()
})

$('#formdata').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/cms/data',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (msg) {
      if (msg.success) {
        $('#modalcreatedata').modal('close')
        let table = `<tr id="row_${msg.success._id}">
          <td>${msg.success.letter}</td>
          <td>${msg.success.frequency}</td>
          <td>
            <button class="btn waves-effect waves-light teal accent-2" onclick="editing('${msg.success._id}')">edit
            <i class="material-icons right">mode_edit</i>
           </button>
           <button class="btn waves-effect waves-light red darken-4" onclick="deleting('${msg.success._id}')">Delete
             <i class="material-icons right">delete</i>
            </button>
         </td>
        </tr>`

        $('#formbody').append(table)
        $('#datafrequency').val('')
        $('#dataletter').val('')
      }

      if (msg.err) {
        console.log(err)
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
})

$('#formedit').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/cms/edit',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (msg) {
      $('#modalediting').modal('close')
      if (msg.update) {
        let table = `<td>${msg.update.letter}</td>
          <td>${msg.update.frequency}</td>
          <td>
            <button class="btn waves-effect waves-light teal accent-2" onclick="editing('${msg.update._id}')">edit
            <i class="material-icons right">mode_edit</i>
           </button>
           <button class="btn waves-effect waves-light red darken-4"  onclick="deleting('${msg.update._id}')">Delete
             <i class="material-icons right">delete</i>
            </button>
         </td>`
        $(`#row_'${msg.id}'`).html(table)
      }

      if (msg.err) {
        console.log(err)
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
})

$('#formbody').ready(function () {
  $.ajax({
    url: 'http://localhost:3000/cms/data',
    type: 'GET',
    success: function (msg) {
      if (msg.read) {
        let table = ''
        msg.read.forEach(function (item) {
          table += `<tr id="row_${item._id}">
            <td>${item.letter}</td>
            <td>${item.frequency}</td>
            <td>
              <button class="btn waves-effect waves-light teal accent-2" onclick="editing('${item._id}')">edit
              <i class="material-icons right">mode_edit</i>
             </button>
             <button class="btn waves-effect waves-light red darken-4"  onclick="deleting('${item._id}')">Delete
               <i class="material-icons right">delete</i>
              </button>
           </td>
          </tr>`
        })
        $('#formbody').html(table)
      }

      if (msg.err) {
        console.log(msg.err)
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
})

$('#formsearch').submit(function (e) {
  e.preventDefault()

  $.ajax({
    url: 'http://localhost:3000/cms/search',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function (data) {
      if (data.success) {
        let table = ''
        data.success.forEach(function (item) {
          table += `<tr>
            <td>${item.letter}</td>
            <td>${item.frequency}</td>
          </tr>`
        })
        $('#searchformbody').html(table)
        $('#modalsearch').modal('open')
      }
    },
    error: function (err) {}

  })
})

function deleting (value) {
  swal({
    title: 'Are you sure?',
    text: 'You will Delete this row !',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: true
  },
    function () {
      $.ajax({
        url: 'http://localhost:3000/cms/data',
        type: 'DELETE',
        data: {
          objid: value
        },
        dataType: 'json',
        success: function (data) {
          if (data.delete)
            $(`#row_${value}`).remove()
          else
            console.log(data.err)
        },
        error: function (err) {
          console.log(err)
        }
      })
    })
}

function editing (value) {
  $.ajax({
    url: `http://localhost:3000/cms/edit/${value}`,
    type: 'GET',
    success: function (data) {
      if (data.update)
        $('#modalediting').modal('open')
      $('#editingletter').val(`${data.update.letter}`)
      $('#editingfrequency').val(`${data.update.frequency}`)
      $('#hiddenobjid').val(`${data.update._id}`)
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function logout () {
  localStorage.removeItem('token')
  window.location.href = 'http://127.0.0.1:8080/index.html'
}
