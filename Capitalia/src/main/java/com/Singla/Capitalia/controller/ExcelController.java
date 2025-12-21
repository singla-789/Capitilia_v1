package com.Singla.Capitalia.controller;

import com.Singla.Capitalia.service.ExcelService;
import com.Singla.Capitalia.service.ExpenseService;
import com.Singla.Capitalia.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {

    @Autowired
    private final ExcelService excelService;
    @Autowired
    private  final IncomeService incomeService;
    @Autowired
    private  final ExpenseService expenseService;

    @GetMapping("/download/income")
    public void downloadIncomeExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition","attachment; filename=income.xlsx");
        excelService.writeIncomesToExcel(response.getOutputStream(),incomeService.getCurrentMonthIncomesForCurrentUser());
    }

    @GetMapping("/download/expense")
    public void downloadExpenseExcel(HttpServletResponse response) throws IOException{
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition","attachment; filename=expense.xlsx");
        excelService.writeExpensesToExcel(response.getOutputStream(),expenseService.getCurrentMonthExpensesForCurrentUser());
    }
}
