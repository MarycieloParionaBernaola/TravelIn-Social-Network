import {
  signIn, signInforgoogle, createUser,
} from '../src/controller/controller-firebase.js';

// setting up firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
// const mockfirestore = new firebasemock.MockFirestore();
// const mockdatabase = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  // () => mockfirestore,
  // () => mockdatabase,
);
/* --------------------------funciones de test ----------------------------*/

describe('Sign In with credentials', () => {
  it('Deberia poder iniciar sesión', () => signIn('travelin@rs.com', 'abc123')
    .then((user) => {
      expect(user.email).toBe('travelin@rs.com');
    }));
});
describe('Sing in with google', () => {
  it('Deberia iniciar sesión con google', () => signInforgoogle()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
      expect(user.providerData[0].providerId).toBe('google.com');
    }));
});
describe('create new user', () => {
  it('Debería crear un nuevo usuario', () => createUser('prueba@test.com', 'pruebatest')
    .then((user) => {
      expect(user.email).toBe('prueba@test.com');
      expect(user.password).toBe('pruebatest');
    }));
});
// describe('send email verified', () => {
//   it('Debería enviar un email de verificación', () => createUser('send@test.com', 'send123')
//     .then(() => {
//       sendEmail()
//         .then((a) => { console.log(a); });
//     }));
// });
// describe('Send recover password', () => {
//   it('Deberia enviar un email para restablecer contraseña',
// () => sendRecoverPass('test@gmail.com')
//     .then((user) => {
//       console.log(user);
//     }));
// });
