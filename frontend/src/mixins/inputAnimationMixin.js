//--------- Animation du titre des inputs, effet Material Design ---------// 

export default {
    methods: {
        // ajoute classe 'focus' au focus
        addClassFocus(element) {
            let inputDiv = document.querySelector(`${element}`);
            inputDiv.classList.add("focus");  
        },
        // enlève la classe au blur v-on:blur
        removeClassFocus(element) {
            let inputDiv = document.querySelector(`${element}`);
            let input = document.querySelector(`${element} > .input`);
            if (input.value == "") {
                inputDiv.classList.remove("focus");
            }
        },
    }   
  };