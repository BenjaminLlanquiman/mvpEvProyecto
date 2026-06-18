package com.Innovatech.ms_recursos.repository;

import com.Innovatech.ms_recursos.model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Long> {
    List<Recurso> findByRegion(String region);
}