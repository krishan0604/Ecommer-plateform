package com.store.config;

import com.store.entity.Category;
import com.store.entity.Product;
import com.store.entity.User;
import com.store.repository.CategoryRepository;
import com.store.repository.ProductRepository;
import com.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        // Seed Users
        User admin = User.builder()
                .name("Admin User")
                .email("admin@store.com")
                .phone("1234567890")
                .address("123 Main St, Tech City")
                .build();
        userRepository.save(admin);

        // Seed Categories
        List<Category> categories = Arrays.asList(
                Category.builder().name("Electronics").slug("electronics").imageUrl("https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500").build(),
                Category.builder().name("Fashion").slug("fashion").imageUrl("https://images.unsplash.com/photo-1445205170230-053b83016050?w=500").build(),
                Category.builder().name("Home & Kitchen").slug("home-kitchen").imageUrl("https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500").build(),
                Category.builder().name("Books").slug("books").imageUrl("https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500").build(),
                Category.builder().name("Fitness").slug("fitness").imageUrl("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500").build()
        );
        categoryRepository.saveAll(categories);

        // Seed Products
        List<Product> products = Arrays.asList(
                // Electronics
                Product.builder().name("Smartphone X").description("Next-gen smartphone").price(new BigDecimal("999.99")).stock(50).imageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500").category(categories.get(0)).build(),
                Product.builder().name("Laptop Pro").description("Powerful workstation").price(new BigDecimal("1499.99")).stock(30).imageUrl("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500").category(categories.get(0)).build(),
                Product.builder().name("Wireless Earbuds").description("Crystal clear sound").price(new BigDecimal("199.99")).stock(100).imageUrl("https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500").category(categories.get(0)).build(),
                Product.builder().name("Smart Watch").description("Track your fitness").price(new BigDecimal("299.99")).stock(75).imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500").category(categories.get(0)).build(),
                
                // Fashion
                Product.builder().name("Casual T-Shirt").description("100% Cotton").price(new BigDecimal("24.99")).stock(200).imageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500").category(categories.get(1)).build(),
                Product.builder().name("Denim Jacket").description("Classic style").price(new BigDecimal("89.99")).stock(45).imageUrl("https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500").category(categories.get(1)).build(),
                Product.builder().name("Knit Sweater").description("Warm and cozy").price(new BigDecimal("59.99")).stock(60).imageUrl("https://images.unsplash.com/photo-1434389677669-e08b493021fe?w=500").category(categories.get(1)).build(),
                Product.builder().name("Leather Boots").description("Durable and stylish").price(new BigDecimal("129.99")).stock(40).imageUrl("https://images.unsplash.com/photo-1520639889313-7272fd596440?w=500").category(categories.get(1)).build(),

                // Home & Kitchen
                Product.builder().name("Coffee Maker").description("Brews the perfect cup").price(new BigDecimal("79.99")).stock(25).imageUrl("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500").category(categories.get(2)).build(),
                Product.builder().name("Non-Stick Pan").description("Premium quality").price(new BigDecimal("49.99")).stock(100).imageUrl("https://images.unsplash.com/photo-1584990344321-27061766bb44?w=500").category(categories.get(2)).build(),
                Product.builder().name("Blender").description("High speed blending").price(new BigDecimal("129.99")).stock(35).imageUrl("https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500").category(categories.get(2)).build(),
                Product.builder().name("Toaster").description("2-slice toaster").price(new BigDecimal("29.99")).stock(80).imageUrl("https://images.unsplash.com/photo-1584990344315-46f90cf2c124?w=500").category(categories.get(2)).build(),

                // Books
                Product.builder().name("Sci-Fi Novel").description("Epic space journey").price(new BigDecimal("14.99")).stock(150).imageUrl("https://images.unsplash.com/photo-1543005120-a1cf30cf260d?w=500").category(categories.get(3)).build(),
                Product.builder().name("Cookbook").description("Healthy recipes").price(new BigDecimal("19.99")).stock(120).imageUrl("https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500").category(categories.get(3)).build(),
                Product.builder().name("History Book").description("Ancient civilizations").price(new BigDecimal("24.99")).stock(90).imageUrl("https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500").category(categories.get(3)).build(),
                Product.builder().name("Self-Help Book").description("Master your mindset").price(new BigDecimal("12.99")).stock(200).imageUrl("https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500").category(categories.get(3)).build(),

                // Fitness
                Product.builder().name("Yoga Mat").description("Eco-friendly material").price(new BigDecimal("34.99")).stock(100).imageUrl("https://images.unsplash.com/photo-1592432676556-3bc6741bb36b?w=500").category(categories.get(4)).build(),
                Product.builder().name("Dumbbells").description("Set of two").price(new BigDecimal("44.99")).stock(50).imageUrl("https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?w=500").category(categories.get(4)).build(),
                Product.builder().name("Running Shoes").description("Lightweight and breathable").price(new BigDecimal("99.99")).stock(70).imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500").category(categories.get(4)).build(),
                Product.builder().name("Water Bottle").description("Insulated stainless steel").price(new BigDecimal("19.99")).stock(300).imageUrl("https://images.unsplash.com/photo-1602143393494-1a2840a2f500?w=500").category(categories.get(4)).build(),

                // Additional Products to reach 30
                Product.builder().name("Gaming Console Z").description("High refresh rate gaming").price(new BigDecimal("499.99")).stock(20).imageUrl("https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500").category(categories.get(0)).build(),
                Product.builder().name("Mechanical Keyboard").description("Tactile and responsive").price(new BigDecimal("129.99")).stock(40).imageUrl("https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500").category(categories.get(0)).build(),
                Product.builder().name("Designer Sunglasses").description("UV400 Protection").price(new BigDecimal("159.99")).stock(55).imageUrl("https://images.unsplash.com/photo-1511499767390-a8a197599002?w=500").category(categories.get(1)).build(),
                Product.builder().name("Canvas Backpack").description("Large capacity").price(new BigDecimal("45.00")).stock(85).imageUrl("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500").category(categories.get(1)).build(),
                Product.builder().name("Air Fryer").description("Healthy cooking").price(new BigDecimal("89.99")).stock(30).imageUrl("https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500").category(categories.get(2)).build(),
                Product.builder().name("Knife Set").description("Professional grade").price(new BigDecimal("199.99")).stock(15).imageUrl("https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500").category(categories.get(2)).build(),
                Product.builder().name("Mystery Thriller").description("Number 1 Best Seller").price(new BigDecimal("12.00")).stock(100).imageUrl("https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500").category(categories.get(3)).build(),
                Product.builder().name("Travel Guide").description("Explore the world").price(new BigDecimal("22.50")).stock(40).imageUrl("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500").category(categories.get(3)).build(),
                Product.builder().name("Resistance Bands").description("Set of 5 levels").price(new BigDecimal("15.99")).stock(120).imageUrl("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500").category(categories.get(4)).build(),
                Product.builder().name("Foam Roller").description("Deep tissue massage").price(new BigDecimal("25.99")).stock(60).imageUrl("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500").category(categories.get(4)).build()
        );
        productRepository.saveAll(products);

        System.out.println("Data Seeding Completed!");
    }
}
