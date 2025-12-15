import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AstronomicalEvent } from './AstronomicalEvent';

describe('AstronomicalEvent Model', () => {
  let originalDate;

  beforeEach(() => {
    // Mock the current date to be 2025-06-15
    originalDate = Date;
    const mockDate = new Date('2025-06-15T12:00:00Z');
    global.Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          return mockDate;
        }
        return new originalDate(...args);
      }
      static now() {
        return mockDate.getTime();
      }
    };
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  it('should create an astronomical event with all properties', () => {
    const event = new AstronomicalEvent(
      '1',
      'eclipse',
      '2025-08-12',
      'Total solar eclipse',
      'North America'
    );
    
    expect(event.id).toBe('1');
    expect(event.type).toBe('eclipse');
    expect(event.date).toBe('2025-08-12');
    expect(event.description).toBe('Total solar eclipse');
    expect(event.location).toBe('North America');
    expect(event.visibility).toBe('global');
  });

  it('should create an event with null location', () => {
    const event = new AstronomicalEvent(
      '1',
      'supermoon',
      '2025-07-01',
      'Super Moon'
    );
    
    expect(event.location).toBeNull();
  });

  it('should return true for isUpcoming when date is in the future', () => {
    const event = new AstronomicalEvent(
      '1',
      'eclipse',
      '2025-08-12T12:00:00Z',
      'Future eclipse'
    );
    
    expect(event.isUpcoming()).toBe(true);
  });

  it('should return false for isUpcoming when date is in the past', () => {
    const event = new AstronomicalEvent(
      '1',
      'eclipse',
      '2025-01-12T12:00:00Z',
      'Past eclipse'
    );
    
    expect(event.isUpcoming()).toBe(false);
  });

  it('should return true for isPast when date is in the past', () => {
    const event = new AstronomicalEvent(
      '1',
      'eclipse',
      '2025-01-12T12:00:00Z',
      'Past eclipse'
    );
    
    expect(event.isPast()).toBe(true);
  });

  it('should return false for isPast when date is in the future', () => {
    const event = new AstronomicalEvent(
      '1',
      'eclipse',
      '2025-08-12T12:00:00Z',
      'Future eclipse'
    );
    
    expect(event.isPast()).toBe(false);
  });

  it('should handle different event types', () => {
    const eclipse = new AstronomicalEvent('1', 'eclipse', '2025-08-12', 'Eclipse');
    const supermoon = new AstronomicalEvent('2', 'supermoon', '2025-07-01', 'Super Moon');
    const meteorShower = new AstronomicalEvent('3', 'meteor_shower', '2025-08-13', 'Perseids');
    
    expect(eclipse.type).toBe('eclipse');
    expect(supermoon.type).toBe('supermoon');
    expect(meteorShower.type).toBe('meteor_shower');
  });

  it('should have global visibility by default', () => {
    const event = new AstronomicalEvent('1', 'eclipse', '2025-08-12', 'Eclipse');
    
    expect(event.visibility).toBe('global');
  });
});
