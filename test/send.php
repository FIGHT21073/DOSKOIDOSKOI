<!DOCTYPE html>
<html lang="ja">
    <head>
        <title>ぱんだ | </title>
        <meta charset="UTF-8">
        <meta name="description" content="ゆるゆるコスメ情報サイトぱんだ">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="../normalize.css">
    </head>
    <body class="home">
        <header><img src="../images/1606883687962.png" alt="ぱんだ　ロゴ" width="100">
        <h1>ぱんだ</h1>
        <nav>
            <ul>
                <li><a href="../TopPage/index.html">ホーム</a></li>
                <li><a href="../Log/login.php">ログイン</a></li>
                <li><a href="./send.php">会員登録</a></li>
                <li><a href="../Search/search_main.php">コスメを探す</a></li>
                <li><a href="../Post/post_send.php">レビューを投稿する</a></li>
            </ul>
        </nav>
        </header>
        <main>
            <form action="send_view.php" method="post">
                <h1>新規会員登録</h1>
                <p>レビューを投稿するためには会員登録が必要です。以下の3項目全て入力し会員登録を行ってください。</p>
                <dl>
                    <dt>ニックネーム</dt><dd><input type="text" name="name"></dd>
                    <dt>メールアドレス</dt><dd><input type="email" name="email"></dd>
                    <dt>パスワード</dt><dd><input type="password" name="password">※半角英数字それぞれ1文字以上含んだ8文字以上</dd>
                    <p class="submit"><input type="submit" id="submit" value="登録"></p>
                </dl>
            </form>
            
        </main>
        <footer>
            <ul>
                <li><a href="index.html">お問い合わせ</a></li>
                <li><a href="index.html">ぱんだについて</a></li>
            </ul>
            <p><small>&copy; 2020 ぱんだ.</small></p>
        </footer>
    </body>
</html>
