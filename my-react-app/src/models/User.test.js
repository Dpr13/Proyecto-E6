import { describe, it, expect } from 'vitest';
import { User } from './User';
import { Photo } from './Photo';

describe('User Model', () => {
  it('should create a user with all properties', () => {
    const user = new User('1', 'John Doe', 'john@example.com', 'profile.jpg', 'My bio');
    
    expect(user.id).toBe('1');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.profilePic).toBe('profile.jpg');
    expect(user.bio).toBe('My bio');
    expect(user.photos).toEqual([]);
    expect(user.followers).toEqual([]);
    expect(user.following).toEqual([]);
  });

  it('should create a user with default bio', () => {
    const user = new User('1', 'Jane Doe', 'jane@example.com', 'profile.jpg');
    
    expect(user.bio).toBe('');
  });

  it('should add a photo to the user', () => {
    const user = new User('1', 'John Doe', 'john@example.com', 'profile.jpg');
    const photo = new Photo('photo1', 'user1', 'Sunset', 'Beautiful sunset', 'sunset.jpg');
    
    user.addPhoto(photo);
    
    expect(user.photos).toHaveLength(1);
    expect(user.photos[0]).toBe(photo);
  });

  it('should add multiple photos to the user', () => {
    const user = new User('1', 'John Doe', 'john@example.com', 'profile.jpg');
    const photo1 = new Photo('photo1', 'user1', 'Sunset', 'Beautiful sunset', 'sunset.jpg');
    const photo2 = new Photo('photo2', 'user1', 'Mountain', 'Mountain view', 'mountain.jpg');
    
    user.addPhoto(photo1);
    user.addPhoto(photo2);
    
    expect(user.photos).toHaveLength(2);
    expect(user.photos[0]).toBe(photo1);
    expect(user.photos[1]).toBe(photo2);
  });

  it('should return correct photo count', () => {
    const user = new User('1', 'John Doe', 'john@example.com', 'profile.jpg');
    
    expect(user.getPhotoCount()).toBe(0);
    
    user.addPhoto(new Photo('photo1', 'user1', 'Sunset', 'Beautiful sunset', 'sunset.jpg'));
    expect(user.getPhotoCount()).toBe(1);
    
    user.addPhoto(new Photo('photo2', 'user1', 'Mountain', 'Mountain view', 'mountain.jpg'));
    expect(user.getPhotoCount()).toBe(2);
  });

  it('should initialize followers as empty array', () => {
    const user = new User('1', 'John Doe', 'john@example.com', 'profile.jpg');
    
    expect(user.followers).toEqual([]);
    expect(Array.isArray(user.followers)).toBe(true);
  });

  it('should initialize following as empty array', () => {
    const user = new User('1', 'John Doe', 'john@example.com', 'profile.jpg');
    
    expect(user.following).toEqual([]);
    expect(Array.isArray(user.following)).toBe(true);
  });
});
