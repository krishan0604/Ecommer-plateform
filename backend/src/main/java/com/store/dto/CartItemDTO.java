package com.store.dto;

import java.math.BigDecimal;

public record CartItemDTO(
    Long id,
    Long productId,
    String productName,
    BigDecimal productPrice,
    String productImageUrl,
    Integer quantity
) {}
