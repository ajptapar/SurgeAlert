package com.surgealert.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class TideResponse {

    @JsonProperty("extremes")
    private List<TideExtreme> extremes;
    
    @JsonProperty("error")
    private String error;

    public List<TideExtreme> getExtremes() { return extremes; }
    public void setExtremes(List<TideExtreme> extremes) { this.extremes = extremes; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public static class TideExtreme {
        @JsonProperty("dt")
        private long dt; // Epoch timestamp
        
        @JsonProperty("date")
        private String date;
        
        @JsonProperty("height")
        private double height;
        
        @JsonProperty("type")
        private String type; // "High" or "Low"

        // Getters and Setters
        public long getDt() { return dt; }
        public void setDt(long dt) { this.dt = dt; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public double getHeight() { return height; }
        public void setHeight(double height) { this.height = height; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }
}