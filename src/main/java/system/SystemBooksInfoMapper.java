package system;


public interface SystemBooksInfoMapper {
    int deleteByPrimaryKey(SystemBooksInfoKey key);

    int insert(SystemBooksInfo record);

    int insertSelective(SystemBooksInfo record);

    int updateByPrimaryKeySelective(SystemBooksInfo record);

    int updateByPrimaryKey(SystemBooksInfo record);

//    自定义############
    SystemBooksInfo selectByBookName(SystemBooksInfoKey key);
    SystemBooksInfo selectCurrentBook();
    int updateCurrentBook(SystemBooksInfo record);
}