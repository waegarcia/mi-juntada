function saveData(){
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
    
    let dni = {
        number: document.getElementById("dni-number").value || null,
        name: document.getElementById("dni-name").value.toUpperCase() || null,
        surname: document.getElementById("dni-surname").value.toUpperCase() || null,
        birthdate: new Date((document.getElementById("dni-birth").value).replace(/-/g, '\/')) || null,
        emission_date: new Date((document.getElementById("dni-emission").value).replace(/-/g, '\/')) || null,
        expiration_date: new Date((document.getElementById("dni-expiration").value).replace(/-/g, '\/')) || null,
        tramite_number: document.getElementById("dni-tramite-num").value || null,
        ejemplar: document.getElementById("dni-ejemplar").value || null,
        sex: null,
        cuil: [document.getElementById('dni-first-cuil').value, document.getElementById('dni-last-cuil').value],
        image: document.getElementById('dni-image-viewer').src,
        firma: document.getElementById('dni-firma-viewer').src,
        address: document.getElementById('dni-address').value || null,
    }

    let checkboxes = {
        m: document.getElementById('dni-sex-m'),
        f: document.getElementById('dni-sex-f')
    }

    if(checkboxes.m.checked){
        dni.sex = 'M'
    }else{
        dni.sex = 'F'
    }

    function formatDatesForDNI(dateObj) {
        let month_name = months[dateObj.getMonth()]
        let day_number = dateObj.getDate();
        let year = dateObj.getFullYear()
        return `${day_number} ${month_name}/ ${month_name} ${year}`
    }

    function formatDatesForMRZ(dateObj) {
        let month = String(dateObj.getMonth() + 1).padStart(2, "0");
        let day_number = String(dateObj.getDate()).padStart(2, "0");;
        let year = String(dateObj.getFullYear()).slice(-2).padStart(2, "0");
        return `${year}${month}${day_number}`
    }
    const mrz_data = {
        surnames: String(dni.surname).toUpperCase(),
        expiration: String(formatDatesForMRZ(dni.expiration_date)),
        birthdate: String(formatDatesForMRZ(dni.birthdate)),
        names: dni.name,
        dni: dni.number,
        sex: dni.sex,
    }

    //Saving dni number
    localStorage.setItem('dni_numero_raw', dni.number);
    localStorage.setItem('dni_numero', String(dni.number).replace(/(.)(?=(\d{3})+$)/g,'$1.'));

    //Saving name
    localStorage.setItem('dni_name_raw', dni.name);
    localStorage.setItem('dni_name', String(dni.name).toUpperCase());

    //Saving surname
    localStorage.setItem('dni_surname_raw', dni.surname);
    localStorage.setItem('dni_surname', String(dni.surname).toUpperCase());

    //Saving sex
    localStorage.setItem('dni_sex_raw', dni.sex);
    localStorage.setItem('dni_sex', String(dni.sex).toUpperCase())

    //Saving birth
    localStorage.setItem('dni_birthdate_raw', dni.birthdate);
    localStorage.setItem('dni_birthdate', formatDatesForDNI(dni.birthdate))

    //Saving emission
    localStorage.setItem('dni_emission_raw', dni.emission_date);
    localStorage.setItem('dni_emission', formatDatesForDNI(dni.emission_date))

    //Saving expiration
    localStorage.setItem('dni_expiration_raw', dni.expiration_date);
    localStorage.setItem('dni_expiration', formatDatesForDNI(dni.expiration_date))

    //Saving tramite number
    localStorage.setItem('dni_tramite_num', dni.tramite_number);

    //Saving ejemplar
    localStorage.setItem('dni_ejemplar', String(dni.ejemplar).toUpperCase());

    //Saving cuil parts
    localStorage.setItem('dni_cuil_part1', dni.cuil[0]);
    localStorage.setItem('dni_cuil_part2', dni.cuil[1]);

    //Saving address
    localStorage.setItem('dni_address', String(dni.address).toUpperCase());

    //Saving image
    localStorage.setItem('dni_image', dni.image);

    //Saving firma 
    localStorage.setItem('dni_firma', dni.firma)

    axios.post('https://mrz-generator.herokuapp.com/generate', mrz_data).then(response => {
        localStorage.setItem('dni_mrz', response.data.code);
        const button = document.querySelector("#save-btn");
        setTimeout(() => {
            window.location.href = './index.html';
        }, 500);
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#fff"><path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"></path><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path></svg>';
        button.className = "success-state";
    }).catch(error => {
        console.error(error)
    })

    

}

function preview_image(event, img_id){
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById(img_id);
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function restoreDataFromStorage(){
    let dni = getDniData();
    console.log(dni)
    document.getElementById('dni-number').value = dni.number
    document.getElementById('dni-name').value = dni.name
    document.getElementById('dni-surname').value = dni.surname

    if(String(dni.sex).toUpperCase() === "M"){
        document.getElementById('dni-sex-m').checked = true;
        document.getElementById('dni-sex-f').checked = false;
    }else{
        document.getElementById('dni-sex-f').checked = true;
        document.getElementById('dni-sex-m').checked = false;
    }

    document.getElementById('dni-birth').value = dni.birthdate;
    document.getElementById('dni-emission').value = dni.emission_date
    document.getElementById('dni-expiration').value = dni.expiration_date

    document.getElementById('dni-tramite-num').value = dni.tramite_number
    document.getElementById('dni-ejemplar').value = dni.ejemplar
    document.getElementById('dni-first-cuil').value = dni.cuil[0]
    document.getElementById('dni-last-cuil').value = dni.cuil[1]

    document.getElementById('dni-address').value = dni.address;

    document.getElementById('dni-image-viewer').src = dni.image

    document.getElementById('dni-firma-viewer').src = dni.firma
}

function getDniData(){
    let dni = {
        number: null,
        name: null,
        surname: null,
        birthdate: null,
        emission_date: null,
        expiration_date: null,
        tramite_number: null,
        ejemplar: null,
        sex: null,
        cuil: [null, null],
        image: null,
        address: null,
        firma: null,
    }

    dni.number = localStorage.getItem('dni_numero_raw');
    dni.name = localStorage.getItem('dni_name');
    dni.surname = localStorage.getItem('dni_surname');
    dni.birthdate = new Date((localStorage.getItem('dni_birthdate_raw') || '') || undefined);
    dni.emission_date = new Date((localStorage.getItem('dni_emission_raw') || '') || undefined);
    dni.expiration_date = new Date((localStorage.getItem('dni_expiration_raw') || '') || undefined);
    dni.tramite_number = localStorage.getItem('dni_tramite_num');
    dni.ejemplar = localStorage.getItem('dni_ejemplar');
    dni.sex = localStorage.getItem('dni_sex')
    dni.cuil[0] = localStorage.getItem('dni_cuil_part1')
    dni.cuil[1] = localStorage.getItem('dni_cuil_part2')
    dni.image = localStorage.getItem('dni_image')
    dni.firma = localStorage.getItem('dni_firma')
    dni.address = localStorage.getItem('dni_address')

    if(isValidDate(dni.birthdate)){
        dni.birthdate = dni.birthdate.toISOString().split('T', 10)[0]
    }else{
        dni.birthdate = null;
    }
    if(isValidDate(dni.emission_date)){
        console.log(dni.emission_date)
        dni.emission_date = (dni.emission_date).toISOString().split('T', 10)[0]
    }else{
        dni.emission_date = null;
    }
    if(isValidDate(dni.expiration_date)){
        dni.expiration_date = dni.expiration_date.toISOString().split('T', 10)[0]
    }else{
        dni.expiration_date = null;
    }
    
    return dni;
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
