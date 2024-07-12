package com.eduphotic.service;

import com.eduphotic.entity.Dish;
import com.eduphotic.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    public List<Dish> getAllDishes() {
        return dishRepository.findAll();
    }

    public Dish toggleDishStatus(int dishId) throws Exception {
        Dish dish = dishRepository.findById(dishId).orElse(null);
        if (dish == null) {
            throw new Exception("Dish not found");
        }
        dish.setPublished(!dish.isPublished());
        return dishRepository.save(dish);
    }
}

