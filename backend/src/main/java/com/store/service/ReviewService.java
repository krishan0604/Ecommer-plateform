package com.store.service;

import com.store.dto.ReviewDTO;
import com.store.entity.Product;
import com.store.entity.Review;
import com.store.entity.User;
import com.store.repository.ProductRepository;
import com.store.repository.ReviewRepository;
import com.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<ReviewDTO> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO createReview(Long productId, ReviewDTO reviewDTO) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        User user = userRepository.findById(reviewDTO.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Review review = Review.builder()
                .product(product)
                .user(user)
                .rating(reviewDTO.rating())
                .comment(reviewDTO.comment())
                .build();
        
        return convertToDTO(reviewRepository.save(review));
    }

    private ReviewDTO convertToDTO(Review review) {
        return new ReviewDTO(
                review.getId(),
                review.getProduct().getId(),
                review.getUser().getId(),
                review.getUser().getName(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt()
        );
    }
}
