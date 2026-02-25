import { expect, test, describe } from 'vitest';
import { OrderSchema } from '../src/lib/validations';

describe('Order Schema Validation', () => {
  test('should fail with invalid phone number', () => {
    const result = OrderSchema.safeParse({
      customerName: "Rudransh",
      address: "Indore",
      phone: "123", // Too short
      items: []
    });
    expect(result.success).toBe(false);
  });
});