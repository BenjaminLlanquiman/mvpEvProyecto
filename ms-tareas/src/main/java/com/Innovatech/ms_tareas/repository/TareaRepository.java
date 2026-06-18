package com.Innovatech.ms_tareas.repository;

import com.Innovatech.ms_tareas.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByProyectoId(String proyectoId);
}
