var app = angular.module('streakMasterApp', []);

// Register Controller
app.controller('RegisterController', function($scope, $window) {
    $scope.user = {};
    $scope.message = ''; // Initialize message variable
    $scope.messageColor = ''; // Initialize color for the message

    $scope.registerUser = function() {
        if ($scope.registerForm.$valid && $scope.user.password === $scope.user.confirmPassword) {
            // Check if user with the same email already exists
            var storedUser = JSON.parse($window.localStorage.getItem('user'));
            if (storedUser && storedUser.email === $scope.user.email) {
                // Set error message if email is already registered
                $scope.message = 'This email is already registered.';
                $scope.messageColor = 'red';
            } else {
                // If no user exists, save the user
                $window.localStorage.setItem('user', JSON.stringify($scope.user));
                $scope.message = 'Registration successful! You can now log in.';
                $scope.messageColor = 'green';
                $window.location.href = 'login.html'; // Redirect to login page
            }
        } else {
            $scope.message = 'Please fill out the form correctly.';
            $scope.messageColor = 'red';
        }
    };

    // Function to toggle password visibility
    $scope.togglePasswordVisibility = function(fieldId) {
        var inputField = document.getElementById(fieldId);
        if (inputField.type === 'password') {
            inputField.type = 'text';
        } else {
            inputField.type = 'password';
        }
    };
});

// Login Controller
app.controller('LoginController', function($scope, $window) {
    $scope.user = {};

    $scope.loginUser = function() {
        if ($scope.loginForm.$valid) {
            var storedUser = JSON.parse($window.localStorage.getItem('user'));
            if (storedUser && storedUser.email === $scope.user.email && storedUser.password === $scope.user.password) {
                // Store the username in local storage
                $window.localStorage.setItem('username', storedUser.username); // Save username
                $scope.message = 'Login successful!';
                $window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                $scope.message = 'Incorrect email or password.';
            }
        } else {
            $scope.message = 'Please enter a valid email and password.';
        }
    };

    // Function to toggle password visibility
    $scope.togglePasswordVisibility = function(fieldId) {
        var inputField = document.getElementById(fieldId);
        if (inputField.type === 'password') {
            inputField.type = 'text';
        } else {
            inputField.type = 'password';
        }
    };
});
