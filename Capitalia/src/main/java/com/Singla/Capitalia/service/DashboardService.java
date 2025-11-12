package com.Singla.Capitalia.service;

import com.Singla.Capitalia.dto.ExpenseDto;
import com.Singla.Capitalia.dto.IncomeDto;
import com.Singla.Capitalia.dto.RecentTransactionDto;
import com.Singla.Capitalia.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashboardService {

    @Autowired
    private final ExpenseService expenseService;
    @Autowired
    private final IncomeService incomeService;
    @Autowired
    private final ProfileService profileService;

    public Map<String,Object> getDashboardData(){
        ProfileEntity profile = profileService.getCurrentProfile();
        Map<String, Object> returnValue = new LinkedHashMap<>();
        List<IncomeDto> latestIncomes = incomeService.getLatest5IncomesForCurrentUser();
        List<ExpenseDto> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();

        List<RecentTransactionDto> recentTransactionDtos = concat(latestIncomes.stream().map((IncomeDto income) ->
                RecentTransactionDto.builder()
                        .id(income.getId())
                        .profileId(profile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income")
                        .build()),
                latestExpenses.stream().map((ExpenseDto expense)->
                        RecentTransactionDto.builder()
                                .id(expense.getId())
                                .profileId(profile.getId())
                                .icon(expense.getIcon())
                                .name(expense.getName())
                                .amount(expense.getAmount())
                                .date(expense.getDate())
                                .createdAt(expense.getCreatedAt())
                                .updatedAt(expense.getUpdatedAt())
                                .type("expense")
                                .build()))
                .sorted((a,b)->{
                    int cmp = b.getDate().compareTo(a.getDate());
                    if(cmp ==0 && a.getCreatedAt() != null && b.getCreatedAt() != null){
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                }).toList();

        returnValue.put("totalBalance",
                incomeService.getTotalIncomeForCurrentUser()
                        .subtract(expenseService.getTotalExpenseForCurrentUser()));

        returnValue.put("totalIncome", incomeService.getTotalIncomeForCurrentUser());

        returnValue.put("totalExpense", expenseService.getTotalExpenseForCurrentUser());

        returnValue.put("recent5Expenses", latestExpenses);

        returnValue.put("recent5Incomes", latestIncomes);

        returnValue.put("recentTransactions", recentTransactionDtos);



        return returnValue;
    }
}
