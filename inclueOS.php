<?php
    include 'conexao.php';

    $nomeCli =      $_POST['nomeCliente'];      //PEGA O NOME DO CLIENTE
    $emailCli =     $_POST['emailCliente'];     //PEGA O EMAIL DO CLIENTE
    $cpfCli =       $_POST['cpfCliente'];       //PEGA O CPF DO CLIENTE
    $contatoCli =   $_POST['contatoCliente'];   //PEGA O CONTATO DO CLIENT

    if(mysqli_query($con, "INSERT INTO cliente(nome_cliente,cpf_cliente,contato_cliente,email) VALUES('$nomeCli','$cpfCli','$contatoCli','$emailCli')")){
        echo '<script> Alert("Inserido com sucesso no banco de dados"); </script>';
    }else{
        echo '<script> Alert("Foi encontrado um erro de SQL") </script>';
        echo 'Erro: '.mysqli_error($con);
    }
?>