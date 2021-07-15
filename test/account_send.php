   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account</title>
    <link rel="stylesheet" type="text/css" href="account.css">
</head>
<body>
    <?php
            if(isset($_POST['username'])) {
                $dsn='mysql:dbname=test_login;host=localhost;charset=utf8';
                $user='root';
                $password='';
                
                try{
                    $dbh = new PDO($dsn, $user, $password);
                    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                }catch (Exception $e){
                    echo $e->getMessage();
                }
                
                if($_POST['password'] != $_POST['password2']){
                    echo 'パスワードと確認用パスワードが異なっています';
                    return false;
                }
                
                if (!$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                    echo '入力されたemailが不正です。';
                    return false;
                }
                
                if (preg_match('/\A(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}+\z/i', $_POST['password'])) {
                    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
                } else {
                    echo 'パスワードは半角英数字をそれぞれ1文字以上含んだ8文字以上で設定してください。';
                    return false;
                }
            
                try {
                    $stmt = $dbh->prepare("INSERT INTO login (username, email, password) VALUES (:username, :email, :password)");
                    $stmt->bindParam(':username', $_POST['username']);
                    $passhash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    $stmt->bindParam(':password', $passhash );
                    $stmt->bindParam(':email', $_POST['email']);
                    $stmt->execute();
                    
                    echo "<h2>登録完了しました</h2><dl><dt>ユーザー名</dt><dd>".$_POST['username']."</dd>";
                    echo '<dt>メールアドレス</dt><dd>'.$email.'</dd></dl><br>';
                    echo '<h2>続いてプロフィールを登録しましょう<h2><br><a href="./profile.html">プロフィール登録</a>';
                } catch (\Exception $e) {
                    echo '登録済みのメールアドレスです。';
                }
            }
            ?>
    
</body>
</html> 
    