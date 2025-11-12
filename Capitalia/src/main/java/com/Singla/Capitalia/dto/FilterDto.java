package com.Singla.Capitalia.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
public class FilterDto {

    private String type;
    private LocalDate startDate;
    private LocalDate endDate;
    private String keyword;
    private String sortField; // date, amount, name
    private String sortOrder; // asc or desc
}

