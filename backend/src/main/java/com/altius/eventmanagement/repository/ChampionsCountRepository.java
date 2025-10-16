package com.altius.eventmanagement.repository;

import com.altius.eventmanagement.model.ChampionsCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChampionsCountRepository extends JpaRepository<ChampionsCount, Long> {
    Optional<ChampionsCount> findByDeptId(String deptId);
}
