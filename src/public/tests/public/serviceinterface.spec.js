import { Api } from '../mock/endpoints';

describe('Authorization service calls', () => {

    // it('does something', () => {
    //     expect(true).toBe(false);
    //     setTimeout(() => {
    //     }, 500);
    // });

    it('is something', () => {
        Api.authenticate()
            .then((resp) => {
                console.log('serviceinterface.spec.js: success: resp:', resp);
                expect(resp).notToBeUndefined();
            })
            .catch((err) => {
                console.log('serviceinterface.spec.js: failure: err:', err);
                expect(err).notToBeUndefined();
            });
    });

});
