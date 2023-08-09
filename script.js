romanosValues = {
    "I" : 1,
    "V" : 5,
    "X" : 10,
    "L" : 50,
    "C" : 100,
    "D" : 500,
    "M" : 1000
}

inputUser = document.getElementById("input-num");
buttonConverter = document.getElementById("button-converter");
msgError = document.getElementById("msg-error");
buttonConverter.addEventListener('click', () => {VerificOnlyLetterOrNumbers(inputUser.value)})

function ConvertToNumber(numRoman){
   
    inputUserUp = numRoman.toUpperCase()
    valuesRomanosConverted = []
    resultOfConversion = 0

    for(i = 0; i < inputUserUp.length; i++){
        valuesRomanosConverted.push(romanosValues[inputUserUp.slice(i, i+1)])
    }

    for(i = 0; i < valuesRomanosConverted.length; i++){
        if(i != valuesRomanosConverted.length-1 && valuesRomanosConverted[i] >= valuesRomanosConverted[i+1]){
            resultOfConversion += valuesRomanosConverted[i]
        }else if(i != valuesRomanosConverted.length-1 && valuesRomanosConverted[i] < valuesRomanosConverted[i+1]){
            resultOfConversion -= valuesRomanosConverted[i]
        }else{
            resultOfConversion += valuesRomanosConverted[i]
        }
    }

    if(isNaN(resultOfConversion)){
        msgError.innerHTML = "Caracteres inválidos"
        msgError.classList.add("styleError");
        setTimeout(function () {msgError.classList.remove("styleError")}, 3000);         
    }else if(resultOfConversion > 3999){
        msgError.innerHTML = "O valor convertido deve ser menor que 3999"
        msgError.classList.add("styleError");
        setTimeout(function () {msgError.classList.remove("styleError")}, 3000);      
    }else{
        ResultShow(resultOfConversion)
    }    
}

function ConvertForRoman(number){

    unidades = 0
    dezenas = 0
    centenas = 0
    milhar = 0
    romanoConverted = ""

    if(number <= 0 || number > 3999){
        msgError.innerHTML = "Convertor suporta apenas números inteiros de 1 a 3999"
        msgError.classList.add("styleError");
        setTimeout(function () {msgError.classList.remove("styleError")}, 3000); 
    }

    if(number >= 1000 && number < 4000){milhar = parseInt(number[0])}

    unidades = parseInt(number[number.length-1])

    if(number > 9){dezenas = (parseInt(number.slice(number.length-2, 4)) - unidades) / 10}

    if(number > 99){centenas = (number - milhar * 1000 - dezenas * 10 - unidades) / 100}

    if(milhar > 0){
        for(i = 0; i < milhar; i++){romanoConverted += "M"}
    }

    if(centenas > 0 && centenas < 4){
        for(i = 0; i < centenas; i++){romanoConverted += "C"}  
    }else if(centenas == 4){
        romanoConverted += "CD"
    }else if(centenas == 5){
        romanoConverted += "D"
    }else if(centenas > 5 && centenas < 9){
        romanoConverted += "D"
        for(i = 0; i < (centenas - 5 ); i++){romanoConverted += "C"}
    }else if(centenas == 9){
        romanoConverted += "CM"
    }

    if(dezenas > 0 && dezenas < 4){
        for(i = 0; i < dezenas; i++){romanoConverted += "X"} 
    }else if(dezenas == 4){
        romanoConverted += "XL"
    }else if(dezenas == 5){
        romanoConverted += "L"
    }else if(dezenas > 5 && dezenas < 9){
        romanoConverted += "L"
        for(i = 0; i < (dezenas - 5 ); i++){romanoConverted += "X"}
    }else if(dezenas == 9){
        romanoConverted += "XC"
    }

    if(unidades > 0 && unidades < 4){
        for(i = 0; i < unidades; i++){romanoConverted += "I"} 
    }else if(unidades == 4){
        romanoConverted += "IV"
    }else if(unidades == 5){
        romanoConverted += "V"
    }else if(unidades > 5 && unidades < 9){
        romanoConverted += "V"
        for(i = 0; i < (unidades - 5 ); i++){romanoConverted += "I"}
    }else if(unidades == 9){
        romanoConverted += "IX"
    }

    if(number > 0 && number < 3999){
        ResultShow(romanoConverted)
    }
    
}

function VerificOnlyLetterOrNumbers(string){

    nums = 0
    letters = 0

    for(i = 0; i < string.length; i++){
        if(isNaN(string.slice(i, i+1))){
            letters += 1
        }else{
            nums += 1
        }
    }

    if(nums > 0 && letters > 0){
        msgError.innerHTML = "Não pode misturar letras com números"
        msgError.classList.add("styleError");
        setTimeout(function () {msgError.classList.remove("styleError")}, 3000);
    }else{
        if(nums == 0){ConvertToNumber(string)}
        if(letters == 0){ConvertForRoman(string)}    
    }
}

function ResultShow(result){
    resultInput = document.getElementById("result");
    resultInput.innerHTML = result
}