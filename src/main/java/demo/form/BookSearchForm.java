package demo.form;

import javax.validation.constraints.Size;

public class BookSearchForm {

    @Size(max=80)
    private String title;

    @Size(max=80)
    private String authors;

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

}
