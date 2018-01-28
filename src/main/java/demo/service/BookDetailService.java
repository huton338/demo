package demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo.data.entity.BookDetail;
import demo.data.repository.BookDetailRepository;

@Service
public class BookDetailService {

    @Autowired
    private BookDetailRepository bookDetailRepository;


    public Iterable<BookDetail> getBookDetailList(){
        return bookDetailRepository.findByOrderByIdDesc();
    }

    @Transactional
    public void saveBookDetail(BookDetail bookDetail){
        bookDetailRepository.saveAndFlush(bookDetail);
    }
}
