package com.eduphotic.controller;

import com.eduphotic.entity.Dish;
import com.eduphotic.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dishes")
@CrossOrigin(origins = "http://localhost:3000")
public class DishController {

    @Autowired
    private DishService dishService;

    @GetMapping
    public List<Dish> getAllDishes() {
        return dishService.getAllDishes();
    }

    @PutMapping("/{id}/toggle")
    public Dish toggleDishStatus(@PathVariable int id) throws Exception {
        return dishService.toggleDishStatus(id);
    }
}

