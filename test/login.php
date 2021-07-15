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
    <div class="loginbox">
        <img src="man.png" class="man">
        <h1>ログイン</h1>
        <form action="./login_view.php" method="post">
            <p>メールアドレス</p>
            <input type="email" name="email" placeholder="email">
            <p>パスワード</p>
            <input type="password" name="pass" placeholder="password">
            <input type="submit" name="login" value="ログイン">
            <input type="submit"  onclick="location.href='./account.php'" name="" value="新規会員登録">
            <a href="./account.php">パスワードを忘れましたか？</a>

        </form>
    </div>
    
</body>
</html>