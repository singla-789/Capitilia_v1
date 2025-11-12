package com.Singla.Capitalia.service;


import com.Singla.Capitalia.entity.ProfileEntity;
import com.Singla.Capitalia.repositary.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.apache.xmlbeans.impl.xb.xsdschema.Attribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    @Autowired
    private final ProfileRepository profileRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        ProfileEntity existingProfile = profileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found with the email" + email));

        return User.builder()
                .username(existingProfile.getEmail())
                .password(existingProfile.getPassword())
                .build();
    }
}