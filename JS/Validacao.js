const form = document.querySelector("#form");
const nome = document.querySelector("#nome");
const validEmail = document.querySelector("#Email");
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

form.addEventListener("submit",(event=>{
  event.preventDefault();
  //Verifia o nome
  if(nome.value === ""){
    alert("Por favor,preencha o seu nome");
    return;
  }
  if(nome.value.length < 3){
    alert("O nome Deve ter pelo menos 2 caracteres")
  }
   //Verifia o EMAIL

  if(validEmail.value === "" ||!isEmailValid(validEmail.value)){
    alert("Por favor Preencha o campo Email");
    return;
  }

  form.submit();
}));

function isEmailValid(email){

  const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/);

  if(emailRegex.test(email)){
    return true;

  }
  return false;

}