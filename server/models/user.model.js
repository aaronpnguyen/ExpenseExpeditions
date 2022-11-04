const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minlength: [3, "First name must be at least 3 characters long!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        minlength: [3, "Last name must be at least 3 characters long!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: {
            validator: val => /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(val),
            message: "Please enter a valid email!"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer!"]
    }
}, {timestamps: true});

UserSchema.virtual('confirm')
    .get(() => this._confirm)
    .set(value => this._confirm = value) // Create a virtual field called "confirm", used to validate password

// Before saving to database, validate password fields
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirm) this.invalidate('confirm', "Passwords must match!");
    next();
})

// Before saving to database, hash password
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})

module.exports = mongoose.model('Users', UserSchema);