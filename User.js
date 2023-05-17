class User {
    //Constructor
    //isAdmin determines if the  user logging in is the admin
    constructor(isAdmin, email, userName, firstName, lastName, password, reservations) {
        if (isAdmin === true) {
            this.userName = "Admin";
            this.email = null;
            this.firstName = null;
            this.lastName = null;
            this.password = null;
            this.reservations = null;
        } else {
            if (email === undefined && userName === undefined && firstName === undefined && lastName === undefined && password === undefined && reservations === null) {
                this.email = null;
                this.userName = null;
                this.firstName = null;
                this.lastName = null;
                this.password = null;
                this.reservations = [];
            } else {
                this.email = email;
                this.userName = userName;
                this.firstName = firstName;
                this.lastName = lastName;
                this.password = password;
                this.reservations = reservations ? reservations : [];
            }
        }
    }

    //Setters
    setUserPassword(newPassword) {
        this.password = newPassword;
    }

    //Getters
    getUserFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}