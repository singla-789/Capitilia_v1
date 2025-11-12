package com.Singla.Capitalia.service;

import com.Singla.Capitalia.dto.CategoryDto;
import com.Singla.Capitalia.entity.CategoryEntity;
import com.Singla.Capitalia.entity.ProfileEntity;
import com.Singla.Capitalia.repositary.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private final ProfileService profileService;

    @Autowired
    private final CategoryRepository categoryRepository;


    //save
    public CategoryDto saveCategory(CategoryDto categoryDto){
        ProfileEntity profile = profileService.getCurrentProfile();
        if(categoryRepository.existsByNameAndProfileId(categoryDto.getName(),profile.getId())){
            throw new RuntimeException("Category with this name already exists ");
        }
        CategoryEntity newEntity = toEntity(categoryDto,profile);
        newEntity = categoryRepository.save(newEntity);
        return toDto(newEntity);
    }

    //get categories for current user
    public List<CategoryDto> getCategoriesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByProfileId(profile.getId());
        return categories.stream().map(this::toDto).toList();
    }

    // get categories by type for current user
    public List<CategoryDto> getCategoriesByTypeOfCurrentUser(String type){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByTypeAndProfileId(type,profile.getId());
        return categories.stream().map(this::toDto).toList();
    }

    //update category
    public CategoryDto updateCategory(Long categoryId,CategoryDto dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity existingCategory =categoryRepository.findByIdAndProfileId(categoryId,profile.getId())
                .orElseThrow(() -> new RuntimeException("Category not found or not accessible"));
        existingCategory.setName(dto.getName());
        existingCategory.setIcon(dto.getIcon());
        existingCategory.setType(dto.getType());
        existingCategory = categoryRepository.save(existingCategory);
        return  toDto(existingCategory);
    }








    //helper methodes
    public CategoryEntity toEntity(CategoryDto categoryDto , ProfileEntity profile){
        return CategoryEntity.builder()
                .name(categoryDto.getName())
                .icon(categoryDto.getIcon())
                .profile(profile)
                .type(categoryDto.getType())
                .build();
    }

    public CategoryDto toDto(CategoryEntity entity){
        return CategoryDto.builder()
                .id(entity.getId())
                .profileId(entity.getProfile() != null ? entity.getProfile().getId():null)
                .name(entity.getName())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .icon(entity.getIcon())
                .type(entity.getType())
                .build();
    }
}
