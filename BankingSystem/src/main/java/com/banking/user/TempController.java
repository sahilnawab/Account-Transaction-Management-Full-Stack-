package com.banking.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class TempController {

    @GetMapping("/temp")
    public String temp() {
        return "temp";
    }
}
