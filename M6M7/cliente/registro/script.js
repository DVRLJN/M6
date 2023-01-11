
function validateForm() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let mail = false;
    let pas = false;
    if(validateEmail(email)){
        console.log(validateEmail);
        mail = true;
    }
    if(pass.length > 7 && pass.length < 16){
       pas =  validatePass(pass);
    }
    if(mail&&pas){
        return true;
    }
    return false;
}
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
       return true;
    }
       return false;
    
}
function validatePass(pass) {
    resultat = true;
    resultat = resultat && /[a-z]+/.test(pass);
    resultat = resultat && /[A-Z]+/.test(pass);
    resultat = resultat && /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~)]/.test(pass);
    return resultat;
   
}  
    
