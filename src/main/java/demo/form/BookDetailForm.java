package demo.form;

import javax.validation.constraints.Size;

public class BookDetailForm {

    @Size(max=80)
    private String title;

    @Size(max=80)
    private String authors;

    @Size(min=1,max=140)
    private String text;

    @Size(max=80)
    private String publisher;

    @Size(max=80)
    private String published_date;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPublished_date() {
        return published_date;
    }

    public void setPublished_date(String published_date) {
        this.published_date = published_date;
    }



}
