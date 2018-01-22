package data.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import data.entity.Message;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {

    List<Message> findByOrderByIdDesc(Pageable pageable);

}
