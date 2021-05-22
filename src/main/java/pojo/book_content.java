package pojo;

import system.SystemBooksInfo;

import java.util.Date;

public class book_content {
    private Integer id;

    private String bookname;

    private Integer groupid;

    private Date timeInsert;

    private Date timeUpdate;

    private String delta;



    public void createNewBlock(SystemBooksInfo bookInfo, String delta){
        this.bookname = bookInfo.getBookname();
        this.groupid = bookInfo.getCurrentGroupId();
        this.timeUpdate = this.timeInsert = new Date();
        this.delta = delta;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname == null ? null : bookname.trim();
    }

    public Integer getGroupid() {
        return groupid;
    }

    public void setGroupid(Integer groupid) {
        this.groupid = groupid;
    }

    public Date getTimeInsert() {
        return timeInsert;
    }

    public void setTimeInsert(Date timeInsert) {
        this.timeInsert = timeInsert;
    }

    public Date getTimeUpdate() {
        return timeUpdate;
    }

    public void setTimeUpdate(Date timeUpdate) {
        this.timeUpdate = timeUpdate;
    }

    public String getDelta() {
        return delta;
    }

    public void setDelta(String delta) {
        this.delta = delta == null ? null : delta.trim();
    }
}