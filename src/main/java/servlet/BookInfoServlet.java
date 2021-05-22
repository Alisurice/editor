package servlet;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import system.SystemBooksInfo;
import system.SystemBooksInfoMapper;
import test.BookDao;
import test.DataBaseUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/servlet/BookInfoServlet")
public class BookInfoServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
//        return;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        System.out.println(request.getRequestURI());
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        Logger logger = Logger.getLogger(this.getClass());


        JSONObject result = new JSONObject();
        String bookName;

        //createBookPromise字段具有值，代表前端申请进行这个操作
        bookName = request.getParameter("createBookPromise");
        if ( bookName != null) {
            result = createBook(response, bookName, app);
        }
        else if ( (bookName = request.getParameter("openBookPromise")) != null) {
            result = openBook(response, bookName, app);
        }
        else {
            logger.debug("___bookName.isEmpty():" + bookName);
            result.put("response", "bookName.isEmpty" + bookName);
        }


        response.getWriter().write(result.toString());
    }

    private JSONObject openBook(HttpServletResponse response, String bookName, ApplicationContext app) {
        Logger logger = Logger.getLogger(this.getClass());
        logger.debug("____servlet.BookInfoServlet:openBookPromise:" + bookName);
        logger.debug("____bookName.notEmpty()");

        JSONObject obj = new JSONObject();
        SystemBooksInfoMapper sysMapper = app.getBean(SystemBooksInfoMapper.class);
        SystemBooksInfo book = new SystemBooksInfo(bookName);
        try {
            //如果要打开的是上次打开过的笔记本
            if(bookName.equals("__CURRENT_BOOK__")){
                book = sysMapper.selectCurrentBook();
                if(book.getBookname().equals("__CURRENT_IS_NULL__")){
                    obj.put("response", "no book has been opened");
                    return obj;
                }
                else {
                    /*
                    in book.setBookname("_%_%"+book.getBookname());
                        sysMapper.updateCurrentBook(book);
                    the bookName is record in bookName = "_%_%"+book.getBookname()
                    to avoid duplicate name
                     */
                    book.setBookname( book.getBookname().substring(4));
                    obj.put("response", "success");
                    logger.debug("----open current book:"+ JSON.toJSONString(book));
                    obj.put("success",JSON.toJSON(book));
                }
            }
            else if ((book = sysMapper.selectByBookName(book)) != null) {
                obj.put("response", "success");
                obj.put("success", JSON.toJSON(book));

                //打开笔记本成功，所以更新当前笔记本
                //为了避免重名导致sqlException，加上前缀
                book.setBookname("_%_%"+book.getBookname());
                sysMapper.updateCurrentBook(book);

                logger.debug("----json:book:"+obj.get("success"));

            }
            else {
                obj.put("response", "can not open");
            }
        } catch (Exception e) {
//                e.printStackTrace();
            logger.debug("____" + e.getCause());
            obj.put("response", "some worn in mysql, maybe book not exist:"+bookName);
        }
        return obj;
    }

    private JSONObject createBook(HttpServletResponse response, String bookName, ApplicationContext app) throws IOException {
        Logger logger = Logger.getLogger(this.getClass());

        SystemBooksInfoMapper sysMapper = app.getBean(SystemBooksInfoMapper.class);
        JSONObject obj = new JSONObject();
        logger.debug("____servlet.BookInfoServlet:createBookPromise:____" + bookName);
        logger.debug("____bookName.notEmpty()");
        SystemBooksInfo book = new SystemBooksInfo(bookName);
        try {
            if (sysMapper.insert(book) == 1) {
                obj.put("response", "success");
                obj.put("success", bookName);
            }
        } catch (Exception e) {
            logger.debug("____" + e.getCause());

            //判断exception出现原因是否为重名
            if (sysMapper.selectByBookName(book) != null) {
                obj.put("response", "book name is exsisted");
            } else {
                obj.put("response", "failed:can not insert to database");
            }

        } finally {
            return obj;
        }
    }


}
