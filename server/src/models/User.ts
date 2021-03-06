import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';

export type UserModel = mongoose.Document & {
    email: string;
    password: string;

    comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
};

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
}, {timestamps: true});

userSchema.pre('save', function save(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash((user as UserModel).password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) {
                return next(err);
            }

            (user as UserModel).password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

const User = mongoose.model('User', userSchema);
export default User;