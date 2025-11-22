package com.surgealert.config;

import com.surgealert.entity.EvacuationSite;
import com.surgealert.repository.EvacuationSiteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EvacuationSiteSeeder implements CommandLineRunner {

    private final EvacuationSiteRepository repository;

    public EvacuationSiteSeeder(EvacuationSiteRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only seed if the table is empty to avoid duplicates
        if (repository.count() == 0) {
            
            EvacuationSite site1 = new EvacuationSite();
            site1.setName("Marulas Elementary School");
            site1.setLatitude(14.6780);
            site1.setLongitude(120.9850);
            site1.setAddress("Marulas, Valenzuela City");
            site1.setCapacity(500);
            site1.setIsActive(true);

            EvacuationSite site2 = new EvacuationSite();
            site2.setName("Marulas High School");
            site2.setLatitude(14.6765);
            site2.setLongitude(120.9835);
            site2.setAddress("Marulas, Valenzuela City");
            site2.setCapacity(1000);
            site2.setIsActive(true);

            EvacuationSite site3 = new EvacuationSite();
            site3.setName("Valenzuela City Astrodome");
            site3.setLatitude(14.6640);
            site3.setLongitude(120.9880);
            site3.setAddress("MacArthur Highway, Valenzuela City");
            site3.setCapacity(2000);
            site3.setIsActive(true);

            EvacuationSite site4 = new EvacuationSite();
            site4.setName("Valenzuela City People's Park");
            site4.setLatitude(14.6590);
            site4.setLongitude(120.9890);
            site4.setAddress("Gen. T. de Leon, Valenzuela City");
            site4.setCapacity(1500);
            site4.setIsActive(true);

            EvacuationSite site5 = new EvacuationSite();
            site5.setName("Coloong Elementary School");
            site5.setLatitude(14.6950);
            site5.setLongitude(120.9720);
            site5.setAddress("Coloong, Valenzuela City");
            site5.setCapacity(400);
            site5.setIsActive(true);

            repository.saveAll(List.of(site1, site2, site3, site4, site5));
            
            System.out.println("SUCCESS: Evacuation Sites seeded into Database.");
        }
    }
}