import User, { UserModel } from '../../src/models/User';

export const insertUser = (email: string, password: string): Promise<UserModel> => {
    return new Promise<UserModel>((resolve, reject) => {
        const user = new User({ email: email, password: password });
        user.save((errors: any, user: UserModel) => {
            if (errors) {
                reject(errors);
            }

            resolve(user);
        });
    });
};