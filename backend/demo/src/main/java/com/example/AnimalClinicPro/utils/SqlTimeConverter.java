package com.example.AnimalClinicPro.utils;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class SqlTimeConverter {

    public static Time convert(String time) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");

        try {
            java.util.Date parsedDate = format.parse(time);
            return new Time(parsedDate.getTime());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

}
