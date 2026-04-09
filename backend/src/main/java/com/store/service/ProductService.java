package com.store.service;

import com.store.dto.ProductDTO;
import com.store.entity.Category;
import com.store.entity.Product;
import com.store.repository.CategoryRepository;
import com.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public Page<ProductDTO> getAllProducts(Long categoryId, String name, Pageable pageable) {
        Page<Product> products;
        if (categoryId != null) {
            products = productRepository.findByCategoryId(categoryId, pageable);
        } else if (name != null) {
            products = productRepository.findByNameContainingIgnoreCase(name, pageable);
        } else {
            products = productRepository.findAll(pageable);
        }
        return products.map(this::convertToDTO);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Product product = Product.builder()
                .name(productDTO.name())
                .description(productDTO.description())
                .price(productDTO.price())
                .stock(productDTO.stock())
                .imageUrl(productDTO.imageUrl())
                .category(category)
                .build();
        
        return convertToDTO(productRepository.save(product));
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Category category = categoryRepository.findById(productDTO.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        product.setName(productDTO.name());
        product.setDescription(productDTO.description());
        product.setPrice(productDTO.price());
        product.setStock(productDTO.stock());
        product.setImageUrl(productDTO.imageUrl());
        product.setCategory(category);
        
        return convertToDTO(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    private ProductDTO convertToDTO(Product product) {
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
