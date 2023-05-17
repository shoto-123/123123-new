// This code runs when the document is ready.
// It initializes the application and sets up the user interface.
$(document).ready(function() {
    let isLoggedIn, 
    signedUser = new User(),
    packageSelected,
    roomSelected,
    reservationDateStart,
    reservationDateEnd,
    reserveFee,
    objSuiteIndexConfirm;
    //calls the function refreshDetails and scrollToTop
    refreshDetails();
    scrollToTop();

    //Showing intro to display information regarding the project.
    let introText = `Dangal Greetings User, Welcome to our Hotel Management & Reservations Project. 
    \nTo access the site administrators account please use the following credentials:
    \nemail: admin@scytex.com \npassword: scytexadmin19 
    \n\nFor dummy user: \nemail: johndoe@gmail.com \npassword: john1234`;
    console.log(introText);

    //Calling the createSuites method to create records for the hotel.
    createSuites();

    //Calling the createDummyUser method to create dummy records for the user.
    createDummyUser();

    /* Navigation Buttons */
    $("#navRooms").click(function() {
        $(".hotelRooms").fadeIn(1000);
        $(".logInPage").fadeOut(500);
        $(".mainPage").fadeOut(500);
        $(".signUpPage").fadeOut(500);
        $(".profilePage").fadeOut(500);
        $(".bookingPage").fadeOut(500);
        $(".changePasswordPage").fadeOut(500);
        $(".contactUsPage").fadeOut(1000);
        $(".aboutUsPage").fadeOut(500);

        setDocTitle("ScyteX Hotel Reservations | Rooms");
        scrollToTop();
    });

    $("#navContactUs").click(function() {
        $(".contactUsPage").fadeIn(1000);
        $(".logInPage").fadeOut(500);
        $(".mainPage").fadeOut(500);
        $(".signUpPage").fadeOut(500);
        $(".profilePage").fadeOut(500);
        $(".bookingPage").fadeOut(500);
        $(".hotelRooms").fadeOut(500);
        $(".aboutUsPage").fadeOut(500);
        $(".changePasswordPage").fadeOut(500);

        setDocTitle("ScyteX Hotel Reservations | Contact Us");
        scrollToTop();
    });

    $("#navAboutUs").click(function() {
        $(".aboutUsPage").fadeIn(1000);
        $(".contactUsPage").fadeOut(1000);
        $(".logInPage").fadeOut(500);
        $(".mainPage").fadeOut(500);
        $(".signUpPage").fadeOut(500);
        $(".profilePage").fadeOut(500);
        $(".bookingPage").fadeOut(500);
        $(".hotelRooms").fadeOut(500);
        $(".changePasswordPage").fadeOut(500);

        setDocTitle("ScyteX Hotel Reservations | About Us");
        scrollToTop();
    });

    $("#btnBookNow").click(function() {
        $(".mainPage").fadeOut(500);
        $(".hotelRooms").fadeIn(1000);
        scrollToTop();
    });
    
    $(".contactUsPage").fadeOut(500);
    $(".aboutUsPage").fadeOut(500);

    /* Log In and Sign Up */
    $("#btnLogIn").click(function() {
        $(".profilePage").hide();
        $(".mainPage").fadeOut(500);
        $(".hotelRooms").fadeOut(500);
        $(".signUpPage").fadeOut(500);
        $(".logInPage").fadeIn(1000);
        $(".contactUsPage").fadeOut(500);
        $(".aboutUsPage").fadeOut(500);
        $(".changePasswordPage").fadeOut(500);
        setDocTitle("ScyteX Hotel Reservations | Log In");
        scrollToTop();
    });

    $("#btnLogInSubmit").click(function() {
        let inputUserEmail = $("#txtEmailLogIn").val(),
        inputPassword = $("#txtPasswordLogIn").val();

        logIn(inputUserEmail, inputPassword);
        refreshDetails();
    });

    $("#linkSignUp").click(function() {
        $(".profilePage").hide();
        $(".logInPage").fadeOut(500);
        $(".signUpPage").fadeIn(1000);
        $(".changePasswordPage").fadeOut(500);
        setDocTitle("ScyteX Hotel Reservations | Sign Up");
        scrollToTop();
    });

    $("#linkLogIn").click(function() {
        $(".signUpPage").fadeOut(500);
        $(".logInPage").fadeIn(1000);
        $(".changePasswordPage").fadeOut(500);
        setDocTitle("ScyteX Hotel Reservations | Log In");
        scrollToTop();
    });

    //buttonSignup validation
    $("#btnSignUpSubmit").click(function() {
        let userEmail = $("#txtEmailSignUp").val(),
        userName = $("#txtUserNameSignUp").val(),
        userFirstName = $("#txtFirstNameSignUp").val(),
        userLastName = $("#txtLastNameSignUp").val(),
        userPassword = $("#txtPasswordSignUp").val(),
        userConfirmPassword = $("#txtConfirmPasswordSignUp").val();


        if (!userEmail || !userName || !userFirstName || !userLastName || !userPassword) {
            return alert("Please fill up all the fields.");
        }

        if (userPassword !== userConfirmPassword) {
            $("#txtPasswordSignUp").val(null);
            $("#txtConfirmPasswordSignUp").val(null);
            return alert("Password doesn't match");
        }

        signUpUser(userEmail, userName, userFirstName, userLastName, userPassword);
    });

    $("#btnUser").click(function() {
        $("#userDropdown").toggle();
    });

    $(window).click(function(e) {
        if (!e.target.matches("#btnUser")) {
            $("#userDropdown").hide();
        } 
    });

    // executed when the user logs out
    $("#btnLogOut").click(function() {
        $(".profilePage").hide();
        $(".changePasswordPage").fadeOut(500);
        $(".bookingPage").fadeOut(500);
        $(".contactUsPage").fadeOut(1000);
        $(".aboutUsPage").fadeOut(500);
        $(".hotelRooms").fadeOut(500);
        
        if (confirm("Are you sure you want to log out?") === true) {
            logOut();
            refreshDetails();
            clearUserFields();
        }
    });

    // executed when the admin logs out
    $("#btnLogOutAdmin").click(function() {
        if (confirm("Are you sure you want to log out?") === true) {
            logOut();
            refreshDetails();
            clearUserFields();
        }
    });

    /* Profile */
    $("#btnProfile").click(function() {
        $("#displayFullName").text(`Full Name: ${signedUser.getUserFullName()}`);
        $("#displayEmail").text(`email: ${signedUser.email}`);
        $("#displayUserName").text(`UserName: ${signedUser.userName}`);

        showReservations();
        $(".hotelRooms").fadeOut(1000);
        $(".mainPage").fadeOut(1000);
        $(".bookingPage").fadeOut(1000);
        $(".profilePage").fadeIn(1500);
        $(".changePasswordPage").fadeOut(500);
        $(".bookingPage").fadeOut(500);
        $(".contactUsPage").fadeOut(1000);
        $(".aboutUsPage").fadeOut(500);
        setDocTitle("ScyteX Hotel Reservations | Profile");
        scrollToTop();
    });

    $("#btnChangPass").click(function() {
        $(".profilePage").fadeOut(1000);
        $(".changePasswordPage").fadeIn(500);
        setDocTitle("ScyteX Hotel Reservations | Change Password");
        scrollToTop();
    });

    //validation for changing password
    $("#btnChangePasswordSubmit").click(function() {
        let inputOldPassword = $("#txtOldPassword").val(),
        inputChangePass = $("#txtPasswordChange").val(),
        inputChangePassConfirm = $("#txtPasswordChangeConfirm").val();

        if (!inputOldPassword || !inputChangePass || !inputChangePassConfirm) {
            return alert("Please fill up all the fields.");
        }

        if (confirm("Are you sure you want to change your password?") === true) {
            changePassword(inputOldPassword, inputChangePass, inputChangePassConfirm);
        }
    });

    $("#btnBackChangePass").click(function() {
        $(".changePasswordPage").fadeOut(500);
        $(".profilePage").fadeIn(1300);
    });
    
    $(document).on("click", "button.btnViewReceipt", function() {
        let closestParent = $(this).parents("tr").first(),
        transacNumData = closestParent.find("td").first(),
        transactionNumber = parseInt(transacNumData.text()),
        signedUserReservationIndex = signedUser.reservations.findIndex((reservation => reservation.transactionNumber === transactionNumber)),
        transacFeeSplit = signedUser.reservations[signedUserReservationIndex].reserveFee.split(" ");

        //Assuming that every transaction is done in the Philippines (time).
        //Assuming there are no taxes to be credited. Therefore, no calculations.
        $("#listDisplayReceipt").append(`
            <li class="text-black"><strong>Transaction Number:</strong> ${signedUser.reservations[signedUserReservationIndex].transactionNumber}</li>
            <li class="text-black mt-1"><strong>Date Issued:</strong> ${signedUser.reservations[signedUserReservationIndex].dateBooked}</li>
            <li class="text-black mt-1"><strong>Customer Name:</strong> ${signedUser.reservations[signedUserReservationIndex].fullName}</li>
            <li class="text-black mt-1"><strong>Package:</strong> ${signedUser.reservations[signedUserReservationIndex].package}</li>
            <li class="text-black mt-1"><strong>Room:</strong> ${signedUser.reservations[signedUserReservationIndex].roomNumber}</li>
            <li class="text-black mt-1"><strong>Reservation Date:</strong> ${signedUser.reservations[signedUserReservationIndex].reservationDateStart} to ${signedUser.reservations[signedUserReservationIndex].reservationDateEnd}</li>
        `);
        $("#pDisplayReserveFee").html(`<strong>Reservation Fee:</strong> ${transacFeeSplit[0]}`);
        $("#pDisplaySubtotal").html(`<strong>Subtotal:</strong> ${transacFeeSplit[0]}`);
        $("#pDisplayTax").html(`<strong>Tax (VAT):</strong> P0.00`);
        $("#pDisplayTotal").html(`<strong>Total:</strong> <u>${transacFeeSplit[0]}<u>`);
        $("#pDisplayPaymentMethod").text(`Paid Via: ${signedUser.reservations[signedUserReservationIndex].paymentMethod}`);

        $("#modalViewReceipt").show();
    });

    $(document).on("click", "button.btnViewReceiptAdmin", function() {
        let closestParent = $(this).parents("tr").first(),
        transacNumData = closestParent.find("td").first(),
        storageTransactions = getTransactions(),
        transactionNumber = parseInt(transacNumData.text()),
        transactionIndex = storageTransactions.findIndex((transaction => transaction.transactionNumber === transactionNumber)),
        transacFeeSplit = storageTransactions[transactionIndex].reserveFee.split(" ");

        $("#listDisplayReceipt").append(`
            <li class="text-black"><strong>Transaction Number:</strong> ${storageTransactions[transactionIndex].transactionNumber}</li>
            <li class="text-black mt-1"><strong>Date Issued:</strong> ${storageTransactions[transactionIndex].dateBooked}</li>
            <li class="text-black mt-1"><strong>Customer Name:</strong> ${storageTransactions[transactionIndex].fullName}</li>
            <li class="text-black mt-1"><strong>Package:</strong> ${storageTransactions[transactionIndex].package}</li>
            <li class="text-black mt-1"><strong>Room:</strong> ${storageTransactions[transactionIndex].roomNumber}</li>
            <li class="text-black mt-1"><strong>Reservation Date:</strong> ${storageTransactions[transactionIndex].reservationDateStart} to ${storageTransactions[transactionIndex].reservationDateEnd}</li>
        `);
        $("#pDisplayReserveFee").html(`<strong>Reservation Fee:</strong> ${transacFeeSplit[0]}`);
        $("#pDisplaySubtotal").html(`<strong>Subtotal:</strong> ${transacFeeSplit[0]}`);
        $("#pDisplayTax").html(`<strong>Tax (VAT):</strong> P0.00`);
        $("#pDisplayTotal").html(`<strong>Total:</strong> <u>${transacFeeSplit[0]}<u>`);
        $("#pDisplayPaymentMethod").text(`Paid Via: ${storageTransactions[transactionIndex].paymentMethod}`);

        $("#modalViewReceipt").show();
    });

    $("#btnCloseReceiptModal").click(function() {
        $("#modalViewReceipt").fadeOut(250);
        clearReceipt();
    });

    $(document).on("click", "button.btnCancelReservation", function() {
        let closestParent = $(this).parents("tr").first(),
        transacNumData = closestParent.find("td").first(),
        transactionNumber = parseInt(transacNumData.text()),
        roomDataFind = closestParent.find("td:nth-child(3)").text(),
        storageSuites = getSuites(),
        objSuiteIndex = storageSuites.findIndex((package => package.roomNum === roomDataFind)),
        dateNow = getCurrentFullDate();

        try {
            // Prompt for confirmation before canceling reservation
            if (confirm("Are you sure you want to cancel your reservation? This action cannot be undone.") === true) {
                cancelReservation(transactionNumber, dateNow, objSuiteIndex);
                // Remove the canceled reservation from the table
                closestParent.remove();
            }
        } catch (err) {
            alert("There is a problem processing your request, please try again.");
        }
    });

    $(document).on("click", "button.btnMakeUnavailable", function() {
        let closestParent = $(this).parents("tr").first(),
        room = closestParent.find("td").first(),
        roomSplit = room.text().split(" "),
        roomData = roomSplit[0] + " " + roomSplit[1];
        roomStatus = closestParent.find("td:nth-child(2)"),
        storageSuites = getSuites(),
        suiteIndex = storageSuites.findIndex((package => package.roomNum === roomData));
        // Check if the room is already unavailable
        if (storageSuites[suiteIndex].status === "Unavailable") {
            return alert("This room is already unavailable");
        }

        try {
            // Prompt for confirmation before making the room unavailable
            if (confirm("Are you sure you want to make this room unavailable?") === true)
            storageSuites[suiteIndex].status = "Unavailable";
            // Update the room status in the storage
            setSuites(storageSuites);
            // Update the displayed room status in the table
            roomStatus.text("Unavailable");
        } catch (err) {
            alert("There is a problem processing your request, please try again.");
        }
    });

    $(document).on("click", "button.btnMakeAvailable", function() {
        let closestParent = $(this).parents("tr").first(),
        room = closestParent.find("td").first(),
        roomSplit = room.text().split(" "),
        roomData = roomSplit[0] + " " + roomSplit[1];
        roomDataFind = closestParent.find("td:nth-child(2)").text(),
        storageSuites = getSuites(),
        suiteIndex = storageSuites.findIndex((package => package.roomNum === roomData));
        // Check if the room is already available
        if (storageSuites[suiteIndex].status === "Available") {
            return alert("This room is already available.");
        }

        try {
            // Prompt for confirmation before making the room available
            if (confirm("Are you sure you want to make this room available?") === true) {
                storageSuites[suiteIndex].status = "Available";
                setSuites(storageSuites);

                roomStatus.text("Available");
            }
        } catch (err) {
            alert("There is a problem processing your request, please try again.");
            console.log(err)
        }
        
    });

    /* Reservations */
    $("#btnBookJrSuite").click(function() {
        if (checkLoggedOnBook()) {
            $(".mainPage").fadeOut(500);
            $(".hotelRooms").fadeOut(500);
            $(".logInPage").fadeOut(500);
            $("#suiteDropdown").val("Jr. Suite");
            setSelectOptions("Jr. Suite");
            $(".bookingPage").fadeIn(1000);
            $(".changePasswordPage").fadeOut(500);
            setDocTitle("ScyteX Hotel Reservations | Booking");
            scrollToTop();
        }
    });

    $("#btnBookDeluxeTwin").click(function() {
        if (checkLoggedOnBook()) {
            $(".mainPage").fadeOut(500);
            $(".hotelRooms").fadeOut(500);
            $(".logInPage").fadeOut(500);
            $("#suiteDropdown").val("Deluxe Twin");
            setSelectOptions("Deluxe Twin");
            $(".bookingPage").fadeIn(1000);
            $(".changePasswordPage").fadeOut(500);
            setDocTitle("ScyteX Hotel Reservations | Booking");
            scrollToTop();
        }
    });

    $("#btnBookBusinessDeluxe").click(function() {
        if (checkLoggedOnBook()) {
            $(".mainPage").fadeOut(500);
            $(".hotelRooms").fadeOut(500);
            $(".logInPage").fadeOut(500);
            $("#suiteDropdown").val("Business Deluxe Single");
            setSelectOptions("Business Deluxe Single");
            $(".bookingPage").fadeIn(1000);
            $(".changePasswordPage").fadeOut(500);
            setDocTitle("ScyteX Hotel Reservations | Booking");
            scrollToTop();
        }
    });

    $("#btnBookDeluxeQueen").click(function() {
        if (checkLoggedOnBook()) {
            $(".mainPage").fadeOut(500);
            $(".hotelRooms").fadeOut(500);
            $(".logInPage").fadeOut(500);
            $("#suiteDropdown").val("Deluxe Queen");
            setSelectOptions("Deluxe Queen");
            $(".bookingPage").fadeIn(1000);
            $(".changePasswordPage").fadeOut(500);
            setDocTitle("ScyteX Hotel Reservations | Booking");
            scrollToTop();
        }
    });

    $("#suiteDropdown").change(function() {
        setSelectOptions($(this).val());
    });

    $("#btnChkAvail").click(function() {
        let packageSelected = $("#suiteDropdown").val(),
        reservationDateStartSelected = $("#reservationDateStart").val(),
        reservationDateEndSelected = $("#reservationDateEnd").val(),
        roomSelected = $("#roomDropdown").val();

        if (!reservationDateStartSelected || !reservationDateEndSelected) {
            return alert("Please select your desired dates!");
        }

        if (reservationDateStartSelected > reservationDateEndSelected) {
            return alert("Please make sure your end date is later than your start date.");
        }
        
        checkPackageAvailability(packageSelected, roomSelected, reservationDateStartSelected, reservationDateEndSelected);
    });

    $("#btnConfirmBooking").click(function() {
        let paymentMethod = $("#paymentDropdown").val(),
        transacNum = getTransactionNumber(),
        intTransacNum = parseInt(transacNum),
        dateNow = getCurrentFullDate();

        //Incrementing the transaction number.
        intTransacNum++;
        confirmBooking(paymentMethod, intTransacNum, dateNow);
        setTransactionNumber(intTransacNum);
    });

    $("#btnHome").click(function() {
        $(".awaitStatusPage").fadeOut(1000);
        $(".mainPage").fadeIn(1500);
        scrollToTop();
    });

    /* FUNCTIONS */
    function createDummyUser() {
        // Get the existing users and suites from storage
        let storageUsers = getUsers(),
        storagePackages = getSuites();
        // Set isAdmin flag to false
        isAdmin = false,
        // Set the user's full name
        userFullName = "John" + " " + "Doe";
        // Initialize an empty array for reservations
        reservations = [],
        // Get the transaction number from storage and parse it as an integer
        storageTransactionNumber = getTransactionNumber(),
        transacNum = parseInt(storageTransactionNumber),
        // Set dummy reservation start and end dates
        reservationDateStartDummy = "2023-05-17";
        reservationDateEndDummy = "2023-05-21",
        // Set the package name and room number
        packageName = "Jr. Suite",
        roomNum = "Room 101",
        // Set the reservation fee and payment method
        reservationFee = "P150.00 - Reservation Fee",
        paymentMethod = "Credit Card",
        // Find the index of the package in the storagePackages array
        packageIndex = storagePackages.findIndex((package => package.roomNum === roomNum));

        try {
            //Only create dummy data when empty.
            if (!storageUsers || storageUsers.length === 0) {
                // Create an object for the reservations user
                let objReservationsUser = {
                    transactionNumber: transacNum,
                    dateBooked: getCurrentFullDate(),
                    fullName: userFullName,
                    reservationDateStart: reservationDateStartDummy,
                    reservationDateEnd: reservationDateEndDummy,
                    package: packageName,
                    roomNumber: roomNum,
                    reserveFee: reservationFee,
                    paymentMethod: paymentMethod
                }
                // Create an object for the reserved user
                let objReservedUser = {
                    transactionNumber: transacNum,
                    dateBooked: getCurrentFullDate(),
                    fullName: userFullName,
                    roomNumber: roomNum,
                    reservationDateStart: reservationDateStartDummy,
                    reservationDateEnd: reservationDateEndDummy,
                    paymentMethod: paymentMethod
                }
                // Add the reservations user object to the reservations array
                reservations.push(objReservationsUser);
                // Create a new User object with the dummy data
                let objUser = new User(isAdmin, "johndoe@gmail.com", "JohnDoe23", "John", "Doe", "john1234", reservations);
                // Push the reserved user object to the reservedTo array of the package
                storagePackages[packageIndex].reservedTo.push(objReservedUser);
                storageUsers.push(objUser);
                // Update the storage with the modified arrays
                setUsers(storageUsers);
                setSuites(storagePackages);
            }
        } catch (err) {
            console.log(err);
        }
    }


    function signUpUser(userEmail, userName, userFirstName, userLastName, userPassword) {
        // retrieve the list of users from local storage
        let storageUsers = getUsers(),
        // check if user already exists in the list
        doesExist = storageUsers.find((user => user.email === userEmail)),
        isAdmin = false;
        
        try {
            // prevent users from creating usernames that contain "admin"
            if (userName.toLowerCase().includes("admin")) {
                return alert("Your username must not contain admin in it.");
            }
            // if user doesn't exist, create a new user object and add it to the list
            if (doesExist === -1 || doesExist === undefined) {
                let objUser = new User(isAdmin, userEmail, userName, userFirstName, userLastName, userPassword);
                    
                storageUsers.push(objUser);
                setUsers(storageUsers);
                // save the updated list of users to local storage
                alert("Thank you, you are successfully signed up!");
                $(".signUpPage").fadeOut(500);
                $(".logInPage").fadeIn(1000);
                document.title = "ScyteX Hotel Reservations | Log In";
                // clear the form fields for the user
                clearUserFields();
            } else {
                alert("This email already exists, please use another email");
            }
        } catch (err) {
            alert("A problem occurred while signing up. Please try again.");
            console.error(err);
        }
    }

    function logIn(inputUserEmail, inputPassword) {
        // retrieve the list of users from local storage
        let storageUsers = getUsers(),
        // assume that the credentials are incorrect by default
        isCorrectCredentials = false,
        isAdmin = false;

        try {
            //Creating an exception for administrator of the website.
            // if the user is the admin, set isAdmin to true and create a new user object
            if (inputUserEmail === "admin@scytex.com" && inputPassword === "scytexadmin19") {
                isAdmin = true;
                let objUser = new User(isAdmin);

                setSignedUser(objUser);
                setStorageSignedUser(signedUser);
                $(".logInPage").fadeOut(500);
                $(".adminPage").fadeIn(1000);
            } else {
                //Checking if the user exist by comparing the email and if user exists compare its password to given password.
                storageUsers.forEach((user) => {
                    if (inputUserEmail=== user.email && inputPassword === user.password) {
                        isCorrectCredentials = true;
                        setSignedUser(user);
                        setStorageSignedUser(signedUser);
                    }
                });
                // if the user is authenticated it will proceed to be logged in
                if (isCorrectCredentials) {
                    alert("Successfully Logged in!");
                    $(".logInPage").fadeOut(500);
                    $(window).scrollTop(0);
                    $(".mainPage").fadeIn(1000);
                    isCorrectCredentials = false;
                    clearUserFields();
                } else {
                    alert("Invalid Credentials, Please try again!");
                    $("#inputUserEmail").val(null);
                    $("#inputPassword").val(null);
                }
            }
        } catch (err) {
            alert("A problem occurred while logging in. Please try again.");
            console.log(err)
        }
    }

    //function for logOut
    function logOut() {
        try {
            localStorage.removeItem("signedUser");

            $(".mainPage").fadeOut(500);
            $(".logInPage").fadeIn(1000);
            document.title = "ScyteX Hotel Reservations | Log In";
            //Scrolls to the top of the page.
            $(window).scrollTop(0);
        } catch (err) {
            alert("A problem occurred while logging out. Please try again.");
        }
    }
    
    //function for change password by accessing the old password in the local storage
    //and ask the input for the new password for the user
    function changePassword(inputOldPassword, inputChangePass, inputChangePassConfirm) {
        let storageUsers = getUsers(),
        userIndex = storageUsers.findIndex((user => user.email === signedUser.email));

        try {
            if (signedUser.password !== inputOldPassword) {
                return alert("Old password you entered is incorrect.");
            }

            if (inputChangePass !== inputChangePassConfirm) {
                return alert("Password mismatch.");
            }

            if (signedUser.password === inputChangePass) {
                return alert("Your old password cant be your new password.");
            }

            storageUsers[userIndex].password = inputChangePass;
            signedUser.setUserPassword(inputChangePass);
            setStorageSignedUser(signedUser);
            setUsers(storageUsers);

            alert("Your Password has been changed.");

            $("#txtOldPassword").val(null);
            $("#txtPasswordChange").val(null);
            $("#txtPasswordChangeConfirm").val(null);
        } catch(err) {
            alert("A problem occurred while processing your request. Please try again.");
        }
    }

    function fetchUser() {
        // Get the signed user from local storage.
        isLoggedIn = getSignedUser();
        // If the user is logged in, deserialize the user object.
        let deserializedUser = JSON.parse(getSignedUser());
        // If the user is logged in, set the signed user object
        if (isLoggedIn) {
            setSignedUser(deserializedUser);
        }
    }
    // Get the transaction number from local storage.
    // If the transaction number is not in local storage, set it to 1001.
    function getTransactionNumber() {
        return localStorage.getItem("transacNum") ? localStorage.getItem("transacNum") : localStorage.setItem("transacNum", 1001);
    }
    // Set the transaction number in local storage.
    function setTransactionNumber(transacNum) {
        localStorage.setItem("transacNum", transacNum);
    }
    // Get the users from local storage.
    // If the users are not in local storage, return an empty array.
    function getUsers() {
        return localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    }
    // Set the users in local storage.
    function setUsers(user) {
        localStorage.setItem("users", JSON.stringify(user));
    }
    // Get the signed user from local storage.
    function getSignedUser() {
        return localStorage.getItem("signedUser");
    }
    // Set the signed user in local storage.
    function setStorageSignedUser(user) {
        localStorage.setItem("signedUser", JSON.stringify(user));
    }
    // Assign the user object to the signedUser variable.
    function setSignedUser(user) {  
        Object.assign(signedUser, user);
    }

    function createSuites() {
        /* Creating Packages Initially If There are None */
        let storageSuites = getSuites();

        if (!storageSuites) {
            let packageRoomNumIndex = 101;
            let arraySuites = [];

            for (let i = 0; i < 20; i++) {
                if (packageRoomNumIndex <= 105) {
                    let objPackage = {
                        packageName: "Jr. Suite",
                        roomNum: "Room " + packageRoomNumIndex++,
                        status: "Available",
                        reservedTo: [],
                    };

                    arraySuites.push(objPackage);
                } 
                
                if (packageRoomNumIndex >= 106 && packageRoomNumIndex <= 110) {
                    let objPackage = {
                        packageName: "Deluxe Twin",
                        roomNum: "Room " + packageRoomNumIndex++,
                        status: "Available",
                        reservedTo: [],
                    };

                    arraySuites.push(objPackage);
                } 
                
                if (packageRoomNumIndex >= 111 && packageRoomNumIndex <= 115) {
                    let objPackage = {
                        packageName: "Business Deluxe Single",
                        roomNum: "Room " + packageRoomNumIndex++,
                        status: "Available",
                        reservedTo: [],
                    };

                    arraySuites.push(objPackage);
                } 
                
                if (packageRoomNumIndex >= 116 && packageRoomNumIndex <= 120) {
                    let objPackage = {
                        packageName: "Deluxe Queen",
                        roomNum: "Room " + packageRoomNumIndex++,
                        status: "Available",
                        reservedTo: [],
                    };

                    arraySuites.push(objPackage);
                }
            }

            setSuites(arraySuites);
            getTransactionNumber();
        }
    }

    //check whether a specific package is available to be reserved for a given room and date range
    function checkPackageAvailability(package, room, reservationDateStartSelected, reservationDateEndSelected) {
        let storageSuites = getSuites(),
        objSuiteIndex = storageSuites.findIndex((package => package.roomNum === room)),
        isAvailable = false;

        try {
            packageSelected = package;
            roomSelected = room;
            reservationDateStart = reservationDateStartSelected;
            reservationDateEnd = reservationDateEndSelected
            objSuiteIndexConfirm = objSuiteIndex;

            if (storageSuites[objSuiteIndex].status === "Unavailable") {
                return alert("We're sorry, unfortunately this package is not available at this time.");
            }

            if (storageSuites[objSuiteIndex].reservedTo.length > 0) {
                storageSuites[objSuiteIndex].reservedTo.some((booked) => {
                    if (reservationDateStart < booked.reservationDateEnd && booked.reservationDateStart < reservationDateEnd) {
                        return isAvailable = false;
                    } else {
                        return isAvailable = true;
                    }
                });
            } else {
                isAvailable = true;
            }

            if (isAvailable) {
                alert("This package is available, redirecting you to the reservation form.");
                if (packageSelected === "Jr. Suite") {
                    reserveFee = "P150.00 - Reservation Fee";
                } else if (packageSelected === "Deluxe Twin") {
                    reserveFee = "P200.00 - Reservation Fee";
                } else if (packageSelected === "Business Deluxe Single") {
                    reserveFee = "P250.00 - Reservation Fee";
                } else if (packageSelected === "Deluxe Queen") {
                    reserveFee = "P300.00 - Reservation Fee";
                }
            
                $(".bookingPage").fadeOut(500);
                $("#pPickedDates").text(`${reservationDateStart} - ${reservationDateEnd}`);
                $("#pPickedSuite").text(packageSelected);
                $("#pReservationFee").text(reserveFee);
                $("#pRoomNum").text(roomSelected);
                $(".reservationPage").fadeIn(1000);
            } else {
                alert("This package room is not available on your picked date. Please try other rooms.");
            }
        } catch (err) {
            alert("A problem occurred when processing your request, please try again later.");
        }
    }

    function confirmBooking(paymentMethod, transacNum, dateNow) {
        // Retrieve suites and storage data from localStorage
        let storageSuites = getSuites(),
        storageUsers = getUsers(),
        // Find the index of the signed user in the users data
        usersIndex = storageUsers.findIndex((user => user.email === signedUser.email)),
        // Retrieve transactions data from localStorage
        storageTransactions = getTransactions();

        try {
            let objReservedUser = {
                transactionNumber: transacNum,
                dateBooked: dateNow,
                fullName: signedUser.getUserFullName(),
                roomNumber: roomSelected,
                reservationDateStart: reservationDateStart,
                reservationDateEnd: reservationDateEnd,
                paymentMethod: paymentMethod
            }
    
            let objReservationsUser = {
                transactionNumber: transacNum,
                dateBooked: dateNow,
                fullName: signedUser.getUserFullName(),
                reservationDateStart: reservationDateStart,
                reservationDateEnd: reservationDateEnd,
                package: packageSelected,
                roomNumber: roomSelected,
                reserveFee: reserveFee,
                paymentMethod: paymentMethod
            }

            let objTransactions = {
                transactionNumber: transacNum,
                dateBooked: dateNow,
                fullName: signedUser.getUserFullName(),
                reservationDateStart: reservationDateStart,
                reservationDateEnd: reservationDateEnd,
                package: packageSelected,
                roomNumber: roomSelected,
                reserveFee: reserveFee,
                paymentMethod: paymentMethod,
                status: "Booked"
            }
            /*Add the reserved user object to the corresponding suite in storage
              Add the reservations user object to the signed user's reservations
              Add the reservations user object to the corresponding user in storage
              Add the transactions object to storage*/
            storageSuites[objSuiteIndexConfirm].reservedTo.push(objReservedUser);
            signedUser.reservations.push(objReservationsUser);
            storageUsers[usersIndex].reservations.push(objReservationsUser);
            storageTransactions.push(objTransactions);
            //update datas
            setUsers(storageUsers);
            setStorageSignedUser(signedUser);
            setSuites(storageSuites);
            setTransactions(storageTransactions);

            roomSelected = null;
            reservationDateStart = null;
            reservationDateEnd = null;
    
            $("#reservationDateEnd").val(null);
            $(".reservationPage").fadeOut(500);
            $(".awaitStatusPage").fadeIn(1200);
        } catch (err) {
            alert("A problem occurred when processing your request, please try again later.");
        }
    }

    function cancelReservation(transactionNumber, dateNow, objSuiteIndex) {
        let storageSuites = getSuites(),
        storageCancelled = getCancelled(),
        signedUserReservationIndex = signedUser.reservations.findIndex((reservation => reservation.transactionNumber === transactionNumber)),
        storageUsers = getUsers(),
        usersIndex = storageUsers.findIndex((user => user.email === signedUser.email)),
        packageReservationIndex = storageSuites[objSuiteIndex].reservedTo.findIndex((reservation => reservation.transactionNumber === transactionNumber)),
        storageTransactions = getTransactions(),
        transactionIndex = storageTransactions.findIndex((transaction => transaction.transactionNumber === transactionNumber));

        try {
            let objCancellation = {
                transactionNumber: transactionNumber,
                dateBooked: signedUser.reservations[signedUserReservationIndex].dateBooked,
                fullName: signedUser.getUserFullName(),
                reservationDateStart: signedUser.reservations[signedUserReservationIndex].reservationDateStart,
                reservationDateEnd: signedUser.reservations[signedUserReservationIndex].reservationDateEnd,
                package: signedUser.reservations[signedUserReservationIndex].package,
                roomNumber: signedUser.reservations[signedUserReservationIndex].roomNumber,
                reserveFee: signedUser.reservations[signedUserReservationIndex].reserveFee,
                paymentMethod: signedUser.reservations[signedUserReservationIndex].paymentMethod,
                cancellationDate: dateNow
            }

            storageCancelled.push(objCancellation);
            setCancelled(storageCancelled);

            signedUser.reservations.splice(signedUserReservationIndex, 1);
            storageUsers[usersIndex] = signedUser;
            storageSuites[objSuiteIndex].reservedTo.splice(packageReservationIndex, 1);
            storageTransactions[transactionIndex].status = "Cancelled";

            setStorageSignedUser(signedUser);
            setUsers(storageUsers);
            setSuites(storageSuites);
            setTransactions(storageTransactions);
        } catch(err) {
            alert("A problem occurred when processing your request, please try again later.");
        }
    }

    // Get the suites from local storage.
    // If the suites are not in local storage, return an empty array.
    function getSuites() {
        return JSON.parse(localStorage.getItem("roomPackages"));
    }
    // Get the cancelled transactions from local storage.
    // If the cancelled transactions are not in local storage, return an empty array.
    function getCancelled() {
        return localStorage.getItem("cancelledTransactions") ? JSON.parse(localStorage.getItem("cancelledTransactions")) : [];
    }
    // Get the transactions from local storage.
    // If the transactions are not in local storage, return an empty array.
    function getTransactions() {
        return localStorage.getItem("transactions") ? JSON.parse(localStorage.getItem("transactions")) : [];
    }
    // Set the suites in local storage.
    function setSuites(suite) {
        localStorage.setItem("roomPackages", JSON.stringify(suite));
    }
    // Set the cancelled transactions in local storage.
    function setCancelled(reservation) {
        localStorage.setItem("cancelledTransactions", JSON.stringify(reservation));
    }
    // Set the transactions in local storage.
    function setTransactions(transaction) {
        localStorage.setItem("transactions", JSON.stringify(transaction));
    }

    function getCurrentDate() {
        // Get the current date.
        let currentDate = new Date(),
        day = ("0" + currentDate.getDate()).slice(-2),
        month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
        year = currentDate.getFullYear(),
        date = `${year}-${month}-${day}`;
        // Return the current date.
        return date;
    }

    function getCurrentFullDate() {
        let currentDate = new Date(),
        day = ("0" + currentDate.getDate()).slice(-2),
        month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
        year = currentDate.getFullYear(),
        time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
        fullDateTime = `${day}-${month}-${year} ${time}`;

        return fullDateTime;
    }

    function refreshDetails() {
        fetchUser();

        let setInputDate = getCurrentDate();

        $("#reservationDateStart").val(setInputDate);
        $(".profilePage").hide();

        if (isLoggedIn) {
            if (signedUser.userName === "Admin") {
                $(".mainPage").hide();
                $("#navRooms").hide();
                $("#navContactUs").hide();
                $("#navAboutUs").hide();
                $("#btnLogIn").hide();
                $("footer").hide();
                $("#btnUser").hide()
                $("#btnLogOutAdmin").show();
                $(".adminPage").show();

                showAdminData();
            } else {
                $("#navRooms").show();
                $("#navContactUs").show();
                $("#navAboutUs").show();
                $("#btnLogIn").hide();
                $("#btnLogOutAdmin").hide();
                $("footer").show();
                $("#btnProfile").show();
                $("#btnUser").text(signedUser.userName);
                $("#btnUser").show();
                $(".adminPage").hide();
            }
        } else {
            $("#btnUser").text("");
            $("#btnUser").hide();
            $("#btnLogOutAdmin").hide();
            $("#btnLogIn").show();
            $(".adminPage").hide();
        }
    }

    function clearUserFields() {
        $("#txtEmailSignUp").val(null);
        $("#txtUserNameSignUp").val(null);
        $("#txtFirstNameSignUp").val(null);
        $("#txtLastNameSignUp").val(null);
        $("#txtPasswordSignUp").val(null);
        $("#txtConfirmPasswordSignUp").val(null);
        $("#txtEmailLogIn").val(null);
        $("#txtPasswordLogIn").val(null);
    }

    function clearReceipt() {
        $("#listDisplayReceipt").empty();
        $("#pDisplayReserveFee").empty();
        $("#pDisplaySubtotal").empty();
        $("#pDisplayTax").empty();
        $("#pDisplayTotal").empty();
        $("#pDisplayPaymentMethod").empty();
    }

    function showReservations() {
        fetchUser();
        //Making sure that the data does not duplicate in the table so clear it.
        $("#tblReservations").find("tbody").empty();

        if (signedUser.reservations.length !== 0) {
            signedUser.reservations.forEach((reservation) => {
                let reserveFeeSplitted = reservation.reserveFee.split(" "),
                btnIndex = 1;
    
                $("#tblReservations").append(`<tr>
                                                <td>${reservation.transactionNumber}</td>
                                                <td>${reservation.package}</td> 
                                                <td>${reservation.roomNumber}</td>
                                                <td>${reservation.reservationDateStart}</td>
                                                <td>${reservation.reservationDateEnd}</td>
                                                <td>${reserveFeeSplitted[0]}</td>
                                                <td><button id="btnViewReceipt${btnIndex++}" type="button" class="btnViewReceipt">View Receipt</button>
                                                <button id="btnCancelReservation${btnIndex++}" type="button" class="btnCancelReservation">Cancel Reservation</button></td
                                            </tr>`);
            });
        }
    }

    function showAdminData() {
        fetchUser();
        let storageTransactions = getTransactions(),
        storageUsers = getUsers(),
        storageCancellations = getCancelled(),
        storagePackages = getSuites(),
        jrSuiteReservations = 0,
        deluxeTwinReservations = 0,
        businessDeluxeSingleReservations = 0,
        deluxeQueenReservations = 0,
        jrSuiteCancellations = 0,
        deluxeTwinCancellations = 0,
        businessDeluxeSingleCancellations = 0,
        deluxeQueenCancellations = 0,
        btnIndex = 1;

        //Making sure that the data does not duplicate in the table so clear it.
        $("#tblTransactions").find("tbody").empty();
        $("#tblUsers").find("tbody").empty();
        $("#tblCancellations").find("tbody").empty();
        $("#tblPackages").find("tbody").empty();
        $("#tblReport").find("tbody").empty();

        storageTransactions.forEach((transaction) => {
            let reserveFeeSplitted = transaction.reserveFee.split(" ");

            $("#tblTransactions").append(`<tr>
                                            <td>${transaction.transactionNumber}</td>
                                            <td>${transaction.fullName}</td>
                                            <td>${transaction.package}</td> 
                                            <td>${transaction.roomNumber}</td>
                                            <td>${transaction.reservationDateStart}</td>
                                            <td>${transaction.reservationDateEnd}</td>
                                            <td>${reserveFeeSplitted[0]}</td>
                                            <td>${transaction.paymentMethod}</td>
                                            <td>${transaction.dateBooked}</td>
                                            <td>${transaction.status}</td>
                                            <td><button id="btnViewReceiptAdmin${btnIndex++}" type="button" class="btnViewReceiptAdmin">View Receipt</button></td>
                                        </tr>`);
        });

        storageUsers.forEach((user) => {
            $("#tblUsers").append(`<tr>
                                    <td>${user.firstName} ${user.lastName}</td>
                                    <td>${user.email}</td> 
                                    <td>${user.userName}</td>
                                    <td>${user.password}</td>
                                    <td>${user.reservations ? user.reservations.length : 0}</td>
                                </tr>`);                    
        });

        storageCancellations.forEach((cancellation) => {
            let reserveFeeSplitted = cancellation.reserveFee.split(" ");

            if (cancellation.package === "Jr. Suite") {
                jrSuiteCancellations++;
            } else if (cancellation.package === "Deluxe Twin") {
                deluxeTwinCancellations++;
            } else if (cancellation.package === "Business Deluxe Single") {
                businessDeluxeSingleCancellations++;
            } else if (cancellation.package === "Deluxe Queen") {
                deluxeQueenCancellations++;
            }

            $("#tblCancellations").append(`<tr>
                                            <td>${cancellation.transactionNumber}</td>
                                            <td>${cancellation.fullName}</td>
                                            <td>${cancellation.package}</td>
                                            <td>${cancellation.roomNumber}</td>
                                            <td>${cancellation.reservationDateStart}</td>
                                            <td>${cancellation.reservationDateEnd}</td>
                                            <td>${reserveFeeSplitted[0]}</td>
                                            <td>${cancellation.paymentMethod}</td>
                                            <td>${cancellation.dateBooked}</td>
                                            <td>${cancellation.cancellationDate}</td>
                                        </tr>`);
        });

        storagePackages.forEach((package) => {
            if (package.packageName === "Jr. Suite") {
                if (package.reservedTo) {
                    jrSuiteReservations = jrSuiteReservations + package.reservedTo.length;
                }
            } else if (package.packageName === "Deluxe Twin") {
                if (package.reservedTo) {
                    deluxeTwinReservations = deluxeTwinReservations + package.reservedTo.length;
                }
            } else if (package.packageName === "Business Deluxe Single") {
                if (package.reservedTo) {
                    businessDeluxeSingleReservations = businessDeluxeSingleReservations + package.reservedTo.length;
                }
            } else if (package.packageName === "Deluxe Queen") {
                if (package.reservedTo) {
                    deluxeQueenReservations = deluxeQueenReservations + package.reservedTo.length;
                }
            }

            $("#tblPackages").append(`<tr>
                                        <td>${package.roomNum} - ${package.packageName}</td>
                                        <td>${package.status}</td>
                                        <td><button id="btnMakeAvailable${btnIndex++}" type="button" class="btnMakeAvailable">Make Available</button>
                                        <button id="btnMakeUnavailable${btnIndex++}" type="button" class="btnMakeUnavailable">Make Unavailable</button></td>
                                    </tr>`);
        });

        $("#h5DisplayDateGenerated").html(`<strong>Data as of:</strong> ${getCurrentFullDate()}`);
        $("#tblReport").append(`<tr>
                                    <td>Jr. Suite</td>
                                    <td>${jrSuiteReservations}</td>
                                    <td>${jrSuiteCancellations}</td>
                                </tr>
                                <tr>
                                    <td>Deluxe Twin</td>
                                    <td>${deluxeTwinReservations}</td>
                                    <td>${deluxeTwinCancellations}</td>
                                </tr>
                                <tr>
                                    <td>Business Deluxe Single</td>
                                    <td>${businessDeluxeSingleReservations}</td>
                                    <td>${businessDeluxeSingleCancellations}</td>
                                </tr>
                                <tr>
                                    <td>Deluxe Queen</td>
                                    <td>${deluxeQueenReservations}</td>
                                    <td>${deluxeQueenCancellations}</td>
                                </tr>`);

        loadGraphStats();
    }

    function checkLoggedOnBook() {
        if (!isLoggedIn) {
            $(".mainPage").fadeOut(500);
            $(".logInPage").fadeIn(1000);
            alert("Please log in first before booking.");

            return false; 
        } else {
            return true;
        }
    }

    function setDocTitle(docTitle) {
        document.title = docTitle;
    }

    function setSelectOptions(suiteName) {
        if (suiteName === "Jr. Suite") {
            if ($("#roomDropdown").val() === "Room 101") {
                return;
            }

            let optionTextVal1 = "Room 101",
            optionTextVal2 = "Room 102",
            optionTextVal3 = "Room 103",
            optionTextVal4 = "Room 104",
            optionTextVal5 = "Room 105"

            $("option[class='valRoom']").remove();
            $("#roomDropdown").append(`<option class="valRoom" value="${optionTextVal1}">${optionTextVal1}</option>
                                        <option class="valRoom" value="${optionTextVal2}">${optionTextVal2}</option>
                                        <option class="valRoom" value="${optionTextVal3}">${optionTextVal3}</option>
                                        <option class="valRoom" value="${optionTextVal4}">${optionTextVal4}</option>
                                        <option class="valRoom" value="${optionTextVal5}">${optionTextVal5}</option>`);
        } else if (suiteName === "Deluxe Twin") {
            if ($("#roomDropdown").val() === "Room 106") {
                return;
            }

            let optionTextVal1 = "Room 106",
            optionTextVal2 = "Room 107",
            optionTextVal3 = "Room 108",
            optionTextVal4 = "Room 109",
            optionTextVal5 = "Room 110"

            $("option[class='valRoom']").remove();
            $("#roomDropdown").append(`<option class="valRoom" value="${optionTextVal1}">${optionTextVal1}</option>
                                        <option class="valRoom" value="${optionTextVal2}">${optionTextVal2}</option>
                                        <option class="valRoom" value="${optionTextVal3}">${optionTextVal3}</option>
                                        <option class="valRoom" value="${optionTextVal4}">${optionTextVal4}</option>
                                        <option class="valRoom" value="${optionTextVal5}">${optionTextVal5}</option>`);
        } else if (suiteName === "Business Deluxe Single") {
            if ($("#roomDropdown").val() === "Room 112") {
                return;
            }

            let optionTextVal1 = "Room 111",
            optionTextVal2 = "Room 112",
            optionTextVal3 = "Room 113",
            optionTextVal4 = "Room 114",
            optionTextVal5 = "Room 115"

            $("option[class='valRoom']").remove();
            $("#roomDropdown").append(`<option class="valRoom" value="${optionTextVal1}">${optionTextVal1}</option>
                                        <option class="valRoom" value="${optionTextVal2}">${optionTextVal2}</option>
                                        <option class="valRoom" value="${optionTextVal3}">${optionTextVal3}</option>
                                        <option class="valRoom" value="${optionTextVal4}">${optionTextVal4}</option>
                                        <option class="valRoom" value="${optionTextVal5}">${optionTextVal5}</option>`);
        } else if (suiteName === "Deluxe Queen") {
            if ($("#roomDropdown").val() === "Room 116") {
                return;
            }

            let optionTextVal1 = "Room 116",
            optionTextVal2 = "Room 117",
            optionTextVal3 = "Room 118",
            optionTextVal4 = "Room 119",
            optionTextVal5 = "Room 120"

            $("option[class='valRoom']").remove();
            $("#roomDropdown").append(`<option class="valRoom" value="${optionTextVal1}">${optionTextVal1}</option>
                                        <option class="valRoom" value="${optionTextVal2}">${optionTextVal2}</option>
                                        <option class="valRoom" value="${optionTextVal3}">${optionTextVal3}</option>
                                        <option class="valRoom" value="${optionTextVal4}">${optionTextVal4}</option>
                                        <option class="valRoom" value="${optionTextVal5}">${optionTextVal5}</option>`);
        }
    }
    
    function scrollToTop() {
        //Scrolls to the top of the page.
        $(window).scrollTop(0);
    }

    function loadGraphStats() {
        //Empty the chart before creating a new one.
        $("#chartBar").empty();
        $("#chartBar").append('<canvas id="barChart"></canvas>');

        /* USING CHART.JS LIBRARY FOR DESIGNING THE STATS/GENERATED REPORT ONLY */
        // Get the table that contains the data for the chart
        let table = document.querySelector("#v-tabs-report table");

        // Select all the rows in the table body
        let rows = table.querySelectorAll("tbody tr");

        // Initialize arrays to store the label, reservations, and cancellations data
        let labels = [];
        let reservations = [];
        let cancellations = [];

        // Loop through each row in the table
        rows.forEach((row) => {
            // Get the data cells for the current row
            let [label, reservation, cancellation] = row.cells;

            // Add the label to the labels array
            labels.push(label.textContent);

            // Convert the reservation and cancellation data to numbers and add to their respective arrays
            reservations.push(Number(reservation.textContent));
            cancellations.push(Number(cancellation.textContent));
        });



        // Get the canvas element where the chart will be rendered
        let ctx = document.getElementById("barChart").getContext("2d");

        // Create a new bar chart using Chart.js
        new Chart(ctx, {
        type: "bar",
        data: {
            // Set the labels and datasets for the chart
            labels: labels,
            datasets: [
            {
                label: "Reservations",
                data: reservations,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Cancellations",
                data: cancellations,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            ],
        },
        options: {
            responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                        stepSize: 1,
                    },
                },
            },
        });
    }
});