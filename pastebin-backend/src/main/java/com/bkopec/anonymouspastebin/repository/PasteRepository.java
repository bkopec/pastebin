package com.bkopec.anonymouspastebin.repository;

import com.bkopec.anonymouspastebin.entity.Paste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasteRepository extends JpaRepository<Paste, Long> {
}