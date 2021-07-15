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
    <div class="accountbox">
        <h1>Sign Up</h1>
        <form action="account_send.php" method="post">
            <label>ユーザー名</label>
            <input type="text" placeholder="username" name="username">
            <label>メールアドレス</label>
            <input type="email" placeholder="email" name="email">
            <label>パスワード(半角英数字をそれぞれ1文字以上含んだ8文字以上)</label>
            <input type="password" placeholder="password" name="password">
            <label>パスワード(確認)</label>
            <input type="password" placeholder="conform password" name="password2">
            <input type="submit" value="アカウント作成">
        </form>
    </div>
    
    
</body>
</html>