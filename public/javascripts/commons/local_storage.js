let responsesArray = localStorage.getItem('responses') ? JSON.parse(localStorage.getItem('responses')) : [];

function setLSValue(key, value) {
    responsesArray = value;
    if(IsJsonString(responsesArray)){
        localStorage.setItem(key, responsesArray);
    }else{
        localStorage.setItem(key, JSON.stringify(responsesArray));
    }
    
}

function getLSValue(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

function getAllLSValue() {
    // let values = {},
    //     keys = Object.keys(localStorage),
    //     i = keys.length;

    let values= {};

    values.visitor_info = localStorage.getItem("visitor_info");
    values.visit_purpose = localStorage.getItem("visit_purpose");
    values.host_name = localStorage.getItem("host_name");
    values.visit_type = localStorage.getItem("visit_type");
    values.has_appointment = localStorage.getItem("has_appointment");
    values.visitor_identity = localStorage.getItem("visitor_identity");
    values.host_id = localStorage.getItem("host_id");
    values.is_verified = localStorage.getItem("is_verified");
    values.verif_code = localStorage.getItem("verif_code");
    values.visitor_info_verified = JSON.parse(localStorage.getItem("visitor_info_verified"));
    // while (i--) {
    //     values.keys[i]=localStorage.getItem(keys[i]);
    // }

    return values;
}

function clearLS(){
    localStorage.clear();
}