package com.Singla.Capitalia.controller;

import com.Singla.Capitalia.dto.AuthDto;
import com.Singla.Capitalia.dto.ProfileDto;
import com.Singla.Capitalia.entity.ProfileEntity;
import com.Singla.Capitalia.service.ProfileService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    @Autowired
    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDto> registerProfile(@RequestBody ProfileDto profileDto){
        ProfileDto registeredProfile = profileService.registerProfile(profileDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token){
        boolean isActive = profileService.activateProfile(token);
        if(isActive){
            return ResponseEntity.ok("Profile activated successfully");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activation key not found or already used");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDto authDto){
        try{
            if(!profileService.isAccountActive(authDto.getEmail())){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message"
                        ,"Account is not active. Please activate your account first "));
            }
            Map<String,Object> response = profileService.authenticateAndGenerateToken(authDto);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message",e.getMessage()));
        }
    }

    @GetMapping("/{email}")
    public  ResponseEntity<ProfileDto> getPublicProfile(@PathVariable String email){
        ProfileDto profile = profileService.getPublicProfile(email);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/test")
    public String test(){
        return "success";
    }


}
