package system;

public class SystemBooksInfoKey {
    private Integer bookid;

    private String bookname;

    public SystemBooksInfoKey(String bookname) {
        this.bookname = bookname;
    }

    @Override
    public String toString() {
        return "SystemBooksInfoKey{" +
                "bookid=" + bookid +
                ", bookname='" + bookname + '\'' +
                '}';
    }

    public Integer getBookid() {
        return bookid;
    }

    public void setBookid(Integer bookid) {
        this.bookid = bookid;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname == null ? null : bookname.trim();
    }
}