package com.store.service;

import com.store.dto.CategoryDTO;
import com.store.dto.ProductDTO;
import com.store.entity.Category;
import com.store.entity.Product;
import com.store.repository.CategoryRepository;
import com.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return category.getProducts().stream()
                .map(this::convertToProductDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = Category.builder()
                .name(categoryDTO.name())
                .slug(categoryDTO.slug())
                .imageUrl(categoryDTO.imageUrl())
                .build();
        return convertToDTO(categoryRepository.save(category));
    }

    private CategoryDTO convertToDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getImageUrl()
        );
    }

    private ProductDTO convertToProductDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                product.getCreatedAt()
        );
    }
}
