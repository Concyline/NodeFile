
const btnprincipal = document.getElementById('btnprincipal')
btnprincipal.addEventListener('click', checkedMenu);

const btnnewuser = document.getElementById('btnnewuser')
btnnewuser.addEventListener('click', checkedMenu);

const btnnewtoken = document.getElementById('btnnewtoken')
btnnewtoken.addEventListener('click', checkedMenu);

function checkedMenu(event){

    btnprincipal.classList.remove('selected-menu')
    btnnewuser.classList.remove('selected-menu')
    btnnewtoken.classList.remove('selected-menu')

    var targetElement = event.target || event.srcElement;

    targetElement.classList.add('selected-menu')

}

const newuser = document.getElementById('btncreatenewuser');
newuser.addEventListener('click', newUser);

function newUser() {

    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        nome: nome.value,
        email: email.value,
        password: password.value,
    });
   
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch('./user', requestOptions)
        .then(response => response.json())
        .then(result => {

            const alert = document.getElementById('alert')
            const label = document.getElementById('label')
            alert.classList.add('show')
           
            const obj = {
                nome:result.nome,
                email: result.email
            }

            label.innerHTML = `User created successifull! \n\nName: ${result.nome}\nEmail: ${result.email}`
        
            const btnclose = document.getElementById('btn-close-user')
            btnclose.addEventListener('click', ()=> {
                alert.classList.remove('show')
            })

            nome.value = ''
            email.value = ''
            password.value = ''

        })
        .catch(error => console.log('error', error));
        
}
