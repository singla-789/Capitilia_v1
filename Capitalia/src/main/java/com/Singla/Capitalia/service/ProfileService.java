package com.Singla.Capitalia.service;

import com.Singla.Capitalia.dto.AuthDto;
import com.Singla.Capitalia.dto.ProfileDto;
import com.Singla.Capitalia.entity.ProfileEntity;
import com.Singla.Capitalia.repositary.ProfileRepository;
import com.Singla.Capitalia.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    @Autowired
    private final ProfileRepository profileRepository;
    @Autowired
    private final  EmailService emailService;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final JwtUtil jwtUtil;

    @Value("${app.activation.url}")
    private String activationUrl;

//    register

    public ProfileDto registerProfile(ProfileDto profileDto){
        ProfileEntity newProfile =  toEntity(profileDto);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile =  profileRepository.save(newProfile);
        String activationLink = activationUrl+"/api/v1.0/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your Capitalia account";
        String body = "Click on the activation link to activate your account " + activationLink;
        emailService.sendMail(profileDto.getEmail(),subject,body);
        return toDto(newProfile);
    }

    private ProfileDto toDto(ProfileEntity newProfile) {
        return ProfileDto.builder()
                .id(newProfile.getId())
                .fullName(newProfile.getFullName())
                .email(newProfile.getEmail())
                .profileImageUrl(newProfile.getProfileImageUrl())
                .createdAt(newProfile.getCreatedAt())
                .updatedAt(newProfile.getUpdatedAt())
                .build();
    }

    public ProfileEntity toEntity(ProfileDto profileDto){
        return ProfileEntity.builder()
                .id(profileDto.getId())
                .fullName(profileDto.getFullName())
                .email(profileDto.getEmail())
                .password(passwordEncoder.encode(profileDto.getPassword()))
                .profileImageUrl(profileDto.getProfileImageUrl())
                .createdAt(profileDto.getCreatedAt())
                .updatedAt(profileDto.getUpdatedAt())
                .build();
    }

//     activation

    public boolean activateProfile(String activationToken){
        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }


//    authentication

    public boolean isAccountActive(String email){
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(()->new UsernameNotFoundException("Profile not found by the given mail : " +  authentication.getName()));
    }


    public ProfileDto getPublicProfile(String email){
        ProfileEntity currentUser = null;
         if(email==null){
             currentUser = getCurrentProfile();
         }
         else{
             currentUser = profileRepository.findByEmail(email)
                     .orElseThrow(()->new UsernameNotFoundException("Profile not found by the given mail : " + email));
         }
         return toDto(currentUser);
    }


    public Map<String, Object> authenticateAndGenerateToken(AuthDto authDto) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDto.getEmail(),authDto.getPassword()));
            String token = jwtUtil.generateToken(authDto.getEmail());
            return Map.of(
                    "token",token,
                    "user",getPublicProfile(authDto.getEmail())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
