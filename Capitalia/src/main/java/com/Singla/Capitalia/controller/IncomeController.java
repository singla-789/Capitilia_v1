package com.Singla.Capitalia.controller;

import com.Singla.Capitalia.dto.ExpenseDto;
import com.Singla.Capitalia.dto.IncomeDto;
import com.Singla.Capitalia.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    @Autowired
    private final IncomeService incomeService;
    @PostMapping
    public ResponseEntity<IncomeDto> addExpense(@RequestBody IncomeDto dto){
        IncomeDto saved = incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDto>> addIncome(){
        List<IncomeDto> list = incomeService.getCurrentMonthIncomesForCurrentUser();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id){
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }


}
