//Reverse
export const reverse = (pasword:string) =>{
    var reverse = ""
    for (let i=(pasword.length-1); i>=0; i--){
        reverse+=pasword[i];
    }
    return reverse;
}

//Alert
export const showAlert = (text:string,time:number,type:string) =>{
    const alertHolder : HTMLDivElement = document.querySelector('.alertHolder') as HTMLDivElement;
    const alertText : HTMLParagraphElement = document.getElementById('alertText') as HTMLParagraphElement;
    alertText.innerText = text;
    
    setTimeout(function(){alertHolder.classList.toggle(`${type}`);}, Number(time));
    alertHolder.classList.toggle(`${type}`);
}

