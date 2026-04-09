package com.store.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderDTO(
    Long id,
    Long userId,
    String status,
    BigDecimal totalAmount,
    String shippingAddress,
    LocalDateTime createdAt,
    List<OrderItemDTO> items
) {}
