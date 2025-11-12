package com.Singla.Capitalia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CapitaliaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapitaliaApplication.class, args);
	}

}
