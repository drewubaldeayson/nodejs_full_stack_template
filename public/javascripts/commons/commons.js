function successEditVisitorButton_OnClick() {
    document.getElementById("success_alert_modal").classList.toggle("show-success-update-modal");
}

/* Go back First Page */
function _gotoFirstPage() {
    window.location.href = "/visitor_page";

    return false
}


function isEmpty(field){
    return field.length > 0
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


//logger in console or alert
function print_log(message, alertEnable = true, consoleEnable = false) {
    if (alertEnable) {
        alert(message + Date.now());
    }

    if (consoleEnable) {
        console.log(Date.now() + ":" + message)
    }
}




