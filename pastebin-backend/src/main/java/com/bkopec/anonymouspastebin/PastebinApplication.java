package com.bkopec.anonymouspastebin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PastebinApplication {

    public static void main(String[] args) {
        SpringApplication.run(PastebinApplication.class, args);
    }

}
