package com.Innovatech.ms_dashboard.dto;

import com.Innovatech.ms_dashboard.model.Recurso;
import com.Innovatech.ms_dashboard.model.Tarea;
import java.util.List;
import java.util.Map;

public class DashboardDTO {

    private List<Recurso> recursos;
    private Map<String, List<Tarea>> tareasPorProyecto;
    private Summary summary;

    public DashboardDTO(List<Recurso> recursos, Map<String, List<Tarea>> tareasPorProyecto, Summary summary) {
        this.recursos = recursos;
        this.tareasPorProyecto = tareasPorProyecto;
        this.summary = summary;
    }

    public List<Recurso> getRecursos() { return recursos; }
    public Map<String, List<Tarea>> getTareasPorProyecto() { return tareasPorProyecto; }
    public Summary getSummary() { return summary; }

    public static class Summary {
        private int totalRecursos;
        private int totalTareas;
        private int tareasCompletadas;
        private int recursosSobrecargados;
        private int recursosOptimos;
        private int recursosSubutilizados;
        private double porcentajeCompletado;

        public Summary(List<Recurso> recursos, List<Tarea> tareas) {
            this.totalRecursos = recursos.size();
            this.totalTareas = tareas.size();
            this.tareasCompletadas = (int) tareas.stream()
                    .filter(t -> "done".equals(t.getEstado())).count();
            this.porcentajeCompletado = totalTareas == 0 ? 0 :
                    Math.round((tareasCompletadas * 100.0 / totalTareas) * 10.0) / 10.0;

            for (Recurso r : recursos) {
                int pct = Math.round((r.getHorasAsignadas() * 100.0f) / r.getCapacidadHoras());
                if (pct > 100) recursosSobrecargados++;
                else if (pct < 60) recursosSubutilizados++;
                else recursosOptimos++;
            }
        }

        public int getTotalRecursos() { return totalRecursos; }
        public int getTotalTareas() { return totalTareas; }
        public int getTareasCompletadas() { return tareasCompletadas; }
        public int getRecursosSobrecargados() { return recursosSobrecargados; }
        public int getRecursosOptimos() { return recursosOptimos; }
        public int getRecursosSubutilizados() { return recursosSubutilizados; }
        public double getPorcentajeCompletado() { return porcentajeCompletado; }
    }
}
