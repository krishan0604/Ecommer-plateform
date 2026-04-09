package com.store.dto;

import java.time.LocalDateTime;

public record UserDTO(
    Long id,
    String name,
    String email,
    String phone,
    String address,
    LocalDateTime createdAt
) {}
