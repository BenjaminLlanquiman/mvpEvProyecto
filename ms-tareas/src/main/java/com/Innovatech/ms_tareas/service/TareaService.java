package com.Innovatech.ms_tareas.service;

import com.Innovatech.ms_tareas.model.Tarea;
import com.Innovatech.ms_tareas.repository.TareaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    private final TareaRepository repository;

    public TareaService(TareaRepository repository) {
        this.repository = repository;
    }

    public List<Tarea> obtenerTodas() {
        return repository.findAll();
    }

    public List<Tarea> obtenerPorProyecto(String proyectoId) {
        return repository.findByProyectoId(proyectoId);
    }

    public Tarea guardar(Tarea tarea) {
        return repository.save(tarea);
    }

    public Optional<Tarea> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Tarea actualizar(Long id, Tarea datos) {
        return repository.findById(id).map(t -> {
            t.setTitulo(datos.getTitulo());
            t.setEstado(datos.getEstado());
            t.setProyectoId(datos.getProyectoId());
            return repository.save(t);
        }).orElseThrow(() -> new RuntimeException("Tarea no encontrada: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}