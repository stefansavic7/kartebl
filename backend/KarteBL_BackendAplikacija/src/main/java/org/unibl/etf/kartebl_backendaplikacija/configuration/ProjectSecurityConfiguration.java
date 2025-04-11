package org.unibl.etf.kartebl_backendaplikacija.configuration;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.unibl.etf.kartebl_backendaplikacija.filter.JwtFilter;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ProjectSecurityConfiguration {
    @Bean
    public CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtFilter jwtFilter;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        return http
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .csrf(customizer -> customizer.disable())
                .authorizeHttpRequests(customizer -> customizer
                        
                        .requestMatchers(HttpMethod.GET, "dogadjaji/**", "karte/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "transakcije/**")
                        .permitAll()
                        .requestMatchers("login", "register")
                        .permitAll()
                        
                        .requestMatchers("administratori/**", "organizatori/**", "skeniraneKarte/**") //TODO: za skenirane karte ce vjerovatno trebati novi korisnik koji ce takodje moci raditi get i post ili samo dodati u korisnika kolonu zaposleni koja ako je true moze skenirati
                        .hasRole("administrator")
                        
                        .requestMatchers(HttpMethod.PUT,"transakcije/**")
                        .hasRole("administrator")
                        .requestMatchers(HttpMethod.DELETE,"transakcije/**")
                        .hasRole("administrator")
                        
                        .requestMatchers(HttpMethod.POST,"dogadjaji/**")
                        .hasAnyRole("administrator", "organizator")
                        .requestMatchers(HttpMethod.PUT,"dogadjaji/**")
                        .hasAnyRole("administrator", "organizator")
                        .requestMatchers(HttpMethod.DELETE,"dogadjaji/**")
                        .hasRole("administrator")
                        
                        .requestMatchers(HttpMethod.POST,"karte/**")
                        .hasAnyRole("administrator", "organizator")
                        .requestMatchers(HttpMethod.PUT,"karte/**")
                        .hasAnyRole("administrator", "organizator")
                        .requestMatchers(HttpMethod.DELETE,"karte/**")
                        .hasRole("administrator")
                        
                        .requestMatchers(HttpMethod.GET,"korisnici/**")
                        .hasAnyRole("administrator", "korisnik")
                        .requestMatchers(HttpMethod.POST,"korisnici/**")
                        .hasRole("administrator")
                        .requestMatchers(HttpMethod.PUT,"korisnici/**")
                        .hasAnyRole("administrator", "korisnik")
                        .requestMatchers(HttpMethod.DELETE,"korisnici/**")
                        .hasAnyRole("administrator", "korisnik")
        
                        .requestMatchers(HttpMethod.GET,"organizatori/email/**")
                        .hasAnyRole("administrator", "organizator")
                        
                        .anyRequest().authenticated())
                .oauth2Login(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    
    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception
    {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

}

