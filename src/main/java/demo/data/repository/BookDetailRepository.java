package demo.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import demo.data.entity.BookDetail;

@Repository
public interface BookDetailRepository extends JpaRepository<BookDetail, Long> {

    Iterable<BookDetail> findByOrderByIdDesc();
//    BookDetail saveAndFlush(BookDetail bookDetail);
}
