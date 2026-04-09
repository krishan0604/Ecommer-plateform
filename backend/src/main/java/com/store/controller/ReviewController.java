package com.store.controller;

import com.store.dto.ReviewDTO;
import com.store.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProductId(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewsByProductId(id));
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<ReviewDTO> createReview(
            @PathVariable Long id,
            @RequestBody ReviewDTO reviewDTO) {
        return ResponseEntity.status(201).body(reviewService.createReview(id, reviewDTO));
    }
}
