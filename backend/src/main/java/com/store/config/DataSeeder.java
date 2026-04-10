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
import java.util.ArrayList;
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
                Category.builder().name("Technology").slug("technology").imageUrl("https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500").build(),
                Category.builder().name("Fashion").slug("fashion").imageUrl("https://images.unsplash.com/photo-1445205170230-053b83016050?w=500").build(),
                Category.builder().name("Jewelry").slug("jewelry").imageUrl("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500").build(),
                Category.builder().name("Footwear").slug("footwear").imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500").build()
        );
        categoryRepository.saveAll(categories);

        List<Product> products = new ArrayList<>();

        // 1. TECHNOLOGY (20 items)
        String[] techNames = {"Smartphone Pro", "Ultra Laptop", "Wireless Earbuds", "Smart Watch Series", "Gaming Console X", "Mechanical Keyboard", "Noise-Cancelling Headphones", "Minimalist Desk Lamp", "Wireless Charging Pad", "Smart Home Thermostat", "Portable Power Bank", "Bluetooth Speaker", "4K Monitor", "Ergonomic Mouse", "Tablet Pro", "Smart Glasses", "Drone Camera", "Mirrorless Camera", "Smart lock", "Home Assistant Hub"};
        String[] techImgs = {
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500", "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500", "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500", "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500", "https://images.unsplash.com/photo-1558002038-1055907df827?w=500", "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500", "https://images.unsplash.com/photo-1572635196237-14b3f281501f?w=500",
            "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", "https://images.unsplash.com/photo-1558002038-1055907df827?w=500", "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500"
        };
        for(int i=0; i<20; i++) {
            products.add(Product.builder().name(techNames[i]).description("Premium technology item - " + techNames[i]).price(BigDecimal.valueOf(99.0 + (i*15))).stock(50).imageUrl(techImgs[i]).category(categories.get(0)).build());
        }

        // 2. FASHION (20 items)
        String[] fashNames = {"Casual T-Shirt", "Denim Jacket", "Knit Sweater", "Linen Button-Down", "Cashmere Scarf", "Travel Luggage", "Designer Sunglasses", "Canvas Backpack", "Minimalist Wallet", "Silk Tie", "Wool Overcoat", "Pleated Trousers", "Cotton Polo", "Leather Belt", "Summer Dress", "Trench Coat", "Chino Pants", "Winter Beanie", "Puffer Vest", "Graphic Tee"};
        String[] fashImgs = {
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", "https://images.unsplash.com/photo-1434389677669-e08b493021fe?w=500", "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500",
            "https://images.unsplash.com/photo-1520639889313-7272fd596440?w=500", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", "https://images.unsplash.com/photo-1511499767390-a8a197599002?w=500", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", "https://images.unsplash.com/photo-1595128310022-8700201adfd1?w=500", "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500", "https://images.unsplash.com/photo-1515347619362-e6129881023a?w=500", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500", "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500", "https://images.unsplash.com/photo-1543076442-f875323bbaf4?w=500", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
        };
        for(int i=0; i<20; i++) {
            products.add(Product.builder().name(fashNames[i]).description("Essential fashion piece - " + fashNames[i]).price(BigDecimal.valueOf(25.0 + (i*5))).stock(100).imageUrl(fashImgs[i]).category(categories.get(1)).build());
        }

        // 3. JEWELRY (20 items)
        String[] jlryNames = {"Classic Watch", "Silver Ring", "Gold Necklace", "Diamond Earrings", "Pearl Bracelet", "Chronograph Watch", "Vintage Brooch", "Sapphire Pendant", "Rose Gold Band", "Platinum Chain", "Emerald Ring", "Hoop Earrings", "Charm Bracelet", "Leather Strap Watch", "Cufflinks", "Ruby Choker", "Titanium Ring", "Opal Earrings", "Crystal Pendant", "Minimalist Bangle"};
        String[] jlryImgs = {
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500", "https://images.unsplash.com/photo-1605100804763-247f66120ef8?w=500", "https://images.unsplash.com/photo-1599643478524-fb52479e39b9?w=500", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
            "https://images.unsplash.com/photo-1573408301145-3f309990e66d?w=500", "https://images.unsplash.com/photo-1524592094714-abf066ddfd43?w=500", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500",
            "https://images.unsplash.com/photo-1605100804763-247f66120ef8?w=500", "https://images.unsplash.com/photo-1599643478524-fb52479e39b9?w=500", "https://images.unsplash.com/photo-1605100804763-247f66120ef8?w=500", "https://images.unsplash.com/photo-1630018047814-722cda47b1a0?w=500",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500", "https://images.unsplash.com/photo-1587393457599-7fb2a061ebf7?w=500", "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500",
            "https://images.unsplash.com/photo-1605100804763-247f66120ef8?w=500", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500", "https://images.unsplash.com/photo-1599643478524-fb52479e39b9?w=500", "https://images.unsplash.com/photo-1573408301145-3f309990e66d?w=500"
        };
        for(int i=0; i<20; i++) {
            products.add(Product.builder().name(jlryNames[i]).description("Finely crafted jewelry - " + jlryNames[i]).price(BigDecimal.valueOf(100.0 + (i*20))).stock(20).imageUrl(jlryImgs[i]).category(categories.get(2)).build());
        }

        // 4. FOOTWEAR (20 items)
        String[] fwNames = {"Running Shoes", "Leather Boots", "Classic Sneakers", "Formal Oxfords", "Suede Loafers", "High-Top Sneakers", "Ankle Boots", "Chelsea Boots", "Athletic Trainers", "Canvas Slip-Ons", "Hiking Boots", "Platform Sneakers", "Dress Derbies", "Summer Sandals", "Winter Boots", "Chukka Boots", "Basketball Shoes", "Minimalist Sneakers", "Driving Shoes", "Evening Heels"};
        String[] fwImgs = {
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", "https://images.unsplash.com/photo-1520639889313-7272fd596440?w=500", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500", "https://images.unsplash.com/photo-1614252339893-b4e85744dbb4?w=500",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500", "https://images.unsplash.com/photo-1595341888016-e3ab62164483?w=500", "https://images.unsplash.com/photo-1520639889313-7272fd596440?w=500", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
            "https://images.unsplash.com/photo-1614252339893-b4e85744dbb4?w=500", "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", "https://images.unsplash.com/photo-1520639889313-7272fd596440?w=500",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"
        };
        for(int i=0; i<20; i++) {
            products.add(Product.builder().name(fwNames[i]).description("Premium quality footwear - " + fwNames[i]).price(BigDecimal.valueOf(60.0 + (i*10))).stock(60).imageUrl(fwImgs[i]).category(categories.get(3)).build());
        }

        productRepository.saveAll(products);

        System.out.println("Data Seeding Completed with 80 products!");
    }
}
