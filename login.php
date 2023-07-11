<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  require 'db_config.php';

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM loginform WHERE username = '$username' AND password = '$password'";
  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) === 1) {
    
    $_SESSION['username'] = $username;
    header('Location: dashboard.html');
    exit;
  } else {
    
    header('Location: login.php?error=true');
    exit;
  }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login Page</title>
  <link rel="stylesheet" href="index.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
 <style>
  .custom-card {
    width: 800px;
    height: 450px;
    margin-bottom:550px;
    margin-right:200px;
  }
  
  .custom-card .card-title {
    font-size: 55px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  
  .custom-card .form-group label {
    font-size: 26px;
  }
  
  .custom-card .form-control {
    font-size: 22px;
    height: 55px;
  }
  
  .custom-card .btn-primary {
  
    height: 50px;
    line-height: 40px;
  }
</style>
</head>
<body>
  <div id="app">
    <header-component></header-component>
    <header class="banner">
      <div class="logo-binding">Personal-FIN-Tracker</div>
      <p>One stop to manage all your finances.</p>
    </header>

    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <div class="card shadow custom-card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Login</h2>
              <?php
              if (isset($_GET['error'])) {
                echo '<p class="error text-center">Invalid username or password</p>';
              }
              ?>
              <form action="login.php" method="post">
                <div class="form-group">
                  <label for="username">Username:</label>
                  <input type="text" id="username" name="username" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="password">Password:</label>
                  <input type="password" id="password" name="password" class="form-control" required>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-block" style="background-color:rgb(47,47,91); color: white; font-size:30px;">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="index.js"></script>
</body>
</html>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="index.js"></script>
</body>
</html>
