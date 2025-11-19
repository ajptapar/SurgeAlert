package com.surgealert.config;

import com.surgealert.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod; 
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // We inject the JWT Filter here so we can add it to the chain below
    public SecurityConfig(@Lazy UserService userService, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userService = userService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (Common for REST APIs)
            .csrf(csrf -> csrf.disable())
            
            // 2. Configure CORS (Allow frontend to talk to backend)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 3. Stateless Session (Because we are using JWT, we don't save sessions in RAM)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 4. Define Access Rules (Public vs Private)
            .authorizeHttpRequests(auth -> auth
                // Public Endpoints (accessible without token)
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/sensor-data/**").permitAll() 
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/error").permitAll()

                // --- RESIDENT ENDPOINTS (The Logic Fix) ---
                // Allow anyone to REGISTER (POST)
                .requestMatchers(HttpMethod.POST, "/api/residents/**").permitAll() 
                // Allow anyone to view active count (GET)
                .requestMatchers(HttpMethod.GET, "/api/residents/active").permitAll() 
                // Only ADMINS can DELETE (Unsubscribe) a number
                .requestMatchers(HttpMethod.DELETE, "/api/residents/**").hasAnyRole("ADMIN", "HEAD_ADMIN") 
                
                // Private Endpoints (Everything else requires login)
                .anyRequest().authenticated()
            )
            
            // 5. Fix for H2 Console displaying blank
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))
            
            // 6. Add our Custom JWT Filter BEFORE the standard password check
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Add your frontend URLs here
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:5500", "http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}