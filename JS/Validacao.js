const form = document.querySelector("#form");
const nome = document.querySelector("#nome");
const validEmail = document.querySelector("#Email");
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const cepInput = document.querySelector("#cep");
const cpfUs = document.querySelector("#cpf");
const comple = document.querySelector("#Complemento");
const Num = document.querySelector("#Numb");

form.addEventListener("submit", (event => {
  event.preventDefault();
  //Verifica o nome
  if (nome.value === "") {
    alert("Por favor,preencha o seu nome");
    return;
  }
  if (nome.value.length < 3) {
    alert("O nome Deve ter pelo menos 2 caracteres")
  }
  //Verifica o EMAIL

  if (validEmail.value === "" || !isEmailValid(validEmail.value)) {
    alert("Por favor Preencha o campo Email");
    return;
  }
  //verefica CEP
  if (cepInput.value === "") {
    alert("Por favor Digite seu CEP");
    return;
  } else {
    if (cepInput.value.length != 8) {
      alert("Por favor Digite o tamanho correto do CEP");
      return;
    }
  }

  //Verefica Complemento
  if (comple.value === "") {
    alert("Por favor Digite seu Completeo");
    return;
  }

  //Verefica Numero Da Casa
  if (Num.value === "") {
    alert("Por favor Digite seu Completeo");
    return;
  }
//Valida o CPF


  form.submit();
}));

function isEmailValid(email) {

  const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/);

  if (emailRegex.test(email)) {
    return true;

  }
  return false;

}


cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]/;
  const key = String.fromCharCode(e.keyCode);

  if (!onlyNumbers.test(key)) {
    e.preventDefault()
    return;
  }
});


$(function () {
  //Usar a API do ViaCep
  //Url: https://viacep.com.br/
  $(document).on('keyup change', '#signup-content [name="cep_user"]', function (e) {
    var _this = this,
      cep_value = _this.value.replace(/\D/g, '');

    if (cep_value.length == 8) {
      console.dir('Consultar CEP: ' + cep_value);

      $.getJSON("https://viacep.com.br/ws/" + cep_value + "/json/?callback=?", function (dados) {
        console.dir(dados);
        if (!("erro" in dados)) {
          //Atualiza os campos com os valores da consulta.
          $('[name="endereco_rua"]').val(dados.localidade);
          $('[name="bairro_user"]').val(dados.bairro);
          $('[name="rua_user"]').val(dados.logradouro);
          $('[name="Cidade_estado"]').val(dados.localidade + '/' + dados.uf);

        } //end if.
        else {
          //CEP pesquisado não foi encontrado.
          limpa_formulário_cep();
          alert("CEP não encontrado.");
        }
      });
    }
  });
});

//Validaçao do CPF

jQuery(document).ready(function(){
    
  var cpf_field = '#cpf';
  
  jQuery(cpf_field).blur(function(){
      var cpf = jQuery(cpf_field).val();
      if(cpf.length == 11){
          var v = [];
          //Calcula o primeiro dígito de verificação.
          v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
          v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
          v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
          v[0] = v[0] % 11;
          v[0] = v[0] % 10;
          //Calcula o segundo dígito de verificação.
          v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
          v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
          v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
          v[1] = v[1] % 11;
          v[1] = v[1] % 10;
          //Retorna Verdadeiro se os dígitos de verificação são os esperados.
          if ((v[0] != cpf[9]) || (v[1] != cpf[10])){
              jQuery(cpf_field).css("border","8px solid red");
              jQuery(cpf_field).val("");
              jQuery(cpf_field).focus();
              
          }else{
              jQuery(cpf_field).css("border","2px solid green");
          }
      }
  });
});
