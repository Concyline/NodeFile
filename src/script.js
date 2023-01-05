const btnprincipal = document.getElementById('btnprincipal');
btnprincipal.addEventListener('click', checkedMenu);

const btnnewuser = document.getElementById('btnnewuser');
btnnewuser.addEventListener('click', checkedMenu);

const btnnewtoken = document.getElementById('btnnewtoken');
btnnewtoken.addEventListener('click', checkedMenu);

const btnusage = document.getElementById('btnusage');
btnusage.addEventListener('click', checkedMenu);


function checkedMenu(event) {
    btnprincipal.classList.remove('selected-menu');
    btnnewuser.classList.remove('selected-menu');
    btnnewtoken.classList.remove('selected-menu');
    btnusage.classList.remove('selected-menu');

    var targetElement = event.target || event.srcElement;

    targetElement.classList.add('selected-menu');
}

const newuser = document.getElementById('btncreatenewuser');
newuser.addEventListener('click', newUser);

function newUser() {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

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

            console.log(result)

            alertUser(`User created successifull! \n\nName: ${result.nome}\nEmail: ${result.email}`)
            

            nome.value = '';
            email.value = '';
            password.value = '';
        })
        .catch(error => {
            console.log('error a', error)

            alertUser('Usuário já cadastrado')
        });
}

function alertUser( string ){
    const alert = document.getElementById('alert-newuser');
    const label = document.getElementById('label-newuser');
    alert.classList.add('show');

    label.innerHTML = string


    const btnclose = document.getElementById('btn-close-user');
    btnclose.addEventListener('click', () => {
        alert.classList.remove('show');
    });
}




const btncreatenewtoken = document.getElementById('btncreatenewtoken');
btncreatenewtoken.addEventListener('click', login);

function login() {

    const email = document.getElementById('emaillogin');
    const password = document.getElementById('passwordlogin');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        email: email.value,
        password: password.value,
    });

    console.log(raw)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch('./user/login', requestOptions)
        .then(response => response.json())
        .then(result => {
            const alert = document.getElementById('alert-login');
            const label = document.getElementById('label-login');
            alert.classList.add('show');

            label.innerHTML = `User loged successifull! \n\nCreated: ${result.created}\nExpiration: ${result.expiration}\nMessage: ${result.message}\nToken: ${result.token}`;

            const btnclose = document.getElementById('btn-close-token');
            btnclose.addEventListener('click', () => {
                alert.classList.remove('show');
            });

            nome.value = '';
            email.value = '';
            password.value = '';
        })
        .catch(error => console.log('error', error));
}
