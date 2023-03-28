<?php
	$login = $_POST['campoUsuariologin'];
	$senha = $_POST['campoSenhalogin'];

	if($login == 'admin' and $senha == 'adm123'){
		header('Location:menu.html');
	}else{
		header('Location:index.html');
	}
	
?>	