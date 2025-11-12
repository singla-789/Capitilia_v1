package com.Singla.Capitalia.controller;

import com.Singla.Capitalia.dto.ExpenseDto;
import com.Singla.Capitalia.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDto> addExpense(@RequestBody ExpenseDto dto){
        ExpenseDto saved = expenseService.addExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getExpenses(){
        List<ExpenseDto> list = expenseService.getCurrentMonthExpensesForCurrentUser();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }


}
