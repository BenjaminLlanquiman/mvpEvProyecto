package com.Innovatech.ms_dashboard.controller;

import com.Innovatech.ms_dashboard.dto.DashboardDTO;
import com.Innovatech.ms_dashboard.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public DashboardDTO obtenerDashboard() {
        return service.obtenerDashboard();
    }
}