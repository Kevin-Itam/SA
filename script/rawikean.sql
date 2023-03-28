CREATE DATABASE rawikean;

USE rawikean;

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nome_cliente` varchar(50) DEFAULT NULL,
  `cpf_cliente` varchar(40) DEFAULT NULL,
  `contato_cliente` varchar(100) DEFAULT NULL,
  `cidade_cliente` varchar(255) default null,
  `bairro_cliente` varchar(255) default null,
  `rua_cliente` varchar(255) default null,
  `complemento_cliente` varchar(255) default null,
  `numero_cliente` varchar(255) default null,
  `cep_cliente` varchar(255) default null
);

create table ordem_servico(
    idOS int auto_increment not null primary key,
    servico varchar(255),
    status varchar(25),
    cliente int not null,
    clienteNome varchar(255),
    responsavel int not null,
    responsavelNome varchar(255)
);

CREATE TABLE `tecnico` (
  `id_tecnico` int(11) NOT NULL,
  `nome_tecnico` varchar(50) DEFAULT NULL,
  `status_tecnico` varchar(50) DEFAULT NULL,
  `cpf_tecnico` varchar(50) DEFAULT NULL,
  `contato_tecnico` varchar(50) DEFAULT NULL,
  `cidade_tecnico` varchar(255) default null,
  `bairro_tecnico` varchar(255) default null,
  `rua_tecnico` varchar(255) default null,
  `complemento_tecnico` varchar(255) default null,
  `numero_tecnico` varchar(255) default null,
  `cep_tecnico` varchar(255) default null
);

ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

ALTER TABLE `ordem_servico`
  ADD PRIMARY KEY (`id_os`),
  ADD KEY `fk_idCliente` (`cliente`);

ALTER TABLE `tecnico`
  ADD PRIMARY KEY (`id_tecnico`);

ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `ordem_servico`
  MODIFY `id_os` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tecnico`
  MODIFY `id_tecnico` int(11) NOT NULL AUTO_INCREMENT;

use rawikean;
ALTER TABLE `ordem_servico`
  ADD CONSTRAINT `fk_idCliente` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

alter table cliente add column email varchar(255);