import api from '..';

const defaultFields: string[] = ['id', 'fullName', 'email'];

export interface User {
    $type: string;
    id: string;
    fullName: string;
    email: string;
}

export const currentUser = async (): Promise<User> =>
    api
        .get('users/me', { params: { fields: defaultFields.join() } })
        .then(response => {
            return response.data;
        });
