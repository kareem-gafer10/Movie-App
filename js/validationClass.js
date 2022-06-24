import { RgxPattens } from "./variables.js";
export class Validation {
    constructor() {
        this.RgxPattens = RgxPattens;
    }

 
    IsValidInput(Pattern, inputElement) {
        if (Pattern.test($(inputElement).val())) {
            $(inputElement).next().css("display", "none");
            return true;
        } else {
            $(inputElement).next().css("display", "block");
            return false;
        }
    }


    startValidation() {
          
        let ValidfunOfThis= this.IsValidInput; 
        $(".userInput").keyup(function (e) {
           
            let RgxName = $(this).attr("id");
            const RgxPattern = RgxPattens.get(`${RgxName}`);
            let status = ValidfunOfThis(RgxPattern , this);
            $(this).attr("valid", `${status}`);
        });
    }

 
    validateRePassInput(){
        let passInValue = $("#userPass").val();
        if ($(this).val() == passInValue) {
            $(this).next().css("display", "none");
            $(this).attr("valid", "true");
        } else {
            $(this).next().css("display", "block");
        }
    }
    
  
    submitDataValidation() {
        let allInputsValid;
        let inputs = Array.from($("#contactform").find("input"));
        inputs.forEach(element => {
            allInputsValid = $(element).attr("valid");
        });
        if (allInputsValid == "true") {
            $("#contactform").fadeOut(400, () => {
                $(".success-feedBack")
                    .fadeIn(400)
                    .addClass("d-flex");
            })
        } else {
            alert("Enter valid Data");
        }
    }

}