<?php

$target_dir = "data_temp/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "csv" && $imageFileType != "xls" && $imageFileType != "txt"
&& $imageFileType != "msg" ) {
    echo "Sorry, only CSV, TXT, XLS and MSGPACK files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " is being uploaded.";
        
        $command = escapeshellcmd('python create.py');
        $output = shell_exec($command);

    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>

<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript">
window.location.replace("create.html");
</script>