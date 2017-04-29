<?php

	  $x = $_REQUEST['x_var'];
  	$y = $_REQUEST['y_var'];
  	$flat = $_REQUEST['flat'];
  	$sample = $_REQUEST['sample'];
  	$epoch = $_REQUEST['epoch'];
  	$dims = $_REQUEST['dims'];
  	$batch_size = $_REQUEST['batch_size'];
  	$layers = $_REQUEST['layers'];
  	$neuron_first = $_REQUEST['neuron_first'];
  	$neuron_last = $_REQUEST['neuron_last'];
  	$shape = $_REQUEST['shape'];
  	$loss = $_REQUEST['loss'];
  	$optimizer = $_REQUEST['optimizer'];
  	$activation = $_REQUEST['activation'];
  	$activation_out = $_REQUEST['activation_out'];

    $b = array(
          x_var  => $x,
          y_var => $y,
          flatten => $flat,
          epoch  => $epoch,
          dims => $dims,
          batch_size => $batch_size,
          layers  => $layers,
          neuron_first => $neuron_first,
          neuron_last => $neuron_last,
          shape  => $shape,
          loss => $loss,
          optimizer => $optimizer,
          activation  => $activation,
          activation_out => $activation_out);

    #$results = print_r($b, true);
    #file_put_contents('filename.txt', print_r($b, true));

    $fp = fopen('data_temp/result.json', 'w');
    fwrite($fp, json_encode($b));
    fclose($fp);

    $command = escapeshellcmd('python result.py');
    $output = shell_exec($command);

?>

<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript">
window.location.replace("result.html");
</script>
