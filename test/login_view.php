<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="main.css">
</head>
<body>
     <?php

            require_once('config.php');

            session_start();
            
            //POSTのvalidate
            if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                echo '入力されたemailの値が不正です。';
                return false;
            }
            
            //DB内でPOSTされたメールアドレスを検索
            try {
                $pdo = new PDO(DSN, DB_USER, DB_PASS);
                $stmt = $pdo->prepare('select * from login where email = ?');
                $stmt->execute([$_POST['email']]);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo $e->getMessage() . PHP_EOL;
            }
            
            //emailがDB内に存在しているか確認
            if (!isset($row['email'])) {
                echo '登録されていないメールアドレスです。';
                return false;
            }
            
            //パスワード確認後sessionにメールアドレスを渡す
            if(password_verify($_POST['pass'], $row['password']))
            {
                session_regenerate_id(true);
                $_SESSION['EMAIL'] = $row['email'];
                echo "<h2>ログインしました</h2>";
            } else {
                echo 'メールアドレス又はパスワードが間違っています。';
                return false;
            }
        
            ?>
    
</body>
</html>