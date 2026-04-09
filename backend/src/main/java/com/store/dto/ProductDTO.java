package com.store.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductDTO(
    Long id,
    String name,
    String description,
    BigDecimal price,
    Integer stock,
    String imageUrl,
    Long categoryId,
    String categoryName,
    LocalDateTime createdAt
) {}
