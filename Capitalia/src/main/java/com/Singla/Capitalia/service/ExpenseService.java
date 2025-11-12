package com.Singla.Capitalia.service;


import com.Singla.Capitalia.dto.ExpenseDto;
import com.Singla.Capitalia.entity.CategoryEntity;
import com.Singla.Capitalia.entity.ExpenseEntity;
import com.Singla.Capitalia.entity.ProfileEntity;
import com.Singla.Capitalia.repositary.CategoryRepository;
import com.Singla.Capitalia.repositary.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final ExpenseRepository expenseRepository;
    @Autowired
    private final ProfileService profileService;

//    add expense
    public ExpenseDto addExpense(ExpenseDto dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("category not found"));
        ExpenseEntity newExpense = toEntity(dto,profile,category);
        expenseRepository.save(newExpense);
        return toDto(newExpense);
    }

//    Retrieve add expenses for current month on the based no start and end dates
    public List<ExpenseDto> getCurrentMonthExpensesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate start = now.withDayOfMonth(1);
        LocalDate end = now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetween(profile.getId(),start,end);
        return list.stream().map(this::toDto).toList();
    }

//    delete expense by id for current user
    public void deleteExpense(Long expenseId){
        ProfileEntity profile = profileService.getCurrentProfile();
        ExpenseEntity entity = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new  RuntimeException("Expense not found"));
        if(!entity.getProfile().getId().equals(profile.getId())){
            throw new RuntimeException("Unauthorized to delete this expense");
        }
        expenseRepository.delete(entity);
    }

//    get latest 5 expenses for current user
    public List<ExpenseDto> getLatest5ExpensesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return list.stream().map(this::toDto).toList();
    }

//    Get total expense for current user
    public BigDecimal getTotalExpenseForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total = expenseRepository.findTotalExpenseByProfileId(profile.getId());
        return total != null ? total : BigDecimal.ZERO;
    }

//    Filter expenses
    public List<ExpenseDto> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(), startDate,endDate,keyword,sort);
        return list.stream().map(this::toDto).toList();
    }

//    Notifications
    public List<ExpenseDto> getExpensesForUserOnDate(Long profileId,LocalDate date){
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate(profileId,date);
        return list.stream().map(this::toDto).toList();
    }





//    helper methods
    public ExpenseEntity toEntity(ExpenseDto dto , ProfileEntity profile, CategoryEntity category){
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    public ExpenseDto toDto(ExpenseEntity entity){
        return ExpenseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
                .amount(entity.getAmount())
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
