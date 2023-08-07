const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation=""
    }
    //add digit to calculator screen 
    addDigit(digit){
        if(digit === "." && this.currentOperation.includes('.')){
            return;
        }
        this.currentOperation=digit
        this.updateScreen();
    }
    // Calculator

    processOperation(operation){
        //Check if current is empty
        if(this.currentOperation.innerText===""){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return
        }


        //Get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue,operation, current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue,operation, current, previous)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue,operation, current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue,operation, current, previous)
                break;
            default:
            return;
        }
    }

    //change values of the calculator screen
    updateScreen(operationValue=null, operation = null, current=null, previous=null) {
        if (operationValue===null){
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            if (previous===0){
                operationValue = current
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }
// FALTA MUDAR PRA MUDAR PARA AS ATUALIZAÇÕES DE OPERAÇOES **testar colocar as 4 operaçoes**
    //Change math operation
    changeOperation(operation){
        const mathOperations = ["*", "+", "/", "-"];
        
        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) =>{
    btn.addEventListener("click", (e)=>{
        const value = e.target.innerText;
    
    if (+value >=0 || value=== "."){
        calc.addDigit(value)
    }else{
        calc.processOperation(value)
    }

    })
})