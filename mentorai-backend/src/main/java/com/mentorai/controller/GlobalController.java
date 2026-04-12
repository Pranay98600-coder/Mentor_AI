package com.mentorai.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class GlobalController {

    // ✅ THIS HANDLES ALL PREFLIGHT REQUESTS
    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public void handleOptions() {
        // nothing needed
    }
}