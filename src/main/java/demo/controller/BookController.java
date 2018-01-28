package demo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import demo.data.entity.BookDetail;
import demo.form.BookDetailForm;
import demo.service.BookDetailService;

@Controller
public class BookController {

    @Autowired
    private BookDetailService bookDetailService;

    @RequestMapping(value="bookdetail",method= RequestMethod.GET)
    public String bookList(Model model){
        model.addAttribute("BookDetailForm", new BookDetailForm());
        Iterable<BookDetail> bookList = bookDetailService.getBookDetailList();
        model.addAttribute("BookDetailList",bookList);
        return "bookdetail";
    }

    @RequestMapping(value="bookdetail",method= RequestMethod.POST)
    public String saveBook(Model model, @Valid BookDetailForm bookDetailForm, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Iterable<BookDetail> bookList = bookDetailService.getBookDetailList();
            model.addAttribute("BookDetailList",bookList);
        }
        bookDetailService.saveBookDetail(new BookDetail(bookDetailForm.getTitle(),bookDetailForm.getAuthors(),bookDetailForm.getText(),bookDetailForm.getPublisher(),bookDetailForm.getPublished_date()));
        return "redirect:/bookdetail";
    }
}