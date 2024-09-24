function config() {

    let dni_elements = {
        numero: document.getElementById("dni-number") || {},
        surname: document.getElementById("dni-surname") || {},
        name: document.getElementById("dni-name") || {},
        sex: document.getElementById("dni-sex") || {},
        birth: document.getElementById("dni-birth") || {},
        issue: document.getElementById("dni-issue") || {},
        expiration: document.getElementById("dni-expiration") || {},
        tramite_num: document.getElementById("dni-tramite-num") || {},
        ejemplar: document.getElementById('dni-ejemplar') || {},
        image: document.getElementById('dni-image') || {},
        address: document.getElementById('dni-address') || {},
        mrz: document.getElementById('dni-mrz') || {},
        firma: document.getElementById('dni-firma')
    }

    dni_elements.surname.innerText = localStorage.getItem('dni_surname') || 'APELLIDO'
    dni_elements.name.innerText = localStorage.getItem('dni_name') || 'NOMBRE EJEMPLO'
    dni_elements.sex.innerText = localStorage.getItem('dni_sex') || 'E'
    dni_elements.birth.innerText = localStorage.getItem('dni_birthdate') || '22 JUN/ JUN 2022'
    dni_elements.issue.innerText = localStorage.getItem('dni_emission') || '22 SET/ SET 2012'
    dni_elements.expiration.innerText = localStorage.getItem('dni_expiration') || '22 SET/ SET 2042'
    dni_elements.tramite_num.innerText = localStorage.getItem('dni_tramite_num') || '0123456789012345'
    dni_elements.ejemplar.innerText = localStorage.getItem('dni_ejemplar') || 'A'
    dni_elements.numero.innerText = localStorage.getItem('dni_numero') || '22.333.444'
    dni_elements.image.src = localStorage.getItem('dni_image') || 'res/dni-foto.jpg'
    dni_elements.firma.src = localStorage.getItem('dni_firma') || 'res/default-dni.png'
    dni_elements.address.innerHTML = '<font style="font-size: calc(7px * var(--dni-size-multiplier)); font-weight: 500; letter-spacing: 0;">DOMICILIO</font> ' + localStorage.getItem('dni_address') || 'None'
    dni_elements.mrz.innerText = localStorage.getItem('dni_mrz')
}
