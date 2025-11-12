package com.Singla.Capitalia.controller;


import com.Singla.Capitalia.dto.CategoryDto;
import com.Singla.Capitalia.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDto> saveCategory(@RequestBody CategoryDto categoryDto){
        CategoryDto savedCategory = categoryService.saveCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories(){
        List<CategoryDto> categoryDtos = categoryService.getCategoriesForCurrentUser();
        return ResponseEntity.ok(categoryDtos);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<CategoryDto>> getCategoriesByType(@PathVariable String type){
        List<CategoryDto> categoryDtos = categoryService.getCategoriesByTypeOfCurrentUser(type);
        return ResponseEntity.ok(categoryDtos);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable Long categoryId,@RequestBody CategoryDto categoryDto){
        CategoryDto updatedDto = categoryService.updateCategory(categoryId,categoryDto);
        return ResponseEntity.ok(updatedDto);
    }


}
