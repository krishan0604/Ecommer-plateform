package com.store.service;

import com.store.dto.UserDTO;
import com.store.entity.User;
import com.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserDTO registerUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.email()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        
        User user = User.builder()
                .name(userDTO.name())
                .email(userDTO.email())
                .phone(userDTO.phone())
                .address(userDTO.address())
                .build();
        
        return convertToDTO(userRepository.save(user));
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setName(userDTO.name());
        user.setPhone(userDTO.phone());
        user.setAddress(userDTO.address());
        
        return convertToDTO(userRepository.save(user));
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getCreatedAt()
        );
    }
}
