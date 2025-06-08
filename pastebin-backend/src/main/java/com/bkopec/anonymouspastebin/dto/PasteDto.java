package com.bkopec.anonymouspastebin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasteDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}