package test;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.log4j.Logger;

import java.io.Console;
import java.io.IOException;
import java.io.InputStream;

public class DataBaseUtil {

    Logger logger = Logger.getLogger("global");
    private String resource;
    private InputStream is;
    private SqlSessionFactory sessionFactory;
    private SqlSession session;
    public DataBaseUtil() {
        resource = "mybatis_config.xml";
        is = null;
        logger.error("have a try for log4j");
        try {
            is = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            logger.error("can't getResourceAsStream");
            e.printStackTrace();
        }
        sessionFactory = new SqlSessionFactoryBuilder().build(is);
        session = sessionFactory.openSession();
    }

    public <T>T getMapper(Class<T> cl){
        return session.getMapper(cl);

    }
}
