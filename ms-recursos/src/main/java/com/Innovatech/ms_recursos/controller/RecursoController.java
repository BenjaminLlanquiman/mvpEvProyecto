package com.Innovatech.ms_recursos.controller;

import com.Innovatech.ms_recursos.model.Recurso;
import com.Innovatech.ms_recursos.service.RecursoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "*")
public class RecursoController {

    private final RecursoService service;

    public RecursoController(RecursoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Recurso> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/region/{region}")
    public List<Recurso> obtenerPorRegion(@PathVariable String region) {
        return service.obtenerPorRegion(region);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recurso> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Recurso crear(@RequestBody Recurso recurso) {
        return service.guardar(recurso);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Recurso> actualizar(@PathVariable Long id, @RequestBody Recurso datos) {
        try {
            return ResponseEntity.ok(service.actualizar(id, datos));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}