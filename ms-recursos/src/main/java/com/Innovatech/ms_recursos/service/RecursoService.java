package com.Innovatech.ms_recursos.service;

import com.Innovatech.ms_recursos.model.Recurso;
import com.Innovatech.ms_recursos.repository.RecursoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecursoService {

    private final RecursoRepository repository;

    public RecursoService(RecursoRepository repository) {
        this.repository = repository;
    }

    public List<Recurso> obtenerTodos() {
        return repository.findAll();
    }

    public List<Recurso> obtenerPorRegion(String region) {
        return repository.findByRegion(region);
    }

    public Recurso guardar(Recurso recurso) {
        return repository.save(recurso);
    }

    public Optional<Recurso> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Recurso actualizar(Long id, Recurso datos) {
        return repository.findById(id).map(r -> {
            r.setNombre(datos.getNombre());
            r.setRol(datos.getRol());
            r.setRegion(datos.getRegion());
            r.setCapacidadHoras(datos.getCapacidadHoras());
            r.setHorasAsignadas(datos.getHorasAsignadas());
            return repository.save(r);
        }).orElseThrow(() -> new RuntimeException("Recurso no encontrado: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}