package com.Singla.Capitalia.service;

import com.Singla.Capitalia.dto.ExpenseDto;
import com.Singla.Capitalia.dto.IncomeDto;
import com.Singla.Capitalia.entity.CategoryEntity;
import com.Singla.Capitalia.entity.ExpenseEntity;
import com.Singla.Capitalia.entity.IncomeEntity;
import com.Singla.Capitalia.entity.ProfileEntity;
import com.Singla.Capitalia.repositary.CategoryRepository;
import com.Singla.Capitalia.repositary.ExpenseRepository;
import com.Singla.Capitalia.repositary.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class IncomeService {

    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final IncomeRepository incomeRepository;
    @Autowired
    private final ProfileService profileService;

    //    add income
    public IncomeDto addIncome(IncomeDto dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("category not found"));
        IncomeEntity newIncome = toEntity(dto,profile,category);
        incomeRepository.save(newIncome);
        return toDto(newIncome);
    }

    //    Retrieve add incomes for current month on the based no start and end dates
    public List<IncomeDto> getCurrentMonthIncomesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate start = now.withDayOfMonth(1);
        LocalDate end = now.withDayOfMonth(now.lengthOfMonth());
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetween(profile.getId(),start,end);
        return list.stream().map(this::toDto).toList();
    }

    //    delete income by id for current user
    public void deleteIncome(Long incomeId){
        ProfileEntity profile = profileService.getCurrentProfile();
        IncomeEntity entity = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new  RuntimeException("Income not found"));
        if(!entity.getProfile().getId().equals(profile.getId())){
            throw new RuntimeException("Unauthorized to delete this income");
        }
        incomeRepository.delete(entity);
    }


    //    get latest 5 incomes for current user
    public List<IncomeDto> getLatest5IncomesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return list.stream().map(this::toDto).toList();
    }

    //    Get total income for current user
    public BigDecimal getTotalIncomeForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total = incomeRepository.findTotalIncomeByProfileId(profile.getId());
        return total != null ? total : BigDecimal.ZERO;
    }

    //    Filter incomes
    public List<IncomeDto> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(), startDate,endDate,keyword,sort);
        return list.stream().map(this::toDto).toList();
    }


    //    helper methods
    public IncomeEntity toEntity(IncomeDto dto , ProfileEntity profile, CategoryEntity category){
        return IncomeEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    public IncomeDto toDto(IncomeEntity entity){
        return IncomeDto.builder()
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
