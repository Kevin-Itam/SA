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

function isCPF(cpfUs) {
  console.log(cpfUs);
  cpfUs = cpfUs.value.replace(/\.|-/g, "");
  console.log(cpfUs);
  if (!validaPrimeiroDigito(cpfUs))
    return false;
  if (!validaSegundoDigito(cpfUs))
    return false;

  return true;

}
var sum = 0;

function validaPrimeiroDigito(cpfUs = null) {
  let fDigit = (sumFristDigit(cpfUs) * 10) % 11;
  fDigit = (fDigit == 10 || fDigit == 11) ? 0 : fDigit;
  if (fDigit != cpfUs[9])
    return false
  return true;
}
function validaSegundoDigito(cpfUs = null) {
  let sDigit = (sumSecondDigit(cpfUs) * 10) % 11;
  sDigit = (sDigit == 10 || sDigit == 11) ? 0 : sDigit;

  if (sDigit != cpfUs[10])
    return false
  return true;
}


sumFristDigit = function (cpfUs, position = 0, sum = 0) {
  if (position > 9)
    return 0;
  return sum + sumFristDigit(cpfUs, position + 1, cpfUs[position] * ((cpfUs.length - 1) - position));
}


sumSecondDigit = function (cpfUs, position = 0, sum = 0) {
  if (position > 10)
    return 0;
  return sum + sumSecondDigit(cpfUs, position + 1, cpfUs[position] * ((cpfUs.length) - position));
}

console.log(isCPF(cpfUs));