package com.store.dto;

import java.time.LocalDateTime;

public record ReviewDTO(
    Long id,
    Long productId,
    Long userId,
    String userName,
    Integer rating,
    String comment,
    LocalDateTime createdAt
) {}
