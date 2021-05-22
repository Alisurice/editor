package test;


import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;

public class testDB {
    public static void main(String[] argc){
//        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
//        DataSource ds = (DataSource) app.getBean("dataSource");
        DataBaseUtil dbutil = new DataBaseUtil();
        BookDao bd = dbutil.getMapper(BookDao.class);
        System.out.println(bd.getNextId());
    }

}
