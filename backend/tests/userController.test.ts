import request from 'supertest';
import app from '../app'; 
import * as userService from '../services/userService';
import * as authService from '../services/authService';

jest.mock('../services/userService');
jest.mock('../services/authService');

describe('User Controller', () => {
  
  describe('POST /users/createUser', () => {
    it('should create a new user', async () => {
      const mockUser = { id: 1, name: 'Davinho PoXX', email: 'davinhopoxx@mail.com', password: 'hashedpassword', products: [] };
      (userService.createUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/users/createUser')
        .send({ name: 'Davinho PoXX', email: 'davinhopoxx@mail.com', password: '123456', products: [] });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });

  });

  describe('POST /users/login', () => {
    it('should login a user and return a token', async () => {
        const mockToken = 'testToken123'; 
        const mockResult = { token: mockToken };
        (authService.loginUser as jest.Mock).mockResolvedValue(mockResult);
    
        const response = await request(app)
          .post('/users/login') 
          .send({ email: 'davinhopoxx@mail.com', password: '123456' });
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
        expect(response.body.token).toBe(mockToken); 
    });

    it('should return 400 on error login a user ', async () => {
        (authService.loginUser as jest.Mock).mockRejectedValue(new Error('Error login.'));
    
        const response = await request(app)
          .post('/users/login') 
          .send({ email: 'davinhopoxx@mail.com', password: '1234567' });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Error login.' });
    });

  });

  describe('DELETE /users/delete', () => {
    it('should delete a user', async () => {
      (userService.deleteUser as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .delete('/users/delete')
        .send({ adminUserId: 6, userId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User deleted successfully' });
    });

    it('should return 500 on error delete user', async () => {
        (userService.deleteUser as jest.Mock).mockRejectedValue(new Error('Error deleting user'));
  
        const response = await request(app)
          .delete('/users/delete')
          .send({ adminUserId: 1, userId: 6 });
  
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error deleting user' });
      });
  });

  describe('GET /users', () => {
    it('should get all users', async () => {
      const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app)
        .get('/users')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });

    it('should return 500 if fetching users fails', async () => {
      (userService.getAllUsers as jest.Mock).mockRejectedValue(new Error('Failed to fetch users'));

      const response = await request(app)
        .get('/users')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch users' });
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by id', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/users/1')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 500 if fetching user by id fails', async () => {
      (userService.getUserById as jest.Mock).mockRejectedValue(new Error('Failed to fetch user'));

      const response = await request(app)
        .get('/users/1')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch user' });
    });
  });

});
