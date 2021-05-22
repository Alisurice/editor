package servlet;


import com.alibaba.fastjson.JSON;
import mapper.book_contentMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import pojo.book_content;
import system.SystemBooksInfo;
import test.BookDao;
import test.DataBaseUtil;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 * a servlet to persistContainer and return id of the new block record
 */
@WebServlet("/servlet/SaveServlet")
public class SaveServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        System.out.println(request.getRequestURI());
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        request.setCharacterEncoding("UTF-8");


        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");

        Logger logger = Logger.getLogger(this.getClass());
        String delta = request.getParameter("del");
        String bookInfo = request.getParameter("bookInfo");

//        s = URLDecoder.decode(s,"UTF-8");
        logger.debug("servlet.SaveServlet:test:"+delta);
        logger.debug("servlet.SaveServlet:test:"+bookInfo);
//        logger.debug("servlet.SaveServlet:test:ENCODE:"+getEncoding(s));


//        JSONObject js = new JSONObject(delta);
//        logger.debug("servlet.SaveServlet:OPS:"+js.getJSONArray("ops"));
//        JSONArray jarr = js.getJSONArray("ops");
//        logger.debug("servlet.SaveServlet:json:"+jarr.get(0));

        book_content block = new book_content();
        SystemBooksInfo book = JSON.parseObject(bookInfo,SystemBooksInfo.class);
        block.createNewBlock(book, delta);
        logger.debug("servlet.SaveServlet:block:"+block);

        //insert into database
        book_contentMapper mapper = app.getBean(book_contentMapper.class);
        mapper.insertNewBlock(block);
        logger.debug("*****servlet.SaveServlet:insert id:"+block.getId());
        response.getWriter().write(String.valueOf(block.getId()));
//        DataBaseUtil dbutil = new DataBaseUtil();
//        BookDao bd = dbutil.getMapper(BookDao.class);
//        logger.debug("servlet.SaveServlet:id:");
//        response.getWriter().write(String.valueOf(bd.getNextId()+1));


    }

    public static String getEncoding(String str) {
        String encode = "GB2312";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s = encode;
                return s;
            }
        } catch (Exception exception) {
        }
        encode = "ISO-8859-1";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s1 = encode;
                return s1;
            }
        } catch (Exception exception1) {
        }
        encode = "UTF-8";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s2 = encode;
                return s2;
            }
        } catch (Exception exception2) {
        }
        encode = "GBK";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s3 = encode;
                return s3;
            }
        } catch (Exception exception3) {
        }
        return "";
    }



}
