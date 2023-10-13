package com.app.eotcbooks.configuration;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class DataStaxDataSourceConfiguration {
    @Bean
    public CqlSession session() throws IOException {
        ClassPathResource resource = new ClassPathResource("secure-connect-eotc-books.zip");
        return CqlSession.builder()
                .withCloudSecureConnectBundle(resource.getInputStream())
                .withAuthCredentials("OiaNAjcZkaEoyozpdwGaimUt","+2AN0,pAMZTb6F8,boCeP98rmbAacl2DzvrmZg,+7wd3Bp,CLtGfXlXtN82lDbm5EzDy+6XjbwTLp35vv6sIanspH,Sxy7ZDGEfuiQf.x_9n-9iUNlkZ7AJ8msJJI,P8")
                .build();

    }
}
