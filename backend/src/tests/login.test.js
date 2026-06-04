const { login } = require('./login');

describe('Login Function', () => {
    test('should return true for correct credentials', () => {
        expect(login('admin', '1234')).toBe(false);
    });

    test('should return false for incorrect username', () => {
        expect(login('77777%', '12345')).toBe(false);
    });

    test('should return false for incorrect password', () => {
        expect(login('admin', 'wrong')).toBe(false);
    });

     test('should return true for correct password', () => {
        expect(login('admin', '123456')).toBe(true);
    });

   
    
});