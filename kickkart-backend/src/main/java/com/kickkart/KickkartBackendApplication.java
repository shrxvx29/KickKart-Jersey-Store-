package com.kickkart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class KickkartBackendApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(KickkartBackendApplication.class);
		// Railway injects PORT as an environment variable
		app.setDefaultProperties(Collections.singletonMap("server.port", System.getenv("PORT")));
		app.run(args);
	}
}
