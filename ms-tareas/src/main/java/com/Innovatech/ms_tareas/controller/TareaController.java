package com.Innovatech.ms_tareas.controller;

import com.Innovatech.ms_tareas.model.Tarea;
import com.Innovatech.ms_tareas.service.TareaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    private final TareaService service;

    public TareaController(TareaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tarea> obtenerTodas() {
        return service.obtenerTodas();
    }

    @GetMapping("/proyecto/{proyectoId}")
    public List<Tarea> obtenerPorProyecto(@PathVariable String proyectoId) {
        return service.obtenerPorProyecto(proyectoId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarea> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tarea crear(@RequestBody Tarea tarea) {
        return service.guardar(tarea);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Tarea> actualizar(@PathVariable Long id, @RequestBody Tarea datos) {
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