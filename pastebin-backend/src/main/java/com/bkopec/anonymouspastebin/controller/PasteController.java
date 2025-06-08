package com.bkopec.anonymouspastebin.controller;

import com.bkopec.anonymouspastebin.dto.CreatePasteDto;
import com.bkopec.anonymouspastebin.dto.PasteDto;
import com.bkopec.anonymouspastebin.service.PasteService; // Renamed service
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pastes")
public class PasteController {

    private final PasteService pasteService;

    @Autowired
    public PasteController(PasteService pasteService) {
        this.pasteService = pasteService;
    }

    @PostMapping
    public ResponseEntity<PasteDto> createPaste(@Valid @RequestBody CreatePasteDto createPasteDto) {
        PasteDto createdPaste = pasteService.createPaste(createPasteDto);
        return new ResponseEntity<>(createdPaste, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<PasteDto>> getRecentPastes(
            @PageableDefault(size = 10, sort = "createdAt", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        Page<PasteDto> pastes = pasteService.getRecentPastes(pageable);
        return ResponseEntity.ok(pastes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PasteDto> getPasteById(@PathVariable Long id) {
        PasteDto paste = pasteService.getPasteById(id);
        return ResponseEntity.ok(paste);
    }

}