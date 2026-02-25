import { expect, test, describe, beforeEach } from 'vitest';
import { useCartStore } from '../src/store/useCartStore';

describe('Cart Zustand Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  test('should add items to the cart', () => {
    const item = { id: '1', name: 'Pizza', price: 10 };
    useCartStore.getState().addItem(item);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });
});