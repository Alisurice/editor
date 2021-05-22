package mapper;

import pojo.book_content;
import system.SystemBooksInfo;

import java.util.List;

public interface book_contentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(book_content record);

    int insertSelective(book_content record);

    book_content selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(book_content record);

    int updateByPrimaryKey(book_content record);

    //    ####自定义
    List<book_content> selectListByBookName(SystemBooksInfo record);
    int insertNewBlock(book_content record);
    int lastId();
}