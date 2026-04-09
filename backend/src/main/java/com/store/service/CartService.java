package com.store.service;

import com.store.dto.CartDTO;
import com.store.dto.CartItemDTO;
import com.store.entity.Cart;
import com.store.entity.CartItem;
import com.store.entity.Product;
import com.store.entity.User;
import com.store.repository.CartItemRepository;
import com.store.repository.CartRepository;
import com.store.repository.ProductRepository;
import com.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartDTO getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createNewCart(userId));
        return convertToDTO(cart);
    }

    @Transactional
    public CartDTO addItemToCart(Long userId, Long productId, Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createNewCart(userId));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();
        
        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .build();
            cart.getItems().add(newItem);
        }
        
        return convertToDTO(cartRepository.save(cart));
    }

    @Transactional
    public CartDTO updateCartItem(Long userId, Long itemId, Integer quantity) {
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }
        
        return getCartByUserId(userId);
    }

    @Transactional
    public CartDTO removeItemFromCart(Long userId, Long itemId) {
        cartItemRepository.deleteById(itemId);
        return getCartByUserId(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart createNewCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = Cart.builder().user(user).build();
        return cartRepository.save(cart);
    }

    private CartDTO convertToDTO(Cart cart) {
        return new CartDTO(
                cart.getId(),
                cart.getUser().getId(),
                cart.getItems().stream()
                        .map(this::convertToItemDTO)
                        .collect(Collectors.toList())
        );
    }

    private CartItemDTO convertToItemDTO(CartItem item) {
        return new CartItemDTO(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getProduct().getPrice(),
                item.getProduct().getImageUrl(),
                item.getQuantity()
        );
    }
}
