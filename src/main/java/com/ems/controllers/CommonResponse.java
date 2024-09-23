package com.ems.controllers;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class CommonResponse {

    private String message;
    private Object data;
    private int status;

    public CommonResponse(String message, Object data, int status) {
        this.message = message;
        this.data = data;
        this.status = status;
    }

    public CommonResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }

}
