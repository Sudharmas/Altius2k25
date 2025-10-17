// filepath: /workspaces/Altius2k25/backend/src/main/java/com/altius/eventmanagement/config/SecurityConfig.java
package com.altius.eventmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Apply CORS configuration first
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                // Explicitly allow all OPTIONS requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Allow public access to auth, events, and notifications endpoints
                .requestMatchers("/api/auth/**", "/api/events/**", "/api/notifications").permitAll()
                // Secure the admin endpoints
                .requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "ADMINISTRATOR")
                // All other requests must be authenticated
                .anyRequest().authenticated()
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // IMPORTANT: Add the specific origin of your frontend
        configuration.setAllowedOrigins(Arrays.asList("https://cautious-barnacle-6q4pw56rg56f57rq-4200.app.github.dev", "http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }
}
