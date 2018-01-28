package demo.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Table;

@Entity
@Table(appliesTo="book_detail")
public class BookDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String authors;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false, name="publisher")
    private String publisher;

    @Column(nullable = false,name ="published_date")
    private String publishedDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false,name="createdat")
    private Date createdAt;

    // JPA requirement
    protected BookDetail() {}

    public BookDetail(String title,String authors, String text, String publisher,String publishedDate) {
        this.title = title;
        this.authors = authors;
        this.text =text;
        this.publisher = publisher;
        this.publishedDate=publishedDate;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = new Date();
    }

    public Long getId() {
        return id;
    }

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

    public String getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(String publishedDate) {
        this.publishedDate = publishedDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }



}
