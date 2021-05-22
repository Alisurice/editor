package system;

public class SystemBooksInfo extends SystemBooksInfoKey {
    private Integer focusTop;

    private Integer focusLeft;

    private Integer currentGroupId;

    public SystemBooksInfo(String bookName) {
        super(bookName);
        this.focusTop = 0;
        this.focusLeft = 0;
        this.currentGroupId = 0;
    }

    @Override
    public String toString() {
        return "SystemBooksInfo{" +
                "focusTop=" + focusTop +
                ", focusLeft=" + focusLeft +
                ", currentGroupId=" + currentGroupId +
                "} " + super.toString();
    }

    public Integer getFocusTop() {
        return focusTop;
    }

    public void setFocusTop(Integer focusTop) {
        this.focusTop = focusTop;
    }

    public Integer getFocusLeft() {
        return focusLeft;
    }

    public void setFocusLeft(Integer focusLeft) {
        this.focusLeft = focusLeft;
    }

    public Integer getCurrentGroupId() {
        return currentGroupId;
    }

    public void setCurrentGroupId(Integer currentGroupId) {
        this.currentGroupId = currentGroupId;
    }
}