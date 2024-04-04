package com.example.AnimalClinicPro.utils;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class SqlDateConverter {

    public static Date convert(String date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

        try {
            java.util.Date parsedDate = format.parse(date);
            return new Date(parsedDate.getTime());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
