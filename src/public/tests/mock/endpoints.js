/**
 * tests don't like nconf :(
 *
 */
// import { nconf } from 'nconf';
import Promise from 'bluebird';
import EndPointUtil from '../../js/src/utils/endpointutil';

let mockUser = {
    'inviteCode': '12345',
    'client': {
        'type': 'SINGLE_USER'
    },
    'admin': {
        'firstName': 'Antoine',
        'lastName': 'Parenton',
        'username': 'aparenton',
        'email': 'NS@adcade.com',
        'password': 'adcade42',
        'languageCode': 'en-US',
        'description': 'BOTH'
    }
};

let mockPasswordToken = '12345';
let mockPassword = 'p@ssw0rd42';

export class Api {
    static authenticate() {
        console.log('\n\n\nendpoints.js: EndPointUtil:', EndPointUtil.authenticate);
        return new Promise((resolve, reject) =>
            EndPointUtil.authenticate(mockUser.admin.email, mockUser.admin.password)
                .then((resp) => {
                    console.log('endpoints.js: success: resp:', resp);
                    resolve(resp);
                })
                .catch((err) => {
                    console.log('endpoints.js: fail: err:', err);
                    reject(err);
                })
        );
    }
}
