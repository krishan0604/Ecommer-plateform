package com.store.dto;

public record CategoryDTO(
    Long id,
    String name,
    String slug,
    String imageUrl
) {}
