package com.Singla.Capitalia.repositary;

import com.Singla.Capitalia.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {

    List<CategoryEntity> findByProfileId(Long profileId);

    Optional<CategoryEntity> findByIdAndProfileId(Long id,Long profileId);

    //
    List<CategoryEntity> findByTypeAndProfileId(String type,Long profileId);

    Boolean existsByNameAndProfileId(String name, Long profileId);
}
