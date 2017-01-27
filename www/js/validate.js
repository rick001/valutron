function valid_login(data){
    if(isEmpty(data.email)){
        myApp.alert('Email ID is Required', '');
        return false;
    }

    if(!isEmail(data.email)){
        myApp.alert('Invalid Email ID', '');
        return false;
    }

    if(isEmpty(data.password)){
         myApp.alert('Password id is required', '');
        return false;
    }
    return true;
}

function valid_signup(data){

    if(isEmpty(data.name)){
        myApp.alert('Name is Required', '');
        return false;
    }

    if(isEmpty(data.email)){
        myApp.alert('Email ID is Required', '');
        return false;
    }
    if(!isEmail(data.email)){
        myApp.alert('Invalid Email ID', '');
        return false;
    }

    if(isEmpty(data.password)){
         myApp.alert('Password id is required','');
        return false;
    }
    return true;
}

function valid_event(data){

    if(isEmpty(data.img)){
        myApp.alert('Select an Event Image', '');
        return false;
    }

    if(isEmpty(data.title)){
        myApp.alert('Event Name is Required', '');
        return false;
    }

    if(isEmpty(data.desc)){
        myApp.alert('Event Description is Required', '');
        return false;
    }

    if(isEmpty(data.start_date)){
        myApp.alert('Event Start Date is Required', '');
        return false;
    }

    if(isEmpty(data.end_date)){
         myApp.alert('Event End Date is Required','');
        return false;
    }
    return true;
}
function isEmail(val) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(val);
}

function isUrl(val) {
    return (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(val));
}

function isDecimal(val) {
    var regx = /^[ 0-9 .]+$/;
    return regx.test(val);
}

function isAlphaOnly(val) {
    var regx = /^[ a-z A-Z ]*$/;
    return regx.test(val);
}

function isNumeric(val) {
    var regx = /^[0-9]*$/;
    return regx.test(val);
}

function isEmpty(val) {
    if(String(val).trim() === ''){
        return true;
    }else{
        return false;
    }
}
