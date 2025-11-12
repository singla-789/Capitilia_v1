package com.Singla.Capitalia.controller;

import com.Singla.Capitalia.dto.ExpenseDto;
import com.Singla.Capitalia.dto.FilterDto;
import com.Singla.Capitalia.dto.IncomeDto;
import com.Singla.Capitalia.service.ExpenseService;
import com.Singla.Capitalia.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {

    @Autowired
    private final IncomeService incomeService;

    @Autowired
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDto filter){
        LocalDate startDate = filter.getStartDate() != null
                ? filter.getStartDate()
                : LocalDate.of(1970, 1, 1);

        LocalDate endDate = filter.getEndDate() != null ? filter.getEndDate() : LocalDate.now();
        String keyword = filter.getKeyword() != null ? filter.getKeyword() : "";
        String sortField = filter.getSortField() != null ? filter.getSortField() : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(filter.getSortOrder()) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction,sortField);

        if ("income".equals(filter.getType())) {
            List<IncomeDto> incomes = incomeService.filterIncomes(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(incomes);

        } else if ("expense".equalsIgnoreCase(filter.getType())) {
            List<ExpenseDto> expenses = expenseService.filterExpenses(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(expenses);

        } else {
            return ResponseEntity.badRequest().body("Invalid type. Must be 'income' or 'expense'");
        }


    }
}
