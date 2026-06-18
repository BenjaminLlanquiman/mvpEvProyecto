package com.Innovatech.ms_dashboard.service;

import com.Innovatech.ms_dashboard.dto.DashboardDTO;
import com.Innovatech.ms_dashboard.model.Recurso;
import com.Innovatech.ms_dashboard.model.Tarea;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final RestTemplate restTemplate;

    private static final String MS_RECURSOS_URL = "http://ms-recursos:8081/api/recursos";
    private static final String MS_TAREAS_URL = "http://ms-tareas:8082/api/tareas";

    public DashboardService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

   public DashboardDTO obtenerDashboard() {
    Recurso[] recursosArr = restTemplate.getForObject(MS_RECURSOS_URL, Recurso[].class);
    Tarea[] tareasArr = restTemplate.getForObject(MS_TAREAS_URL, Tarea[].class);

    List<Recurso> recursos = recursosArr != null ? Arrays.asList(recursosArr) : List.of();
    List<Tarea> tareas = tareasArr != null ? Arrays.asList(tareasArr) : List.of();

    // Filtrar tareas con proyectoId nulo antes de agrupar
    Map<String, List<Tarea>> tareasPorProyecto = tareas.stream()
            .filter(t -> t.getProyectoId() != null && !t.getProyectoId().isBlank())
            .collect(Collectors.groupingBy(Tarea::getProyectoId));

    DashboardDTO.Summary summary = new DashboardDTO.Summary(recursos, tareas);

    return new DashboardDTO(recursos, tareasPorProyecto, summary);
}
}