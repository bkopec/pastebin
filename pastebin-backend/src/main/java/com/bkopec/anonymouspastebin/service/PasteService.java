package com.bkopec.anonymouspastebin.service;

import com.bkopec.anonymouspastebin.dto.CreatePasteDto;
import com.bkopec.anonymouspastebin.dto.PasteDto;
import com.bkopec.anonymouspastebin.entity.Paste;
import com.bkopec.anonymouspastebin.exception.ResourceNotFoundException;
import com.bkopec.anonymouspastebin.repository.PasteRepository; // Renamed repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PasteService {

    private final PasteRepository pasteRepository;

    @Autowired
    public PasteService(PasteRepository pasteRepository) {
        this.pasteRepository = pasteRepository;
    }

    @Transactional
    public PasteDto createPaste(CreatePasteDto createDto) {
        Paste paste = new Paste(createDto.getTitle(), createDto.getContent());
        Paste savedPaste = pasteRepository.save(paste);
        return mapToDto(savedPaste);
    }

    @Transactional(readOnly = true)
    public Page<PasteDto> getRecentPastes(Pageable pageable) {
        return pasteRepository.findAll(pageable)
                .map(this::mapToDto);
    }

    @Transactional(readOnly = true)
    public PasteDto getPasteById(Long id) {
        Paste paste = pasteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paste not found with id: " + id));
        return mapToDto(paste);
    }

    private PasteDto mapToDto(Paste paste) {
        return new PasteDto(
                paste.getId(),
                paste.getTitle(),
                paste.getContent(),
                paste.getCreatedAt()
        );
    }
}