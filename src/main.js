const baseURL = 'http://localhost:3000'
let emailHeader
let avaHeader
function checkLogin(){
  if(!localStorage.access_token){
    $('#cekresi-btn').hide()
    $('#cekongkir-btn').hide()
    $('#logout-btn').hide()
    $('#cekresi-page').hide()
    $('#history-resi').hide()
    $('#cekongkir-page').hide() 
    $('#register-page').hide()
    $('#profil-info').hide()

    $('#signin-btn').show()
    $('#register-btn').show()
    $('#login-page').show()

    $('#login-form').submit(submitLogin)
  }else{
    $('#cekresi-page').hide()
    $('#history-resi').hide()
    $('#register-page').hide()
    $('#signin-btn').hide()
    $('#register-btn').hide()
    $('#login-page').hide()
    
    $('#cekresi-btn').show()
    $('#profil-info').show()
    $('#cekongkir-btn').show()
    $('#logout-btn').show()
    profileInfo()
    cekOngkirPage()
  }
}
//REGISTER-AREA
function formRegister(){
  $('#register-page').show()
  $('#login-page').hide()

  $('#register-form').submit(submitRegister)
}

function submitRegister(event){
  event.preventDefault()

  const email = $('#register-email').val()
  const password = $('#register-password').val()
  $.ajax({
    url: `${baseURL}/user/register`,
    method:'POST',
    data: {
      email, password
    }
  })
  .done(_=>{
    checkLogin()
  })
  .fail(err=>{
    console.log(err);
  })
}
//END-REGISTER-AREA
//LOGIN-AREA
function submitLogin(event){
  event.preventDefault()
  const email = $('#login-email').val()
  const password = $('#login-password').val()
  $.ajax({
    url: `${baseURL}/user/login`,
    method:'POST',
    data: {
      email, password
    }
  })
  .done(result=>{
    $('#login-email').val('')
    $('#login-password').val('')
    emailHeader = result.email
    avaHeader = result.link_avatar

    localStorage.setItem('access_token', result.access_token)
    checkLogin()
  })
  .fail(err=>{
    console.log(err);
  })
}
function githubLogin(){
  $.ajax({
    url: `${baseURL}/login/github`,
    method:'GET'
  })
  .done(data=>{
    console.log(data);
    localStorage.access_token = data.access_token
  })
  .fail(err=>{
    console.log(err);
  })
}

function profileInfo(){
  $('#email-header').empty()
  $('#email-header').append(emailHeader)
}

//END-LOGIN-AREA

function logout(){
  localStorage.removeItem('access_token')
  $('#avatar-header').empty()
  $('#email-header').empty()
  checkLogin()
}

//CEK-ONGKIR-AREA
function getCities(){
  let result = []
  $.ajax({
    url: `${baseURL}/ongkir`,
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(data =>{
    data.forEach(res=>{
      result.push({label : `${res.city_name}`, value: `${res.id}`})
    })
  })
  .fail(err=>{
    console.log(err);
  })
  return result
}

function cekOngkirPage(){
  profileInfo()
  $('#cekongkir-page').show()

  $('#cekresi-page').hide()
  $('#origin').val('')
  $('#destination').val('')
  $('#weight').val('')
  $('#courier').val('')
  $('#list-ongkir').empty()
  
  const data = getCities()
  $('#origin').autocomplete({
    source: data
  });
  $('#destination').autocomplete({
    source: data
  });

  $('#form-cek-ongkir').submit(submitCekOngkir)
}

function submitCekOngkir(event){
  event.preventDefault()
  $('#list-ongkir').empty()

  const origin = $('#origin').val()
  const destination = $('#destination').val()
  const weight = $('#weight').val()


  $.ajax({
    url: `${baseURL}/ongkir`,
    method: 'POST',
    data: {
      origin, destination, weight
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(data =>{
    data.forEach(logistik=>{
      logistik.costs.forEach(cost=>{
        $('#list-ongkir').append(`
        <div class="flex flex-row justify-evenly gap-2">
            <div class="flex flex-col">
              <span class="block text-gray-600">Logistik</span>
              <span class="block uppercase">${logistik.code}</span>
            </div>
            <div class="flex flex-col">
              <span class="block text-gray-600">Jenis Layanan</span>
              <span class="block">${cost.service}</span>
            </div>
            <div class="flex flex-col">
              <span class="block text-gray-600">Estimasi Waktu</span>
              <span class="block">${cost.cost[0].etd}</span>
            </div>
            <div class="flex flex-col">
              <span class="block text-gray-600">Tarif</span>
              <span class="block">${cost.cost[0].value}</span>
            </div>
          </div>
          <br>
        `)
      })
    })
  })
  .fail(err=>{
    console.log(err);
  })
}
//END-CEK-ONGKIR

//CEK-RESI-AREA
function cekResiPage() {
  profileInfo()
  $('#cekresi-page').show()

  $('#cekongkir-page').hide()
  $('#awb').val('')
  $('#history-resi').empty()
  
  $('#form-cek-resi').submit(submitResi)  
}

function submitResi(event){
  event.preventDefault()
  $('#history-resi').empty()

  const courier = $('#courier-name').val()
  const awb = $('#awb').val()

  $.ajax({
    url: `${baseURL}/resi?courier=${courier}&awb=${awb}`,
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
  }
  })
    .done(data => {
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
//END-CEK-RESI

$(document).ready(function() {
  checkLogin()
  $('#register-btn').click(formRegister)
  $('#signin-btn').click(checkLogin)
  $('#logout-btn').click(logout)
  $('#cekresi-btn').click(cekResiPage)
  $('#cekongkir-btn').click(cekOngkirPage)
  $('#github-login-btn').click(githubLogin)
})