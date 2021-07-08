function cekResiPage() {
  $('#cekresi-page').show()
  $('#cekongkir-page').hide()
  $('#login-page').hide()
  $('#register-page').hide()
  $('#signin-btn').hide()
  $('#register-btn').hide()

  $('#awb').val('')
  $('#history-resi').empty()
}

function cekOngkir() {
  $('#cekongkir-page').show()
  $('#cekresi-page').hide()
  $('#login-page').hide()
  $('#register-page').hide()
  $('#signin-btn').hide()
  $('#register-btn').hide()
}

function submitResi() {
  const courier = $('#courier-name').val()
  const awb = $('#awb').val()

  $.ajax({
    url: `http://localhost:3000/resi?courier=${courier}&awb=${awb}`,
    method: 'GET',
  })
    .done(data => {
      // console.log(data.history)
      $('#history-resi').show()

      data.history.forEach(history => {
        $('#history-resi').append(`
        <div class="flex flex-row justify-evenly gap-2">
          <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <div class="w-[1px] h-full bg-green-400"></div> 
          </div>
          <div class="flex flex-col gap-2 justify-start">
            <span class="block text-gray-500">${history.date}</span>
            <span class="block">${history.desc}</span>
          </div>
        </div>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

$(document).ready(function() {
  $('#cekresi-btn').click(cekResiPage)
  $('#cekongkir-btn').click(cekOngkir)
  $('#awb-btn').click(submitResi)
})