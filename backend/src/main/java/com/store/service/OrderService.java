package com.store.service;

import com.store.dto.OrderDTO;
import com.store.dto.OrderItemDTO;
import com.store.entity.*;
import com.store.repository.CartRepository;
import com.store.repository.OrderRepository;
import com.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderDTO placeOrder(Long userId, String shippingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        BigDecimal totalAmount = cart.getItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Order order = Order.builder()
                .user(user)
                .status("PENDING")
                .totalAmount(totalAmount)
                .shippingAddress(shippingAddress)
                .build();
        
        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> OrderItem.builder()
                        .order(order)
                        .product(cartItem.getProduct())
                        .quantity(cartItem.getQuantity())
                        .unitPrice(cartItem.getProduct().getPrice())
                        .build())
                .collect(Collectors.toList());
        
        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        
        // Clear cart after order
        cart.getItems().clear();
        cartRepository.save(cart);
        
        return convertToDTO(savedOrder);
    }

    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDTO(order);
    }

    public List<OrderDTO> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return convertToDTO(orderRepository.save(order));
    }

    private OrderDTO convertToDTO(Order order) {
        return new OrderDTO(
                order.getId(),
                order.getUser().getId(),
                order.getStatus(),
                order.getTotalAmount(),
                order.getShippingAddress(),
                order.getCreatedAt(),
                order.getItems().stream()
                        .map(this::convertToOrderItemDTO)
                        .collect(Collectors.toList())
        );
    }

    private OrderItemDTO convertToOrderItemDTO(OrderItem item) {
        return new OrderItemDTO(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getQuantity(),
                item.getUnitPrice()
        );
    }
}
