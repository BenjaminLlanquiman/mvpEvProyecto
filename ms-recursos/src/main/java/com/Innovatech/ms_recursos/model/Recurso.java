package com.Innovatech.ms_recursos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recursos")
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String rol;
    private String region;
    private int capacidadHoras;
    private int horasAsignadas;

    public Recurso() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public int getCapacidadHoras() { return capacidadHoras; }
    public void setCapacidadHoras(int capacidadHoras) { this.capacidadHoras = capacidadHoras; }

    public int getHorasAsignadas() { return horasAsignadas; }
    public void setHorasAsignadas(int horasAsignadas) { this.horasAsignadas = horasAsignadas; }
}